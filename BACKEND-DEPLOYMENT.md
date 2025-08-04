# 🚀 Backend Deployment Guide - Step by Step

## 📋 **PILIHAN PLATFORM DEPLOYMENT**

### **Option A: Railway (RECOMMENDED - Gratis & Mudah)**

#### **Step 1: Setup Railway Account**
1. Go to [railway.app](https://railway.app)
2. Click **"Login"** → **"Login with GitHub"**
3. Authorize Railway to access GitHub account
4. Dashboard Railway akan terbuka

#### **Step 2: Deploy Project**
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Pilih repository: **`mql5-marketplace`**
4. Railway akan scan repository
5. Click **"Deploy Now"**

#### **Step 3: Configure Deployment**
1. Setelah deployment dimulai, click **"View Logs"**
2. Click **"Settings"** tab
3. **Root Directory:** Set ke `backend`
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. Click **"Save"**

#### **Step 4: Add Environment Variables**
1. Go to **"Variables"** tab
2. Click **"+ New Variable"** dan tambahkan:

```env
NODE_ENV=production
PORT=3000
GOOGLE_SERVICE_ACCOUNT_EMAIL=mql5-ea-marketplace@mql5-ea-marketplace.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDeUVsFAP2SJGRj\nojl6aFIu+49zbd2O6UXzrFrnpF33yjP0jzL1/z2g0xr99pXO+AVyHMxdkXw2XsuE\n1h8VE6kDwvrT2/lzTPGnvy683haVOuhBfKaQAB+dLPxYGaja2EAPJHDXAQ+8QeFT\nOclf2HsgVgESGnWz9UFxB7viypxSjntz0N5UJELgUTqV3WqpfJLBYZbiZ0oHD9gt\nPWQG917yJ3kBGp3CnrR2GidLb9GdvGrOI963DwJo5TTRUQlRBGKn2b9zNY6j6mlT\n2bFIUj1iJeqlIC3p5OJcxv91jW3/y3ZAi/Zm3pwly5O++btlvigFlHbjSxQJGdeD\n5oNxqKvPAgMBAAECggEAA8b7FmstY8HFiOHVOyyxlMXGaq4nsQlqnFjF1KC4zgB8\nAIA8W+yhxe1ATKdXZURWh1lQ6ZgStbPHnnKq5YdHfF5gN6BJrTlV88UuTJwzYwa0\nsoQlKlYuM1Pz16Vb9pftArTaS/TjKQ4vf2QAdWXutZ5wdzfG3y9gFMUOXqyVmlt0\nRRU54Hwvl335RnYen1mWJcrMzdbfaVplbr1WfDo2IDNKw354VjhfrZyyX7KjS4/8\nN6vTpwEX3E9fNJ3/Rcsnsm2VEai3mpHqTskt6+V4INqpY0Cs7y0tC9HrAFedCsH5\ndL0InQ2ObxcwJ4f99wVbEbsnKdWtFcdrugPStK96wQKBgQD5i9XbGTkqnqamiFzE\n1wKL++UaeSBM7CbmY1vVS7CE+O8Cv57tvpqjoyAltldlJs9zzb/yr1xpoNZk1WNY\n/v7AGSdrr+aSI4MHyGD2zxLnibSRAEllO9OnbwLKvjM0KsxAxRRTOVIv2vZhKlos\neacWm18P2FTkM/0dsRy6ypUDjwKBgQDkET/g7PdDF870+RCqFRntKjJvKNzxya62\ncRNHymfDANOKptFdx9jd5zyunFWx9wiaqI5hUiFxQotNg98AB+TgJyzArsf4pGEz\noePuh6RCHTuckPAH0rZAVR4GcgJttJOQXG60hBGoCLT0VzRsUYUOotRKpv1VFmdx\npdSJ4uyzwQKBgQDj9dXaXGRYhq1+G7uDJVbyQZ28XUIggunWNJXDd209S5orTJkG\nXcQuD+piCPw1Lwr7osziCUfGRmMTocsrlWVqXpAgU4OxpDcieO37CJcgZC9K9pQV\nol1q6oIGa1GjKiWEVYSHsileBgxkHqhZUJhOkoh4lQqXnNZwtUalbEJMCQKBgELD\nbfC5TdTdNl9uPducW7+at7LkwnEhejy8M0mzzdY++q4/EVEjvK+RDqmK6Gc1itZD\ne5KvyUxvj3n8nZ5TsUORFD+/qph1/mJwBNqB6KrWBepaX3nazDFe+XAnleBpmT0M\nYfgEJWsMSXSxxo3i+1GChyTnZ4euDFAvnF1VCbfBAoGBALIpVgHcUV60fv2pemfb\nQuMJD9qDO/lmHINg0TCGrqRdhXv2su7g8qGwxWONtr7JH6GbNLSbSv3tJhB3lxXd\nq/Ux1NLNby1ei5WIYHnWyFlBdM+2YUK9yJiVbHQ94LwcOKAztjlbnseKUDTPSeyV\nafdP47yTb4ED3FyPxCYqi0tq\n-----END PRIVATE KEY-----"
SPREADSHEET_ID=1_1A1zGCMAHW8iBdTJd5weKiGmb6NC05yUlTF8BNfPr4
MIDTRANS_SERVER_KEY=Mid-server-khvB9In2tWTcWcycp3CoxwID
MIDTRANS_CLIENT_KEY=Mid-client-bqNzFKqUU9N7fjxX
MIDTRANS_IS_PRODUCTION=true
MIDTRANS_MOCK_MODE=true
TELEGRAM_BOT_TOKEN=8251461200:AAHai8sF26gDAsAgRBVqfYryJ4emDPGb5Ag
TELEGRAM_ADMIN_CHAT_ID=6397614714
JWT_SECRET=mql5_marketplace_jwt_secret_key_2024_secure_randomkey_for_production_use
JWT_EXPIRES_IN=7d
MQL5_COMPILER_PATH=/usr/bin/mql5
EA_STORAGE_PATH=./uploads/ea_files
COMPILED_EA_PATH=./uploads/compiled
FRONTEND_URL=https://reystev527.github.io/mql5-marketplace
BACKEND_URL=https://mql5-marketplace-production.up.railway.app
```

#### **Step 5: Get Backend URL**
1. Go to **"Settings"** → **"Domains"**
2. Copy URL yang diberikan Railway (contoh: `https://mql5-marketplace-production.up.railway.app`)
3. Save URL ini untuk update frontend

---

### **Option B: Render (Alternative Gratis)**

#### **Step 1: Setup Render Account**
1. Go to [render.com](https://render.com)
2. **"Get Started for Free"** → **"GitHub"**
3. Authorize Render access ke GitHub

#### **Step 2: Create Web Service**
1. Click **"New +"** → **"Web Service"**
2. Connect repository: **`mql5-marketplace`**
3. Configure:
   - **Name:** `mql5-marketplace-api`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

#### **Step 3: Add Environment Variables**
Same environment variables seperti Railway di atas

---

## 🔧 **UPDATE FRONTEND SETELAH BACKEND DEPLOY**

Setelah backend berhasil deploy dan dapat URL-nya:

### **Step 1: Update Frontend Environment**
```powershell
# Jalankan script update dengan backend URL Anda
update-production.bat https://your-backend-url.railway.app
```

### **Step 2: Manual Update (Alternative)**
```powershell
cd frontend
# Edit .env.production dengan backend URL yang benar
npm run build
cd ..
# Deploy ulang ke GitHub Pages dengan script deploy.bat
```

---

## ✅ **VERIFIKASI DEPLOYMENT**

### **Test Backend:**
```bash
# Test health endpoint
curl https://your-backend-url/health

# Test API endpoint
curl https://your-backend-url/api/products
```

### **Test Frontend:**
- Go to: `https://reystev527.github.io/mql5-marketplace`
- Check browser console untuk error
- Test login/register functionality
- Test product catalog

---

## 🎯 **HASIL AKHIR**

Setelah selesai:
- **Frontend:** `https://reystev527.github.io/mql5-marketplace`
- **Backend:** `https://your-app.railway.app`
- **Database:** Google Sheets (sudah configured)
- **Payment:** Midtrans (sudah configured)
- **Bot:** Telegram (sudah configured)

**✅ Ready untuk menerima customer dan menjual EA!** 🚀
