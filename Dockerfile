FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create required directories
RUN mkdir -p /app/backend /app/frontend/public /app/frontend/src

# Copy backend files
COPY backend/package*.json /app/backend/
RUN cd /app/backend && npm install

# Copy frontend files
COPY frontend/package*.json /app/frontend/
RUN cd /app/frontend && npm install

# Copy frontend source
COPY frontend/public /app/frontend/public
COPY frontend/src /app/frontend/src

# Build frontend
RUN cd /app/frontend && npm run build

# Copy backend source
COPY backend /app/backend

# Move frontend build to backend public directory
RUN mv /app/frontend/build /app/backend/public

# Expose port
EXPOSE 5000

# Start application
CMD ["node", "/app/backend/app.js"]
