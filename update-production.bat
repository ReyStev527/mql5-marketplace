@echo off
REM 🔧 Update Production Environment & Redeploy Script
REM Script untuk update backend URL dan redeploy frontend

echo 🔧 MQL5 Marketplace - Update Production Environment
echo ==================================================
echo.

if "%1"=="" (
    echo ⚠️  Usage: update-production.bat [BACKEND_URL]
    echo.
    echo Example:
    echo   update-production.bat https://mql5-marketplace.railway.app
    echo   update-production.bat https://mql5-marketplace.onrender.com
    echo.
    pause
    exit /b 1
)

set BACKEND_URL=%1

echo ℹ️  Updating production environment...
echo Backend URL: %BACKEND_URL%
echo.

REM Update .env.production file
cd frontend

echo REACT_APP_API_URL=%BACKEND_URL%/api > .env.production
echo REACT_APP_BACKEND_URL=%BACKEND_URL% >> .env.production
echo REACT_APP_TELEGRAM_BOT=@ladangpertanianbot >> .env.production
echo REACT_APP_SUPPORT_EMAIL=support@mql5marketplace.com >> .env.production
echo REACT_APP_SUPPORT_PHONE=+62812345678 >> .env.production
echo REACT_APP_MIDTRANS_CLIENT_KEY=Mid-client-bqNzFKqUU9N7fjxX >> .env.production
echo REACT_APP_COMPANY_NAME=MQL5 Marketplace >> .env.production
echo REACT_APP_VERSION=1.0.0 >> .env.production

echo ✅ Environment updated

REM Build for production
echo ℹ️  Building frontend for production...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Frontend built successfully

REM Deploy to GitHub Pages
echo ℹ️  Deploying to GitHub Pages...
cd ..

REM Switch to gh-pages branch
git checkout gh-pages
if errorlevel 1 (
    echo ❌ Failed to switch to gh-pages branch
    pause
    exit /b 1
)

REM Clear existing files
git rm -rf . >nul 2>&1

REM Copy new build files
xcopy frontend\build\* . /E /Y /I >nul

REM Commit and push
git add .
git commit -m "Update production deployment with backend URL: %BACKEND_URL%"
git push -f origin gh-pages

REM Switch back to main
git checkout main

echo.
echo 🎉 Deployment completed successfully!
echo =======================================
echo.
echo ✅ Updated backend URL: %BACKEND_URL%
echo ✅ Frontend rebuilt and deployed
echo ✅ GitHub Pages updated
echo.
echo 🌐 Your website: https://reystev527.github.io/mql5-marketplace
echo.
echo ✅ Ready to serve customers!

pause
