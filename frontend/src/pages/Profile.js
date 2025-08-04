import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Divider,
  Paper,
  IconButton,
  Badge,
  Alert,
  LinearProgress,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Person,
  ShoppingBag,
  Settings,
  Security,
  Notifications,
  Download,
  Star,
  Edit,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`profile-tabpanel-${index}`}
    aria-labelledby={`profile-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    city: 'New York',
    bio: 'Professional forex trader with 5+ years of experience in algorithmic trading.',
    joinDate: '2023-01-15',
    totalPurchases: 5,
    totalSpent: 1247,
    avatar: null,
  });

  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-08-01',
      status: 'Completed',
      total: 299,
      items: [
        {
          name: 'Scalping Master EA Pro',
          price: 299,
          image: '/api/placeholder/60/60'
        }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-07-28',
      status: 'Completed',
      total: 199,
      items: [
        {
          name: 'Trend Following Expert',
          price: 199,
          image: '/api/placeholder/60/60'
        }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-07-15',
      status: 'Completed',
      total: 149,
      items: [
        {
          name: 'Grid Recovery EA',
          price: 149,
          image: '/api/placeholder/60/60'
        }
      ]
    },
  ]);

  const [downloads] = useState([
    {
      id: 1,
      name: 'Scalping Master EA Pro',
      downloadDate: '2024-08-01',
      version: 'v2.1.0',
      fileSize: '2.5 MB',
      downloads: 3,
    },
    {
      id: 2,
      name: 'Trend Following Expert',
      downloadDate: '2024-07-28',
      version: 'v1.8.2',
      fileSize: '1.8 MB',
      downloads: 2,
    },
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    downloadHistory: true,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    // API call to save profile
    console.log('Saving profile:', profile);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // Reset to original values
  };

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Processing':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase() || 'JD';
  };

  return (
    <>
      <Helmet>
        <title>My Profile - MQL5 Marketplace</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          My Profile
        </Typography>

        <Grid container spacing={4}>
          {/* Profile Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={{ border: 1, borderColor: 'grey.200' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  }
                >
                  <Avatar
                    src={profile.avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: '3rem',
                    }}
                  >
                    {getInitials(profile.fullName)}
                  </Avatar>
                </Badge>
                
                <Typography variant="h5" gutterBottom>
                  {profile.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {profile.email}
                </Typography>
                
                {/* Stats */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {profile.totalPurchases}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Purchases
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">
                        ${profile.totalSpent}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Spent
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Typography variant="body2" color="text.secondary">
                  Member since {new Date(profile.joinDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Profile Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card elevation={0} sx={{ border: 1, borderColor: 'grey.200' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab icon={<Person />} label="Profile" iconPosition="start" />
                  <Tab icon={<ShoppingBag />} label="Orders" iconPosition="start" />
                  <Tab icon={<Download />} label="Downloads" iconPosition="start" />
                  <Tab icon={<Settings />} label="Settings" iconPosition="start" />
                </Tabs>
              </Box>

              {/* Profile Tab */}
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">
                    Personal Information
                  </Typography>
                  {!editMode ? (
                    <Button
                      startIcon={<Edit />}
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box>
                      <Button
                        startIcon={<Save />}
                        onClick={handleSaveProfile}
                        sx={{ mr: 1 }}
                        variant="contained"
                      >
                        Save
                      </Button>
                      <Button
                        startIcon={<Cancel />}
                        onClick={handleCancelEdit}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={profile.fullName}
                      onChange={(e) => handleProfileUpdate('fullName', e.target.value)}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileUpdate('email', e.target.value)}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={profile.phone}
                      onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Country"
                      value={profile.country}
                      onChange={(e) => handleProfileUpdate('country', e.target.value)}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      multiline
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                      disabled={!editMode}
                      placeholder="Tell us about yourself and your trading experience..."
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Orders Tab */}
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  Order History
                </Typography>
                <List>
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <ListItem
                        sx={{
                          border: 1,
                          borderColor: 'grey.200',
                          borderRadius: 1,
                          mb: 2,
                          p: 2,
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle1" fontWeight={600}>
                                Order #{order.id}
                              </Typography>
                              <Chip
                                label={order.status}
                                color={getStatusColor(order.status)}
                                size="small"
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Date: {new Date(order.date).toLocaleDateString()}
                              </Typography>
                              
                              {/* Order Items */}
                              {order.items.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Avatar
                                    src={item.image}
                                    variant="rounded"
                                    sx={{ width: 40, height: 40, mr: 2 }}
                                  />
                                  <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body2">
                                      {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      ${item.price}
                                    </Typography>
                                  </Box>
                                </Box>
                              ))}
                              
                              <Typography variant="subtitle2" color="primary" sx={{ mt: 2 }}>
                                Total: ${order.total}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              {/* Downloads Tab */}
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  My Downloads
                </Typography>
                <List>
                  {downloads.map((item) => (
                    <ListItem
                      key={item.id}
                      sx={{
                        border: 1,
                        borderColor: 'grey.200',
                        borderRadius: 1,
                        mb: 2,
                        p: 2,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {item.name}
                            </Typography>
                            <Button
                              startIcon={<Download />}
                              size="small"
                              variant="outlined"
                            >
                              Download
                            </Button>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Version: {item.version} • Size: {item.fileSize}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Downloaded: {new Date(item.downloadDate).toLocaleDateString()} • Times: {item.downloads}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              {/* Settings Tab */}
              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                
                {/* Notifications */}
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Notifications
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={() => handleSettingChange('emailNotifications')}
                      />
                    }
                    label="Email notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.pushNotifications}
                        onChange={() => handleSettingChange('pushNotifications')}
                      />
                    }
                    label="Push notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.marketingEmails}
                        onChange={() => handleSettingChange('marketingEmails')}
                      />
                    }
                    label="Marketing emails"
                  />
                </Paper>

                {/* Security */}
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Security
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.twoFactorAuth}
                        onChange={() => handleSettingChange('twoFactorAuth')}
                      />
                    }
                    label="Two-factor authentication"
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Change Password
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={12}>
                        <TextField
                          fullWidth
                          label="Current Password"
                          type={showPassword ? 'text' : 'password'}
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="New Password"
                          type="password"
                          size="small"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Confirm New Password"
                          type="password"
                          size="small"
                        />
                      </Grid>
                      <Grid size={12}>
                        <Button variant="contained" size="small">
                          Update Password
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>

                {/* Privacy */}
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Privacy
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.downloadHistory}
                        onChange={() => handleSettingChange('downloadHistory')}
                      />
                    }
                    label="Keep download history"
                  />
                </Paper>
              </TabPanel>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;

