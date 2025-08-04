import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 280;

const Main = styled('main')(({ theme, sidebarOpen }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  background: theme.palette.background.default,
  marginLeft: sidebarOpen ? DRAWER_WIDTH : 0,
  width: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
  paddingTop: 64, // AppBar height
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    width: '100%',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const DashboardLayout = ({ 
  children, 
  user = { fullName: 'Admin User', email: 'admin@example.com' },
  isAdmin = false,
  defaultSidebarOpen = true 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile && defaultSidebarOpen);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle responsive sidebar behavior
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(defaultSidebarOpen);
    }
  }, [isMobile, defaultSidebarOpen]);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleMobileDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* TopBar */}
      <TopBar
        onMenuClick={handleSidebarToggle}
        user={user}
        isAdmin={isAdmin}
      />

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileDrawerClose}
        isAdmin={isAdmin}
        user={user}
      />

      {/* Main Content */}
      <Main sidebarOpen={sidebarOpen && !isMobile}>
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </Main>
    </Box>
  );
};

export default DashboardLayout;

