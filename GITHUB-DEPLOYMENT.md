# 🚀 GitHub Deployment Guide - MQL5 Marketplace

Panduan lengkap deploy web MQL5 Marketplace ke GitHub dengan langkah sederhana dan jelas.

## 📋 **Persiapan Sebelum Deploy**

### 1. Install Git (jika belum ada)
```bash
# Download dan install Git dari: https://git-scm.com/download/windows
# Atau install via chocolatey:
choco install git
```

### 2. Setup GitHub Account
- Buat account di [GitHub.com](https://github.com) jika belum punya
- Buat Personal Access Token untuk authentication

## 🗂️ **Struktur Deployment**

Kita akan deploy dengan 2 cara:

### **Option 1: Frontend di GitHub Pages + Backend di Railway/Render**
- ✅ **Gratis** untuk frontend
- ✅ **Mudah** setup dan maintenance
- ✅ **Reliable** hosting

### **Option 2: Full Stack di GitHub + Self-hosted Backend**
- ✅ **Full control** atas semua komponen
- ✅ **Custom domain** support
- ✅ **Advanced** configuration

---

## 🎯 **OPTION 1: Frontend GitHub Pages (RECOMMENDED)**

### Step 1: Buat Repository GitHub

```bash
# Navigate ke project directory
cd "c:\Users\KOMPI MARKAS\New folder (3)\mql5-marketplace"

# Initialize git repository
git init

# Add semua files
git add .

# Commit pertama
git commit -m "Initial commit: MQL5 Marketplace ready for production"
```

### Step 2: Push ke GitHub

```bash
# Tambahkan remote repository (ganti dengan repo URL Anda)
git remote add origin https://github.com/YOUR_USERNAME/mql5-marketplace.git

# Push ke GitHub
git push -u origin main
```

### Step 3: Setup GitHub Pages untuk Frontend

1. **Buat branch gh-pages untuk deployment:**
```bash
# Buat branch baru untuk GitHub Pages
git checkout -b gh-pages

# Copy frontend build ke root
cd frontend
npm run build
xcopy build\* ..\gh-pages-deploy\ /E /I

# Switch ke folder deployment
cd ..\gh-pages-deploy
git init
git add .
git commit -m "Deploy frontend to GitHub Pages"
git remote add origin https://github.com/YOUR_USERNAME/mql5-marketplace.git
git push -f origin gh-pages
```

2. **Enable GitHub Pages:**
   - Go to repository → Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Folder: / (root)
   - Save

### Step 4: Deploy Backend ke Railway

1. **Sign up di [Railway.app](https://railway.app)**
2. **Connect GitHub repository**
3. **Deploy backend:**
   - New Project → Deploy from GitHub
   - Select your repository
   - Root directory: `/backend`
   - Auto-deploy on push: Enable

### Step 5: Update Environment Variables

**Di Railway Dashboard:**
```env
NODE_ENV=production
PORT=3000
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_email
GOOGLE_PRIVATE_KEY=your_key
SPREADSHEET_ID=your_sheet_id
MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
MIDTRANS_IS_PRODUCTION=true
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_ADMIN_CHAT_ID=your_chat_id
JWT_SECRET=your_jwt_secret
MQL5_COMPILER_PATH=/usr/bin/mql5
EA_STORAGE_PATH=./uploads/ea_files
COMPILED_EA_PATH=./uploads/compiled
FRONTEND_URL=https://your-username.github.io/mql5-marketplace
BACKEND_URL=https://your-app.railway.app
```

---

## 🔧 **OPTION 2: GitHub Actions Automated Deployment**

### Step 1: Buat GitHub Actions Workflow

```yaml
# File: .github/workflows/deploy.yml
name: 'Deploy MQL5 Marketplace'

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
    - name: Install & Build
      run: |
        cd frontend
        npm ci
        npm run build
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/build
```

---

## 🎯 **LANGKAH MUDAH DEPLOYMENT (RECOMMENDED)**

### **Method 1: Automatic Script (Termudah)**

1. **Jalankan script deployment otomatis:**
```bash
# Windows (double-click atau run di Command Prompt)
deploy.bat

# Linux/Mac (run di Terminal)
chmod +x deploy.sh
./deploy.sh
```

Script ini akan otomatis:
- ✅ Setup Git repository
- ✅ Commit semua files
- ✅ Push ke GitHub
- ✅ Build frontend
- ✅ Deploy ke GitHub Pages

### **Method 2: Manual Step-by-Step**

#### Step 1: Setup Git Repository
```bash
# Navigate ke project directory
cd "c:\Users\KOMPI MARKAS\New folder (3)\mql5-marketplace"

# Initialize Git
git init

# Add semua files
git add .

# Commit pertama
git commit -m "Initial commit: MQL5 Marketplace Production Ready"
```

#### Step 2: Buat GitHub Repository
1. Go to [GitHub.com](https://github.com/new)
2. Repository name: `mql5-marketplace`
3. Description: `MQL5 Expert Advisor Marketplace - Production Ready`
4. Public atau Private (pilih sesuai kebutuhan)
5. **Jangan** initialize with README, .gitignore, atau license (karena sudah ada)
6. Click **Create repository**

#### Step 3: Connect ke GitHub
```bash
# Add remote origin (ganti YOUR_USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/YOUR_USERNAME/mql5-marketplace.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

#### Step 4: Build dan Deploy Frontend
```bash
# Build frontend
cd frontend
npm install
npm run build

# Deploy ke GitHub Pages
cd ..
git checkout --orphan gh-pages
git rm -rf .
cp -r frontend/build/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push -f origin gh-pages
git checkout main
```

#### Step 5: Enable GitHub Pages
1. Go to repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages**
4. Folder: **/ (root)**
5. Click **Save**

**Frontend akan tersedia di:** `https://YOUR_USERNAME.github.io/mql5-marketplace`

---

## 🖥️ **Backend Deployment Options**

### **Option A: Railway (Gratis + Mudah)**

1. **Sign up di [Railway.app](https://railway.app)**
2. **Connect GitHub:**
   - New Project → Deploy from GitHub
   - Select `mql5-marketplace` repository
   - Root directory: `/backend`
3. **Set Environment Variables:**
   ```env
   NODE_ENV=production
   PORT=3000
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_email
   GOOGLE_PRIVATE_KEY=your_private_key
   SPREADSHEET_ID=your_sheet_id
   MIDTRANS_SERVER_KEY=your_server_key
   MIDTRANS_CLIENT_KEY=your_client_key
   MIDTRANS_IS_PRODUCTION=true
   TELEGRAM_BOT_TOKEN=your_bot_token
   TELEGRAM_ADMIN_CHAT_ID=your_chat_id
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://YOUR_USERNAME.github.io/mql5-marketplace
   ```
4. **Deploy!** Railway akan auto-deploy setiap push ke GitHub

### **Option B: Render.com (Gratis + Reliable)**

1. **Sign up di [Render.com](https://render.com)**
2. **New Web Service:**
   - Connect GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Add Environment Variables** (sama seperti Railway)
4. **Deploy!**

### **Option C: Heroku (Berbayar tapi Populer)**

1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   git subtree push --prefix backend heroku main
   ```
3. **Set environment variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set GOOGLE_SERVICE_ACCOUNT_EMAIL=your_email
   # ... tambahkan semua env vars
   ```

---

## ⚙️ **Update Frontend untuk Production**

Setelah backend deploy, update environment di frontend:

### File: `frontend/.env.production`
```env
REACT_APP_API_URL=https://your-backend-url.railway.app/api
REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
REACT_APP_TELEGRAM_BOT=@ladangpertanianbot
REACT_APP_SUPPORT_EMAIL=support@yourcompany.com
REACT_APP_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

### Re-deploy Frontend:
```bash
cd frontend
npm run build
# Copy build files to gh-pages branch (gunakan script deploy.bat)
```

---

## 🔐 **GitHub Secrets Setup**

Untuk GitHub Actions, tambahkan secrets di:
**Repository → Settings → Secrets and variables → Actions**

Required secrets:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `SPREADSHEET_ID`
- `MIDTRANS_SERVER_KEY`
- `MIDTRANS_CLIENT_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_ADMIN_CHAT_ID`
- `JWT_SECRET`

---

## 🌐 **Custom Domain (Optional)**

### Untuk GitHub Pages:
1. Beli domain di provider (Namecheap, GoDaddy, dll)
2. Tambahkan file `CNAME:
   ```bash
   echo "yourdomain.com" > frontend/build/CNAME
   ```
3. Update DNS settings:
   ```
   Type: CNAME
   Host: www
   Value: YOUR_USERNAME.github.io
   
   Type: A
   Host: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

---

## ✅ **Deployment Checklist**

### Before Deployment:
- [ ] All test files removed
- [ ] Environment variables configured
- [ ] GitHub repository created
- [ ] Frontend builds successfully
- [ ] Backend starts without errors

### After Deployment:
- [ ] Frontend accessible via GitHub Pages
- [ ] Backend API responding
- [ ] Database connection working (Google Sheets)
- [ ] Payment gateway working (Midtrans)
- [ ] Telegram bot responding
- [ ] File uploads working
- [ ] CORS configured properly

### Testing:
- [ ] User registration/login
- [ ] Product catalog loading
- [ ] Payment flow working
- [ ] EA file delivery via Telegram
- [ ] Admin panel accessible

---

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **GitHub Pages not showing:**
   - Check Settings → Pages is enabled
   - Wait 5-10 minutes for deployment
   - Check gh-pages branch exists

2. **API CORS errors:**
   - Update backend CORS whitelist with frontend URL
   - Ensure https:// protocol in production

3. **Environment variables missing:**
   - Check Railway/Render dashboard
   - Verify all required variables set
   - Restart backend service

4. **Build fails:**
   - Check Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

---

## 🎉 **Selesai!**

**Frontend URL:** `https://YOUR_USERNAME.github.io/mql5-marketplace`
**Backend URL:** `https://your-app-name.railway.app`

Marketplace Anda sekarang live dan siap menerima customer! 🚀

### **Next Steps:**
1. Test semua fitur secara menyeluruh
2. Setup monitoring dan analytics
3. Configure custom domain jika diperlukan
4. Setup backup dan recovery procedures
5. Implement additional security measures

**Happy selling! 💰**
