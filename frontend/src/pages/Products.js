// frontend/src/pages/Products.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  Star,
  Download,
  Info,
  FilterList,
} from '@mui/icons-material';
import { productsAPI, paymentAPI } from '../services/api';
import { formatCurrency, formatDate } from '../utils/formatters';
import { PRODUCT_CATEGORIES } from '../utils/constants';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  console.log('🔍 Products state:', { products, isArray: Array.isArray(products), loading });

  // Sample products data (in real app, fetch from API)
  const sampleProducts = [
    {
      id: 1,
      name: 'Scalping Master EA',
      description: 'Advanced scalping strategy for EURUSD with high win rate',
      price: 99000,
      category: 'Scalping',
      rating: 4.8,
      downloads: 234,
      features: ['Low Drawdown', 'High Frequency', 'News Filter'],
      author: 'ProTrader',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Trend Following Pro',
      description: 'Multi-timeframe trend following system with risk management',
      price: 149000,
      category: 'Trend Following',
      rating: 4.6,
      downloads: 189,
      features: ['Multi-pair', 'Risk Management', 'Telegram Alerts'],
      author: 'TrendMaster',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Grid Recovery EA',
      description: 'Safe grid trading with recovery mechanisms',
      price: 199000,
      category: 'Grid Trading',
      rating: 4.4,
      downloads: 156,
      features: ['Grid System', 'Recovery Mode', 'Stop Loss'],
      author: 'GridExpert',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'News Trading Bot',
      description: 'Automated news trading with economic calendar integration',
      price: 179000,
      category: 'News Trading',
      rating: 4.7,
      downloads: 98,
      features: ['News Filter', 'Economic Calendar', 'Fast Execution'],
      author: 'NewsTrader',
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      name: 'Martingale Safe',
      description: 'Conservative martingale strategy with strict risk control',
      price: 129000,
      category: 'Martingale',
      rating: 4.3,
      downloads: 267,
      features: ['Risk Control', 'Conservative', 'Backtested'],
      author: 'SafeTrader',
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      name: 'AI Pattern EA',
      description: 'Machine learning pattern recognition for forex trading',
      price: 299000,
      category: 'AI Trading',
      rating: 4.9,
      downloads: 78,
      features: ['AI Powered', 'Pattern Recognition', 'Adaptive'],
      author: 'AITrader',
      image: '/api/placeholder/300/200'
    }
  ];

  useEffect(() => {
    // Load products from API
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');
        console.log('📡 Fetching products from API...');
        console.log('🔗 API URL:', process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
        
        const response = await productsAPI.getAll();
        console.log('📦 API Response:', response);
        console.log('📦 Response data:', response.data);
        
        // Handle different response structures
        let productsData = [];
        if (response.data?.success && response.data?.products) {
          // Backend returns {success: true, products: [...]}
          productsData = response.data.products;
        } else if (response.data?.success && response.data?.data) {
          // Backend returns {success: true, data: [...]}
          productsData = response.data.data;
        } else if (Array.isArray(response.data)) {
          // Backend returns products array directly
          productsData = response.data;
        } else {
          console.warn('⚠️ Unexpected API response structure:', response.data);
          productsData = [];
        }
        
        console.log('✅ Products data:', productsData, 'Is array:', Array.isArray(productsData));
        
        if (Array.isArray(productsData) && productsData.length > 0) {
          // Only use products that have real IDs from the backend
          const validProducts = productsData.filter(product => 
            product.id && !product.id.toString().startsWith('generated-')
          );
          
          if (validProducts.length > 0) {
            // Normalize API products to have all required fields with defaults
            const normalizedProducts = validProducts.map((product) => ({
              id: product.id, // Use the real ID from backend
              name: product.name || 'Unnamed EA',
              description: product.description || 'No description available',
              price: product.price || 0,
              category: product.category || 'General',
              rating: product.rating || 4.0,
              downloads: product.downloads || 0,
              features: product.features || ['Standard Features'],
              author: product.author || 'Unknown',
              image: product.image || '/api/placeholder/300/200',
              created_at: product.created_at
            }));
            
            setProducts(normalizedProducts);
            console.log('✅ Set normalized products from API:', normalizedProducts.length, 'items');
          } else {
            console.log('⚠️ No valid products from API (all have generated IDs), using sample data');
            setProducts(sampleProducts);
          }
        } else {
          console.log('⚠️ No products from API, using sample data');
          setProducts(sampleProducts);
        }
      } catch (error) {
        console.error('❌ Error loading products:', error);
        
        // Handle specific error codes
        if (error.response?.status === 503) {
          setError('Service temporarily unavailable. Please try again later.');
        } else if (error.response?.status === 404) {
          setError('Products endpoint not found. Please check server configuration.');
        } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
          setError('Cannot connect to server. Please check if the backend is running.');
        } else {
          setError(`Failed to load products: ${error.message}`);
        }
        
        // Always fallback to sample data to prevent crashes
        console.log('🔄 Using sample data as fallback');
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = ['all', ...PRODUCT_CATEGORIES.map(cat => cat.label)];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100000', label: 'Under Rp 100,000' },
    { value: '100000-200000', label: 'Rp 100,000 - 200,000' },
    { value: '200000-999999', label: 'Above Rp 200,000' }
  ];

  const filteredProducts = Array.isArray(products) ? products
    .filter(product => {
      const matchesSearch = (product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || (product.category || 'General') === categoryFilter;
      
      let matchesPrice = true;
      if (priceFilter !== 'all') {
        const [min, max] = priceFilter.split('-').map(Number);
        matchesPrice = (product.price || 0) >= min && (product.price || 0) <= (max || Infinity);
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    // Remove duplicates based on ID
    .filter((product, index, array) => 
      array.findIndex(p => p.id === product.id) === index
    ) : [];

  console.log('🔍 Filter Debug:', { 
    products: products, 
    isArray: Array.isArray(products), 
    filteredProducts: filteredProducts.length,
    productIds: filteredProducts.map(p => p.id),
    duplicateIds: filteredProducts.map(p => p.id).filter((id, index, arr) => arr.indexOf(id) !== index)
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handlePurchase = async (product) => {
    // Redirect to checkout page instead of calling API directly
    navigate('/payment/checkout', { 
      state: { product } 
    });
  };

  const formatPrice = (price) => {
    return formatCurrency(price);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Expert Advisors...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Expert Advisors Marketplace
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover and purchase high-quality MT5 Expert Advisors
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Search EAs"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Price Range</InputLabel>
              <Select
                value={priceFilter}
                label="Price Range"
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                {priceRanges.map(range => (
                  <MenuItem key={range.value} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} EAs found
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`product-${product.id}-${index}`}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                }
              }}
            >
              <Box
                sx={{
                  height: 200,
                  bgcolor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <TrendingUp sx={{ fontSize: 64, color: 'grey.400' }} />
                <Chip
                  label={product.category || 'General'}
                  size="small"
                  sx={{ position: 'absolute', top: 8, left: 8 }}
                />
              </Box>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={product.rating || 0} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({product.downloads || 0} downloads)
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {(product.features || []).slice(0, 2).map((feature, index) => (
                    <Chip key={`feature-${product.id}-${index}`} label={feature} size="small" variant="outlined" />
                  ))}
                  {(product.features || []).length > 2 && (
                    <Chip key={`more-features-${product.id}`} label={`+${(product.features || []).length - 2} more`} size="small" />
                  )}
                </Box>
                
                <Typography variant="h5" color="primary" fontWeight="bold">
                  {formatPrice(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  by {product.author || 'Unknown'}
                </Typography>
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  startIcon={<Info />}
                  onClick={() => handleProductClick(product)}
                >
                  Details
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AttachMoney />}
                  onClick={() => handlePurchase(product)}
                  sx={{ ml: 'auto' }}
                >
                  Buy Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No Expert Advisors found matching your criteria
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setPriceFilter('all');
            }}
            sx={{ mt: 2 }}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      {/* Product Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle>
              <Typography variant="h5">{selectedProduct.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                by {selectedProduct.author || 'Unknown'}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={selectedProduct.rating || 0} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {selectedProduct.rating || 0} ({selectedProduct.downloads || 0} downloads)
                  </Typography>
                </Box>
                
                <Typography variant="body1" paragraph>
                  {selectedProduct.description}
                </Typography>
                
                <Typography variant="h6" gutterBottom>Features:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {(selectedProduct.features || ['No features listed']).map((feature, index) => (
                    <Chip key={`dialog-feature-${selectedProduct.id}-${index}`} label={feature} variant="outlined" />
                  ))}
                </Box>
                
                <Typography variant="h5" color="primary" fontWeight="bold">
                  {formatPrice(selectedProduct.price)}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setOpenDialog(false)}>
                Close
              </Button>
              <Button
                variant="contained"
                startIcon={<AttachMoney />}
                onClick={() => {
                  handlePurchase(selectedProduct);
                  setOpenDialog(false);
                }}
              >
                Purchase Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Products;

