const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create admin token
const adminToken = jwt.sign(
  { 
    id: 'admin-123', 
    email: 'admin@mql5marketplace.com', 
    role: 'admin' 
  },
  process.env.JWT_SECRET || 'your-secret-key',
  { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
);

console.log('Admin token generated:');
console.log(adminToken);
console.log('\nSet this in your browser localStorage:');
console.log(`localStorage.setItem('token', '${adminToken}');`);
