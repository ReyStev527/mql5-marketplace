const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const googleSheets = require('../services/googleSheets');
const compiler = require('../services/compiler');
const telegram = require('../services/telegram');

const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.EA_STORAGE_PATH);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}_${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) === '.mq5') {
      cb(null, true);
    } else {
      cb(new Error('Only .mq5 files are allowed'));
    }
  }
});

// Upload and create new EA product
router.post('/upload-ea', authenticateToken, requireAdmin, upload.single('ea_file'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'EA file is required'
      });
    }

    const filePath = req.file.path;
    const productId = uuidv4();

    // Create product in database
    const productData = {
      id: productId,
      name,
      description,
      price: parseFloat(price),
      file_path: filePath,
      admin_id: req.user.id,
      status: 'compiling'
    };

    await googleSheets.createProduct(productData);

    // Start compilation process
    compiler.compileEA(filePath, productId)
      .then(async (result) => {
        // Update product with compiled path
        const sheet = googleSheets.doc.sheetsByTitle['Products'];
        const rows = await sheet.getRows();
        const productRow = rows.find(row => row.get('id') === productId);
        
        if (productRow) {
          productRow.set('compiled_path', result.compiledPath);
          productRow.set('status', 'active');
          await productRow.save();
        }

        console.log(`✅ Product ${productId} compiled and activated`);
      })
      .catch(async (error) => {
        // Update product status to failed
        const sheet = googleSheets.doc.sheetsByTitle['Products'];
        const rows = await sheet.getRows();
        const productRow = rows.find(row => row.get('id') === productId);
        
        if (productRow) {
          productRow.set('status', 'failed');
          await productRow.save();
        }

        console.error(`❌ Product ${productId} compilation failed:`, error);
      });

    res.json({
      success: true,
      message: 'EA uploaded successfully and compilation started',
      productId
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all products for admin
router.get('/products', authenticateToken, requireAdmin, async (req, res) => {
  try {
    console.log('🛍️ Admin products request from user:', req.user?.email);
    const products = await googleSheets.getAllProducts();
    console.log('📊 Products fetched:', products.length);
    console.log('📊 First product sample:', products[0]);
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('❌ Error fetching admin products:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all users for admin
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const sheet = googleSheets.doc.sheetsByTitle['Users'];
    if (!sheet) {
      return res.json({
        success: true,
        data: []
      });
    }

    const rows = await sheet.getRows();
    const users = rows.map(row => ({
      id: row.get('id'),
      email: row.get('email'),
      role: row.get('role'),
      telegram_id: row.get('telegram_id'),
      status: row.get('status'),
      created_at: row.get('created_at')
    }));

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update product
router.put('/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, status } = req.body;

    const sheet = googleSheets.doc.sheetsByTitle['Products'];
    if (!sheet) {
      return res.status(404).json({
        success: false,
        message: 'Products sheet not found'
      });
    }

    const rows = await sheet.getRows();
    const productRow = rows.find(row => row.get('id') === id);

    if (!productRow) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product fields
    if (name) productRow.set('name', name);
    if (description) productRow.set('description', description);
    if (price) productRow.set('price', price.toString());
    if (status) productRow.set('status', status);

    await productRow.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: {
        id: productRow.get('id'),
        name: productRow.get('name'),
        description: productRow.get('description'),
        price: productRow.get('price'),
        status: productRow.get('status')
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get dashboard stats
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Get stats from Google Sheets
    const productsSheet = googleSheets.doc.sheetsByTitle['Products'];
    const usersSheet = googleSheets.doc.sheetsByTitle['Users'];
    const ordersSheet = googleSheets.doc.sheetsByTitle['Orders'];

    let totalUsers = 0;
    let totalProducts = 0;
    let activeProducts = 0;
    let totalSales = 0;
    let pendingOrders = 0;

    if (usersSheet) {
      const userRows = await usersSheet.getRows();
      totalUsers = userRows.length;
    }

    if (productsSheet) {
      const productRows = await productsSheet.getRows();
      totalProducts = productRows.length;
      activeProducts = productRows.filter(row => row.get('status') === 'active').length;
    }

    if (ordersSheet) {
      const orderRows = await ordersSheet.getRows();
      pendingOrders = orderRows.filter(row => row.get('status') === 'pending').length;
      
      // Calculate total sales
      orderRows.forEach(row => {
        const amount = parseFloat(row.get('amount') || 0);
        if (row.get('status') === 'completed') {
          totalSales += amount;
        }
      });
    }

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        activeProducts,
        totalSales,
        pendingOrders,
        monthlyGrowth: 15.5 // Mock value - would need historical data
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all orders for admin
router.get('/orders', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const sheet = googleSheets.doc.sheetsByTitle['Orders'];
    if (!sheet) {
      return res.json({
        success: true,
        data: []
      });
    }

    const rows = await sheet.getRows();
    const orders = rows.map(row => ({
      id: row.get('id'),
      user_id: row.get('user_id'),
      product_id: row.get('product_id'),
      amount: parseFloat(row.get('amount') || 0),
      status: row.get('status'),
      created_at: row.get('created_at'),
      updated_at: row.get('updated_at')
    }));

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete product
router.delete('/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const sheet = googleSheets.doc.sheetsByTitle['Products'];
    if (!sheet) {
      return res.status(404).json({
        success: false,
        message: 'Products sheet not found'
      });
    }

    const rows = await sheet.getRows();
    const productRow = rows.find(row => row.get('id') === id);

    if (!productRow) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await productRow.delete();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
