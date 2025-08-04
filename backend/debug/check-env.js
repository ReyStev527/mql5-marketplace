const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

console.log('🔍 Environment Variables Check');
console.log('==============================');

// Required environment variables
const requiredEnvVars = [
    'JWT_SECRET',
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'SPREADSHEET_ID', // This is the actual variable name used
    'MIDTRANS_SERVER_KEY',
    'MIDTRANS_CLIENT_KEY',
    'TELEGRAM_BOT_TOKEN'
];

// Check .env file existence
const envPath = path.join(__dirname, '..', '.env');
console.log(`📁 .env file path: ${envPath}`);
console.log(`📄 .env file exists: ${fs.existsSync(envPath) ? '✅ YES' : '❌ NO'}`);

if (fs.existsSync(envPath)) {
    console.log('\n📋 .env file contents (masked):');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            const maskedValue = value.length > 10 ? value.substring(0, 8) + '...' : '***';
            console.log(`   ${key}=${maskedValue}`);
        }
    });
}

console.log('\n🔐 Environment Variables Status:');
requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅ SET' : '❌ MISSING';
    const length = value ? `(${value.length} chars)` : '';
    console.log(`   ${varName}: ${status} ${length}`);
});

console.log('\n🌐 System Environment:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`   PORT: ${process.env.PORT || '3000 (default)'}`);
console.log(`   Node Version: ${process.version}`);
console.log(`   Platform: ${process.platform}`);

console.log('\n📊 Summary:');
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length === 0) {
    console.log('✅ All required environment variables are set!');
} else {
    console.log(`❌ Missing ${missingVars.length} required variables:`);
    missingVars.forEach(varName => console.log(`   - ${varName}`));
}
