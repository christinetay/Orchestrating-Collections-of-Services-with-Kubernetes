# Specify the base image and
# Set working directory to '/app' in the container (all commands below related to this dir)
FROM node:alpine

# Add the following lines
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

# Copy package.json only and
# Execute npm install to install all dependencies
COPY package.json ./
RUN npm install

# Copy over all remaining source code
# Set commands to run when container starts up
COPY ./ ./
CMD ["npm","start"]