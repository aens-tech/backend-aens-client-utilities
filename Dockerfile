# Base image
FROM node:18

# Declare build arguments
ARG NODE_ENV
ARG DB_HOST
ARG DB_PORT
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD

# Set environment variables
ENV NODE_ENV=$NODE_ENV \
    DB_HOST=$DB_HOST \
    DB_PORT=$DB_PORT \
    DB_NAME=$DB_NAME \
    DB_USER=$DB_USER \
    DB_PASSWORD=$DB_PASSWORD

# Working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Start application
CMD ["npm", "start"]