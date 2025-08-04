import React from 'react';
import { Box, Typography, Button, Card, CardContent, Container } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const ErrorIcon = styled(ErrorOutline)(({ theme }) => ({
  fontSize: '4rem',
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md">
          <ErrorContainer>
            <Card 
              sx={{ 
                maxWidth: 600, 
                width: '100%',
                boxShadow: (theme) => theme.shadows[8]
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <ErrorIcon />
                
                <Typography variant="h4" gutterBottom color="error">
                  Oops! Something went wrong
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  We're sorry, but something unexpected happened. 
                  Please try refreshing the page or contact support if the problem persists.
                </Typography>

                {process.env.NODE_ENV === 'development' && (
                  <Box 
                    sx={{ 
                      mb: 3, 
                      p: 2, 
                      backgroundColor: 'grey.100', 
                      borderRadius: 1,
                      textAlign: 'left'
                    }}
                  >
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Error Details (Development):
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {this.state.error && this.state.error.toString()}
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  startIcon={<Refresh />}
                  onClick={this.handleReload}
                  sx={{ mr: 2 }}
                >
                  Refresh Page
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </ErrorContainer>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

