const express = require('express');
const telegram = require('../services/telegram');

const router = express.Router();

// Middleware to add CORS headers for all telegram routes
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Get bot status
router.get('/status', async (req, res) => {
  try {
    const me = await telegram.bot.getMe();
    res.json({
      success: true,
      bot: {
        id: me.id,
        name: me.first_name,
        username: me.username,
        is_bot: me.is_bot
      },
      message: 'Bot is active and ready'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Webhook endpoint for Telegram bot
router.post('/webhook', async (req, res) => {
  try {
    const update = req.body;
    
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      
      // Handle different commands
      if (text === '/start') {
        await telegram.sendMessage(chatId, `
🚀 *Welcome to MQL5 EA Marketplace!*

I'm your bot for receiving EA files after purchase.

📝 *Commands:*
• /start - Show this welcome message
• /help - Get help
• /status - Check your account status

💳 To purchase an EA, visit our website and complete your order. You'll receive your EA file directly here!
        `);
      } else if (text === '/help') {
        await telegram.sendMessage(chatId, `
🆘 *Help & Support*

📞 *Contact Support:*
• Email: support@mql5marketplace.com
• Telegram: @mql5support

🔧 *Common Issues:*
• EA not received after payment? Check your Telegram ID is correct
• Installation problems? Follow the instructions sent with your EA
• License key issues? Contact support with your order ID

💡 *Installation Guide:*
1. Download the .ex5 file sent to you
2. Copy it to: MetaTrader 5/MQL5/Experts/
3. Restart MetaTrader 5
4. Find your EA in the Navigator panel
        `);
      } else if (text === '/status') {
        await telegram.sendMessage(chatId, `
📊 *Your Account Status*

🆔 Telegram ID: \`${chatId}\`
✅ Bot Status: Active

To check your orders and licenses, please visit our website dashboard.
        `);
      } else {
        await telegram.sendMessage(chatId, `
❓ Unknown command. Use /help to see available commands.
        `);
      }
    }
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Telegram webhook error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Send test message (for admin use)
router.post('/send-test', async (req, res) => {
  try {
    const { telegram_id, message } = req.body;
    
    if (!telegram_id || !message) {
      return res.status(400).json({
        success: false,
        message: 'telegram_id and message are required'
      });
    }
    
    await telegram.sendMessage(telegram_id, message);
    
    res.json({
      success: true,
      message: 'Test message sent successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Send message to user (missing route)
router.post('/send-message', async (req, res) => {
  try {
    const { chatId, message } = req.body;
    
    if (!chatId || !message) {
      return res.status(400).json({
        success: false,
        message: 'chatId and message are required'
      });
    }
    
    await telegram.sendMessage(chatId, message);
    
    res.json({
      success: true,
      message: 'Message sent successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Send file to user
router.post('/send-file', async (req, res) => {
  try {
    const { telegram_id, file_path, caption } = req.body;
    
    if (!telegram_id || !file_path) {
      return res.status(400).json({
        success: false,
        message: 'telegram_id and file_path are required'
      });
    }
    
    const result = await telegram.sendFileToUser(telegram_id, file_path, caption);
    
    res.json({
      success: true,
      message: 'File sent successfully',
      data: result
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get webhook status
router.get('/webhook', async (req, res) => {
  try {
    const webhookInfo = await telegram.bot.getWebhookInfo();
    
    res.json({
      success: true,
      webhook: {
        url: webhookInfo.url,
        has_custom_certificate: webhookInfo.has_custom_certificate,
        pending_update_count: webhookInfo.pending_update_count,
        last_error_date: webhookInfo.last_error_date,
        last_error_message: webhookInfo.last_error_message,
        max_connections: webhookInfo.max_connections,
        allowed_updates: webhookInfo.allowed_updates
      },
      message: 'Webhook status retrieved successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
