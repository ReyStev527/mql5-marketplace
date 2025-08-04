// frontend/src/components/auth/Login.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  AdminPanelSettings,
} from '@mui/icons-material';
import { authAPI, setAuthToken } from '../../services/api';
import { mockAuthAPI, checkBackendConnection } from '../../services/mockAuth';

const Login = ({ open, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login to:', 'http://localhost:3000/api/auth/login');
      console.log('With credentials:', { email: formData.email, password: '***' });
      
      // Check if backend is available
      const backendAvailable = await checkBackendConnection();
      let response;
      
      if (backendAvailable) {
        console.log('Using real backend API');
        response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
      } else {
        console.log('Backend not available, using mock data');
        response = await mockAuthAPI.login({
          email: formData.email,
          password: formData.password
        });
      }

      console.log('Login response:', response);

      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store token
        setAuthToken(token);
        
        // Store user info
        localStorage.setItem('user', JSON.stringify(user));
        
        // Remember me functionality
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Call success callback
        if (onLoginSuccess) {
          onLoginSuccess(user);
        }

        // Close dialog
        onClose();

        // Reset form
        setFormData({
          email: '',
          password: '',
          rememberMe: false
        });
      }
    } catch (error) {
      console.error('Login error details:', error);
      
      if (error.message === 'Invalid credentials') {
        setError('Invalid email or password. Please check your credentials.');
      } else if (error.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Using demo mode with mock data.');
        // Try mock login as fallback
        try {
          const mockResponse = await mockAuthAPI.login({
            email: formData.email,
            password: formData.password
          });
          
          if (mockResponse.data.success) {
            const { token, user } = mockResponse.data;
            setAuthToken(token);
            localStorage.setItem('user', JSON.stringify(user));
            if (onLoginSuccess) onLoginSuccess(user);
            onClose();
            setFormData({ email: '', password: '', rememberMe: false });
            return;
          }
        } catch (mockError) {
          setError('Invalid credentials for demo mode.');
        }
      } else if (error.response) {
        setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
      } else {
        setError('Network error. Please check if the backend server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdminQuickLogin = () => {
    setFormData({
      email: 'admin@mql5marketplace.com',
      password: 'admin123',
      rememberMe: false
    });
    setIsAdminLogin(true);
  };

  const handleUserQuickLogin = () => {
    setFormData({
      email: 'user@example.com',
      password: 'user123',
      rememberMe: false
    });
    setIsAdminLogin(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Person />
          <Typography variant="h6">
            Login to MQL5 Marketplace
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Quick Login Buttons for Demo */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Quick Login (Demo):
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AdminPanelSettings />}
              onClick={handleAdminQuickLogin}
              sx={{ textTransform: 'none' }}
            >
              Admin Login
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Person />}
              onClick={handleUserQuickLogin}
              sx={{ textTransform: 'none' }}
            >
              User Login
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            autoComplete="email"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="current-password"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
            }
            label="Remember me"
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Demo Credentials Info */}
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Demo Credentials:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Admin:</strong> admin@mql5marketplace.com / admin123<br />
            <strong>User:</strong> user@example.com / user123
          </Typography>
        </Box>

        {/* Debug Info */}
        <Box sx={{ mt: 1, p: 1, bgcolor: 'info.main', color: 'white', borderRadius: 1, fontSize: '0.8rem' }}>
          <Typography variant="caption">
            🔧 Demo Mode: Works without backend server<br />
            🚀 Full Mode: Start backend on port 3000 for complete functionality
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !formData.email || !formData.password}
          sx={{ px: 4 }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;

