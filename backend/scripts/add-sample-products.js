require('dotenv').config();
const googleSheets = require('../services/googleSheets');

async function addSampleProducts() {
  console.log('🚀 Adding Sample Products to Google Sheets...');
  
  // Wait for Google Sheets to initialize
  console.log('⏳ Waiting for Google Sheets to initialize...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Check if connection is ready
  if (!googleSheets.doc) {
    console.log('❌ Google Sheets not connected. Trying to reinitialize...');
    await googleSheets.init();
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  if (!googleSheets.doc) {
    console.log('❌ Google Sheets connection failed. Exiting...');
    return;
  }
  
  console.log('✅ Google Sheets connected successfully')
  
  const sampleProducts = [
    {
      id: 'ea001',
      name: 'Scalping Master EA',
      description: 'Advanced scalping strategy for EURUSD with high win rate and low drawdown',
      price: 99000,
      file_path: '/uploads/ea_files/scalping-master.mq5',
      compiled_path: '/uploads/compiled/scalping-master.ex5',
      status: 'active',
      admin_id: 'admin@mql5marketplace.com'
    },
    {
      id: 'ea002',
      name: 'Trend Following Pro',
      description: 'Multi-timeframe trend following system with intelligent risk management',
      price: 149000,
      file_path: '/uploads/ea_files/trend-following-pro.mq5',
      compiled_path: '/uploads/compiled/trend-following-pro.ex5',
      status: 'active',
      admin_id: 'admin@mql5marketplace.com'
    },
    {
      id: 'ea003',
      name: 'Grid Recovery EA',
      description: 'Safe grid trading with advanced recovery mechanisms and stop loss protection',
      price: 199000,
      file_path: '/uploads/ea_files/grid-recovery.mq5',
      compiled_path: '/uploads/compiled/grid-recovery.ex5',
      status: 'active',
      admin_id: 'admin@mql5marketplace.com'
    },
    {
      id: 'ea004',
      name: 'News Trading Bot',
      description: 'Automated news trading with economic calendar integration and fast execution',
      price: 179000,
      file_path: '/uploads/ea_files/news-trading-bot.mq5',
      compiled_path: '/uploads/compiled/news-trading-bot.ex5',
      status: 'active',
      admin_id: 'admin@mql5marketplace.com'
    },
    {
      id: 'ea005',
      name: 'AI Pattern EA',
      description: 'Machine learning pattern recognition for forex trading with adaptive algorithms',
      price: 299000,
      file_path: '/uploads/ea_files/ai-pattern-ea.mq5',
      compiled_path: '/uploads/compiled/ai-pattern-ea.ex5',
      status: 'active',
      admin_id: 'admin@mql5marketplace.com'
    },
    {
      id: 'ea006',
      name: 'Martingale Safe',
      description: 'Conservative martingale strategy with strict risk control and backtested results',
      price: 129000,
      file_path: '/uploads/ea_files/martingale-safe.mq5',
      compiled_path: '/uploads/compiled/martingale-safe.ex5',
      status: 'active',
      admin_id: 'admin@mql5marketplace.com'
    }
  ];

  try {
    for (const product of sampleProducts) {
      try {
        console.log(`➕ Adding product: ${product.name}`);
        await googleSheets.createProduct(product);
        console.log(`✅ Added: ${product.name}`);
      } catch (error) {
        console.log(`⚠️ Skipping ${product.name}: ${error.message}`);
      }
    }
    
    console.log('🎉 Sample products added successfully!');
    
    // Test getting all products
    console.log('🔍 Testing getAllProducts...');
    const products = await googleSheets.getAllProducts();
    console.log(`📊 Found ${products.length} products in database`);
    
    products.forEach(product => {
      console.log(`  - ${product.name} (${product.price}) - Status: ${product.status}`);
    });
    
  } catch (error) {
    console.error('❌ Error adding sample products:', error);
  }
}

// Run the script
addSampleProducts();
