# Emotional-Support-Capstone

# Deployment
To deploy the application in Docker containers on a Linux machine with Docker installed, follow these steps:
1. Navigate inside the repository
2. Execute
   chmod +x deploy.sh
3. Run the deploy script:
   ./deploy.sh

The script deploys 3 Docker containers:
1. Web app with Nginx
   The Nginx serves the web app requests and proxies API requests are sent to /api to the backend container.
3. Backend
5. DB

Recommended minimal configuration for the Linux machine: 2 Cores and 4 GB RAM.
