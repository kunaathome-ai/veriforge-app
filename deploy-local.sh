#!/bin/bash

# Local deployment script for Veriforge
set -e

echo "🚀 Deploying Veriforge to Azure Static Web Apps"

# Build Admin Console
echo "📦 Building Admin Console..."
cd frontend/admin
npm install --legacy-peer-deps
npm run build
cd ../..

# Build Worker UI
echo "📦 Building Worker UI..."
cd frontend/worker
npm install --legacy-peer-deps
npm run build
cd ../..

echo "✅ Build complete!"
echo "Admin Console: https://black-beach-0c0b94c0f.7.azurestaticapps.net"
echo "Worker UI: https://ashy-moss-071e3de0f.7.azurestaticapps.net"
echo ""
echo "Note: Azure Static Web Apps are configured to build from GitHub repository."
echo "The apps will automatically build and deploy when you push to main branch."
