#!/bin/bash

# Check database connectivity
sqlcmd -S $DB_SERVER -d $DB_NAME -U $DB_USER -P $DB_PASSWORD -Q "SELECT 1" > /dev/null
exit $?
