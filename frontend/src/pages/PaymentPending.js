import React from 'react';
import { Container, Typography, Box, Button, Alert, CircularProgress } from '@mui/material';
import { HourglassEmpty, Home, Refresh } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const PaymentPending = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Payment Pending - MQL5 Marketplace</title>
      </Helmet>
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
            <HourglassEmpty sx={{ fontSize: 100, color: 'warning.main' }} />
            <CircularProgress 
              size={120} 
              thickness={2}
              sx={{ 
                position: 'absolute', 
                top: -10, 
                left: -10,
                color: 'warning.main',
                opacity: 0.3
              }} 
            />
          </Box>
          <Typography variant="h3" gutterBottom color="warning.main">
            Payment Pending
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Your payment is being processed. Please wait for confirmation.
          </Typography>
        </Box>

        <Alert severity="warning" sx={{ mb: 4 }}>
          <Typography variant="body1">
            Your payment is currently being processed. This usually takes a few minutes.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            You will receive an email confirmation once the payment is complete.
            Please do not close this window or refresh the page.
          </Typography>
        </Alert>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={() => window.location.reload()}
            size="large"
          >
            Check Status
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

export default PaymentPending;
