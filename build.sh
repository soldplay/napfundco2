#!/bin/bash
set -e

echo "Current directory: $(pwd)"
echo "Changing to NapfundCo_OG directory..."
cd NapfundCo_OG || exit 1
echo "Now in: $(pwd)"
echo "Listing files:"
ls -la
echo "Checking for app directory:"
ls -la app/ || echo "ERROR: app directory not found!"
echo "Installing dependencies..."
npm ci
echo "Running build..."
npm run build

