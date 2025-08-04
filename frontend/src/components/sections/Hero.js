import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp,
  Security,
  Speed,
  Support,
  Download,
  PlayArrow,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../ui/Button';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.1)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.palette.primary.main.slice(1)}' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
}));

const FloatingCard = styled(Card)(({ theme, delay = 0 }) => ({
  position: 'absolute',
  borderRadius: 16,
  background: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  animation: `float 6s ease-in-out infinite ${delay}s`,
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const stats = [
    { icon: <TrendingUp />, label: 'Success Rate', value: '95%', color: 'success' },
    { icon: <Download />, label: 'Downloads', value: '10K+', color: 'primary' },
    { icon: <Security />, label: 'Secure', value: '100%', color: 'warning' },
    { icon: <Support />, label: 'Support', value: '24/7', color: 'info' },
  ];

  return (
    <HeroSection>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 4 }}>
              <Chip 
                label="🚀 New Release Available"
                color="primary"
                variant="outlined"
                sx={{ 
                  mb: 3,
                  fontWeight: 600,
                  borderRadius: 25,
                }}
              />
              
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  lineHeight: 1.1,
                }}
              >
                Advanced MQL5
                <br />
                Expert Advisors
              </Typography>
              
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ 
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  maxWidth: '600px'
                }}
              >
                Unlock profitable trading with our premium collection of 
                professionally coded Expert Advisors. Instant delivery, 
                lifetime updates, and 24/7 support.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <CustomButton
                  variant="gradient"
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={() => navigate('/products')}
                  glow
                  sx={{ px: 4, py: 1.5 }}
                >
                  Explore Products
                </CustomButton>
                
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Speed />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Watch Demo
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Automated Trading" size="small" />
                <Chip label="Risk Management" size="small" />
                <Chip label="Backtested" size="small" />
                <Chip label="Optimized" size="small" />
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative', height: '600px' }}>
              {/* Floating Cards */}
              <FloatingCard 
                sx={{ top: 50, right: 20, width: 200 }}
                delay={0}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUp color="success" />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        +127% Profit
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last Month
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </FloatingCard>

              <FloatingCard 
                sx={{ top: 200, left: 0, width: 180 }}
                delay={1}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Security color="primary" />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        100% Secure
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Licensed EAs
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </FloatingCard>

              <FloatingCard 
                sx={{ bottom: 100, right: 50, width: 160 }}
                delay={2}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Speed color="warning" />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        1ms Latency
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Ultra Fast
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </FloatingCard>

              {/* Stats Grid */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                }}
              >
                <Grid container spacing={2}>
                  {stats.map((stat, index) => (
                    <Grid size={{ xs: 6 }} key={index}>
                      <StatCard>
                        <CardContent sx={{ p: 2, textAlign: 'center' }}>
                          <Box sx={{ color: `${stat.color}.main`, mb: 1 }}>
                            {stat.icon}
                          </Box>
                          <Typography variant="h6" fontWeight={700}>
                            {stat.value}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </StatCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </HeroSection>
  );
};

export default Hero;

