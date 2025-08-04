const googleSheets = require('../services/googleSheets');

// Load environment variables
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

async function testGoogleSheets() {
    console.log('📊 Google Sheets Connection Test');
    console.log('================================');
    
    try {
        console.log('🔌 Testing connection...');
        
        // Test basic connection by trying to access sheet info
        console.log('📋 Sheet info:');
        console.log(`   Sheet ID: ${process.env.SPREADSHEET_ID || 'NOT SET'}`);
        console.log(`   Service Account: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'NOT SET'}`);
        
        // Wait a moment for the service to initialize if needed
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Test sheets operations
        console.log('\n🧪 Testing sheet operations...');
        
        // Test 1: Check if service is initialized
        console.log('\n1. Testing Google Sheets initialization:');
        if (!googleSheets.doc) {
            console.log('   ⚠️  Google Sheets not yet initialized, attempting to reinitialize...');
            
            // Try to reinitialize
            await googleSheets.init();
            
            if (!googleSheets.doc) {
                throw new Error('Google Sheets service failed to initialize - check credentials and spreadsheet access');
            } else {
                console.log('   ✅ Google Sheets service reinitialized successfully');
            }
        } else {
            console.log('   ✅ Google Sheets service already initialized');
        }
        
        // Test 2: Get all products (this function exists)
        console.log('\n2. Testing getAllProducts():');
        const products = await googleSheets.getAllProducts();
        console.log(`   ✅ Found ${products.length} products`);
        if (products.length > 0) {
            console.log(`   📄 Sample product: ${JSON.stringify(products[0], null, 2)}`);
        }
        
        // Test 3: Test getUserByEmail (with test email)
        console.log('\n3. Testing getUserByEmail():');
        try {
            const testUser = await googleSheets.getUserByEmail('test@example.com');
            if (testUser) {
                console.log(`   ✅ Found test user: ${testUser.email}`);
            } else {
                console.log(`   ℹ️  No user found with email 'test@example.com' (expected)`);
            }
        } catch (error) {
            console.log(`   ⚠️  User lookup failed: ${error.message}`);
        }
        
        // Test 4: Test sheet access by checking document info
        console.log('\n4. Testing sheet access:');
        if (googleSheets.doc && googleSheets.doc.title) {
            console.log(`   ✅ Sheet accessible: "${googleSheets.doc.title}"`);
        } else {
            console.log(`   ⚠️  Sheet title not available`);
        }
        
        console.log('\n🎉 Google Sheets test completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   Products: ${products.length}`);
        console.log(`   Service Status: Initialized`);
        console.log(`   Connection: Working`);
        console.log(`   Authentication: Valid`);
        
    } catch (error) {
        console.error('❌ Google Sheets test failed:');
        console.error('Error:', error.message);
        if (error.stack) {
            console.error('Stack:', error.stack);
        }
        
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Check if GOOGLE_SHEET_ID is correct');
        console.log('2. Verify service account email and private key');
        console.log('3. Ensure the service account has access to the sheet');
        console.log('4. Check if sheet tabs exist: users, products, orders, licenses');
    }
}

testGoogleSheets();
