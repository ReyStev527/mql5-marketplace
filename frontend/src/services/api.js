// frontend/src/services/api.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('🔧 API Configuration:', {
  API_URL,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  baseURL: API_URL
});

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
  withCredentials: true, // Enable cookies for Midtrans
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/user/profile'), // Changed from /auth/profile to /user/profile
  updateProfile: (userData) => api.put('/user/profile', userData), // Changed from /auth/profile to /user/profile
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
};

export const productsAPI = {
  getAll: (params = {}) => {
    console.log('🛒 Calling products API with params:', params);
    console.log('🔗 Full URL will be:', `${API_URL}/products`);
    return api.get('/products', { params });
  },
  getById: (id) => api.get(`/products/${id}`),
  getProduct: (id) => api.get(`/products/${id}`), // Alias for getById
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
  upload: (formData) => api.post('/products/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  download: (id) => api.get(`/products/${id}/download`, {
    responseType: 'blob'
  })
};

export const adminAPI = {
  uploadEA: (formData) => api.post('/admin/upload-ea', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getProducts: () => api.get('/admin/products'),
  getUsers: () => api.get('/admin/users'),
  getOrders: () => api.get('/admin/orders'),
  updateProductStatus: (id, status) => api.put(`/admin/products/${id}/status`, { status }),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, { status }),
  getStats: () => api.get('/admin/stats'),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`)
};

export const paymentAPI = {
  createTransaction: (data) => api.post('/payments/create-transaction', data),
  getTransactionStatus: (transactionId) => api.get(`/payments/status/${transactionId}`),
  handleCallback: (callbackData) => api.post('/payments/callback', callbackData),
  getUserTransactions: () => api.get('/payments/my-transactions'),
  
  // Enhanced payment creation with popup handling
  createPayment: async (paymentData) => {
    try {
      console.log('🔄 Creating payment with data:', paymentData);
      const response = await api.post('/payments/create-transaction', paymentData);
      
      if (response.data.success) {
        // Check if this is a mock payment (for development)
        if (response.data.redirect_url && response.data.redirect_url.includes('/payment/mock')) {
          // For mock payments, redirect directly instead of popup
          console.log('🎭 Mock payment detected, redirecting directly');
          window.location.href = response.data.redirect_url;
          return response.data;
        }
        
        // For real Midtrans payments, try popup first
        const paymentWindow = window.open(
          response.data.redirect_url,
          'midtrans_payment',
          'width=800,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no'
        );

        // Check if popup was blocked
        if (!paymentWindow || paymentWindow.closed) {
          console.log('⚠️ Popup blocked, redirecting directly');
          window.location.href = response.data.redirect_url;
          return response.data;
        }

        // Listen for payment completion
        return new Promise((resolve, reject) => {
          const checkPayment = setInterval(() => {
            try {
              if (paymentWindow && paymentWindow.closed) {
                clearInterval(checkPayment);
                // Check payment status after window closes
                resolve(response.data);
              }
            } catch (error) {
              console.log('⚠️ Error checking payment window, clearing interval');
              clearInterval(checkPayment);
              resolve(response.data);
            }
          }, 1000);

          // Timeout after 30 minutes
          setTimeout(() => {
            clearInterval(checkPayment);
            if (paymentWindow && !paymentWindow.closed) {
              paymentWindow.close();
            }
            reject(new Error('Payment timeout'));
          }, 30 * 60 * 1000);
        });
      } else {
        throw new Error(response.data.message || 'Payment creation failed');
      }
    } catch (error) {
      console.error('💥 Payment creation failed:', error);
      throw error;
    }
  }
};

export const userAPI = {
  getDashboard: () => api.get('/user/dashboard'),
  getPurchases: () => api.get('/user/orders'), // Changed from /users/purchases to /user/orders
  getOrders: () => api.get('/user/orders'), // Added alias for getPurchases
  updateProfile: (userData) => api.put('/user/profile'), // Changed from /users/profile to /user/profile
  changePassword: (passwordData) => api.put('/users/change-password', passwordData)
};

export const telegramAPI = {
  sendMessage: (chatId, message) => api.post('/telegram/send-message', { chatId, message }),
  sendFile: (chatId, fileUrl, caption) => api.post('/telegram/send-file', { 
    chatId, 
    fileUrl, 
    caption 
  }),
  getBotInfo: () => api.get('/telegram/bot-info')
};

// Utility functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      status,
      message: data.message || data.error || 'An error occurred',
      errors: data.errors || []
    };
  } else if (error.request) {
    // Network error
    return {
      status: 0,
      message: 'Network error. Please check your connection.',
      errors: []
    };
  } else {
    // Other error
    return {
      status: 0,
      message: error.message || 'An unexpected error occurred',
      errors: []
    };
  }
};

export default api;
