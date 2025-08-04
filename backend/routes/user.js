const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const googleSheets = require('../services/googleSheets');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await googleSheets.getUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      profile: {
        id: user.get('id'),
        email: user.get('email'),
        role: user.get('role'),
        telegram_id: user.get('telegram_id'),
        status: user.get('status'),
        created_at: user.get('created_at')
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { telegram_id, fullName } = req.body;

    const user = await googleSheets.getUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user fields
    if (telegram_id !== undefined) user.set('telegram_id', telegram_id);
    if (fullName !== undefined) user.set('full_name', fullName);

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      profile: {
        id: user.get('id'),
        email: user.get('email'),
        role: user.get('role'),
        telegram_id: user.get('telegram_id'),
        full_name: user.get('full_name'),
        status: user.get('status'),
        created_at: user.get('created_at')
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user orders
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.email; // Using email as user identifier

    const sheet = googleSheets.doc.sheetsByTitle['Orders'];
    let userOrders = [];
    
    if (sheet) {
      const rows = await sheet.getRows();
      userOrders = rows
        .filter(row => row.get('user_id') === userId)
        .map(row => ({
          id: row.get('id'),
          product_id: row.get('product_id'),
          amount: row.get('amount'),
          status: row.get('status'),
          payment_id: row.get('payment_id'),
          license_key: row.get('license_key'),
          created_at: row.get('created_at'),
          completed_at: row.get('completed_at')
        }));
    }

    res.json({
      success: true,
      orders: userOrders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user licenses
router.get('/licenses', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.email; // Using email as user identifier

    const licensesSheet = googleSheets.doc.sheetsByTitle['Licenses'];
    let userLicenses = [];
    
    if (licensesSheet) {
      const licenseRows = await licensesSheet.getRows();
      userLicenses = licenseRows
        .filter(row => row.get('user_id') === userId)
        .map(row => ({
          id: row.get('id'),
          product_id: row.get('product_id'),
          license_key: row.get('license_key'),
          status: row.get('status'),
          expires_at: row.get('expires_at'),
          created_at: row.get('created_at'),
          activations: row.get('activations')
        }));
    }

    res.json({
      success: true,
      licenses: userLicenses
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.email; // Using email as user identifier

    // Get user's orders
    const sheet = googleSheets.doc.sheetsByTitle['Orders'];
    let userOrders = [];
    
    if (sheet) {
      const rows = await sheet.getRows();
      userOrders = rows
        .filter(row => row.get('user_id') === userId)
        .map(row => ({
          id: row.get('id'),
          product_id: row.get('product_id'),
          amount: row.get('amount'),
          status: row.get('status'),
          created_at: row.get('created_at'),
          license_key: row.get('license_key')
        }));
    }

    // Get user's licenses
    const licensesSheet = googleSheets.doc.sheetsByTitle['Licenses'];
    let userLicenses = [];
    
    if (licensesSheet) {
      const licenseRows = await licensesSheet.getRows();
      userLicenses = licenseRows
        .filter(row => row.get('user_id') === userId)
        .map(row => ({
          id: row.get('id'),
          product_id: row.get('product_id'),
          license_key: row.get('license_key'),
          status: row.get('status'),
          created_at: row.get('created_at'),
          expires_at: row.get('expires_at')
        }));
    }

    res.json({
      success: true,
      data: {
        orders: userOrders,
        licenses: userLicenses
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get available products for purchase
router.get('/products', async (req, res) => {
  try {
    const products = await googleSheets.getAllProducts();
    
    // Filter only active products for users
    const activeProducts = products.filter(product => product.status === 'active');

    res.json({
      success: true,
      products: activeProducts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
