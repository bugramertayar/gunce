# Use an official Node.js runtime as a parent image
FROM node:14.17-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx:1.21.3-alpine

# Copy the built application to the Nginx server directory
COPY --from=builder /app/dist/gunce /usr/share/nginx/html

# Expose port 80 to the Docker host
EXPOSE 80

# Start Nginx when the container is started
CMD ["nginx", "-g", "daemon off;"]
