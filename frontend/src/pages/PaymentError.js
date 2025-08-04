import React from 'react';
import { Container, Typography, Box, Button, Alert } from '@mui/material';
import { Error, Home, Refresh } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const PaymentError = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Payment Error - MQL5 Marketplace</title>
      </Helmet>
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <Error sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
          <Typography variant="h3" gutterBottom color="error.main">
            Payment Failed
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            We encountered an error processing your payment. Please try again.
          </Typography>
        </Box>

        <Alert severity="error" sx={{ mb: 4 }}>
          <Typography variant="body1">
            Your payment could not be processed at this time. This could be due to:
          </Typography>
          <ul style={{ textAlign: 'left', marginTop: 8 }}>
            <li>Insufficient funds</li>
            <li>Card declined by bank</li>
            <li>Network connection issues</li>
            <li>Invalid card information</li>
          </ul>
        </Alert>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={() => navigate('/products')}
            size="large"
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            size="large"
          >
            Go Home
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default PaymentError;
