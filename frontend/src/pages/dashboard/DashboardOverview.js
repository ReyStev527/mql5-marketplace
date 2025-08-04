import React from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Person,
  ShoppingCart,
  Download,
  History,
  AccountCircle,
  Email,
  Phone,
  Edit,
  Visibility,
  GetApp,
  TrendingUp,
  AttachMoney,
  Timeline,
} from '@mui/icons-material';
import { FadeInUp } from '../../components/ui/Animations';
import { formatCurrency, formatDate } from '../../utils/formatters';

const DashboardOverview = ({ user, purchases, onEditProfile }) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const displayPurchases = purchases && purchases.length > 0 ? purchases : samplePurchases;

  return (
    <>
      <FadeInUp>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            My Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Welcome back, {user?.name || 'User'}!
          </Typography>
        </Box>
      </FadeInUp>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShoppingCart sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {user?.totalPurchases || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Purchases
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AttachMoney sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {formatCurrency(user?.totalSpent || 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Spent
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Download sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {displayPurchases.filter(p => p.status === 'completed').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Downloaded
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Timeline sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {user?.joinDate ? formatDate(user.joinDate) : 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Member Since
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}
                  >
                    {user?.name?.charAt(0) || 'U'}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {user?.name || 'User'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Member
                    </Typography>
                  </Box>
                  <IconButton onClick={onEditProfile} color="primary">
                    <Edit />
                  </IconButton>
                </Box>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Email color="action" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={user?.email || 'email@example.com'}
                      secondary="Email Address"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone color="action" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={user?.phone || 'Not provided'}
                      secondary="Phone Number"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AccountCircle color="action" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={user?.joinDate ? formatDate(user.joinDate) : 'N/A'}
                      secondary="Member Since"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        {/* Recent Orders */}
        <Grid size={{ xs: 12, md: 8 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Recent Orders
                  </Typography>
                  <Button variant="outlined" size="small">
                    View All
                  </Button>
                </Box>

                {displayPurchases.length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {displayPurchases.slice(0, 5).map((purchase) => (
                          <TableRow key={purchase.id}>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {purchase.productName}
                              </Typography>
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
                              {purchase.status === 'completed' ? (
                                <IconButton size="small" color="primary">
                                  <GetApp />
                                </IconButton>
                              ) : (
                                <IconButton size="small">
                                  <Visibility />
                                </IconButton>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      No orders found
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>
                      Browse Expert Advisors
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardOverview;

