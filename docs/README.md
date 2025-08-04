# MQL5 EA Marketplace - Documentation

## Overview
A comprehensive marketplace for selling MQL5 Expert Advisors with automated compilation, payment processing, and delivery.

## Features
- ✅ EA Upload & Compilation
- ✅ Payment Processing (Midtrans)
- ✅ Automated Delivery via Telegram
- ✅ License Management
- ✅ Google Sheets Database
- ✅ Admin Panel
- ✅ User Dashboard

## Setup Instructions

### 1. Environment Setup
Copy `.env.example` to `.env` and configure:
- Google Sheets API credentials
- Midtrans payment keys
- Telegram bot token
- JWT secret
- MQL5 compiler path

### 2. Google Sheets Setup
1. Create a Google Spreadsheet
2. Create service account credentials
3. Share spreadsheet with service account email
4. Update `SPREADSHEET_ID` in `.env`

### 3. Midtrans Setup
1. Register at Midtrans
2. Get server key and client key
3. Configure webhook URL: `your-domain.com/api/payments/notification`

### 4. Telegram Bot Setup
1. Create bot via @BotFather
2. Get bot token
3. Set webhook: `your-domain.com/api/telegram/webhook`

### 5. MetaTrader Setup
Install MetaTrader 5 and update `MQL5_COMPILER_PATH` in `.env`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Payments
- `POST /api/payments/create-transaction` - Create payment
- `POST /api/payments/notification` - Midtrans webhook

### Admin
- `POST /api/admin/upload-ea` - Upload EA file
- `GET /api/admin/products` - Get all products (admin)

### User
- `GET /api/user/dashboard` - User dashboard
- `GET /api/user/products` - Available products

## Database Schema (Google Sheets)

### Users Sheet
- id, email, password, role, telegram_id, created_at, status

### Products Sheet
- id, name, description, price, file_path, compiled_path, status, created_at, admin_id

### Orders Sheet
- id, user_id, product_id, amount, status, payment_id, license_key, created_at, completed_at

### Licenses Sheet
- id, user_id, product_id, license_key, status, expires_at, created_at, activations

## Development

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start
```

## Production Deployment

1. Set up SSL certificate
2. Configure production environment variables
3. Set Midtrans to production mode
4. Update webhook URLs
5. Deploy to your hosting platform

## Support
For support and questions, contact the development team.
