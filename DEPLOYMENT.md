# MQL5 Marketplace Deployment Guide

This guide covers the complete deployment process for the MQL5 Expert Advisor Marketplace.

## 🚀 Production Deployment Checklist

### Prerequisites
- [ ] Node.js 18+ installed
- [ ] Google Cloud Service Account with Sheets API access
- [ ] Midtrans production account
- [ ] Telegram Bot token
- [ ] Domain name and SSL certificate
- [ ] Server with minimum 2GB RAM

## 📋 Backend Deployment

### 1. Environment Setup

Create production `.env` file in `backend/`:

```env
# Server Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database (Google Sheets)
GOOGLE_SHEETS_CREDENTIALS=./credentials/service-account.json
SHEET_ID=your_production_sheet_id

# Payment Gateway (Midtrans)
MIDTRANS_SERVER_KEY=your_production_server_key
MIDTRANS_CLIENT_KEY=your_production_client_key
MIDTRANS_IS_PRODUCTION=true

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_WEBHOOK_URL=https://yourdomain.com/api/telegram/webhook

# Security
JWT_SECRET=your_super_secure_jwt_secret_key
ENCRYPTION_KEY=your_encryption_key

# File Storage
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=.mq5,.ex5

# CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 2. Google Sheets Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project: "MQL5-Marketplace-Prod"
   - Enable Google Sheets API

2. **Service Account Setup**
   ```bash
   # Create service account
   gcloud iam service-accounts create mql5-marketplace \
     --display-name="MQL5 Marketplace Service Account"
   
   # Generate key
   gcloud iam service-accounts keys create credentials/service-account.json \
     --iam-account=mql5-marketplace@your-project.iam.gserviceaccount.com
   ```

3. **Google Sheet Configuration**
   - Create new Google Sheet
   - Share with service account email
   - Set up headers in sheets:
     - Products: id, name, author, price, description, file_path, status, created_at
     - Users: id, name, email, phone, created_at, status
     - Orders: id, user_id, product_id, amount, status, payment_id, created_at

### 3. Midtrans Configuration

1. **Production Account Setup**
   - Register at [Midtrans](https://midtrans.com)
   - Complete business verification
   - Get production server key and client key

2. **Webhook Configuration**
   ```bash
   # Set webhook URL in Midtrans dashboard
   Webhook URL: https://yourdomain.com/api/payments/callback
   ```

### 4. Telegram Bot Setup

1. **Bot Configuration**
   ```bash
   # Set webhook
   curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
        -H "Content-Type: application/json" \
        -d '{"url": "https://yourdomain.com/api/telegram/webhook"}'
   ```

2. **Bot Commands**
   ```
   /start - Start bot and get welcome message
   /help - Get help and support information
   /support - Contact customer support
   /downloads - View your purchased EAs
   ```

### 5. Server Deployment

#### Option A: PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Install dependencies
cd backend
npm install --production

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup
```

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'mql5-marketplace-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

#### Option B: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./uploads:/app/uploads
      - ./credentials:/app/credentials
    restart: unless-stopped
```

### 6. Nginx Configuration

```nginx
# /etc/nginx/sites-available/mql5-marketplace
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Frontend
    location / {
        root /var/www/mql5-marketplace/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    client_max_body_size 50M;
}
```

## 🎨 Frontend Deployment

### 1. Environment Setup

Create production `.env` file in `frontend/`:

```env
REACT_APP_API_URL=https://yourdomain.com/api
REACT_APP_BACKEND_URL=https://yourdomain.com
REACT_APP_TELEGRAM_BOT=@ladangpertanianbot
REACT_APP_SUPPORT_EMAIL=support@yourdomain.com
REACT_APP_SUPPORT_PHONE=+62812345678
REACT_APP_GOOGLE_ANALYTICS_ID=your_ga_id
REACT_APP_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

### 2. Build and Deploy

```bash
# Install dependencies
cd frontend
npm install

# Build for production
npm run build

# Deploy to server
rsync -avz build/ user@server:/var/www/mql5-marketplace/
```

### 3. CDN Setup (Optional)

```bash
# Upload to AWS S3 + CloudFront
aws s3 sync build/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## 🔧 Post-Deployment Tasks

### 1. Health Checks

```bash
# Test API endpoints
curl https://yourdomain.com/api/health
curl https://yourdomain.com/api/products

# Test frontend
curl https://yourdomain.com/

# Test Telegram webhook
curl -X POST https://yourdomain.com/api/telegram/webhook \
     -H "Content-Type: application/json" \
     -d '{"message": {"text": "/start", "chat": {"id": 123}}}'
```

### 2. Monitoring Setup

```bash
# Install monitoring tools
npm install -g @pm2/io

# Setup log rotation
pm2 install pm2-logrotate

# Configure monitoring
pm2 monitor your_pm2_secret_key
```

### 3. Backup Configuration

```bash
# Setup automated backups
crontab -e

# Add backup jobs
0 2 * * * /path/to/backup-script.sh
0 4 * * 0 /path/to/weekly-backup.sh
```

Create `backup-script.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mql5-marketplace"

# Backup uploads
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" /path/to/uploads

# Backup database (Google Sheets export)
node /path/to/export-sheets.js > "$BACKUP_DIR/database_$DATE.json"

# Clean old backups (keep 30 days)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
find $BACKUP_DIR -name "*.json" -mtime +30 -delete
```

## 🔒 Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] Environment variables secured
- [ ] File upload restrictions configured
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] Database access restricted
- [ ] Regular security updates applied
- [ ] Backup encryption enabled
- [ ] Webhook signatures verified
- [ ] API authentication implemented

## 📊 Performance Optimization

### 1. Backend Optimization

```javascript
// Enable compression
app.use(compression());

// Optimize headers
app.use(helmet());

// Cache static files
app.use(express.static('public', {
  maxAge: '1y',
  etag: false
}));
```

### 2. Frontend Optimization

```bash
# Analyze bundle size
npm run build -- --analyze

# Optimize images
npm install imagemin-cli -g
imagemin public/images/* --out-dir=public/images/optimized
```

### 3. Database Optimization

```javascript
// Implement caching
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Cache Google Sheets responses
const getCachedData = (key, fetcher) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
};
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   ```javascript
   // Check CORS configuration
   app.use(cors({
     origin: process.env.ALLOWED_ORIGINS.split(','),
     credentials: true
   }));
   ```

2. **File Upload Issues**
   ```javascript
   // Check file size limits
   app.use(express.json({ limit: '50mb' }));
   app.use(express.urlencoded({ limit: '50mb', extended: true }));
   ```

3. **Payment Webhook Issues**
   ```javascript
   // Verify Midtrans signature
   const crypto = require('crypto');
   const signature = crypto
     .createHash('sha512')
     .update(order_id + status_code + gross_amount + server_key)
     .digest('hex');
   ```

### Log Analysis

```bash
# View API logs
pm2 logs mql5-marketplace-api

# Search for errors
grep "ERROR" logs/combined.log | tail -100

# Monitor real-time
tail -f logs/combined.log | grep -E "(ERROR|WARN)"
```

## 📞 Support

If you encounter issues during deployment:

1. Check logs for specific error messages
2. Verify all environment variables are set correctly
3. Test each service independently
4. Contact support with detailed error logs

---

**Production Deployment Complete!** 🎉

Your MQL5 marketplace is now live and ready to serve customers worldwide.
