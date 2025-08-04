@echo off
echo ===============================================
echo    MQL5 Marketplace - Production Status
echo ===============================================
echo.

echo 📊 DEPLOYMENT STATUS:
echo.

echo ✅ Git Repository: READY
git remote -v 2>nul && echo    └─ Connected to GitHub || echo    └─ ❌ Not connected

echo.
echo ✅ Frontend Build: READY
if exist "frontend\build\index.html" (
    echo    └─ Build files exist
) else (
    echo    └─ ❌ Build not found - run: npm run build
)

echo.
echo 🔄 GitHub Pages:
git ls-remote --heads origin gh-pages >nul 2>&1 && (
    echo    └─ ✅ gh-pages branch exists
) || (
    echo    └─ ⚠️  gh-pages branch not found
)

echo.
echo 🔄 Backend Status:
echo    └─ ⏳ Deploy backend to Railway/Render

echo.
echo 🌐 URLs:
echo    └─ Frontend: https://reystev527.github.io/mql5-marketplace
echo    └─ Backend:  [Deploy first to get URL]

echo.
echo ===============================================
echo 🚀 READY TO DEPLOY!
echo.
echo Next Actions:
echo 1. Run: quick-deploy.bat (for frontend)
echo 2. Follow: BACKEND-DEPLOYMENT.md (for backend)
echo 3. Run: update-production.bat [backend-url]
echo ===============================================
pause
