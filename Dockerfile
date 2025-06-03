FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy frontend files
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Build frontend
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Copy backend source
COPY backend/ ./backend/

# Move frontend build to backend public directory
RUN mv frontend/build backend/public

# Expose port
EXPOSE 5000

# Start application
CMD ["node", "backend/app.js"]
