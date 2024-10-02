#!/bin/bash
#
# Initialize variables with default values
PRODUCTION=false

# Function to display usage information
usage() {
  echo "Usage: $0 [-p]"
  echo "  -p, --production     Build in production mode"
  exit 1
}

# Parse command-line arguments
while getopts ":ph" opt; do
  case ${opt} in
    p | production)
      PRODUCTION=true
      ;;
    h | help)
      usage
      ;;
    \?)
      echo "Invalid option: $OPTARG" 1>&2
      usage
      ;;
  esac
done
shift $((OPTIND -1))

# Define the path to your .env.sample and the output .env file
ENV_FILE=".env"
ENV_SAMPLE=".env.sample"

# Set the path to your docker-compose file
DOCKER_COMPOSE_FILE="./docker-compose.yml"

# Function to check packages using APT (Debian-based)
check_apt() {
    echo "Checking packages on APT (Debian-based) system..."
    for pkg in "${packages[@]}"; do
        if ! dpkg -l | grep -qw "$pkg"; then
            echo "$pkg is not installed."
	    docker_packages_installed=0
        fi
    done
}

# Function to check packages using YUM or DNF (Red Hat-based)
check_rpm() {
    local manager=$1  # Pass the package manager (yum or dnf)
    echo "Checking packages on RPM (Red Hat-based) system with $manager..."
    for pkg in "${packages[@]}"; do
        if ! $manager list installed "$pkg" &> /dev/null; then
            echo "$pkg is not installed."
	    docker_packages_installed=0
        fi
    done
}

# Function to check docker packages
check_docker() {
    # Define packages to check
    packages=("docker-ce" "docker-ce-cli" "containerd.io" "docker-buildx-plugin" "docker-compose-plugin")
    docker_packages_installed=1

    # Identify the package manager and check packages
    echo "Checking if required docker packages are installed..."
    if command -v apt-get &> /dev/null; then
        check_apt
    elif command -v dnf &> /dev/null; then
        check_rpm dnf
    elif command -v yum &> /dev/null; then
        check_rpm yum
    else
        echo "Unsupported package manager. Unable to detect the packages status. Trying to continue."
    fi


    if [[ $docker_packages_installed -eq 0 ]]; then
       echo "Required docker packages are not installed."
       exit 1
    else
       echo "Docker packages are installed. Proceed with the deployment..."
    fi
}

# Function to generate .evn file from sample if not exist, if exists keep current
create_env() {
    # Check if .env.sample exists
    if [ -f "$ENV_FILE" ]; then
        echo "$ENV_FILE does exist. Using the existing configuration."
    else
	echo "$ENV_FILE does not exist. Creating from the sample..."
	# Check if .env.sample exists
        if [ ! -f "$ENV_SAMPLE" ]; then
            echo "$ENV_SAMPLE does not exist. Exiting..."
            exit 1
        fi
	cp $ENV_SAMPLE $ENV_FILE
        # Generate random values for production deployment
	if [ "$PRODUCTION" = true ]; then
		DB_USER="user_$(openssl rand -hex 6)"
		DB_PASSWORD="$(openssl rand -hex 12)"
		# Replace placeholders in .env
		sed -i "s/POSTGRES_USER=.*/POSTGRES_USER=$DB_USER/" $ENV_FILE
		sed -i "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$DB_PASSWORD/" $ENV_FILE
	fi
	IP=$(hostname -I | cut -d' ' -f1)
	sed -i "s/POSTGRES_IP=.*/POSTGRES_IP=$IP/" $ENV_FILE
	echo ".env file has been generated with random credentials."
    fi
}

# Function to create ngnix config
create_ngnix_conf() {
    source $ENV_FILE
    # Check if nginx.conf exists
    if [ -f ./app-web-frontend/nginx.conf ]; then
        echo "ngnix.conf does exist. Using the existing configuration."
    else
        echo "ngnix.conf does not exist. Creating from the template..."
        # Check if nginx.conf.template exists
        if [ ! -f ./app-web-frontend/nginx.conf.template ]; then
            echo "nginx.conf.template does not exist. Exiting..."
            exit 1
        fi
	# Replace the placeholder in nginx.conf.template and save as nginx.conf
	echo "Using domain: ${DOMAIN_NAME}"
	sed "s/\${DOMAIN_NAME}/${DOMAIN_NAME}/" ./app-web-frontend/nginx.conf.template > ./app-web-frontend/nginx.conf

	# For dev deployment replace domain name with IP to avoid potential issues with DNS resolution
	if [ "$PRODUCTION" != true ]; then
		IP=$(hostname -I | cut -d' ' -f1)
		sed -i "s/\$server_name:8080/$IP:8080/" ./app-web-frontend/nginx.conf
	fi
        echo "nginx.conf has been created."
    fi
}

# Function to create app config for database
create_application_conf() {
    source $ENV_FILE
    echo "Updating application-cloud.yaml"
    # Set actual values in application-cloud.yaml"
    CONFIG_FILE=app-backend/src/main/resources/application-cloud.yaml
    # For dev deployment replace domain name with IP to avoid potential issues with DNS resolution
    if [ "$PRODUCTION" = true ]; then
	    DB_HOST=${DOMAIN_NAME}
    else
	    DB_HOST=$(hostname -I | cut -d' ' -f1)
    fi
    echo "DB_HOST: $DB_HOST"
    sed -i "s/localhost:5432\/postgres/${DB_HOST}:${POSTGRES_PORT}\/${POSTGRES_DB}/" $CONFIG_FILE
    sed -i "s/username: postgres/username: ${POSTGRES_USER}/" $CONFIG_FILE
    sed -i "s/password: postgres/password: ${POSTGRES_PASSWORD}/" $CONFIG_FILE

    # Generate JWT secret
    openssl rand -out key.bin 64
    openssl base64 -in key.bin -out key.base64
    secret_key=$(openssl rand -base64 64 | tr -d '\n')

    # Escape special characters in the secret key
    escaped_secret_key=$(printf '%s\n' "$secret_key" | sed 's/[\/&]/\\&/g')

    # Replace placeholder in configuration file with the secret key
    sed -i "s/secret: mySecret/secret: $escaped_secret_key/" "$CONFIG_FILE"
}

# Function to set SERVER_ADDRESS for API calls on frontend
update_setupinfo() {
    source $ENV_FILE
    sed -i "s|export const SERVER_ADDRESS = 'http://' + SERVER_ADDRESS_LINE|export const SERVER_ADDRESS = 'https://$DOMAIN_NAME/api'|g" app-web-frontend/src/setupInfo.js
}

# Function to generate self-signed SSL certificates
generate_ssl() {
    source $ENV_FILE
    SSL_DIR="app-web-frontend/ssl"
    CERT_FILE="${SSL_DIR}/${DOMAIN_NAME}.crt"
    KEY_FILE="${SSL_DIR}/${DOMAIN_NAME}.key"

    # Create SSL directory if it doesn't exist
    mkdir -p ${SSL_DIR}

    # Generate self-signed SSL certificate
    if [ ! -f "${CERT_FILE}" ] || [ ! -f "${KEY_FILE}" ]; then
        echo "Generating self-signed SSL certificate for ${DOMAIN_NAME}..."
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout "${KEY_FILE}" -out "${CERT_FILE}" \
            -subj "/C=US/ST=YourState/L=YourCity/O=YourOrganization/CN=${DOMAIN_NAME}"
    else
        echo "SSL certificate already exists."
    fi
}

# Function to get the latest changes from the repo for your current branch
pull_current_branch() {
    # Identify the current Git branch
    echo "Pulling the latest changes from git..."
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    if [ $? -ne 0 ]; then
        echo "Error: Failed to determine the current Git branch. Make sure this is a Git repository."
	echo "Skipping the update."
    else
	echo "Current branch is $CURRENT_BRANCH."
        # Pull latest changes from the current branch
        echo "Pulling the changes from $CURRENT_BRANCH..."
        git pull origin $CURRENT_BRANCH
    fi
}

# Function to deploy docker containers
deploy() {
    echo "Stopping existing containers..."
    docker compose -f $DOCKER_COMPOSE_FILE down

    echo "Building and starting new containers..."
    docker compose -f $DOCKER_COMPOSE_FILE up --build -d
}

main() {
    # check_docker

    create_env
    generate_ssl
    create_ngnix_conf
    create_application_conf
    update_setupinfo
    deploy
}

main

