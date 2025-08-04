import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  useScrollTrigger,
  Slide,
  Container,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  AccountCircle,
  Dashboard,
  ExitToApp,
  AdminPanelSettings,
  Store,
  ShoppingCart,
  Notifications,
  Person,
  Menu as MenuIcon,
  Close,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Login from '../auth/Login';
import { getAuthToken, setAuthToken } from '../../services/api';

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'scrolled',
})(({ theme, scrolled }) => ({
  background: scrolled 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderBottom: scrolled 
    ? `1px solid ${theme.palette.grey[200]}` 
    : 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  fontSize: '1.5rem',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.2s ease',
  },
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  margin: '0 8px',
  padding: '8px 20px',
  borderRadius: 25,
  fontWeight: 500,
  position: 'relative',
  background: active ? theme.palette.primary.main : 'transparent',
  color: active ? 'white' : theme.palette.text.primary,
  '&:hover': {
    background: active 
      ? theme.palette.primary.dark 
      : theme.palette.action.hover,
    transform: 'translateY(-1px)',
  },
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: theme.palette.primary.main,
  } : {},
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = getAuthToken();
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsLoggedIn(true);
      setIsAdmin(parsedUser.role === 'admin');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsAdmin(userData.role === 'admin');
    setLoginOpen(false);
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    handleClose();
    navigate('/');
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase() || 'U';
  };

  const navItems = [
    { label: 'Home', path: '/', icon: null },
    { label: 'Products', path: '/products', icon: <Store /> },
    { label: 'About', path: '/about', icon: null },
    { label: 'Contact', path: '/contact', icon: null },
  ];

  return (
    <HideOnScroll>
      <StyledAppBar position="fixed" elevation={0} scrolled={scrolled}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo */}
            <LogoText onClick={() => navigate('/')}>
              MQL5 Marketplace
            </LogoText>

            {/* Desktop Navigation */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center',
              gap: 1
            }}>
              {navItems.map((item) => (
                <NavButton
                  key={item.path}
                  startIcon={item.icon}
                  active={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </NavButton>
              ))}
            </Box>

            {/* User Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <Tooltip title="Notifications">
                    <IconButton color="inherit">
                      <Badge badgeContent={3} color="error">
                        <Notifications />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  {/* Cart */}
                  <Tooltip title="Shopping Cart">
                    <IconButton 
                      color="inherit"
                      onClick={() => navigate('/cart')}
                    >
                      <Badge badgeContent={1} color="secondary">
                        <ShoppingCart />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  {/* Admin Badge */}
                  {isAdmin && (
                    <Chip
                      label="Admin"
                      size="small"
                      color="secondary"
                      variant="outlined"
                      sx={{ 
                        display: { xs: 'none', sm: 'flex' },
                        fontWeight: 600
                      }}
                    />
                  )}
                  
                  {/* User Menu */}
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar 
                      sx={{ 
                        width: 36, 
                        height: 36, 
                        bgcolor: 'primary.main',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      {getInitials(user?.fullName)}
                    </Avatar>
                  </IconButton>
                  
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                      '& .MuiPaper-root': {
                        borderRadius: 2,
                        mt: 1,
                        minWidth: 200,
                        boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <MenuItem disabled sx={{ opacity: 1 }}>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {user?.fullName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {user?.email}
                        </Typography>
                      </Box>
                    </MenuItem>
                    
                    <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}>
                      <Dashboard sx={{ mr: 2 }} />
                      Dashboard
                    </MenuItem>
                    
                    <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                      <Person sx={{ mr: 2 }} />
                      Profile
                    </MenuItem>
                    
                    {isAdmin && (
                      <MenuItem onClick={() => { navigate('/admin'); handleClose(); }}>
                        <AdminPanelSettings sx={{ mr: 2 }} />
                        Admin Panel
                      </MenuItem>
                    )}
                    
                    <MenuItem onClick={handleLogout}>
                      <ExitToApp sx={{ mr: 2 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="outlined"
                    onClick={handleLoginOpen}
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="contained"
                    onClick={() => navigate('/auth/register')}
                  >
                    Get Started
                  </Button>
                </Box>
              )}

              {/* Mobile Menu Button */}
              <IconButton
                sx={{ display: { xs: 'flex', md: 'none' } }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                color="inherit"
              >
                {mobileMenuOpen ? <Close /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Toolbar>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                pb: 2,
                borderTop: 1,
                borderColor: 'divider',
                mt: 1,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  fullWidth
                  startIcon={item.icon}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  sx={{ 
                    justifyContent: 'flex-start',
                    py: 1.5,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary'
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Container>

        {/* Login Modal */}
        <Login 
          open={loginOpen} 
          onClose={handleLoginClose} 
          onLoginSuccess={handleLoginSuccess}
        />
      </StyledAppBar>
    </HideOnScroll>
  );
};

export default Header;

