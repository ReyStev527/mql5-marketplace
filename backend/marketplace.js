#!/usr/bin/env node

/**
 * MQL5 Marketplace Production Utilities
 * Command-line interface for marketplace management
 */

const MarketplaceTestUtils = require('./utils/marketplace-test');
const MarketplaceAdmin = require('./utils/marketplace-admin');

const utils = new MarketplaceTestUtils();
const admin = new MarketplaceAdmin();

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log('🚀 MQL5 Marketplace Production Utilities\n');

  try {
    switch (command) {
      case 'setup':
        console.log('🔧 Setting up marketplace...');
        await utils.runCompleteTest();
        break;

      case 'admin':
        console.log('👤 Admin login...');
        await admin.login('admin@mql5marketplace.com', 'admin123');
        const stats = await admin.getStats();
        console.log('\n📊 Marketplace Statistics:');
        console.log(JSON.stringify(stats, null, 2));
        break;

      case 'stats':
        console.log('📈 Getting marketplace statistics...');
        await admin.login('admin@mql5marketplace.com', 'admin123');
        const marketStats = await admin.getStats();
        console.log(JSON.stringify(marketStats, null, 2));
        break;

      case 'create-admin':
        const email = args[1] || 'admin@mql5marketplace.com';
        const password = args[2] || 'admin123';
        console.log(`👥 Creating admin user: ${email}`);
        await admin.createAdmin(email, password);
        console.log('✅ Admin user created successfully');
        break;

      case 'health':
        console.log('🏥 Checking system health...');
        await utils.testGoogleSheetsConnection();
        console.log('✅ System health check complete');
        break;

      case 'telegram':
        const telegramId = args[1];
        if (!telegramId) {
          console.log('Usage: node marketplace.js telegram <telegram_id>');
          console.log('Example: node marketplace.js telegram 123456789');
          return;
        }
        console.log('🤖 Testing Telegram Bot...');
        const TelegramTester = require('./telegram-test');
        const tester = new TelegramTester();
        await tester.runCompleteTest(telegramId);
        break;

      case 'help':
      default:
        console.log('📋 Available commands:');
        console.log('  setup         - Initialize marketplace with sample data');
        console.log('  admin         - Admin dashboard and statistics');
        console.log('  stats         - Show marketplace statistics');
        console.log('  create-admin  - Create new admin user');
        console.log('  health        - System health check');
        console.log('  telegram      - Test Telegram bot functionality');
        console.log('  help          - Show this help message');
        console.log('\nUsage: node marketplace.js <command> [args]');
        console.log('Example: node marketplace.js create-admin admin@example.com password123');
        console.log('Example: node marketplace.js telegram 123456789');
        break;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
