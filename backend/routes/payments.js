const express = require('express');
const { v4: uuidv4 } = require('uuid');
const midtrans = require('../services/midtrans');
const googleSheets = require('../services/googleSheets');
const telegram = require('../services/telegram');
const compiler = require('../services/compiler');

const router = express.Router();

// Create payment transaction
router.post('/create-transaction', async (req, res) => {
  try {
    console.log('💳 Payment creation started:', req.body);
    const { product_id, customer_email, customer_name, customer_phone } = req.body;
    
    // Validate required fields
    if (!product_id || !customer_email || !customer_name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: product_id, customer_email, customer_name'
      });
    }

    console.log('📋 Fetching product details for ID:', product_id);
    
    let product = null;
    
    try {
      // Check if Google Sheets service is initialized
      if (!googleSheets.doc) {
        console.log('⚠️ Google Sheets not initialized, attempting to reinitialize...');
        await googleSheets.init();
      }
      
      if (googleSheets.doc) {
        const products = await googleSheets.getAllProducts();
        product = products.find(p => p.id === product_id);
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
      
      product = sampleProducts.find(p => p.id === product_id);
      console.log(`🔍 Found product in sample data: ${product ? 'YES' : 'NO'}`);
    } else {
      console.log(`🔍 Found product in Google Sheets: ${product.name}`);
    }
    
    if (!product) {
      console.log('❌ Product not found:', product_id);
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log('✅ Product found:', product.name);
    const orderId = `ORDER-${uuidv4()}`;
    
    // Create order in database
    const orderData = {
      id: orderId,
      user_id: customer_email, // Using email as user identifier for simplicity
      product_id,
      amount: product.price,
      status: 'pending'
    };
    
    console.log('📝 Creating order in database:', orderId);
    await googleSheets.createOrder(orderData);

    // Create Midtrans transaction
    const transactionData = {
      order_id: orderId,
      amount: product.price,
      product_id,
      product_name: product.name,
      customer_email,
      customer_name,
      customer_phone: customer_phone || ''
    };

    console.log('💰 Creating Midtrans transaction...');
    const transaction = await midtrans.createTransaction(transactionData);
    console.log('✅ Midtrans transaction created:', transaction.token);

    // Notify admin (don't block the response if this fails)
    try {
      console.log('📱 Sending admin notification...');
      await telegram.notifyAdminNewOrder({
        ...transactionData,
        amount: product.price
      });
      console.log('✅ Admin notification sent');
    } catch (telegramError) {
      console.log('⚠️ Telegram notification failed:', telegramError.message);
      // Continue anyway - don't block payment for notification failure
    }

    // Set proper cookie headers for the response
    res.cookie('midtrans_transaction', transaction.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 3600000 // 1 hour
    });

    console.log('✅ Payment transaction created successfully');
    res.json({
      success: true,
      transaction_token: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: orderId
    });

  } catch (error) {
    console.error('💥 Payment creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment creation failed'
    });
  }
});

// Midtrans webhook handler
router.post('/notification', async (req, res) => {
  try {
    const notification = req.body;
    
    // Verify signature
    if (!midtrans.verifySignature(notification)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid signature'
      });
    }

    const { order_id, transaction_status, fraud_status } = notification;

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      if (fraud_status === 'accept' || !fraud_status) {
        // Payment successful - process order
        await processSuccessfulPayment(order_id, notification);
      }
    } else if (transaction_status === 'expire' || transaction_status === 'cancel') {
      // Payment failed
      await googleSheets.updateOrderStatus(order_id, 'failed');
    }

    res.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

async function processSuccessfulPayment(orderId, paymentData) {
  try {
    // Update order status
    await googleSheets.updateOrderStatus(orderId, 'completed', {
      payment_id: paymentData.transaction_id
    });

    // Generate license key
    const licenseKey = await compiler.generateLicenseKey(
      paymentData.customer_email || 'user',
      orderId
    );

    // Get order details
    const sheet = googleSheets.doc.sheetsByTitle['Orders'];
    const rows = await sheet.getRows();
    const order = rows.find(row => row.get('id') === orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    // Get product details
    const productsSheet = googleSheets.doc.sheetsByTitle['Products'];
    const productRows = await productsSheet.getRows();
    const product = productRows.find(row => row.get('id') === order.get('product_id'));

    if (!product || !product.get('compiled_path')) {
      throw new Error('Product or compiled file not found');
    }

    // Create license record
    await googleSheets.createLicense({
      id: uuidv4(),
      user_id: order.get('user_id'),
      product_id: order.get('product_id'),
      license_key: licenseKey,
      status: 'active'
    });

    // Get user's Telegram ID (you'll need to implement this)
    const userTelegramId = await getUserTelegramId(order.get('user_id'));

    if (userTelegramId) {
      // Send success notification
      await telegram.notifyUserPaymentSuccess(userTelegramId, {
        order_id: orderId,
        product_name: product.get('name')
      }, licenseKey);

      // Send compiled EA file
      const caption = `
🎯 *${product.get('name')}*
🔑 License Key: \`${licenseKey}\`

✅ Installation Instructions:
1. Copy the .ex5 file to your MetaTrader 5/MQL5/Experts folder
2. Restart MetaTrader 5
3. The EA will appear in your Expert Advisors list

💡 Support: Contact us if you need help!
      `;

      await telegram.sendFileToUser(
        userTelegramId,
        product.get('compiled_path'),
        caption
      );
    }

    console.log(`✅ Order ${orderId} processed successfully`);

  } catch (error) {
    console.error(`❌ Failed to process order ${orderId}:`, error);
  }
}

async function getUserTelegramId(userEmail) {
  try {
    const user = await googleSheets.getUserByEmail(userEmail);
    return user ? user.get('telegram_id') : null;
  } catch (error) {
    console.error('Failed to get user Telegram ID:', error);
    return null;
  }
}

// Check payment status
router.get('/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const sheet = googleSheets.doc.sheetsByTitle['Orders'];
    if (!sheet) {
      return res.status(404).json({
        success: false,
        message: 'Orders not found'
      });
    }

    const rows = await sheet.getRows();
    const order = rows.find(row => row.get('id') === orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order: {
        id: order.get('id'),
        product_id: order.get('product_id'),
        amount: order.get('amount'),
        status: order.get('status'),
        payment_id: order.get('payment_id'),
        license_key: order.get('license_key'),
        created_at: order.get('created_at'),
        completed_at: order.get('completed_at')
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
