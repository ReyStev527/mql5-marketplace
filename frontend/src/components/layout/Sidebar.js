import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Divider,
  IconButton,
  Typography,
  Box,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard,
  Store,
  People,
  Assessment,
  Settings,
  CloudUpload,
  Download,
  Payment,
  Telegram,
  ExpandLess,
  ExpandMore,
  MenuOpen,
  AdminPanelSettings,
  TrendingUp,
  Security,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
    color: theme.palette.common.white,
    borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  },
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  display: 'flex',
  alignItems: 'center',
  background: alpha(theme.palette.primary.main, 0.1),
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: 12,
  padding: theme.spacing(1, 2),
  transition: 'all 0.3s ease',
  ...(active && {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    },
  }),
  '&:hover': {
    background: active 
      ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
      : alpha(theme.palette.primary.main, 0.1),
    transform: 'translateX(4px)',
  },
}));

const Sidebar = ({ open, onClose, isAdmin = false }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [expandedItems, setExpandedItems] = useState({});

  const handleExpand = (itemKey) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const adminMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <Dashboard />,
      path: '/admin',
    },
    {
      key: 'products',
      label: 'Products',
      icon: <Store />,
      children: [
        { label: 'All Products', path: '/admin/products' },
        { label: 'Add New', path: '/admin/products/new' },
        { label: 'Categories', path: '/admin/categories' },
      ],
    },
    {
      key: 'users',
      label: 'Users',
      icon: <People />,
      path: '/admin/users',
    },
    {
      key: 'orders',
      label: 'Orders',
      icon: <Payment />,
      path: '/admin/orders',
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <Assessment />,
      children: [
        { label: 'Sales Report', path: '/admin/analytics/sales' },
        { label: 'User Analytics', path: '/admin/analytics/users' },
        { label: 'Performance', path: '/admin/analytics/performance' },
      ],
    },
    {
      key: 'compiler',
      label: 'EA Compiler',
      icon: <CloudUpload />,
      path: '/admin/compiler',
    },
    {
      key: 'telegram',
      label: 'Telegram Bot',
      icon: <Telegram />,
      path: '/admin/telegram',
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <Settings />,
      path: '/admin/settings',
    },
  ];

  const userMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
    },
    {
      key: 'my-products',
      label: 'My Products',
      icon: <Download />,
      path: '/dashboard/products',
    },
    {
      key: 'orders',
      label: 'Order History',
      icon: <Payment />,
      path: '/dashboard/orders',
    },
    {
      key: 'performance',
      label: 'Performance',
      icon: <TrendingUp />,
      path: '/dashboard/performance',
    },
    {
      key: 'security',
      label: 'Security',
      icon: <Security />,
      path: '/dashboard/security',
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <Settings />,
      path: '/dashboard/settings',
    },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const renderMenuItem = (item) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.key];
    const isActive = hasChildren 
      ? item.children.some(child => isActivePath(child.path))
      : isActivePath(item.path);

    return (
      <Box key={item.key}>
        <StyledListItemButton
          active={isActive}
          onClick={() => {
            if (hasChildren) {
              handleExpand(item.key);
            } else {
              handleNavigation(item.path);
            }
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.label}
            sx={{ 
              '& .MuiTypography-root': { 
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.875rem'
              }
            }}
          />
          {hasChildren && (
            isExpanded ? <ExpandLess /> : <ExpandMore />
          )}
        </StyledListItemButton>

        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child, index) => (
                <StyledListItemButton
                  key={index}
                  active={isActivePath(child.path)}
                  onClick={() => handleNavigation(child.path)}
                  sx={{ pl: 6 }}
                >
                  <ListItemText 
                    primary={child.label}
                    sx={{ 
                      '& .MuiTypography-root': { 
                        fontSize: '0.8rem',
                        fontWeight: isActivePath(child.path) ? 600 : 400
                      }
                    }}
                  />
                </StyledListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      <SidebarHeader>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            mr: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
        >
          {isAdmin ? <AdminPanelSettings /> : <Dashboard />}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
            {isAdmin ? 'Admin Panel' : 'Dashboard'}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            MQL5 Marketplace
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={onClose} sx={{ color: 'inherit' }}>
            <MenuOpen />
          </IconButton>
        )}
      </SidebarHeader>

      <Box sx={{ overflow: 'auto', flexGrow: 1, py: 1 }}>
        <List>
          {menuItems.map(renderMenuItem)}
        </List>
      </Box>

      <Divider sx={{ borderColor: alpha(theme.palette.common.white, 0.1) }} />
      
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ opacity: 0.5 }}>
          © 2024 MQL5 Marketplace
        </Typography>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;

