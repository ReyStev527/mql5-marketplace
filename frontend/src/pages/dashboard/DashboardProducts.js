import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Download,
  GetApp,
  Visibility,
  Search,
  FilterList,
  Sort,
} from '@mui/icons-material';
import { FadeInUp } from '../../components/ui/Animations';
import { formatCurrency, formatDate } from '../../utils/formatters';

const DashboardProducts = ({ purchases }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const samplePurchases = [
    {
      id: 1,
      productName: 'Advanced EA Bot',
      description: 'Advanced trading bot with multiple strategies',
      date: '2024-01-15',
      price: 150000,
      status: 'completed',
      downloadCount: 3,
      version: '1.2.0'
    },
    {
      id: 2,
      productName: 'Scalping Expert',
      description: 'High-frequency scalping expert advisor',
      date: '2024-01-10',
      price: 200000,
      status: 'completed',
      downloadCount: 1,
      version: '2.1.0'
    },
    {
      id: 3,
      productName: 'News Trader',
      description: 'News-based trading strategy',
      date: '2024-01-08',
      price: 100000,
      status: 'processing',
      downloadCount: 0,
      version: '1.0.0'
    },
    {
      id: 4,
      productName: 'Grid Trading Bot',
      description: 'Grid-based automated trading system',
      date: '2024-01-05',
      price: 175000,
      status: 'completed',
      downloadCount: 2,
      version: '1.5.0'
    },
    {
      id: 5,
      productName: 'Trend Following EA',
      description: 'Trend-following expert advisor',
      date: '2024-01-03',
      price: 125000,
      status: 'completed',
      downloadCount: 4,
      version: '3.0.0'
    }
  ];

  const displayPurchases = purchases && purchases.length > 0 ? purchases : samplePurchases;

  const filteredPurchases = displayPurchases.filter(purchase =>
    purchase.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDownload = (product) => {
    // Implement download logic
    console.log('Downloading:', product.productName);
  };

  return (
    <>
      <FadeInUp>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            My Products
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage and download your purchased expert advisors
          </Typography>
        </Box>
      </FadeInUp>

      {/* Search and Filter */}
      <FadeInUp>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    size="small"
                  >
                    Filter
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Sort />}
                    size="small"
                  >
                    Sort
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </FadeInUp>

      {/* Products Table */}
      <FadeInUp>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Your Products ({filteredPurchases.length})
              </Typography>
            </Box>

            {filteredPurchases.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Purchase Date</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Downloads</TableCell>
                      <TableCell>Version</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPurchases.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                              {purchase.productName.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {purchase.productName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {purchase.description}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatDate(purchase.date)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {formatCurrency(purchase.price)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={purchase.status}
                            color={getStatusColor(purchase.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {purchase.downloadCount || 0}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            v{purchase.version || '1.0.0'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleViewProduct(purchase)}
                            >
                              <Visibility />
                            </IconButton>
                            {purchase.status === 'completed' && (
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleDownload(purchase)}
                              >
                                <GetApp />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {searchQuery ? 'No products found matching your search' : 'No products found'}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Browse Expert Advisors
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </FadeInUp>

      {/* Product Detail Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    {selectedProduct.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {selectedProduct.description}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Purchase Date
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(selectedProduct.date)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Price
                  </Typography>
                  <Typography variant="body1">
                    {formatCurrency(selectedProduct.price)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip 
                    label={selectedProduct.status}
                    color={getStatusColor(selectedProduct.status)}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Version
                  </Typography>
                  <Typography variant="body1">
                    v{selectedProduct.version || '1.0.0'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          {selectedProduct?.status === 'completed' && (
            <Button 
              variant="contained" 
              startIcon={<GetApp />}
              onClick={() => handleDownload(selectedProduct)}
            >
              Download
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardProducts;

