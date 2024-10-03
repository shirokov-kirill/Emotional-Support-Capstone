# Emotional-Support-Capstone

Use our Emotional Support app to keep track your mental health and interact without your mental health professional!
See our [user manual](/blob/main/USER_MANUAL.md) for more details.

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

## Work done
List of all the work done during the implementation Sprints is [here](https://docs.google.com/presentation/d/1uyN3Xe7WYpE58yw565GDzBhU4o4cmOs2Ut65KAcG2X8/edit?usp=sharing)
