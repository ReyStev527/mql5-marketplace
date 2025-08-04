// frontend/src/pages/PaymentSuccess.js
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle,
  Download,
  Telegram,
  Receipt,
  Home,
  ShoppingCart,
  Email,
  Phone,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get transaction ID from URL params
  const transactionId = searchParams.get('transaction_id') || 'TXN123456';
  const orderId = searchParams.get('order_id') || 'ORD789012';

  useEffect(() => {
    // Simulate API call to get order details
    setTimeout(() => {
      setOrderDetails({
        id: transactionId,
        orderId: orderId,
        productName: 'Scalping Master EA',
        productAuthor: 'ProTrader',
        amount: 99000,
        paymentMethod: 'BCA Virtual Account',
        purchaseDate: new Date().toISOString(),
        status: 'completed',
        downloadUrl: 'https://example.com/download/scalping-master-ea.ex5',
        telegramBotUsername: '@ladangpertanianbot',
        customerEmail: 'customer@example.com',
        customerPhone: '+62812345678'
      });
      setLoading(false);
    }, 1500);
  }, [transactionId, orderId]);

  const handleDownload = () => {
    if (orderDetails?.downloadUrl) {
      window.open(orderDetails.downloadUrl, '_blank');
    }
  };

  const handleContactTelegram = () => {
    if (orderDetails?.telegramBotUsername) {
      window.open(`https://t.me/${orderDetails.telegramBotUsername.replace('@', '')}`, '_blank');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Processing your payment...
        </Typography>
      </Container>
    );
  }

  if (!orderDetails) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">
          Order not found. Please contact support if you believe this is an error.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Success Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h3" color="success.main" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Thank you for your purchase. Your Expert Advisor is ready for download.
        </Typography>
      </Box>

      {/* Order Details Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Receipt sx={{ mr: 1 }} />
            Order Details
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              {orderDetails.productName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              by {orderDetails.productAuthor}
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Transaction ID:</strong> {orderDetails.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Order ID:</strong> {orderDetails.orderId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Purchase Date:</strong> {formatDate(orderDetails.purchaseDate)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Payment Method:</strong> {orderDetails.paymentMethod}
              </Typography>
            </Box>
          </Box>
          
          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Total Amount
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold">
                {formatPrice(orderDetails.amount)}
              </Typography>
            </Box>
          </Paper>
        </CardContent>
      </Card>

      {/* Download Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Download sx={{ mr: 1 }} />
            Download Your EA
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            Your Expert Advisor file will also be sent to you via our Telegram bot within 5 minutes.
          </Alert>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Download />}
              onClick={handleDownload}
              sx={{ px: 4 }}
            >
              Download Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Telegram />}
              onClick={handleContactTelegram}
              sx={{ px: 4 }}
            >
              Open Telegram Bot
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            What's Next?
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <Download sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText
                primary="Download the EA file"
                secondary="Click the download button above to get your .ex5 file"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Telegram sx={{ color: 'info.main' }} />
              </ListItemIcon>
              <ListItemText
                primary="Check Telegram for instructions"
                secondary="Our bot will send you installation guides and support"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Email sx={{ color: 'success.main' }} />
              </ListItemIcon>
              <ListItemText
                primary="Check your email"
                secondary="Purchase receipt and EA documentation will be sent to your email"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Support Information */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Need Help?
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            If you encounter any issues with your download or installation, our support team is here to help:
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Telegram />
              </ListItemIcon>
              <ListItemText
                primary="Telegram Bot"
                secondary={orderDetails.telegramBotUsername}
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText
                primary="Email Support"
                secondary="support@mql5marketplace.com"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText
                primary="WhatsApp"
                secondary="+62812345678"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={<Home />}
          onClick={() => navigate('/')}
          sx={{ px: 4 }}
        >
          Back to Home
        </Button>
        <Button
          variant="outlined"
          startIcon={<ShoppingCart />}
          onClick={() => navigate('/products')}
          sx={{ px: 4 }}
        >
          Browse More EAs
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{ px: 4 }}
        >
          My Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentSuccess;

