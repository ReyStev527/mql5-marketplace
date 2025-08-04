# MQL5 Marketplace - Custom Copilot Instructions

## 📋 Project Context
Anda sedang bekerja pada **MQL5 Marketplace**, sebuah platform e-commerce untuk menjual Expert Advisors (EA) MetaTrader 5. Aplikasi ini menggunakan arsitektur full-stack dengan React frontend dan Node.js backend.

## 🏗️ Architecture Overview

### Backend (Node.js/Express)
- **Port**: 5000 (production), 3000 (development)
- **Database**: Google Sheets API
- **Authentication**: JWT tokens
- **Payment**: Midtrans integration
- **File Storage**: Local uploads directory
- **Bot Integration**: Telegram Bot API

### Frontend (React)
- **Port**: 3000
- **UI Framework**: Material-UI (MUI)
- **State Management**: React Context + useState/useEffect
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Animations**: Custom animations components

## 📁 Project Structure
```
mql5-marketplace/
├── backend/
│   ├── routes/           # API route handlers
│   ├── middleware/       # Authentication, validation
│   ├── services/         # Business logic
│   ├── utils/           # Helper functions
│   └── uploads/         # File storage
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/       # Route components
    │   ├── services/    # API calls
    │   ├── utils/       # Helper functions
    │   └── theme/       # MUI theme config
    └── public/
```

## 🔗 Route Architecture

### Backend API Routes (Base: `/api`)
```javascript
// Authentication
POST   /api/auth/login
POST   /api/auth/register
GET    /api/auth/me
POST   /api/auth/change-password

// Products
GET    /api/products
GET    /api/products/:id

// Admin (requires admin role)
POST   /api/admin/upload-ea
GET    /api/admin/products
GET    /api/admin/users
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id

// User Dashboard
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/orders
GET    /api/user/licenses
GET    /api/user/dashboard

// Payments
POST   /api/payments/create-transaction
POST   /api/payments/notification
GET    /api/payments/status/:orderId

// Telegram Bot
GET    /api/telegram/status
POST   /api/telegram/webhook
POST   /api/telegram/send-message
```

### Frontend Routes
```javascript
/                    # Home page
/products           # Product listing
/product/:id        # Product detail
/login              # User login
/register           # User registration
/dashboard          # User dashboard
/admin              # Admin panel
/payment/success    # Payment success
/payment/cancel     # Payment cancel
```

## 🎨 Component Architecture

### UI Components Location: `src/components/ui/`
```javascript
// Buttons
import Button from '../components/ui/Button';           // Default export
import { CustomButton } from '../components/ui/Button'; // Named export

// Animations
import { 
  FadeInUp, 
  FadeInLeft, 
  FadeInRight,
  AnimatedSlide,
  StaggeredContainer 
} from '../components/ui/Animations';

// Modals
import Modal, { ConfirmDialog } from '../components/ui/Modal';

// Forms
import LoadingSpinner from '../components/ui/LoadingSpinner';
```

### Layout Components Location: `src/components/layout/`
```javascript
import DashboardLayout from '../components/layout/DashboardLayout';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
```

### Common Components Location: `src/components/common/`
```javascript
import SEO from '../components/common/SEO';  // Default export
```

## 🔧 API Service Pattern
```javascript
// Location: src/services/api.js
import { apiService } from '../services/api';

// Usage examples:
const products = await apiService.get('/products');
const user = await apiService.post('/auth/login', { email, password });
const profile = await apiService.get('/user/profile');
```

## 🎯 Code Generation Rules

### 1. Automatic Route Integration
When generating new components or pages:
- **Automatically add routes** to `App.js`
- **Connect API endpoints** to backend routes
- **Import necessary components** from correct paths

### 2. Component Import Standards
```javascript
// Always use these import patterns:
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card } from '@mui/material';
import { FadeInUp, AnimatedSlide } from '../components/ui/Animations';
import Button from '../components/ui/Button';
import { apiService } from '../services/api';
```

### 3. API Integration Pattern
```javascript
// Always include error handling and loading states
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await apiService.get('/endpoint');
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 4. Authentication Integration
```javascript
// Always check auth state in protected components
const { user, isAuthenticated } = useAuth();

// Redirect patterns
if (!isAuthenticated) {
  return <Navigate to="/login" />;
}

if (user?.role !== 'admin') {
  return <Navigate to="/dashboard" />;
}
```

### 5. Theme Integration
```javascript
// Always use theme from context
import { theme } from '../theme';

// MUI styling patterns
const useStyles = {
  container: {
    background: theme.palette.background.gradient,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
  }
};
```

## 🚀 Backend Development Rules

### 1. Route Handler Pattern
```javascript
// Always include error handling and validation
app.post('/api/endpoint', authenticateToken, async (req, res) => {
  try {
    // Validation
    const { error } = validateInput(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    // Business logic
    const result = await serviceFunction(req.body);
    
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in endpoint:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

### 2. Middleware Integration
```javascript
// Always use appropriate middleware
const authenticateToken = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const upload = require('../middleware/upload');
```

### 3. Google Sheets Integration
```javascript
// Always use the established pattern
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
await doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
});
```

## 🔐 Security Standards

### 1. Always implement:
- JWT token validation
- Input sanitization
- Rate limiting for sensitive endpoints
- CORS configuration
- Security headers

### 2. Environment Variables
```javascript
// Always use environment variables for:
JWT_SECRET=
GOOGLE_SHEET_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
MIDTRANS_SERVER_KEY=
TELEGRAM_BOT_TOKEN=
```

## 📱 Mobile Responsiveness
```javascript
// Always include responsive design
sx={{
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  spacing: { xs: 2, md: 4 },
  padding: { xs: 2, md: 4 },
}}
```

## 🧪 Testing Integration
```javascript
// Always consider testing when generating:
describe('Component/Route', () => {
  test('should render correctly', () => {
    // Test implementation
  });
  
  test('should handle API calls', async () => {
    // API test implementation
  });
});
```

## 🎯 Performance Optimization
```javascript
// Always implement:
- React.memo() for expensive components
- useCallback() for event handlers
- useMemo() for computed values
- Lazy loading for routes
- Image optimization
```

## 🚨 Error Handling Standards
```javascript
// Frontend error boundaries
// Backend try-catch with proper logging
// User-friendly error messages
// Fallback UI components
```

## 📊 Monitoring Integration
```javascript
// Always include logging:
console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);

// Performance monitoring:
const start = Date.now();
// ... operation
const duration = Date.now() - start;
if (duration > 1000) console.warn(`Slow operation: ${duration}ms`);
```

---

## 🎯 Generation Instructions

When generating code for this project:

1. **Always connect to existing routes and APIs**
2. **Use established component patterns**
3. **Include proper error handling and loading states**
4. **Implement authentication checks where needed**
5. **Follow the established folder structure**
6. **Include responsive design**
7. **Add proper TypeScript types if requested**
8. **Connect to Google Sheets database pattern**
9. **Include Telegram bot integration if relevant**
10. **Follow Material-UI theming standards**

This ensures all generated code integrates seamlessly with the existing MQL5 Marketplace architecture.