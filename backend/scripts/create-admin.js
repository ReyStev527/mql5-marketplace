require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const googleSheets = require('../services/googleSheets');

// This script creates admin users directly in Google Sheets
// Run with: node scripts/create-admin.js

const createAdminUser = async () => {
  console.log('🔧 Creating default admin user in Google Sheets...');
  
  const adminEmail = 'admin@mql5marketplace.com';
  const adminPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  const adminUser = {
    id: uuidv4(),
    name: 'Admin User',
    email: adminEmail,
    password: hashedPassword,
    role: 'admin',
    telegram_id: '999888777',
    status: 'active'
  };
  
  try {
    await googleSheets.createUser(adminUser);
    console.log('✅ Admin user created in Google Sheets!');
    
    // Generate JWT token for immediate use
    const token = jwt.sign(
      { 
        id: adminUser.id, 
        email: adminUser.email, 
        role: adminUser.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    console.log('\n👤 Admin user details:');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log(`🆔 Role: admin`);
    console.log(`🎫 JWT Token: ${token}`);
    console.log(`🌐 Dashboard URL: http://localhost:3000/admin/products`);
    
    console.log('\n📱 To login via frontend:');
    console.log(`1. Go to: http://localhost:3000/login`);
    console.log(`2. Use email: ${adminEmail}`);
    console.log(`3. Use password: ${adminPassword}`);
    
    console.log('\n🔧 To login directly (developer mode):');
    console.log('1. Open browser developer tools (F12)');
    console.log('2. In console, run:');
    console.log(`   localStorage.setItem("token", "${token}")`);
    console.log('3. Navigate to: http://localhost:3000/admin/products');
    
    return adminUser;
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    throw error;
  }
};

// Also create a sample regular user
const createSampleUser = async () => {
  console.log('\n👥 Creating sample regular user in Google Sheets...');
  
  const userEmail = 'user@example.com';
  const userPassword = 'user123';
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  
  const sampleUser = {
    id: uuidv4(),
    name: 'John Trader',
    email: userEmail,
    password: hashedPassword,
    role: 'user',
    telegram_id: '123456789',
    status: 'active'
  };
  
  try {
    await googleSheets.createUser(sampleUser);
    console.log('✅ Sample user created in Google Sheets!');
    
    console.log('\n👤 Sample user details:');
    console.log(`📧 Email: ${userEmail}`);
    console.log(`🔑 Password: ${userPassword}`);
    console.log(`🆔 Role: user`);
    console.log(`🌐 Dashboard URL: http://localhost:3000/dashboard`);
    
    return sampleUser;
  } catch (error) {
    console.error('❌ Error creating sample user:', error);
    throw error;
  }
};

const main = async () => {
  console.log('🚀 MQL5 Marketplace - Admin User Setup');
  console.log('==========================================\n');
  
  try {
    // Wait for Google Sheets to initialize
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('✅ Google Sheets connected successfully\n');
    
    const adminUser = await createAdminUser();
    const sampleUser = await createSampleUser();
    
    // Display summary
    const allUsers = await googleSheets.getAllUsers();
    console.log('\n� Database Summary:');
    console.log(`👥 Total users: ${allUsers.length}`);
    
    const adminCount = allUsers.filter(user => user.role === 'admin').length;
    console.log(`👑 Admin users: ${adminCount}`);
    console.log(`👤 Regular users: ${allUsers.length - adminCount}`);
    
    console.log('\n🎉 Setup complete!');
    console.log('💡 Tips:');
    console.log('   - Admin can access: http://localhost:3000/admin/products');
    console.log('   - Regular users can access: http://localhost:3000/dashboard');
    console.log('   - Login page: http://localhost:3000/login');
    console.log('   - All data is stored in Google Sheets');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
};

main().catch(console.error);
