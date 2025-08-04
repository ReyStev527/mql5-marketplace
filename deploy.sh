#!/bin/bash

# 🚀 MQL5 Marketplace GitHub Deployment Script
# Script otomatis untuk deploy ke GitHub Pages + Railway

echo "🚀 Starting MQL5 Marketplace Deployment..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

print_status "Git is installed"

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ] && [ ! -d "backend" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "In correct project directory"

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    print_info "Initializing Git repository..."
    git init
    print_status "Git repository initialized"
fi

# Add all files
print_info "Adding all files to Git..."
git add .

# Commit changes
print_info "Committing changes..."
git commit -m "Prepare for GitHub deployment - $(date)"

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    print_warning "No remote origin found."
    echo ""
    echo "Please create a GitHub repository first:"
    echo "1. Go to https://github.com/new"
    echo "2. Create repository named 'mql5-marketplace'"
    echo "3. Copy the repository URL"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    
    if [ -z "$repo_url" ]; then
        print_error "Repository URL is required"
        exit 1
    fi
    
    git remote add origin "$repo_url"
    print_status "Remote origin added"
fi

# Push to main branch
print_info "Pushing to GitHub main branch..."
git branch -M main
git push -u origin main

print_status "Code pushed to GitHub successfully!"

# Build frontend for GitHub Pages
print_info "Building frontend for GitHub Pages..."
cd frontend

if [ ! -f "package.json" ]; then
    print_error "Frontend package.json not found"
    exit 1
fi

# Install dependencies
print_info "Installing frontend dependencies..."
npm install

# Build for production
print_info "Building frontend for production..."
npm run build

if [ ! -d "build" ]; then
    print_error "Frontend build failed"
    exit 1
fi

print_status "Frontend built successfully"

# Deploy to GitHub Pages
print_info "Deploying to GitHub Pages..."
cd ..

# Create gh-pages branch and deploy
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
    git rm -rf .
else
    git checkout --orphan gh-pages
    git rm -rf .
fi

# Copy build files to root
cp -r frontend/build/* .
cp frontend/build/.* . 2>/dev/null || true

# Add CNAME if custom domain (optional)
# echo "your-domain.com" > CNAME

# Commit and push to gh-pages
git add .
git commit -m "Deploy to GitHub Pages - $(date)"
git push -f origin gh-pages

# Switch back to main branch
git checkout main

print_status "Frontend deployed to GitHub Pages!"

echo ""
echo "🎉 Deployment completed successfully!"
echo "======================================="
echo ""
print_info "Frontend will be available at:"
echo "https://YOUR_USERNAME.github.io/mql5-marketplace"
echo ""
print_info "Next steps:"
echo "1. Deploy backend to Railway/Render/Heroku"
echo "2. Update API URLs in frontend environment"
echo "3. Configure GitHub repository secrets"
echo "4. Enable GitHub Pages in repository settings"
echo ""
print_warning "Don't forget to:"
echo "• Set up environment variables on your backend hosting"
echo "• Update CORS settings with your frontend URL"
echo "• Test all integrations (Telegram, Midtrans, Google Sheets)"
echo ""
print_status "Happy deploying! 🚀"
