# MQL5 Expert Advisor Marketplace

A complete marketplace platform for buying and selling MetaTrader 5 Expert Advisors with automated compilation, payment processing, and delivery via Telegram bot.

## 🚀 Features

### Backend Features
- **Product Management**: Upload, review, and manage Expert Advisors
- **Payment Integration**: Secure payments via Midtrans gateway  
- **Automated Compilation**: Python-based MQL5 EA compilation
- **Telegram Bot Delivery**: Instant file delivery via @ladangpertanianbot
- **Google Sheets Database**: Real-time data storage and management
- **Admin Panel**: Web-based and CLI administration tools
- **Production Utilities**: Health monitoring, stats, and notifications

### Frontend Features
- **Modern React UI**: Material-UI components with custom theming
- **Responsive Design**: Mobile-friendly interface
- **Product Catalog**: Browse and filter Expert Advisors
- **User Dashboard**: Purchase history and downloads
- **Admin Dashboard**: Complete marketplace management
- **Payment Success**: Beautiful confirmation pages

## 🛠 Technology Stack

### Backend
- **Node.js** with Express.js framework
- **Google Sheets API** for database
- **Midtrans** payment gateway
- **Telegram Bot API** for file delivery
- **Python** for MQL5 compilation
- **Multer** for file uploads
- **CORS** enabled for cross-origin requests

### Frontend
- **React 18** with hooks
- **Material-UI v5** for components
- **React Router** for navigation
- **Emotion** for styling
- **Responsive design** principles

## 📂 Project Structure

```
mql5-marketplace/
├── backend/
│   ├── server.js              # Main server
│   ├── production.js          # Production CLI tools
│   ├── marketplace.js         # Management utilities
│   ├── admin-panel.html       # Web admin interface
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Auth and other middleware
│   ├── routes/               # API endpoints
│   ├── services/             # Business logic
│   ├── python/               # MQL5 compilation scripts
│   └── uploads/              # File storage
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Main pages
│   │   ├── services/        # API services
│   │   └── utils/           # Utilities
│   └── public/              # Static assets
└── docs/                    # Documentation
```

## 🔧 Setup Instructions

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   Create `.env` file with:
   ```env
   PORT=3000
   GOOGLE_SHEETS_CREDENTIALS=path/to/credentials.json
   SHEET_ID=your_google_sheet_id
   MIDTRANS_SERVER_KEY=your_midtrans_key
   MIDTRANS_CLIENT_KEY=your_midtrans_client_key
   TELEGRAM_BOT_TOKEN=your_bot_token
   ```

3. **Start Server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

## 🎯 Usage

### For Customers
1. Browse Expert Advisors at `/products`
2. Purchase with secure payment
3. Receive files via Telegram bot
4. Access downloads in `/dashboard`

### For Admins
1. Access admin panel at `/admin`
2. Manage products, users, and orders
3. Use CLI tools for monitoring:
   ```bash
   node production.js --health
   node production.js --stats
   ```

## 🔗 API Endpoints

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Payments
- `POST /api/payments/create` - Create payment
- `POST /api/payments/callback` - Payment webhook
- `GET /api/payments/status/:id` - Check payment status

### Users
- `GET /api/users` - List users (admin only)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user

## 🤖 Telegram Bot

The Telegram bot (@ladangpertanianbot) handles:
- File delivery after purchase
- Installation instructions
- Customer support
- Order notifications

## 💳 Payment Integration

Integrated with Midtrans for secure payments supporting:
- Bank Transfer
- Virtual Account
- E-Wallet (OVO, DANA, GoPay)
- Credit/Debit Cards

## 🔐 Security Features

- Input validation and sanitization
- File type verification
- Secure file uploads
- CORS protection
- Environment variable configuration
- API rate limiting ready

## 📊 Admin Tools

### Web Admin Panel
Access at `http://localhost:3000/admin-panel.html` for:
- Product management
- User management  
- Order tracking
- System settings

### CLI Tools
```bash
# Health check
node production.js --health

# View statistics
node production.js --stats

# Send notifications
node production.js --notify "message"

# Database operations
node marketplace.js
```

## 🚀 Production Deployment

1. **Environment Setup**
   - Configure production environment variables
   - Set up Google Sheets service account
   - Configure Midtrans production keys
   - Set up Telegram bot webhook

2. **Database Setup**
   - Create Google Sheets with proper headers
   - Configure service account permissions
   - Test API connections

3. **Server Deployment**
   ```bash
   npm run build  # Build frontend
   npm start      # Start production server
   ```

## 📈 Monitoring

Monitor your marketplace with built-in tools:
- Health check endpoints
- Error logging
- Performance metrics
- Payment tracking
- User analytics

## 🔧 Development

### Adding New Features
1. Backend: Add routes in `/routes`, logic in `/services`
2. Frontend: Add components in `/components`, pages in `/pages`
3. Update API documentation
4. Test with sample data

### Testing
- Use sample data for development
- Test payment flows with Midtrans sandbox
- Verify Telegram bot integration
- Check file upload/download

## 📞 Support

For support and questions:
- Telegram: @ladangpertanianbot
- Email: support@mql5marketplace.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material-UI for beautiful React components
- Midtrans for payment processing
- Google Sheets for database solution
- Telegram for bot platform
- React community for excellent documentation

---

**Note**: This is a complete, production-ready marketplace platform. All components are functional and ready for deployment with proper environment configuration.
