#!/bin/bash

# Azure Deployment Script for Veriforge
# This script reflects the actual deployment configuration used
set -e

echo "🚀 Starting Azure Deployment for Veriforge"

# Configuration - matches actual deployed resources
RESOURCE_GROUP="veriforge-rg"
LOCATION="eastus2"
ACR_NAME="veriforgeacr"
ADMIN_APP="veriforge-admin"
WORKER_APP="veriforge-worker"

echo "📦 Building Admin Console..."
cd frontend/admin
npm ci --legacy-peer-deps
npm run build
cd ../..

echo "📦 Building Worker UI..."
cd frontend/worker
npm ci --legacy-peer-deps
npm run build
cd ../..

echo "🐳 Building Docker images..."
az acr login --name $ACR_NAME

docker build -t $ACR_NAME.azurecr.io/veriforge-admin:latest -f Dockerfile.frontend frontend/admin
docker build -t $ACR_NAME.azurecr.io/veriforge-worker:latest -f Dockerfile.frontend frontend/worker
docker push $ACR_NAME.azurecr.io/veriforge-admin:latest
docker push $ACR_NAME.azurecr.io/veriforge-worker:latest

echo "🌐 Note: Frontend apps are deployed via Azure Static Web Apps with GitHub CI/CD"
echo "    Admin Console: https://black-beach-0c0b94c0f.7.azurestaticapps.net"
echo "    Worker UI: https://ashy-moss-071e3de0f.7.azurestaticapps.net"
echo ""
echo "📋 To deploy frontend changes:"
echo "    1. Commit and push to main branch"
echo "    2. Azure Static Web Apps will auto-build and deploy"
echo ""
echo "� To deploy backend services to AKS:"
echo "    az aks get-credentials --resource-group $RESOURCE_GROUP --name veriforge-aks"
echo "    kubectl apply -f infrastructure/k8s/"
echo ""
echo "✅ Build complete!"
