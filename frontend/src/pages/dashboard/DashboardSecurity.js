import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Security,
  VpnKey,
  Notifications,
  Email,
  Sms,
  Shield,
  Lock,
  Visibility,
  VisibilityOff,
  Warning,
  CheckCircle,
  Error,
  DevicesOther,
  LocationOn,
} from '@mui/icons-material';
import { FadeInUp } from '../../components/ui/Animations';
import { formatDate } from '../../utils/formatters';

const DashboardSecurity = () => {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
    passwordExpiry: false,
    sessionTimeout: true
  });

  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const recentActivity = [
    {
      id: 1,
      action: 'Login',
      device: 'Windows PC - Chrome',
      location: 'Jakarta, Indonesia',
      ip: '192.168.1.100',
      timestamp: '2024-01-15 14:30:22',
      status: 'success'
    },
    {
      id: 2,
      action: 'Password Changed',
      device: 'Windows PC - Chrome',
      location: 'Jakarta, Indonesia',
      ip: '192.168.1.100',
      timestamp: '2024-01-14 10:15:45',
      status: 'success'
    },
    {
      id: 3,
      action: 'Failed Login Attempt',
      device: 'Unknown Device',
      location: 'Unknown Location',
      ip: '45.123.456.789',
      timestamp: '2024-01-13 22:45:12',
      status: 'warning'
    },
    {
      id: 4,
      action: 'Login',
      device: 'Android Phone - Chrome',
      location: 'Jakarta, Indonesia',
      ip: '192.168.1.101',
      timestamp: '2024-01-12 16:20:33',
      status: 'success'
    }
  ];

  const activeSessions = [
    {
      id: 1,
      device: 'Windows PC - Chrome',
      location: 'Jakarta, Indonesia',
      ip: '192.168.1.100',
      lastActive: '2024-01-15 14:30:22',
      current: true
    },
    {
      id: 2,
      device: 'Android Phone - Chrome',
      location: 'Jakarta, Indonesia',
      ip: '192.168.1.101',
      lastActive: '2024-01-14 08:15:30',
      current: false
    }
  ];

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleChangePassword = () => {
    // Implement password change logic
    console.log('Changing password...');
    setChangePasswordDialog(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleTerminateSession = (sessionId) => {
    // Implement session termination logic
    console.log('Terminating session:', sessionId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle color="success" />;
      case 'warning': return <Warning color="warning" />;
      case 'error': return <Error color="error" />;
      default: return <CheckCircle />;
    }
  };

  return (
    <>
      <FadeInUp>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Security & Settings
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your account security and privacy settings
          </Typography>
        </Box>
      </FadeInUp>

      <Grid container spacing={3}>
        {/* Security Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Security sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Security Settings
                  </Typography>
                </Box>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Shield color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Two-Factor Authentication"
                      secondary="Add an extra layer of security"
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.twoFactorAuth}
                            onChange={() => handleSettingChange('twoFactorAuth')}
                          />
                        }
                        label=""
                      />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider />

                  <ListItem>
                    <ListItemIcon>
                      <Lock color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Login Alerts"
                      secondary="Get notified of new login attempts"
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.loginAlerts}
                            onChange={() => handleSettingChange('loginAlerts')}
                          />
                        }
                        label=""
                      />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider />

                  <ListItem>
                    <ListItemIcon>
                      <VpnKey color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Password Expiry"
                      secondary="Require password change every 90 days"
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.passwordExpiry}
                            onChange={() => handleSettingChange('passwordExpiry')}
                          />
                        }
                        label=""
                      />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider />

                  <ListItem>
                    <ListItemIcon>
                      <DevicesOther color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Session Timeout"
                      secondary="Auto logout after 30 minutes of inactivity"
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.sessionTimeout}
                            onChange={() => handleSettingChange('sessionTimeout')}
                          />
                        }
                        label=""
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>

                <Box sx={{ mt: 3 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => setChangePasswordDialog(true)}
                  >
                    Change Password
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        {/* Notification Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Notifications sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Notification Settings
                  </Typography>
                </Box>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email Notifications"
                      secondary="Receive updates via email"
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.emailNotifications}
                            onChange={() => handleSettingChange('emailNotifications')}
                          />
                        }
                        label=""
                      />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider />

                  <ListItem>
                    <ListItemIcon>
                      <Sms color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="SMS Notifications"
                      secondary="Receive alerts via SMS"
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.smsNotifications}
                            onChange={() => handleSettingChange('smsNotifications')}
                          />
                        }
                        label=""
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>

                <Alert severity="info" sx={{ mt: 3 }}>
                  Notification preferences will apply to security alerts, purchase confirmations, and system updates.
                </Alert>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        {/* Active Sessions */}
        <Grid size={{ xs: 12 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Active Sessions
                </Typography>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Device</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>IP Address</TableCell>
                        <TableCell>Last Active</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activeSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <DevicesOther sx={{ mr: 1, color: 'primary.main' }} />
                              {session.device}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                              {session.location}
                            </Box>
                          </TableCell>
                          <TableCell>{session.ip}</TableCell>
                          <TableCell>{formatDate(session.lastActive)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={session.current ? 'Current Session' : 'Active'}
                              color={session.current ? 'primary' : 'success'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {!session.current && (
                              <Button 
                                size="small" 
                                color="error"
                                onClick={() => handleTerminateSession(session.id)}
                              >
                                Terminate
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Recent Security Activity
                </Typography>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Action</TableCell>
                        <TableCell>Device</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>IP Address</TableCell>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentActivity.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {getStatusIcon(activity.status)}
                              <Typography sx={{ ml: 1 }}>
                                {activity.action}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{activity.device}</TableCell>
                          <TableCell>{activity.location}</TableCell>
                          <TableCell>{activity.ip}</TableCell>
                          <TableCell>{formatDate(activity.timestamp)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={activity.status}
                              color={getStatusColor(activity.status)}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordDialog} onClose={() => setChangePasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Current Password"
              type={showPasswords.current ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  >
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </Button>
                )
              }}
            />
            <TextField
              fullWidth
              label="New Password"
              type={showPasswords.new ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </Button>
                )
              }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  >
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </Button>
                )
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleChangePassword}>
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardSecurity;

