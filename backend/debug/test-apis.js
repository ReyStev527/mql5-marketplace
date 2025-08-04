const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test data
const testUser = {
    email: `test_${Date.now()}@example.com`,
    password: 'testpass123',
    name: 'Test User',
    role: 'user'
};

async function testAPIs() {
    console.log('🚀 API Endpoints Test');
    console.log('====================');
    
    let userToken = null;
    let adminToken = null;
    
    try {
        // Test 1: Health check
        console.log('\n1. 🏥 Health Check:');
        try {
            const health = await axios.get(`${BASE_URL}/products`);
            console.log(`   ✅ Server responding: ${health.status === 200}`);
        } catch (error) {
            console.log(`   ❌ Server not responding: ${error.message}`);
            return;
        }
        
        // Test 2: User Registration
        console.log('\n2. 👤 User Registration:');
        try {
            const registerResponse = await axios.post(`${BASE_URL}/auth/register`, testUser);
            console.log(`   ✅ Registration successful: ${registerResponse.data.success}`);
            userToken = registerResponse.data.token;
        } catch (error) {
            console.log(`   ❌ Registration failed: ${error.response?.data?.message || error.message}`);
        }
        
        // Test 3: User Login
        console.log('\n3. 🔐 User Login:');
        try {
            const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
                email: testUser.email,
                password: testUser.password
            });
            console.log(`   ✅ Login successful: ${loginResponse.data.success}`);
            if (!userToken) userToken = loginResponse.data.token;
        } catch (error) {
            console.log(`   ❌ Login failed: ${error.response?.data?.message || error.message}`);
        }
        
        // Test 4: Protected Route (with token)
        if (userToken) {
            console.log('\n4. 🔒 Protected Route Test:');
            try {
                const profileResponse = await axios.get(`${BASE_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });
                console.log(`   ✅ Protected route accessible: ${profileResponse.data.success}`);
                console.log(`   📄 User info: ${JSON.stringify(profileResponse.data.user, null, 2)}`);
            } catch (error) {
                console.log(`   ❌ Protected route failed: ${error.response?.data?.message || error.message}`);
            }
        }
        
        // Test 5: Products Endpoint
        console.log('\n5. 📦 Products Endpoint:');
        try {
            const productsResponse = await axios.get(`${BASE_URL}/products`);
            console.log(`   ✅ Products endpoint working: ${productsResponse.status === 200}`);
            console.log(`   📊 Products count: ${productsResponse.data.products?.length || 0}`);
        } catch (error) {
            console.log(`   ❌ Products endpoint failed: ${error.response?.data?.message || error.message}`);
        }
        
        // Test 6: Admin Route (should fail with user token)
        if (userToken) {
            console.log('\n6. 👑 Admin Route Test (should fail):');
            try {
                const adminResponse = await axios.get(`${BASE_URL}/admin/users`, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });
                console.log(`   ❌ Admin route accessible with user token (security issue!)`);
            } catch (error) {
                if (error.response?.status === 403) {
                    console.log(`   ✅ Admin route properly protected: ${error.response.data.message}`);
                } else {
                    console.log(`   ⚠️  Unexpected error: ${error.response?.data?.message || error.message}`);
                }
            }
        }
        
        // Test 7: Payment Route
        if (userToken) {
            console.log('\n7. 💳 Payment Route Test:');
            try {
                const paymentResponse = await axios.post(`${BASE_URL}/payments/create-transaction`, {
                    productId: 'test-product',
                    amount: 100000,
                    customerDetails: {
                        email: testUser.email,
                        name: testUser.name
                    }
                }, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });
                console.log(`   ✅ Payment endpoint working: ${paymentResponse.data.success}`);
            } catch (error) {
                console.log(`   ❌ Payment failed: ${error.response?.data?.message || error.message}`);
            }
        }
        
        // Test 8: Telegram Route
        console.log('\n8. 📱 Telegram Route Test:');
        try {
            const telegramResponse = await axios.get(`${BASE_URL}/telegram/webhook`);
            console.log(`   ✅ Telegram endpoint accessible`);
        } catch (error) {
            if (error.response?.status === 500) {
                console.log(`   ⚠️  Telegram endpoint exists but has config issues: ${error.response.data.message}`);
            } else {
                console.log(`   ❌ Telegram endpoint failed: ${error.response?.data?.message || error.message}`);
            }
        }
        
        console.log('\n🎉 API tests completed!');
        console.log('\n📊 Summary:');
        console.log(`   User Token: ${userToken ? 'Generated ✅' : 'Failed ❌'}`);
        console.log(`   Test User: ${testUser.email}`);
        
    } catch (error) {
        console.error('❌ API test suite failed:');
        console.error('Error:', error.message);
    }
}

testAPIs();
