#!/bin/bash

echo "Waiting for MySQL..."
while ! php artisan migrate --force 2>/dev/null; do
    echo "MySQL not ready, retrying in 5s..."
    sleep 5
done

echo "Migrations done! Starting Apache..."
apache2-foreground