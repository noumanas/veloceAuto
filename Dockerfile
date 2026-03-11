# Use the official Node.js 20 image
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Service listens on the PORT environment variable (default for Cloud Run).
# If your app ignores PORT, it may not work on Cloud Run.
ENV PORT=9000

# Run the web service on container startup.
CMD [ "npm", "start" ]
