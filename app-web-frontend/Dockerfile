
# Build stage with the latest Node.js version
FROM node:latest as build
COPY --from=build /app/build /usr/share/nginx/html
COPY app-web-frontend/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /app
COPY app-web-frontend/package.json app-web-frontend/package-lock.json ./
RUN npm install
COPY app-web-frontend/ .
RUN npm run build

# Serve stage with the latest Nginx version
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY app-web-frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
