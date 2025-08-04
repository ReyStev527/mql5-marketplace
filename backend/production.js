#!/usr/bin/env node

/**
 * MQL5 EA Marketplace - Production Utilities
 * Command line tools for system management
 */

require('dotenv').config();
const { program } = require('commander');
const fs = require('fs');
const path = require('path');

// Import services
const telegramService = require('./services/telegram');
const { GoogleSpreadsheet } = require('google-spreadsheet');

class ProductionUtils {
  constructor() {
    this.doc = null;
  }

  async initGoogleSheets() {
    if (!this.doc) {
      this.doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
      const serviceAccountAuth = require('./services/googleSheets');
      await serviceAccountAuth.initializeAuth(this.doc);
      await this.doc.loadInfo();
    }
    return this.doc;
  }

  async checkSystemHealth() {
    console.log('🔍 Checking system health...\n');
    
    const checks = {
      'Environment Variables': this.checkEnvVars(),
      'Google Sheets': await this.checkGoogleSheets(),
      'Telegram Bot': await this.checkTelegramBot(),
      'File Directories': this.checkDirectories(),
      'Dependencies': this.checkDependencies()
    };

    let allPassed = true;
    
    for (const [check, result] of Object.entries(checks)) {
      const status = result.success ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${check}`);
      if (result.message) {
        console.log(`   ${result.message}`);
      }
      if (!result.success) allPassed = false;
    }

    console.log('\n' + '='.repeat(50));
    console.log(allPassed ? '🎉 ALL SYSTEMS OPERATIONAL' : '⚠️  ISSUES DETECTED');
    console.log('='.repeat(50));

    return allPassed;
  }

  checkEnvVars() {
    const required = [
      'TELEGRAM_BOT_TOKEN',
      'GOOGLE_SERVICE_ACCOUNT_EMAIL',
      'GOOGLE_PRIVATE_KEY',
      'SPREADSHEET_ID',
      'MIDTRANS_SERVER_KEY',
      'JWT_SECRET'
    ];

    const missing = required.filter(env => !process.env[env]);
    
    return {
      success: missing.length === 0,
      message: missing.length > 0 ? `Missing: ${missing.join(', ')}` : 'All environment variables present'
    };
  }

  async checkGoogleSheets() {
    try {
      await this.initGoogleSheets();
      const sheets = this.doc.sheetsByIndex;
      return {
        success: true,
        message: `Connected to spreadsheet with ${sheets.length} sheets`
      };
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${error.message}`
      };
    }
  }

  async checkTelegramBot() {
    try {
      const me = await telegramService.bot.getMe();
      return {
        success: true,
        message: `Bot active: @${me.username} (ID: ${me.id})`
      };
    } catch (error) {
      return {
        success: false,
        message: `Bot check failed: ${error.message}`
      };
    }
  }

  checkDirectories() {
    const requiredDirs = [
      './uploads',
      './uploads/ea_files',
      './uploads/compiled'
    ];

    const missing = requiredDirs.filter(dir => !fs.existsSync(dir));
    
    if (missing.length > 0) {
      // Create missing directories
      missing.forEach(dir => {
        fs.mkdirSync(dir, { recursive: true });
      });
    }

    return {
      success: true,
      message: missing.length > 0 ? `Created missing directories: ${missing.join(', ')}` : 'All directories exist'
    };
  }

  checkDependencies() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
      const nodeModules = fs.existsSync('./node_modules');
      
      return {
        success: nodeModules,
        message: nodeModules ? `Dependencies installed (${Object.keys(packageJson.dependencies).length} packages)` : 'Run npm install'
      };
    } catch (error) {
      return {
        success: false,
        message: `Error checking dependencies: ${error.message}`
      };
    }
  }

  async getSystemStats() {
    console.log('📊 System Statistics\n');
    
    try {
      await this.initGoogleSheets();
      
      // Get users sheet
      const usersSheet = this.doc.sheetsByTitle['Users'] || this.doc.sheetsByIndex[0];
      const ordersSheet = this.doc.sheetsByTitle['Orders'] || this.doc.sheetsByIndex[1];
      const productsSheet = this.doc.sheetsByTitle['Products'] || this.doc.sheetsByIndex[2];

      if (usersSheet) {
        const userRows = await usersSheet.getRows();
        console.log(`👥 Total Users: ${userRows.length}`);
      }

      if (ordersSheet) {
        const orderRows = await ordersSheet.getRows();
        const completedOrders = orderRows.filter(row => row.status === 'completed');
        console.log(`📦 Total Orders: ${orderRows.length}`);
        console.log(`✅ Completed Orders: ${completedOrders.length}`);
      }

      if (productsSheet) {
        const productRows = await productsSheet.getRows();
        console.log(`🎯 Total Products: ${productRows.length}`);
      }

      // Check uploaded files
      const eaFiles = fs.readdirSync('./uploads/ea_files').filter(f => f.endsWith('.mq5'));
      const compiledFiles = fs.readdirSync('./uploads/compiled').filter(f => f.endsWith('.ex5'));
      
      console.log(`📄 EA Files: ${eaFiles.length}`);
      console.log(`⚙️ Compiled Files: ${compiledFiles.length}`);

      console.log('\n🤖 Telegram Bot Status:');
      const me = await telegramService.bot.getMe();
      console.log(`   Name: ${me.first_name}`);
      console.log(`   Username: @${me.username}`);
      console.log(`   ID: ${me.id}`);

    } catch (error) {
      console.error('❌ Error getting statistics:', error.message);
    }
  }

  async sendTestNotification() {
    console.log('📱 Sending test notification...\n');
    
    try {
      const adminId = process.env.TELEGRAM_ADMIN_CHAT_ID;
      if (!adminId) {
        throw new Error('TELEGRAM_ADMIN_CHAT_ID not configured');
      }

      const message = `🔔 *System Test Notification*

⏰ Time: ${new Date().toLocaleString()}
🖥️ Server: Production Ready
📊 Status: All systems operational

This is a test notification from your MQL5 EA Marketplace system.`;

      await telegramService.sendMessage(adminId, message);
      console.log('✅ Test notification sent successfully!');
      
    } catch (error) {
      console.error('❌ Failed to send test notification:', error.message);
    }
  }

  async cleanupTempFiles() {
    console.log('🧹 Cleaning up temporary files...\n');
    
    const tempDirs = [
      './uploads/ea_files/temp',
      './uploads/compiled/temp'
    ];

    let cleaned = 0;
    
    for (const dir of tempDirs) {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          fs.unlinkSync(path.join(dir, file));
          cleaned++;
        }
      }
    }

    console.log(`✅ Cleaned ${cleaned} temporary files`);
  }

  showProductionInfo() {
    console.log(`
🚀 MQL5 EA Marketplace - Production System

📍 Current Directory: ${process.cwd()}
🌐 Environment: ${process.env.NODE_ENV || 'development'}
🏃 Node Version: ${process.version}

📡 Server Configuration:
   Port: ${process.env.PORT || 3001}
   Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}

🤖 Telegram Bot: ${process.env.TELEGRAM_BOT_TOKEN ? 'Configured' : 'Not configured'}
💳 Midtrans: ${process.env.MIDTRANS_SERVER_KEY ? 'Configured' : 'Not configured'}
📊 Google Sheets: ${process.env.SPREADSHEET_ID ? 'Configured' : 'Not configured'}

Available Commands:
  npm start           - Start production server
  npm run dev         - Start development server
  node production.js health    - System health check
  node production.js stats     - System statistics
  node production.js test      - Send test notification
  node production.js cleanup   - Clean temporary files
  node production.js info      - Show this information

🎯 System Status: PRODUCTION READY
`);
  }
}

// CLI Commands
program
  .name('production')
  .description('MQL5 EA Marketplace Production Utilities')
  .version('1.0.0');

program
  .command('health')
  .description('Check system health')
  .action(async () => {
    const utils = new ProductionUtils();
    await utils.checkSystemHealth();
  });

program
  .command('stats')
  .description('Show system statistics')
  .action(async () => {
    const utils = new ProductionUtils();
    await utils.getSystemStats();
  });

program
  .command('test')
  .description('Send test notification')
  .action(async () => {
    const utils = new ProductionUtils();
    await utils.sendTestNotification();
  });

program
  .command('cleanup')
  .description('Clean temporary files')
  .action(async () => {
    const utils = new ProductionUtils();
    await utils.cleanupTempFiles();
  });

program
  .command('info')
  .description('Show production information')
  .action(() => {
    const utils = new ProductionUtils();
    utils.showProductionInfo();
  });

// Default action
if (process.argv.length === 2) {
  const utils = new ProductionUtils();
  utils.showProductionInfo();
} else {
  program.parse();
}

module.exports = ProductionUtils;
