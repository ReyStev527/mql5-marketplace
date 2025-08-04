require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');

/**
 * MQL5 Marketplace Admin Utilities
 * Production utilities for marketplace administration
 */

class MarketplaceAdmin {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.adminToken = null;
  }

  /**
   * Login as admin
   */
  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/auth/login`, {
        email,
        password
      });

      this.adminToken = response.data.token;
      const decoded = jwt.decode(this.adminToken);
      
      if (decoded.role !== 'admin') {
        throw new Error('User is not an admin');
      }

      console.log(`✅ Admin logged in: ${decoded.email}`);
      return this.adminToken;
    } catch (error) {
      console.error('❌ Admin login failed:', error.message);
      throw error;
    }
  }

  /**
   * Create admin user
   */
  async createAdmin(email, password, name = 'System Admin') {
    try {
      const response = await axios.post(`${this.baseUrl}/api/auth/register`, {
        email,
        password,
        name,
        role: 'admin'
      });

      console.log(`✅ Admin user created: ${email}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        console.log(`ℹ️  Admin user already exists: ${email}`);
        return null;
      }
      throw error;
    }
  }

  /**
   * Get all products
   */
  async getProducts() {
    this.ensureAuthenticated();
    
    const response = await axios.get(`${this.baseUrl}/api/admin/products`, {
      headers: { 'Authorization': `Bearer ${this.adminToken}` }
    });

    return response.data.products;
  }

  /**
   * Get system statistics
   */
  async getStats() {
    try {
      this.ensureAuthenticated();
      
      const products = await this.getProducts();
      const publicProducts = await axios.get(`${this.baseUrl}/api/products`);
      
      return {
        totalProducts: products.length,
        publicProducts: publicProducts.data.products.length,
        compilingProducts: products.filter(p => p.status === 'compiling').length,
        activeProducts: products.filter(p => p.status === 'active').length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Failed to get stats:', error.message);
      throw error;
    }
  }

  /**
   * Verify token and decode
   */
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return {
        valid: true,
        decoded,
        isAdmin: decoded.role === 'admin'
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  ensureAuthenticated() {
    if (!this.adminToken) {
      throw new Error('Not authenticated. Please login first.');
    }
  }

  /**
   * Test all admin functions
   */
  async runAdminTest() {
    try {
      console.log('🔧 Running Admin System Test\n');

      // Create admin if needed
      await this.createAdmin('admin@mql5marketplace.com', 'admin123');
      
      // Login
      await this.login('admin@mql5marketplace.com', 'admin123');
      
      // Get stats
      const stats = await this.getStats();
      console.log('📊 System Statistics:');
      console.log(`   Total Products: ${stats.totalProducts}`);
      console.log(`   Public Products: ${stats.publicProducts}`);
      console.log(`   Compiling: ${stats.compilingProducts}`);
      console.log(`   Active: ${stats.activeProducts}`);
      
      // Verify token
      const tokenVerification = this.verifyToken(this.adminToken);
      console.log(`🎟️  Token Status: ${tokenVerification.valid ? '✅ Valid' : '❌ Invalid'}`);
      
      console.log('\n✅ Admin test completed successfully!');
      return { success: true, stats };
      
    } catch (error) {
      console.error('❌ Admin test failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = MarketplaceAdmin;

// If run directly, execute admin test
if (require.main === module) {
  const admin = new MarketplaceAdmin();
  admin.runAdminTest();
}
