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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Dashboard,
  People,
  ShoppingCart,
  AttachMoney,
  TrendingUp,
  Add,
  Edit,
  Delete,
  Visibility,
  Download,
  Upload,
  Settings,
  Notifications,
} from '@mui/icons-material';
import { DashboardLayout } from '../components/layout';
import CustomButton from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProductCard from '../components/ui/Card';
import Modal, { ConfirmDialog } from '../components/ui/Modal';
import Toast from '../components/ui/Toast';
import { FadeInUp, FadeInLeft } from '../components/ui/Animations';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminAPI, handleApiError } from '../services/api';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active tab based on URL
  const getActiveTabFromPath = (pathname) => {
    if (pathname.includes('/products')) return 0;
    if (pathname.includes('/users')) return 1;
    if (pathname.includes('/orders')) return 2;
    if (pathname.includes('/settings')) return 3;
    return 0; // Default to products tab
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath(location.pathname));
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample admin stats
  const sampleStats = {
    totalUsers: 1247,
    totalProducts: 56,
    totalSales: 8950000,
    monthlyGrowth: 15.5,
    pendingOrders: 8,
    activeProducts: 52
  };

  // Sample products data - will be replaced by API data
  const sampleProducts = [];

  // Sample users data - will be replaced by API data  
  const sampleUsers = [];

  // Sample orders data - will be replaced by API data
  const sampleOrders = [];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      console.log('🔄 AdminDashboard: Starting data load...');
      console.log('🎫 Token from localStorage:', localStorage.getItem('token') ? 'Found' : 'Not found');
      
      try {
        // Try to load data from API
        console.log('📡 Making API calls...');
        const [statsRes, productsRes, usersRes, ordersRes] = await Promise.allSettled([
          adminAPI.getStats(),
          adminAPI.getProducts(), 
          adminAPI.getUsers(),
          adminAPI.getOrders()
        ]);

        console.log('📊 API Results:', {
          stats: statsRes.status,
          products: productsRes.status,
          users: usersRes.status,
          orders: ordersRes.status
        });

        // Handle stats
        if (statsRes.status === 'fulfilled' && statsRes.value?.data?.success) {
          setStats(statsRes.value.data.data);
          console.log('✅ Stats loaded:', statsRes.value.data.data);
        } else {
          console.warn('❌ No stats from API, using sample:', statsRes);
          setStats(sampleStats);
        }

        // Handle products
        if (productsRes.status === 'fulfilled' && productsRes.value?.data?.success && productsRes.value.data.data?.length > 0) {
          // Transform Google Sheets data to admin dashboard format
          const transformedProducts = productsRes.value.data.data.map(product => ({
            id: product.id,
            name: product.name,
            author: 'MQL5 Developer', // Default author since Google Sheets doesn't have this field
            price: parseInt(product.price) || 0,
            sales: 0, // Will need to calculate from orders
            revenue: 0, // Will need to calculate from orders  
            status: product.status || 'active',
            uploadDate: product.created_at || new Date().toISOString(),
            description: product.description
          }));
          setProducts(transformedProducts);
          console.log('✅ Products loaded:', transformedProducts.length);
        } else {
          console.warn('❌ No products found from API:', productsRes);
          setProducts([]);
        }

        // Handle users
        if (usersRes.status === 'fulfilled' && usersRes.value?.data?.success && usersRes.value.data.data?.length > 0) {
          // Transform Google Sheets data to admin dashboard format
          const transformedUsers = usersRes.value.data.data.map(user => ({
            id: user.id,
            name: user.name || 'Unknown User',
            email: user.email,
            joinDate: user.created_at || new Date().toISOString(),
            totalPurchases: 0, // Will need to calculate from orders
            totalSpent: 0, // Will need to calculate from orders
            status: user.role === 'admin' ? 'admin' : 'active',
            role: user.role
          }));
          setUsers(transformedUsers);
          console.log('✅ Users loaded:', transformedUsers.length);
        } else {
          console.warn('❌ No users found from API:', usersRes);
          setUsers([]);
        }

        // Handle orders
        if (ordersRes.status === 'fulfilled' && ordersRes.value?.data?.success && ordersRes.value.data.data?.length > 0) {
          // Transform Google Sheets data to admin dashboard format
          const transformedOrders = ordersRes.value.data.data.map(order => ({
            id: order.id || order.payment_id || 'N/A',
            user: 'User ID: ' + order.user_id, // Will need to resolve user names
            product: 'Product ID: ' + order.product_id, // Will need to resolve product names
            amount: parseInt(order.amount) || 0,
            date: order.created_at || new Date().toISOString(),
            status: order.status || 'pending',
            payment_id: order.payment_id
          }));
          setOrders(transformedOrders);
          console.log('✅ Orders loaded:', transformedOrders.length);
        } else {
          console.warn('❌ No orders found from API:', ordersRes);
          setOrders([]);
        }

      } catch (err) {
        // If all API calls fail, use empty arrays and show connection error
        console.warn('API calls failed:', err);
        setStats(sampleStats);
        setProducts([]);
        setUsers([]);
        setOrders([]);
        setError('Unable to connect to server. Please check your connection and authentication.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Update tab when URL changes
  useEffect(() => {
    const newTab = getActiveTabFromPath(location.pathname);
    setActiveTab(newTab);
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    
    // Navigate to corresponding URL
    const paths = ['/admin/products', '/admin/users', '/admin/orders', '/admin/settings'];
    if (paths[newValue]) {
      navigate(paths[newValue]);
    }
  };

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'review': return 'warning';
      case 'inactive': return 'error';
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
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
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  const StatCard = ({ icon, title, value, subtitle, color = 'primary' }) => (
    <FadeInUp>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ color: `${color}.main`, mr: 2 }}>
              {React.cloneElement(icon, { sx: { fontSize: 40 } })}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" fontWeight="bold">
                {value}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </FadeInUp>
  );

  return (
    <DashboardLayout 
      user={{ fullName: 'Admin User', email: 'admin@mql5marketplace.com' }}
      isAdmin={true}
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          {error && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <FadeInUp>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Admin Dashboard
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Manage your MQL5 marketplace
              </Typography>
            </Box>
          </FadeInUp>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2 }} key="stats-users">
          <StatCard
            icon={<People />}
            title="Total Users"
            value={stats.totalUsers?.toLocaleString() || '0'}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }} key="stats-products">
          <StatCard
            icon={<ShoppingCart />}
            title="Products"
            value={stats.totalProducts || '0'}
            subtitle={`${stats.activeProducts || 0} active`}
            color="info"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }} key="stats-sales">
          <StatCard
            icon={<AttachMoney />}
            title="Total Sales"
            value={formatPrice(stats.totalSales || 0).replace('Rp', 'Rp ')}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }} key="stats-growth">
          <StatCard
            icon={<TrendingUp />}
            title="Growth"
            value={`+${stats.monthlyGrowth || 0}%`}
            subtitle="This month"
            color="warning"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }} key="stats-pending">
          <StatCard
            icon={<Notifications />}
            title="Pending"
            value={stats.pendingOrders || '0'}
            subtitle="Orders"
            color="error"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }} key="stats-active">
          <StatCard
            icon={<Dashboard />}
            title="Active"
            value={stats.activeProducts || '0'}
            subtitle="Products"
            color="primary"
          />
        </Grid>
      </Grid>

      {/* Tabs */}
      <FadeInLeft>
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab key="tab-products" label="Products" />
            <Tab key="tab-users" label="Users" />
            <Tab key="tab-orders" label="Orders" />
            <Tab key="tab-settings" label="Settings" />
          </Tabs>
        </Paper>
      </FadeInLeft>

      {/* Tab Content */}
      {activeTab === 0 && (
        <FadeInUp>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Products Management</Typography>
                <CustomButton
                  variant="gradient"
                  startIcon={<Add />}
                  onClick={() => handleOpenDialog('add-product')}
                >
                  Add Product
                </CustomButton>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Sales</TableCell>
                      <TableCell>Revenue</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.length > 0 ? products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Uploaded: {formatDate(product.uploadDate || product.created_at)}
                          </Typography>
                        </TableCell>
                        <TableCell>{product.author || 'MQL5 Developer'}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell>{product.sales || 0}</TableCell>
                        <TableCell>{formatPrice(product.revenue || 0)}</TableCell>
                        <TableCell>
                          <Chip
                            label={product.status}
                            color={getStatusColor(product.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" onClick={() => handleOpenDialog('view-product', product)}>
                            <Visibility />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleOpenDialog('edit-product', product)}>
                            <Edit />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Typography variant="body2" color="text.secondary">
                            No products found. Products from Google Sheets will appear here.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </FadeInUp>
      )}

      {activeTab === 1 && (
        <FadeInUp>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Users Management
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>Purchases</TableCell>
                      <TableCell>Total Spent</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length > 0 ? users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.email}
                          </Typography>
                        </TableCell>
                        <TableCell>{formatDate(user.joinDate || user.created_at)}</TableCell>
                        <TableCell>{user.totalPurchases || 0}</TableCell>
                        <TableCell>{formatPrice(user.totalSpent || 0)}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            color={getStatusColor(user.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                          <IconButton size="small">
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography variant="body2" color="text.secondary">
                            No users found. Users from Google Sheets will appear here.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </FadeInUp>
      )}

      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Orders Management
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.length > 0 ? orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {order.id || order.payment_id || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>{order.user}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{formatPrice(order.amount)}</TableCell>
                      <TableCell>{formatDate(order.date || order.created_at)}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <Visibility />
                        </IconButton>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant="body2" color="text.secondary">
                          No orders found. Orders from Google Sheets will appear here.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }} key="settings-system">
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Settings
                </Typography>
                <List>
                  <ListItem key="commission-rate">
                    <ListItemText
                      primary="Commission Rate"
                      secondary="Current: 15%"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem key="payment-gateway">
                    <ListItemText
                      primary="Payment Gateway"
                      secondary="Midtrans"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Settings />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem key="telegram-bot">
                    <ListItemText
                      primary="Telegram Bot"
                      secondary="@ladangpertanianbot"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Settings />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }} key="settings-actions">
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button key="bulk-upload" variant="outlined" startIcon={<Upload />}>
                    Bulk Upload Products
                  </Button>
                  <Button key="export-report" variant="outlined" startIcon={<Download />}>
                    Export Sales Report
                  </Button>
                  <Button key="send-notifications" variant="outlined" startIcon={<Notifications />}>
                    Send Notifications
                  </Button>
                  <Button key="system-maintenance" variant="outlined" startIcon={<Settings />}>
                    System Maintenance
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Dialogs */}
      <Modal
        open={openDialog}
        onClose={handleCloseDialog}
        title={
          dialogType === 'add-product' ? 'Add New Product' :
          dialogType === 'edit-product' ? 'Edit Product' :
          'Product Details'
        }
        maxWidth="md"
      >
        {(dialogType === 'add-product' || dialogType === 'edit-product') && (
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Product Name"
              defaultValue={selectedItem?.name || ''}
            />
            <TextField
              fullWidth
              label="Author"
              defaultValue={selectedItem?.author || ''}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              defaultValue={selectedItem?.price || ''}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                defaultValue={selectedItem?.status || 'active'}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="review">Under Review</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <CustomButton variant="text" onClick={handleCloseDialog}>
                Cancel
              </CustomButton>
              <CustomButton variant="gradient">
                {dialogType === 'add-product' ? 'Add Product' : 'Save Changes'}
              </CustomButton>
            </Box>
          </Box>
        )}
        
        {dialogType === 'view-product' && selectedItem && (
          <Box sx={{ pt: 2 }}>
            <Typography><strong>Name:</strong> {selectedItem.name}</Typography>
            <Typography><strong>Author:</strong> {selectedItem.author}</Typography>
            <Typography><strong>Price:</strong> {formatPrice(selectedItem.price)}</Typography>
            <Typography><strong>Sales:</strong> {selectedItem.sales}</Typography>
            <Typography><strong>Revenue:</strong> {formatPrice(selectedItem.revenue)}</Typography>
            <Typography><strong>Status:</strong> {selectedItem.status}</Typography>
          </Box>
        )}
      </Modal>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;

