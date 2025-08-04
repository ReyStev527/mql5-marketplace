require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

async function testTelegramConfig() {
  console.log('\n🤖 Testing Telegram Configuration...');
  
  // Check environment variables
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN is not set');
    return;
  }
  if (!process.env.TELEGRAM_ADMIN_CHAT_ID) {
    console.error('❌ TELEGRAM_ADMIN_CHAT_ID is not set');
    return;
  }

  try {
    // Initialize bot
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
    
    // Test getMe to verify token
    console.log('Testing bot token...');
    const me = await bot.getMe();
    console.log('✅ Bot token is valid');
    console.log(`Bot Info: @${me.username} (${me.first_name})`);

    // Test webhook info
    console.log('\nChecking webhook configuration...');
    try {
      const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getWebhookInfo`);
      const webhookInfo = await response.json();
      console.log('✅ Webhook info retrieved successfully');
      console.log('Current webhook URL:', webhookInfo.result?.url || 'Not set');
    } catch (error) {
      console.log('⚠️ Could not check webhook info:', error.message);
    }

    // Test sending message to admin
    console.log('\nTesting message to admin...');
    const adminId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    const testMessage = await bot.sendMessage(adminId, '🔍 Test message from diagnostic tool');
    console.log('✅ Message sent to admin successfully');

  } catch (error) {
    console.error('\n❌ Error during Telegram test:', error.message);
    if (error.code === 'ETELEGRAM') {
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Verify your bot token by visiting:');
      console.log(`   https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`);
      console.log('2. Make sure you have started a chat with your bot');
      console.log('3. Verify the admin chat ID by sending /my_id to your bot');
    }
  }
}

testTelegramConfig().catch(console.error);
