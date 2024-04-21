# Emotional-Support-Capstone
# Deployment
To deploy the application in Docker containers on a Linux machine with Docker installed, follow these steps:
* Navigate inside the repository
* Execute chmod +x deploy.sh
* Run the deploy script: ./deploy.sh
The script deploys 3 Docker containers:
* Web app with Nginx The Nginx serves the web app requests and proxies API requests are sent to /api to the backend container.
* Backend
* DB

Recommended minimal configuration for the Linux machine: 2 Cores and 4 GB RAM.
