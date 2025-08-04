import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Divider,
  Chip,
  Alert,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCartOutlined,
  LocalOffer,
  Security,
  CreditCard,
  ArrowBack,
  Check,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Scalping Master EA Pro',
      description: 'Advanced scalping strategy for EURUSD with high win rate',
      price: 299,
      originalPrice: 399,
      quantity: 1,
      image: '/api/placeholder/100/100',
      category: 'Scalping',
      rating: 4.8,
      downloads: 1234,
      discount: 25,
    },
    {
      id: 2,
      name: 'Trend Following Expert',
      description: 'Multi-timeframe trend following system',
      price: 199,
      originalPrice: 249,
      quantity: 1,
      image: '/api/placeholder/100/100',
      category: 'Trend Following',
      rating: 4.6,
      downloads: 890,
      discount: 20,
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => 
      total + ((item.originalPrice - item.price) * item.quantity), 0
    );
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = promoApplied ? (subtotal * promoDiscount / 100) : 0;
    return subtotal - discount;
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
      setPromoDiscount(10);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    // Simulate payment process
    navigate('/payment/checkout', { 
      state: { 
        items: cartItems, 
        total: getTotal(),
        promoCode: promoApplied ? promoCode : null 
      } 
    });
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - MQL5 Marketplace</title>
        </Helmet>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              textAlign: 'center', 
              py: 8, 
              bgcolor: 'grey.50',
              borderRadius: 3
            }}
          >
            <ShoppingCartOutlined 
              sx={{ 
                fontSize: 80, 
                color: 'grey.400', 
                mb: 2 
              }} 
            />
            <Typography variant="h4" gutterBottom color="text.secondary">
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Start exploring our Expert Advisors and add some to your cart
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
              sx={{ px: 4 }}
            >
              Browse Products
            </Button>
          </Paper>
        </Container>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${cartItems.length} items) - MQL5 Marketplace`}</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/products')}
            sx={{ mb: 2 }}
          >
            Continue Shopping
          </Button>
          <Typography variant="h3" gutterBottom>
            Shopping Cart
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card elevation={0} sx={{ border: 1, borderColor: 'grey.200' }}>
              <CardContent sx={{ p: 0 }}>
                <List>
                  {cartItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem
                        sx={{
                          py: 3,
                          px: 3,
                          alignItems: 'flex-start',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={item.image}
                            sx={{ 
                              width: 80, 
                              height: 80,
                              bgcolor: 'grey.100'
                            }}
                          />
                        </ListItemAvatar>
                        
                        {/* Custom content without ListItemText */}
                        <Box sx={{ ml: 2, flexGrow: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {item.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {item.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip 
                              label={item.category} 
                              size="small" 
                              variant="outlined"
                            />
                            <Chip 
                              label={`${item.downloads} downloads`} 
                              size="small" 
                              color="success"
                              variant="outlined"
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {/* Price */}
                            <Box>
                              <Typography variant="h6" color="primary">
                                ${item.price}
                              </Typography>
                              {item.originalPrice > item.price && (
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    textDecoration: 'line-through',
                                    color: 'text.secondary'
                                  }}
                                >
                                  ${item.originalPrice}
                                </Typography>
                              )}
                            </Box>

                            {/* Quantity Controls */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Remove />
                              </IconButton>
                              <Chip 
                                label={item.quantity} 
                                size="small"
                                sx={{ minWidth: 40 }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Add />
                              </IconButton>
                            </Box>

                            {/* Total Price */}
                            <Typography variant="h6" sx={{ minWidth: 80 }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <ListItemSecondaryAction>
                          <Tooltip title="Remove item">
                            <IconButton
                              edge="end"
                              color="error"
                              onClick={() => removeItem(item.id)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                      
                      {index < cartItems.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card 
              elevation={0} 
              sx={{ 
                border: 1, 
                borderColor: 'grey.200',
                position: 'sticky', 
                top: 100 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Order Summary
                </Typography>
                
                {/* Promo Code */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Promo Code
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      sx={{ flexGrow: 1 }}
                    />
                    <Button
                      variant="outlined"
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                      startIcon={promoApplied ? <Check /> : <LocalOffer />}
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </Button>
                  </Box>
                  {promoApplied && (
                    <Alert severity="success" sx={{ mt: 1 }}>
                      Promo code applied! You saved {promoDiscount}%
                    </Alert>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />
                
                {/* Price Breakdown */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      Subtotal ({cartItems.length} items)
                    </Typography>
                    <Typography variant="body2">
                      ${getSubtotal().toFixed(2)}
                    </Typography>
                  </Box>
                  
                  {getTotalSavings() > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="success.main">
                        Discount Savings
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        -${getTotalSavings().toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                  
                  {promoApplied && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="success.main">
                        Promo Discount ({promoDiscount}%)
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        -${(getSubtotal() * promoDiscount / 100).toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    ${getTotal().toFixed(2)}
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  startIcon={<CreditCard />}
                  sx={{ mb: 2 }}
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </Button>

                {/* Security Notice */}
                <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Security color="primary" sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={600}>
                      Secure Checkout
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Your payment information is processed securely. We do not store credit card details.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cart;

