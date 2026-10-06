#!/bin/sh
set -e

echo "Dropping old test database (if any)..."
npx sequelize-cli db:drop --env test || true

echo "Setting up test database..."
npx sequelize-cli db:create --env test || echo "Test database already exists"

echo "Running test database migrations..."
npx sequelize-cli db:migrate --env test

echo "Running tests..."
exec "$@"
