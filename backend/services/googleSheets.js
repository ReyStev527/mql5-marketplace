const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

class GoogleSheetsService {
  constructor() {
    this.doc = null;
    this.init();
  }

  async init() {
    try {
      const privateKey = process.env.GOOGLE_PRIVATE_KEY;
      if (!privateKey) {
        console.log('⚠️ Google Sheets disabled - GOOGLE_PRIVATE_KEY not found');
        return;
      }

      const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: privateKey.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID, serviceAccountAuth);
      await this.doc.loadInfo();
      
      console.log('✅ Google Sheets connected successfully');
    } catch (error) {
      console.error('❌ Google Sheets connection failed:', error);
    }
  }

  // Users Management
  async createUser(userData) {
    try {
      const sheet = this.doc.sheetsByTitle['Users'] || await this.doc.addSheet({ 
        title: 'Users',
        headerValues: ['id', 'email', 'password', 'role', 'telegram_id', 'created_at', 'status']
      });
      
      const row = await sheet.addRow({
        id: userData.id,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'user',
        telegram_id: userData.telegram_id || '',
        created_at: new Date().toISOString(),
        status: userData.status || 'active'
      });
      
      return row;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async getUserByEmail(email) {
    try {
      const sheet = this.doc.sheetsByTitle['Users'];
      if (!sheet) return null;
      
      const rows = await sheet.getRows();
      return rows.find(row => row.get('email') === email);
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  async getAllUsers() {
    try {
      const sheet = this.doc.sheetsByTitle['Users'];
      if (!sheet) return [];
      
      const rows = await sheet.getRows();
      return rows.map(row => ({
        id: row.get('id'),
        name: row.get('name'),
        email: row.get('email'),
        role: row.get('role'),
        telegram_id: row.get('telegram_id'),
        created_at: row.get('created_at')
      }));
    } catch (error) {
      throw new Error(`Failed to get users: ${error.message}`);
    }
  }

  // Products Management
  async createProduct(productData) {
    try {
      const sheet = this.doc.sheetsByTitle['Products'] || await this.doc.addSheet({
        title: 'Products',
        headerValues: ['id', 'name', 'description', 'price', 'file_path', 'compiled_path', 'status', 'created_at', 'admin_id']
      });

      const row = await sheet.addRow({
        id: productData.id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        file_path: productData.file_path,
        compiled_path: productData.compiled_path || '',
        status: productData.status || 'pending',
        created_at: new Date().toISOString(),
        admin_id: productData.admin_id
      });

      return row;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  async getAllProducts() {
    try {
      // Check if service is initialized
      if (!this.doc) {
        console.log('⚠️ Google Sheets not initialized in getAllProducts, attempting to initialize...');
        await this.init();
        if (!this.doc) {
          throw new Error('Google Sheets service not available');
        }
      }
      
      const sheet = this.doc.sheetsByTitle['Products'];
      if (!sheet) {
        console.log('⚠️ Products sheet not found, returning empty array');
        return [];
      }
      
      const rows = await sheet.getRows();
      const products = rows.map(row => ({
        id: row.get('id'),
        name: row.get('name'),
        description: row.get('description'),
        price: row.get('price'),
        status: row.get('status'),
        created_at: row.get('created_at')
      }));
      
      console.log(`📊 getAllProducts returning ${products.length} products`);
      return products;
    } catch (error) {
      console.error('❌ Error in getAllProducts:', error);
      throw new Error(`Failed to get products: ${error.message}`);
    }
  }

  // Orders Management
  async createOrder(orderData) {
    try {
      const sheet = this.doc.sheetsByTitle['Orders'] || await this.doc.addSheet({
        title: 'Orders',
        headerValues: ['id', 'user_id', 'product_id', 'amount', 'status', 'payment_id', 'license_key', 'created_at', 'completed_at']
      });

      const row = await sheet.addRow({
        id: orderData.id,
        user_id: orderData.user_id,
        product_id: orderData.product_id,
        amount: orderData.amount,
        status: orderData.status || 'pending',
        payment_id: orderData.payment_id || '',
        license_key: orderData.license_key || '',
        created_at: new Date().toISOString(),
        completed_at: orderData.completed_at || ''
      });

      return row;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async getAllOrders() {
    try {
      const sheet = this.doc.sheetsByTitle['Orders'];
      if (!sheet) return [];
      
      const rows = await sheet.getRows();
      return rows.map(row => ({
        id: row.get('id'),
        user_id: row.get('user_id'),
        product_id: row.get('product_id'),
        amount: row.get('amount'),
        status: row.get('status'),
        payment_id: row.get('payment_id'),
        license_key: row.get('license_key'),
        created_at: row.get('created_at'),
        completed_at: row.get('completed_at')
      }));
    } catch (error) {
      throw new Error(`Failed to get orders: ${error.message}`);
    }
  }

  async updateOrderStatus(orderId, status, additionalData = {}) {
    try {
      const sheet = this.doc.sheetsByTitle['Orders'];
      if (!sheet) throw new Error('Orders sheet not found');

      const rows = await sheet.getRows();
      const orderRow = rows.find(row => row.get('id') === orderId);
      
      if (!orderRow) throw new Error('Order not found');

      orderRow.set('status', status);
      if (additionalData.payment_id) orderRow.set('payment_id', additionalData.payment_id);
      if (additionalData.license_key) orderRow.set('license_key', additionalData.license_key);
      if (status === 'completed') orderRow.set('completed_at', new Date().toISOString());

      await orderRow.save();
      return orderRow;
    } catch (error) {
      throw new Error(`Failed to update order: ${error.message}`);
    }
  }

  // Licenses Management
  async createLicense(licenseData) {
    try {
      const sheet = this.doc.sheetsByTitle['Licenses'] || await this.doc.addSheet({
        title: 'Licenses',
        headerValues: ['id', 'user_id', 'product_id', 'license_key', 'status', 'expires_at', 'created_at', 'activations']
      });

      const row = await sheet.addRow({
        id: licenseData.id,
        user_id: licenseData.user_id,
        product_id: licenseData.product_id,
        license_key: licenseData.license_key,
        status: licenseData.status || 'active',
        expires_at: licenseData.expires_at || '',
        created_at: new Date().toISOString(),
        activations: licenseData.activations || '0'
      });

      return row;
    } catch (error) {
      throw new Error(`Failed to create license: ${error.message}`);
    }
  }
}

module.exports = new GoogleSheetsService();
