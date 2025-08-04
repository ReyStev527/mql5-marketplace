@echo off
echo ===============================================
echo         MQL5 Marketplace - Quick Deploy
echo ===============================================
echo.

echo [1/3] Checking Git status...
git status

echo.
echo [2/3] Building Frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)
cd ..

echo.
echo [3/3] Deploying to GitHub Pages...
git add .
git commit -m "Auto deploy: %date% %time%"
git push origin main

git subtree push --prefix frontend/build origin gh-pages
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Subtree push failed, trying force push...
    git push origin `git subtree split --prefix frontend/build main`:gh-pages --force
)

echo.
echo ===============================================
echo ✅ Frontend deployed successfully!
echo.
echo 🌐 Your website: https://reystev527.github.io/mql5-marketplace
echo.
echo ⏭️  Next Steps:
echo 1. Deploy backend to Railway/Render (see BACKEND-DEPLOYMENT.md)
echo 2. Update frontend with backend URL using: update-production.bat [URL]
echo 3. Enable GitHub Pages in repository settings
echo ===============================================
pause
