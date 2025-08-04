import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material';
import {
  AutoAwesome,
  Shield,
  Speed,
  Support,
  TrendingUp,
  Code,
  CloudDownload,
  Assessment,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: `0px 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
}));

const FeatureIcon = styled(Avatar)(({ theme, color }) => ({
  width: 60,
  height: 60,
  background: `linear-gradient(135deg, ${theme.palette[color]?.main || theme.palette.primary.main} 0%, ${theme.palette[color]?.dark || theme.palette.primary.dark} 100%)`,
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
}));

const Features = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <AutoAwesome />,
      title: 'AI-Powered Trading',
      description: 'Advanced algorithms with machine learning capabilities for optimal trading decisions.',
      color: 'primary',
    },
    {
      icon: <Shield />,
      title: 'Bank-Level Security',
      description: 'Your strategies are protected with enterprise-grade encryption and secure licensing.',
      color: 'success',
    },
    {
      icon: <Speed />,
      title: 'Lightning Fast',
      description: 'Optimized code execution with minimal latency for high-frequency trading.',
      color: 'warning',
    },
    {
      icon: <Support />,
      title: '24/7 Expert Support',
      description: 'Professional trading experts available around the clock for assistance.',
      color: 'info',
    },
    {
      icon: <TrendingUp />,
      title: 'Proven Performance',
      description: 'Backtested strategies with verified performance across multiple market conditions.',
      color: 'secondary',
    },
    {
      icon: <Code />,
      title: 'Clean Code',
      description: 'Professional-grade MQL5 code following best practices and industry standards.',
      color: 'primary',
    },
    {
      icon: <CloudDownload />,
      title: 'Instant Delivery',
      description: 'Download your EA immediately after purchase with automated delivery system.',
      color: 'success',
    },
    {
      icon: <Assessment />,
      title: 'Detailed Analytics',
      description: 'Comprehensive performance reports and trading analytics for strategy optimization.',
      color: 'info',
    },
  ];

  return (
    <Box sx={{ py: 12, backgroundColor: 'background.default' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Choose Our EAs?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
          >
            Experience the next generation of automated trading with our 
            premium Expert Advisors designed for consistent profitability.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <FeatureCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <FeatureIcon 
                    className="feature-icon"
                    color={feature.color}
                  >
                    {feature.icon}
                  </FeatureIcon>
                  
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;

