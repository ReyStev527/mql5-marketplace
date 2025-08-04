# 🚀 Quick Start Guide - Fix Login Error

## ❌ Problem
Network error when trying to login: `TypeError: NetworkError when attempting to fetch resource`

## ✅ Solution Steps

### 1. Start Backend Server

**Option A: Manual Start**
```bash
# Open new terminal/command prompt
cd "c:\Users\KOMPI MARKAS\New folder (3)\mql5-marketplace\backend"
node server.js
```

**Option B: Double-click start-backend.bat**
- Navigate to project root folder
- Double-click `start-backend.bat` file

### 2. Verify Backend is Running

Open browser and visit: http://localhost:3000/api/health

You should see: `{"status": "Server is running", "timestamp": "..."}`

### 3. Test Login

1. Open frontend: http://localhost:3000
2. Click "Login" button
3. Click "Admin Login" for quick login
4. Or manually enter:
   - Email: admin@mql5marketplace.com  
   - Password: admin123

### 4. Troubleshooting

**If backend won't start:**
```bash
cd backend
npm install
node server.js
```

**If still getting network error:**
- Check if port 3000 is blocked by firewall
- Try changing port in backend/server.js to 5000
- Update frontend API URL accordingly

**Check ports in use:**
```bash
netstat -ano | findstr ":3000"
```

### 5. Expected Output

**Backend Console:**
```
🚀 MQL5 Marketplace Server
==============================
✅ Server running on port 3000
✅ CORS configured for frontend
✅ API endpoints available at http://localhost:3000/api
✅ Admin panel at http://localhost:3000/admin-panel.html
```

**Frontend Login:**
- Should open login dialog
- Quick login buttons work
- No network errors
- Successful authentication

## 📋 Quick Checklist

- [ ] Backend server running on port 3000
- [ ] Frontend running on http://localhost:3000  
- [ ] No port conflicts
- [ ] CORS configured properly
- [ ] API URL matches server port

## 🎯 Test Commands

```bash
# Test API connectivity
curl http://localhost:3000/api/health

# Test login endpoint
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@mql5marketplace.com\",\"password\":\"admin123\"}"
```

Success response should include JWT token and user data.

---

**If you continue having issues, the most likely cause is that the backend server is not running on port 3000.**
