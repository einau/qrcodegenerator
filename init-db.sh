#!/bin/bash

# Wait for database to be ready
echo "Checking database connection..."
until /app/healthcheck.sh; do
    echo "Database not ready - sleeping"
    sleep 10
done

# Run import script if DB is empty
echo "Checking if database needs initialization..."
result=$(sqlcmd -S $DB_SERVER -d $DB_NAME -U $DB_USER -P $DB_PASSWORD -Q "SELECT COUNT(*) FROM certificates" -h -1 -W)
if [ $result -eq 0 ]; then
    echo "Initializing database..."
    node /app/backend/import.js
    echo "Database initialized successfully"
else
    echo "Database already initialized - skipping import"
fi
