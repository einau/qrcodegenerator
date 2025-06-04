#!/bin/sh

# Create mount point
mkdir -p /mnt/blobfusetmp
mkdir -p /app/backend/storage

# Mount blob storage
blobfuse /app/backend/storage \
  --tmp-path=/mnt/blobfusetmp \
  --config-file=/app/backend/fuse_connection.cfg \
  -o allow_other

# Start application
node /app/backend/app.js
