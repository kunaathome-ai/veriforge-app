#!/bin/bash

# Local deployment script for Veriforge
# Reflects the actual manual steps used during development
set -e

echo "🚀 Veriforge Local Build & Deploy Script"
echo ""

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
echo ""
echo "🖥️  To start local dev servers:"
echo "    cd frontend/admin && npm run dev    # http://localhost:3000"
echo "    cd frontend/worker && npm run dev  # http://localhost:3001"
echo ""
echo "🌐 Deployed Azure URLs (auto-deploy from GitHub):"
echo "    Admin Console: https://black-beach-0c0b94c0f.7.azurestaticapps.net"
echo "    Worker UI: https://ashy-moss-071e3de0f.7.azurestaticapps.net"
echo ""
echo "📋 To deploy: commit and push to main branch"
