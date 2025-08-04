import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CheckCircle,
  TrendingUp,
  Security,
  Speed,
  Support
} from '@mui/icons-material';
import { productsAPI } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getProduct(id);
        if (response.data.success) {
          setProduct(response.data.product);
        }
      } catch (error) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePurchase = () => {
    navigate(`/checkout/${id}`);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ mt: 8 }}>
        <Alert severity="error">{error || 'Product not found'}</Alert>
      </Container>
    );
  }

  const features = [
    'Professional Algorithm',
    'Risk Management',
    'Real-time Monitoring',
    'Easy Installation',
    'Lifetime License',
    '24/7 Support'
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image="/images/ea-preview.jpg"
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography variant="h3" gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                (48 reviews)
              </Typography>
            </Box>

            <Typography variant="h4" color="primary" gutterBottom>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(product.price)}
            </Typography>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Chip 
                label="Professional Grade" 
                color="primary" 
                sx={{ mr: 1, mb: 1 }} 
              />
              <Chip 
                label="Verified" 
                color="success" 
                sx={{ mr: 1, mb: 1 }} 
              />
              <Chip 
                label="Instant Download" 
                color="info" 
                sx={{ mr: 1, mb: 1 }} 
              />
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handlePurchase}
              sx={{ mb: 3 }}
            >
              Purchase Now
            </Button>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  What's Included:
                </Typography>
                <List dense>
                  {features.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Why Choose This EA?
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box textAlign="center">
                    <TrendingUp sx={{ fontSize: 48, color: 'primary.main' }} />
                    <Typography variant="h6">High Performance</Typography>
                    <Typography variant="body2">
                      Consistent profitable results
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box textAlign="center">
                    <Security sx={{ fontSize: 48, color: 'primary.main' }} />
                    <Typography variant="h6">Risk Control</Typography>
                    <Typography variant="body2">
                      Advanced risk management
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box textAlign="center">
                    <Speed sx={{ fontSize: 48, color: 'primary.main' }} />
                    <Typography variant="h6">Fast Execution</Typography>
                    <Typography variant="body2">
                      Lightning-fast order execution
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box textAlign="center">
                    <Support sx={{ fontSize: 48, color: 'primary.main' }} />
                    <Typography variant="h6">24/7 Support</Typography>
                    <Typography variant="body2">
                      Professional customer support
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;

