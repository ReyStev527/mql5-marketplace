import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { CheckCircle, Cancel, AccessTime } from '@mui/icons-material';

const MockPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing'); // processing, success, failed
  const [loading, setLoading] = useState(true);
  
  const token = searchParams.get('token');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      setLoading(false);
      // For demo purposes, randomly succeed or fail (80% success rate)
      const shouldSucceed = Math.random() > 0.2;
      setStatus(shouldSucceed ? 'success' : 'failed');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (status === 'success') {
      navigate('/payment/success', { 
        state: { 
          orderId,
          message: 'Payment completed successfully!' 
        } 
      });
    } else {
      navigate('/payment/error', { 
        state: { 
          orderId,
          message: 'Payment failed. Please try again.' 
        } 
      });
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <CircularProgress size={60} color="primary" />;
      case 'success':
        return <CheckCircle sx={{ fontSize: 60, color: 'success.main' }} />;
      case 'failed':
        return <Cancel sx={{ fontSize: 60, color: 'error.main' }} />;
      default:
        return <AccessTime sx={{ fontSize: 60, color: 'warning.main' }} />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'processing':
        return 'Processing your payment...';
      case 'success':
        return 'Payment Successful!';
      case 'failed':
        return 'Payment Failed';
      default:
        return 'Processing...';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ textAlign: 'center', p: 4 }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            {getStatusIcon()}
          </Box>
          
          <Typography variant="h4" gutterBottom color={getStatusColor()}>
            {getStatusMessage()}
          </Typography>

          {status === 'processing' && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Please wait while we process your payment...
            </Typography>
          )}

          {status === 'success' && (
            <>
              <Alert severity="success" sx={{ mb: 3 }}>
                Your payment has been processed successfully. You will receive your EA file shortly.
              </Alert>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Order ID: {orderId}
              </Typography>
            </>
          )}

          {status === 'failed' && (
            <>
              <Alert severity="error" sx={{ mb: 3 }}>
                Payment processing failed. Please try again or contact support.
              </Alert>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Order ID: {orderId}
              </Typography>
            </>
          )}

          {!loading && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleContinue}
                sx={{ minWidth: 200 }}
              >
                Continue
              </Button>
            </Box>
          )}

          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" color="text.secondary">
              🎭 Demo Mode - This is a simulated payment for testing purposes
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MockPayment;
