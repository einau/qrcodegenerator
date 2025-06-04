#!/bin/bash

# Initialize database
/app/init-db.sh

# Start the application
echo "Starting application on port $PORT..."
node /app/backend/app.js
