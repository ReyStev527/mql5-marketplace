import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import {
  Dashboard,
  ShoppingCart,
  TrendingUp,
  Security,
} from '@mui/icons-material';
import { DashboardLayout } from '../components/layout';
import { userAPI, authAPI } from '../services/api';

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  // Sample user data
  const sampleUser = {
    id: 1,
    name: 'John Trader',
    email: 'john@example.com',
    phone: '+62812345678',
    joinDate: '2024-01-15',
    totalPurchases: 5,
    totalSpent: 750000,
    avatar: null
  };

  // Sample purchases data
  const samplePurchases = [
    {
      id: 1,
      productName: 'Advanced EA Bot',
      date: '2024-01-15',
      price: 150000,
      status: 'completed'
    },
    {
      id: 2,
      productName: 'Scalping Expert',
      date: '2024-01-10',
      price: 200000,
      status: 'completed'
    },
    {
      id: 3,
      productName: 'News Trader',
      date: '2024-01-08',
      price: 100000,
      status: 'processing'
    }
  ];

  // Tab configuration
  const tabs = [
    { label: 'Overview', icon: <Dashboard />, path: '/dashboard' },
    { label: 'Products', icon: <ShoppingCart />, path: '/dashboard/products' },
    { label: 'Performance', icon: <TrendingUp />, path: '/dashboard/performance' },
    { label: 'Security', icon: <Security />, path: '/dashboard/security' }
  ];

  // Determine active tab based on URL
  useEffect(() => {
    const currentPath = location.pathname;
    const tabIndex = tabs.findIndex(tab => tab.path === currentPath);
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    } else {
      // Default to overview if no match
      setActiveTab(0);
    }
  }, [location.pathname]);

  // Load user data and purchases
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const [userResponse, ordersResponse] = await Promise.all([
          authAPI.getProfile(),
          userAPI.getOrders()
        ]);
        
        // Backend returns response.profile and response.orders
        setUser(userResponse.data.profile || sampleUser);
        setPurchases(ordersResponse.data.orders || samplePurchases);
        setProfileData(userResponse.data.profile || sampleUser);
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to sample data
        setUser(sampleUser);
        setPurchases(samplePurchases);
        setProfileData(sampleUser);
      }
    };

    loadUserData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    navigate(tabs[newValue].path);
  };

  const handleEditProfile = () => {
    setEditProfile(true);
  };

  const handleSaveProfile = async () => {
    try {
      await authAPI.updateProfile(profileData);
      setUser(profileData);
      setEditProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return (
      <DashboardLayout 
        user={{ fullName: 'Loading...', email: '' }}
        isAdmin={false}
      >
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h6">Loading dashboard...</Typography>
        </Box>
      </DashboardLayout>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Welcome back, {user.name}!</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Here's your account summary
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Total Purchases: {user.totalPurchases}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      You have {purchases.length} items in your collection
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              My Products
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  You have {purchases.length} products in your collection.
                </Typography>
                {purchases.map((purchase) => (
                  <Box key={purchase.id} sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                    <Typography variant="h6">{purchase.productName}</Typography>
                    <Typography variant="body2">Status: {purchase.status}</Typography>
                    <Typography variant="body2">Price: {purchase.price}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              Performance Analytics
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  Performance analytics will be displayed here.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              Security Settings
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  Security settings and options will be displayed here.
                </Typography>
                <Button variant="outlined" onClick={handleEditProfile} sx={{ mt: 2 }}>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              Dashboard Overview
            </Typography>
            <Typography variant="body1">Welcome to your dashboard</Typography>
          </Box>
        );
    }
  };

  return (
    <DashboardLayout 
      user={{ fullName: user.fullName || user.name || 'User', email: user.email || 'user@example.com' }}
      isAdmin={false}
    >
      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab 
              key={index}
              icon={tab.icon}
              label={tab.label}
              iconPosition="start"
              sx={{ 
                minHeight: 48,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: activeTab === index ? 600 : 400
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Edit Profile Dialog */}
      <Dialog open={editProfile} onClose={() => setEditProfile(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={profileData.name || ''}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={profileData.email || ''}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              value={profileData.phone || ''}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProfile(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserDashboard;

