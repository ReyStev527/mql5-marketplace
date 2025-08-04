@echo off
REM 🚀 MQL5 Marketplace GitHub Deployment Script for Windows
REM Script otomatis untuk deploy ke GitHub Pages + Railway

echo 🚀 Starting MQL5 Marketplace Deployment...
echo ==========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/download/windows
    pause
    exit /b 1
)

echo ✅ Git is installed

REM Check if we're in the right directory
if not exist "package.json" if not exist "frontend" if not exist "backend" (
    echo ❌ Please run this script from the project root directory
    pause
    exit /b 1
)

echo ✅ In correct project directory

REM Initialize git if not already initialized
if not exist ".git" (
    echo ℹ️  Initializing Git repository...
    git init
    echo ✅ Git repository initialized
)

REM Add all files
echo ℹ️  Adding all files to Git...
git add .

REM Commit changes
echo ℹ️  Committing changes...
git commit -m "Prepare for GitHub deployment - %date% %time%"

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ⚠️  No remote origin found.
    echo.
    echo Please create a GitHub repository first:
    echo 1. Go to https://github.com/new
    echo 2. Create repository named 'mql5-marketplace'
    echo 3. Copy the repository URL
    echo.
    set /p repo_url="Enter your GitHub repository URL: "
    
    if "%repo_url%"=="" (
        echo ❌ Repository URL is required
        pause
        exit /b 1
    )
    
    git remote add origin "%repo_url%"
    echo ✅ Remote origin added
)

REM Push to main branch
echo ℹ️  Pushing to GitHub main branch...
git branch -M main
git push -u origin main

echo ✅ Code pushed to GitHub successfully!

REM Build frontend for GitHub Pages
echo ℹ️  Building frontend for GitHub Pages...
cd frontend

if not exist "package.json" (
    echo ❌ Frontend package.json not found
    pause
    exit /b 1
)

REM Install dependencies
echo ℹ️  Installing frontend dependencies...
call npm install

REM Build for production
echo ℹ️  Building frontend for production...
call npm run build

if not exist "build" (
    echo ❌ Frontend build failed
    pause
    exit /b 1
)

echo ✅ Frontend built successfully

REM Deploy to GitHub Pages
echo ℹ️  Deploying to GitHub Pages...
cd ..

REM Check if gh-pages branch exists
git show-ref --verify --quiet refs/heads/gh-pages
if errorlevel 1 (
    git checkout --orphan gh-pages
    git rm -rf .
) else (
    git checkout gh-pages
    git rm -rf .
)

REM Copy build files to root
xcopy frontend\build\* . /E /Y /I
if exist frontend\build\.* xcopy frontend\build\.* . /E /Y /I /H

REM Add CNAME if custom domain (optional)
REM echo your-domain.com > CNAME

REM Commit and push to gh-pages
git add .
git commit -m "Deploy to GitHub Pages - %date% %time%"
git push -f origin gh-pages

REM Switch back to main branch
git checkout main

echo ✅ Frontend deployed to GitHub Pages!

echo.
echo 🎉 Deployment completed successfully!
echo =======================================
echo.
echo ℹ️  Frontend will be available at:
echo https://YOUR_USERNAME.github.io/mql5-marketplace
echo.
echo ℹ️  Next steps:
echo 1. Deploy backend to Railway/Render/Heroku
echo 2. Update API URLs in frontend environment
echo 3. Configure GitHub repository secrets
echo 4. Enable GitHub Pages in repository settings
echo.
echo ⚠️  Don't forget to:
echo • Set up environment variables on your backend hosting
echo • Update CORS settings with your frontend URL
echo • Test all integrations (Telegram, Midtrans, Google Sheets)
echo.
echo ✅ Happy deploying! 🚀

pause
