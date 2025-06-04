FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]

# Install all required build dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    python3-dev \
    gcc \
    musl-dev \
    libffi-dev \
    openssl-dev \
    linux-headers \
    make \
    git \
    bash && \
    python3 -m venv /venv && \
    . /venv/bin/activate && \
    pip install --upgrade pip && \
    pip install azure-cli && \
    deactivate && \
    apk del gcc musl-dev linux-headers make libffi-dev openssl-dev python3-dev

# Create required directories
RUN mkdir -p /app/backend /app/frontend/public /app/frontend/src

# Copy backend files
COPY backend/package*.json /app/backend/
RUN cd /app/backend && npm install

# Copy frontend files
COPY frontend/package*.json /app/frontend/
RUN cd /app/frontend && npm install

# Copy application source
COPY . .

# Build frontend
RUN cd /app/frontend && npm run build

# Move frontend build to backend public directory
RUN mv /app/frontend/build /app/backend/public

# Make scripts executable
RUN chmod +x /app/entrypoint.sh /app/init-db.sh /app/healthcheck.sh

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD /app/healthcheck.sh
