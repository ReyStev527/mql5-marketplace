import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { ShoppingCart, CreditCard } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { paymentAPI } from '../services/api';

const PaymentCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get product data from location state
  const { product } = location.state || {};
  
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  const handleInputChange = (field, value) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError('');

      const paymentData = {
        product_id: product.id,
        customer_name: customerData.name,
        customer_email: customerData.email,
        customer_phone: customerData.phone,
      };

      await paymentAPI.createPayment(paymentData);
      
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <Container>
        <Alert severity="error">Product not found. Redirecting...</Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - {product.name} - MQL5 Marketplace</title>
      </Helmet>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <ShoppingCart sx={{ mr: 2 }} />
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ border: 1, borderColor: 'grey.200' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Customer Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ border: 1, borderColor: 'grey.200' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Grid container spacing={2}>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={customerData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={customerData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={loading ? <CircularProgress size={20} /> : <CreditCard />}
                      onClick={handlePayment}
                      disabled={loading || !customerData.name || !customerData.email}
                      sx={{ mt: 2 }}
                    >
                      {loading ? 'Processing...' : 'Proceed to Payment'}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PaymentCheckout;
