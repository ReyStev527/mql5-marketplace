const midtransClient = require('midtrans-client');
const crypto = require('crypto');

class MidtransService {
  constructor() {
    this.mockMode = process.env.MIDTRANS_MOCK_MODE === 'true';
    
    if (!this.mockMode) {
      this.snap = new midtransClient.Snap({
        isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
        serverKey: process.env.MIDTRANS_SERVER_KEY
      });

      this.core = new midtransClient.CoreApi({
        isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
        serverKey: process.env.MIDTRANS_SERVER_KEY
      });
    }
    
    console.log(`💳 Midtrans initialized in ${this.mockMode ? 'MOCK' : 'LIVE'} mode`);
  }

  async createTransaction(orderData) {
    try {
      // Mock mode for development/testing
      if (this.mockMode) {
        console.log('🎭 Mock payment mode - generating fake payment URL');
        const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return {
          token: mockToken,
          redirect_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/mock?token=${mockToken}&order_id=${orderData.order_id}`
        };
      }
      const parameter = {
        transaction_details: {
          order_id: orderData.order_id,
          gross_amount: parseInt(orderData.amount)
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          first_name: orderData.customer_name,
          email: orderData.customer_email,
          phone: orderData.customer_phone || ''
        },
        item_details: [{
          id: orderData.product_id,
          price: parseInt(orderData.amount),
          quantity: 1,
          name: orderData.product_name
        }],
        callbacks: {
          finish: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success`,
          error: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/error`,
          pending: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/pending`
        },
        // Add custom field to handle CSP
        custom_field1: "mql5-marketplace",
        // Configure for better compatibility
        enabled_payments: ["credit_card", "bca_va", "bni_va", "bri_va", "permata_va", "other_va", "gopay", "shopeepay"],
        // Additional configuration for better user experience
        page_expiry: {
          duration: 60,
          unit: 'minute'
        }
      };

      const transaction = await this.snap.createTransaction(parameter);
      return {
        token: transaction.token,
        redirect_url: transaction.redirect_url
      };
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }

  async getTransactionStatus(orderId) {
    try {
      // Mock mode for development/testing
      if (this.mockMode) {
        console.log('🎭 Mock payment mode - returning fake success status');
        return {
          order_id: orderId,
          transaction_status: 'settlement',
          payment_type: 'mock_payment',
          transaction_time: new Date().toISOString(),
          settlement_time: new Date().toISOString(),
          status_code: '200',
          status_message: 'Success, transaction is found'
        };
      }

      const status = await this.core.transaction.status(orderId);
      return status;
    } catch (error) {
      throw new Error(`Failed to get transaction status: ${error.message}`);
    }
  }

  verifySignature(data) {
    const { order_id, status_code, gross_amount, signature_key } = data;
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    
    const hash = crypto
      .createHash('sha512')
      .update(order_id + status_code + gross_amount + serverKey)
      .digest('hex');
    
    return hash === signature_key;
  }
}

module.exports = new MidtransService();
