require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow file:// protocol
    if (origin.startsWith('file://')) return callback(null, true);
    
    // Allow localhost origins
    if (origin.includes('localhost')) return callback(null, true);
    
    // Allow specific origins
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:3001',
      'null' // For file:// protocol
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow all origins in development
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Security headers with Midtrans CSP support
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Changed from DENY to allow Midtrans frames
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Updated CSP headers for Midtrans compatibility
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' " +
    "https://app.midtrans.com " +
    "https://api.midtrans.com " +
    "https://snap-assets.al-pc-id-p.cdn.gtflabs.io " +
    "https://pay.google.com " +
    "https://js-agent.newrelic.com " +
    "https://bam.nr-data.net " +
    "https://www.google-analytics.com " +
    "https://www.googletagmanager.com; " +
    "style-src 'self' 'unsafe-inline' " +
    "https://app.midtrans.com " +
    "https://fonts.googleapis.com; " +
    "font-src 'self' " +
    "https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: " +
    "https://app.midtrans.com " +
    "https://*.midtrans.com; " +
    "connect-src 'self' " +
    "http://localhost:5000 " +
    "https://api.midtrans.com " +
    "https://app.midtrans.com " +
    "wss://localhost:3000 " +
    "ws://localhost:3000; " +
    "frame-src 'self' " +
    "https://app.midtrans.com " +
    "https://api.midtrans.com;"
  );
  
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Handle preflight OPTIONS requests explicitly
app.options('*', (req, res) => {
  console.log('🔀 Handling preflight OPTIONS request for:', req.path);
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Response time monitoring
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (duration > 1000) {
      console.warn(`⚠️  Slow request: ${req.method} ${req.path} took ${duration}ms`);
    }
  });
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api/', limiter);

// Stricter rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // increased for development testing
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes'
  }
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'MQL5 Marketplace API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      auth: '/api/auth',
      admin: '/api/admin',
      user: '/api/user',
      products: '/api/products',
      payments: '/api/payments',
      telegram: '/api/telegram'
    },
    status: {
      health: '/health',
      metrics: '/metrics'
    }
  });
});

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint (for monitoring)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Metrics endpoint for monitoring
app.get('/metrics', (req, res) => {
  const memUsage = process.memoryUsage();
  res.json({
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
      external: `${Math.round(memUsage.external / 1024 / 1024)} MB`
    },
    cpu: process.cpuUsage(),
    platform: process.platform,
    nodeVersion: process.version,
    pid: process.pid
  });
});

// Health check endpoint for CORS testing
app.get('/api/health', (req, res) => {
  console.log('🏥 Health check request received');
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    cors: 'enabled'
  });
});

// Test route to create demo user
app.post('/api/test/create-demo-user', async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const { v4: uuidv4 } = require('uuid');
    const googleSheets = require('./services/googleSheets');

    // Check if demo user already exists
    const existingUser = await googleSheets.getUserByEmail('demo@example.com');
    if (existingUser) {
      return res.json({
        success: true,
        message: 'Demo user already exists',
        credentials: {
          email: 'demo@example.com',
          password: 'demo123'
        }
      });
    }

    // Create demo user
    const hashedPassword = await bcrypt.hash('demo123', 10);
    const userData = {
      id: uuidv4(),
      email: 'demo@example.com',
      password: hashedPassword,
      role: 'user',
      telegram_id: '',
      status: 'active'
    };

    await googleSheets.createUser(userData);

    res.json({
      success: true,
      message: 'Demo user created successfully',
      credentials: {
        email: 'demo@example.com',
        password: 'demo123'
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// API Routes (MUST come before static file serving)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/user', require('./routes/user'));
app.use('/api/products', require('./routes/products'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/telegram', require('./routes/telegram'));

// Redirect root and any non-API routes to React frontend
app.get('/', (req, res) => {
  res.redirect('http://localhost:3000');
});

// Redirect old admin panel to new React admin
app.get('/admin-panel.html', (req, res) => {
  res.redirect('http://localhost:3000/admin');
});

// Handle any other non-API routes
app.get('*', (req, res) => {
  // If it's not an API call, redirect to React frontend
  if (!req.path.startsWith('/api/') && !req.path.startsWith('/uploads/')) {
    res.redirect('http://localhost:3000' + req.path);
  } else {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Access app at: http://localhost:${PORT}`);
});
