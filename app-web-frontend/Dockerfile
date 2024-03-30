# Build stage with the latest Node.js version
FROM node:18-slim as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install --verbose

# Copy the necessary files
COPY . .
RUN npm run build
COPY ./public ./build/
COPY ./src ./build/

# Serve stage with the latest Nginx version
FROM nginx:latest

COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ssl/* /etc/nginx/ssl/

# Expose the port specified via environment variable
EXPOSE $FRONTEND_PORT
CMD ["nginx", "-g", "daemon off;"]
