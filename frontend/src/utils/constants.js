// frontend/src/utils/constants.js

/**
 * Application configuration constants
 */
export const APP_CONFIG = {
  NAME: 'MQL5 Marketplace',
  VERSION: '1.0.0',
  DESCRIPTION: 'Professional Expert Advisors for MetaTrader 5',
  COMPANY: 'MQL5 Trading Solutions',
  SUPPORT_EMAIL: 'support@mql5marketplace.com',
  SUPPORT_PHONE: '+62812345678',
  TELEGRAM_BOT: '@ladangpertanianbot'
};

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  UPLOADS_URL: process.env.REACT_APP_UPLOADS_URL || 'http://localhost:5000/uploads',
  
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout'
  },
  
  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
    UPLOAD: '/products/upload',
    DOWNLOAD: '/products/:id/download'
  },
  
  // Payments
  PAYMENTS: {
    CREATE: '/payments/create-transaction',
    STATUS: '/payments/status/:id',
    CALLBACK: '/payments/callback',
    HISTORY: '/payments/my-transactions'
  },
  
  // Admin
  ADMIN: {
    STATS: '/admin/stats',
    PRODUCTS: '/admin/products',
    USERS: '/admin/users',
    ORDERS: '/admin/orders'
  }
};

/**
 * Product categories
 */
export const PRODUCT_CATEGORIES = [
  { value: 'scalping', label: 'Scalping' },
  { value: 'trend-following', label: 'Trend Following' },
  { value: 'grid-trading', label: 'Grid Trading' },
  { value: 'news-trading', label: 'News Trading' },
  { value: 'martingale', label: 'Martingale' },
  { value: 'ai-trading', label: 'AI Trading' },
  { value: 'arbitrage', label: 'Arbitrage' },
  { value: 'hedging', label: 'Hedging' },
  { value: 'breakout', label: 'Breakout' },
  { value: 'swing-trading', label: 'Swing Trading' }
];

/**
 * Product status options
 */
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  REVIEW: 'review',
  REJECTED: 'rejected'
};

/**
 * Order/Transaction status
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

/**
 * User roles
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
};

/**
 * Payment methods
 */
export const PAYMENT_METHODS = [
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'virtual_account', label: 'Virtual Account' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'gopay', label: 'GoPay' },
  { value: 'ovo', label: 'OVO' },
  { value: 'dana', label: 'DANA' },
  { value: 'shopeepay', label: 'ShopeePay' }
];

/**
 * File upload constraints
 */
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 10,
  ALLOWED_TYPES: {
    EA_FILES: ['.mq5', '.ex5'],
    IMAGES: ['.jpg', '.jpeg', '.png', '.gif'],
    DOCUMENTS: ['.pdf', '.doc', '.docx', '.txt']
  },
  MIME_TYPES: {
    EA_FILES: ['application/octet-stream', 'text/plain'],
    IMAGES: ['image/jpeg', 'image/png', 'image/gif'],
    DOCUMENTS: ['application/pdf', 'application/msword', 'text/plain']
  }
};

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  LIMITS: [6, 12, 24, 48],
  MAX_LIMIT: 100
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  CART: 'cart',
  RECENT_SEARCHES: 'recent_searches'
};

/**
 * Toast notification types
 */
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

/**
 * Theme configuration
 */
export const THEME_CONFIG = {
  BREAKPOINTS: {
    XS: 0,
    SM: 600,
    MD: 960,
    LG: 1280,
    XL: 1920
  },
  COLORS: {
    PRIMARY: '#1976d2',
    SECONDARY: '#dc004e',
    SUCCESS: '#4caf50',
    WARNING: '#ff9800',
    ERROR: '#f44336',
    INFO: '#2196f3'
  }
};

/**
 * Currency configuration
 */
export const CURRENCY = {
  CODE: 'IDR',
  SYMBOL: 'Rp',
  LOCALE: 'id-ID',
  MIN_AMOUNT: 1000,
  MAX_AMOUNT: 100000000
};

/**
 * Date and time formats
 */
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  WITH_TIME: 'dd/MM/yyyy HH:mm',
  TIME_ONLY: 'HH:mm',
  ISO: 'yyyy-MM-dd'
};

/**
 * Regular expressions
 */
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size is too large.',
  INVALID_FILE_TYPE: 'Invalid file type.',
  UPLOAD_FAILED: 'File upload failed. Please try again.'
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  LOGOUT: 'Logged out successfully.',
  REGISTER: 'Registration successful!',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  PRODUCT_CREATED: 'Product created successfully.',
  PRODUCT_UPDATED: 'Product updated successfully.',
  PRODUCT_DELETED: 'Product deleted successfully.',
  PAYMENT_SUCCESS: 'Payment completed successfully.',
  FILE_UPLOADED: 'File uploaded successfully.',
  EMAIL_SENT: 'Email sent successfully.'
};

/**
 * Routes configuration
 */
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  PROFILE: '/profile',
  PAYMENT_SUCCESS: '/payment/success',
  PAYMENT_FAILED: '/payment/failed',
  NOT_FOUND: '/404'
};

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  TELEGRAM: 'https://t.me/ladangpertanianbot',
  WHATSAPP: 'https://wa.me/62812345678',
  EMAIL: 'mailto:support@mql5marketplace.com',
  WEBSITE: 'https://mql5marketplace.com'
};

/**
 * Feature flags
 */
export const FEATURES = {
  DARK_MODE: true,
  NOTIFICATIONS: true,
  CHAT_SUPPORT: true,
  REVIEWS: true,
  RATINGS: true,
  WISHLIST: true,
  COMPARE: true,
  RECOMMENDATIONS: true
};
