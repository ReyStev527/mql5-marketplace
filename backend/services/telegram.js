const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

class TelegramService {
  constructor() {
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not configured');
    }
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
  }

  async setWebhook(url) {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        }
      );
      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error('Failed to set webhook:', error);
      return false;
    }
  }

  async sendFileToUser(telegramId, filePath, caption = '') {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error('File not found');
      }

      const options = {
        caption: caption || 'Your EA file is ready! 🚀',
        parse_mode: 'Markdown'
      };

      await this.bot.sendDocument(telegramId, filePath, options);
      return { success: true, message: 'File sent successfully' };
    } catch (error) {
      throw new Error(`Failed to send file: ${error.message}`);
    }
  }

  async sendMessage(telegramId, message, options = {}) {
    try {
      await this.bot.sendMessage(telegramId, message, {
        parse_mode: 'Markdown',
        ...options
      });
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  async notifyAdminNewOrder(orderData) {
    try {
      const message = `
🔔 *New Order Received!*

📋 Order ID: \`${orderData.order_id}\`
👤 Customer: ${orderData.customer_name}
📧 Email: ${orderData.customer_email}
🎯 Product: ${orderData.product_name}
💰 Amount: Rp ${orderData.amount.toLocaleString('id-ID')}
⏰ Time: ${new Date().toLocaleString('id-ID')}
      `;

      await this.sendMessage(process.env.TELEGRAM_ADMIN_CHAT_ID, message);
    } catch (error) {
      console.error('Failed to notify admin:', error);
    }
  }

  async notifyUserPaymentSuccess(telegramId, orderData, licenseKey) {
    try {
      const message = `
✅ *Payment Successful!*

🎉 Thank you for your purchase!

📋 Order ID: \`${orderData.order_id}\`
🎯 Product: ${orderData.product_name}
🔑 License Key: \`${licenseKey}\`

Your EA file will be sent to you shortly. Please wait for the compilation process to complete.

💬 If you have any questions, contact our support team.
      `;

      await this.sendMessage(telegramId, message);
    } catch (error) {
      console.error('Failed to notify user:', error);
    }
  }
}

module.exports = new TelegramService();
