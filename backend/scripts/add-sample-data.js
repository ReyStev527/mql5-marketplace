require('dotenv').config();
const googleSheets = require('../services/googleSheets');

async function addSampleData() {
    console.log('📊 Adding Sample Users and Orders...');
    
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ Google Sheets connected successfully');
        
        // Sample Users
        const sampleUsers = [
            {
                name: 'John Trader',
                email: 'john@example.com',
                role: 'user',
                telegram_id: '123456789'
            },
            {
                name: 'Sarah Williams',
                email: 'sarah@example.com',
                role: 'user',
                telegram_id: '987654321'
            },
            {
                name: 'Admin User',
                email: 'admin@mql5marketplace.com',
                role: 'admin',
                telegram_id: '555666777'
            }
        ];
        
        console.log('\n👥 Adding sample users...');
        for (const user of sampleUsers) {
            console.log(`➕ Adding user: ${user.name}`);
            await googleSheets.createUser(user);
            console.log(`✅ Added: ${user.name}`);
        }
        
        // Get all users and products for orders
        const users = await googleSheets.getAllUsers();
        const products = await googleSheets.getAllProducts();
        
        console.log(`\n🛒 Creating sample orders...`);
        console.log(`Found ${users.length} users and ${products.length} products`);
        
        // Sample Orders
        const sampleOrders = [
            {
                user_id: users[0]?.id || 'user1',
                product_id: products[0]?.id || 'prod1',
                amount: products[0]?.price || '99000',
                status: 'completed',
                payment_id: 'payment_001',
                license_key: 'LIC-' + Math.random().toString(36).substr(2, 9).toUpperCase()
            },
            {
                user_id: users[1]?.id || 'user2',
                product_id: products[1]?.id || 'prod2',
                amount: products[1]?.price || '149000',
                status: 'completed',
                payment_id: 'payment_002',
                license_key: 'LIC-' + Math.random().toString(36).substr(2, 9).toUpperCase()
            },
            {
                user_id: users[0]?.id || 'user1',
                product_id: products[2]?.id || 'prod3',
                amount: products[2]?.price || '199000',
                status: 'pending',
                payment_id: 'payment_003'
            }
        ];
        
        for (const order of sampleOrders) {
            console.log(`➕ Adding order: ${order.payment_id}`);
            await googleSheets.createOrder(order);
            console.log(`✅ Added order: ${order.payment_id}`);
        }
        
        console.log('\n📋 Database Summary:');
        
        const finalUsers = await googleSheets.getAllUsers();
        const finalProducts = await googleSheets.getAllProducts();
        const finalOrders = await googleSheets.getAllOrders();
        
        console.log(`👥 Users: ${finalUsers.length}`);
        finalUsers.forEach(user => {
            console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
        });
        
        console.log(`\n🛍️ Products: ${finalProducts.length}`);
        finalProducts.forEach(product => {
            console.log(`  - ${product.name} (${product.price}) - ${product.status}`);
        });
        
        console.log(`\n🛒 Orders: ${finalOrders.length}`);
        finalOrders.forEach(order => {
            console.log(`  - ${order.payment_id}: ${order.amount} - ${order.status}`);
        });
        
        console.log('\n🎉 Sample data added successfully!');
        
    } catch (error) {
        console.error('❌ Error adding sample data:', error);
    }
}

addSampleData();
