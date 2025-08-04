require('dotenv').config();
const axios = require('axios');

async function testAdminAPI() {
    console.log('🔍 Testing Admin API Endpoints...');
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1NGY3ZWQ1LWM0N2EtNDBmYS04N2VkLWMzYzY3ZTlmNzBmYiIsImVtYWlsIjoiYWRtaW5AbXFsNW1hcmtldHBsYWNlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NDI4MzYwNSwiZXhwIjoxNzU0MzcwMDA1fQ.V6C0nzgKKvJWloInaoMVej7XsnG5NKnB5KXjvrTYkeU';
    
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    
    try {
        console.log('\n📊 Testing /api/admin/stats...');
        const statsRes = await axios.get('http://localhost:5000/api/admin/stats', { headers });
        console.log('✅ Stats Response:', JSON.stringify(statsRes.data, null, 2));
        
        console.log('\n🛍️ Testing /api/admin/products...');
        const productsRes = await axios.get('http://localhost:5000/api/admin/products', { headers });
        console.log('✅ Products Response:');
        console.log(`   Success: ${productsRes.data.success}`);
        console.log(`   Data Length: ${productsRes.data.data?.length || 0}`);
        
        if (productsRes.data.data && productsRes.data.data.length > 0) {
            console.log('   Products:');
            productsRes.data.data.forEach((product, index) => {
                console.log(`     ${index + 1}. ${product.name} - ${product.price} - ${product.status}`);
            });
        } else {
            console.log('   ⚠️ No products returned');
        }
        
        console.log('\n👥 Testing /api/admin/users...');
        const usersRes = await axios.get('http://localhost:5000/api/admin/users', { headers });
        console.log('✅ Users Response:');
        console.log(`   Success: ${usersRes.data.success}`);
        console.log(`   Data Length: ${usersRes.data.data?.length || 0}`);
        
        console.log('\n🛒 Testing /api/admin/orders...');
        const ordersRes = await axios.get('http://localhost:5000/api/admin/orders', { headers });
        console.log('✅ Orders Response:');
        console.log(`   Success: ${ordersRes.data.success}`);
        console.log(`   Data Length: ${ordersRes.data.data?.length || 0}`);
        
        console.log('\n🎉 All API endpoints tested successfully!');
        
        console.log('\n💡 Frontend Debug Instructions:');
        console.log('1. Open http://localhost:3000/admin/products in browser');
        console.log('2. Open Developer Tools (F12)');
        console.log('3. Go to Console tab');
        console.log('4. Run: localStorage.setItem("token", "' + token + '")');
        console.log('5. Refresh the page');
        console.log('6. Check Network tab for API calls');
        
    } catch (error) {
        console.error('❌ API Test Error:', error.response?.data || error.message);
    }
}

testAdminAPI();
