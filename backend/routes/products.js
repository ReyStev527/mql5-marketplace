const express = require('express');
const googleSheets = require('../services/googleSheets');

const router = express.Router();

// Get all products (public endpoint)
router.get('/', async (req, res) => {
  try {
    console.log('📋 GET /api/products - Fetching all products');
    
    let products = [];
    let fromSampleData = false;
    
    try {
      // Check if Google Sheets service is initialized
      if (!googleSheets.doc) {
        console.log('⚠️ Google Sheets not initialized, attempting to reinitialize...');
        await googleSheets.init();
      }
      
      if (googleSheets.doc) {
        products = await googleSheets.getAllProducts();
        console.log(`✅ Found ${products.length} products from Google Sheets`);
        
        // Filter valid products (those with actual IDs)
        products = products.filter(product => product.id && product.id.trim() !== '');
      }
    } catch (error) {
      console.log('⚠️ Google Sheets error:', error.message);
    }
    
    // If no valid products from Google Sheets, use sample data
    if (products.length === 0) {
      console.log('📦 Using sample products data');
      products = [
        {
          id: 'ea-scalping-master-001',
          name: 'Scalping Master EA',
          description: 'Advanced scalping strategy for EURUSD with high win rate and low drawdown',
          price: 99000,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: 'ea-trend-following-002',
          name: 'Trend Following Pro',
          description: 'Multi-timeframe trend following system with risk management',
          price: 149000,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: 'ea-grid-recovery-003',
          name: 'Grid Recovery EA',
          description: 'Safe grid trading with recovery mechanisms',
          price: 199000,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: 'ea-news-trading-004',
          name: 'News Trading Bot',
          description: 'Automated news trading with economic calendar integration',
          price: 179000,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: 'ea-ai-pattern-005',
          name: 'AI Pattern EA',
          description: 'Machine learning pattern recognition for forex trading',
          price: 299000,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: 'ea-martingale-safe-006',
          name: 'Martingale Safe',
          description: 'Conservative martingale strategy with strict risk control',
          price: 129000,
          status: 'active',
          created_at: new Date().toISOString()
        }
      ];
      fromSampleData = true;
    }
    
    // Filter only active products for public view
    const activeProducts = products
      .filter(product => product.status === 'active')
      .map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        created_at: product.created_at
      }));

    console.log(`📤 Returning ${activeProducts.length} active products ${fromSampleData ? '(from sample data)' : '(from Google Sheets)'}`);
    res.json({
      success: true,
      products: activeProducts
    });

  } catch (error) {
    console.error('❌ Error in GET /api/products:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single product details
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(`🔍 GET /api/products/${productId} - Fetching product details`);
    
    let product = null;
    
    try {
      // Check if Google Sheets service is initialized
      if (!googleSheets.doc) {
        console.log('⚠️ Google Sheets not initialized, attempting to reinitialize...');
        await googleSheets.init();
      }
      
      if (googleSheets.doc) {
        const products = await googleSheets.getAllProducts();
        product = products.find(p => p.id === productId && p.status === 'active');
      }
    } catch (error) {
      console.log('⚠️ Google Sheets error:', error.message);
    }
    
    // If not found in Google Sheets, check sample data
    if (!product) {
      const sampleProducts = [
        {
          id: 'ea-scalping-master-001',
          name: 'Scalping Master EA',
          description: 'Advanced scalping strategy for EURUSD with high win rate and low drawdown',
          price: 99000,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: 'ea-trend-following-002',
          name: 'Trend Following Pro',
          description: 'Multi-timeframe trend following system with risk management',
          price: 149000,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: 'ea-grid-recovery-003',
          name: 'Grid Recovery EA',
          description: 'Safe grid trading with recovery mechanisms',
          price: 199000,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: 'ea-news-trading-004',
          name: 'News Trading Bot',
          description: 'Automated news trading with economic calendar integration',
          price: 179000,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: 'ea-ai-pattern-005',
          name: 'AI Pattern EA',
          description: 'Machine learning pattern recognition for forex trading',
          price: 299000,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: 'ea-martingale-safe-006',
          name: 'Martingale Safe',
          description: 'Conservative martingale strategy with strict risk control',
          price: 129000,
          status: 'active',
          created_at: new Date().toISOString()
        }
      ];
      
      product = sampleProducts.find(p => p.id === productId && p.status === 'active');
      console.log(`🔍 Found product in sample data: ${product ? 'YES' : 'NO'}`);
    } else {
      console.log(`🔍 Found product in Google Sheets: ${product.name}`);
    }
    
    if (!product) {
      console.log(`❌ Product not found: ${productId}`);
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log(`✅ Found product: ${product.name} - ${product.price}`);
    res.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        created_at: product.created_at
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
