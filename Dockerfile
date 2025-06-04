FROM node:18-alpine

# Install blobfuse and dependencies
RUN apk add --no-cache fuse3 curl gnupg \
    && curl -L https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /etc/apk/keys/microsoft.gpg \
    && echo "https://packages.microsoft.com/alpine/v3.18/main" >> /etc/apk/repositories \
    && apk add blobfuse=1.4.5-r0 --allow-untrusted

# Set working directory
WORKDIR /app

# ... rest of Dockerfile remains same ...
# Set working directory
WORKDIR /app

# Create required directories explicitly
RUN mkdir -p /app/backend /app/frontend/public /app/frontend/src

# Copy backend files
COPY backend/package*.json /app/backend/
RUN cd /app/backend && npm install

# Copy frontend files
COPY frontend/package*.json /app/frontend/
RUN cd /app/frontend && npm install

# Copy frontend source code
COPY frontend/public /app/frontend/public
COPY frontend/src /app/frontend/src

# Build React app
RUN cd /app/frontend && npm run build

# Copy backend source code
COPY backend /app/backend

# Move frontend build to backend public directory
RUN mv /app/frontend/build /app/backend/public

# Expose port
EXPOSE 5000

# Start application
CMD ["node", "/app/backend/app.js"]
