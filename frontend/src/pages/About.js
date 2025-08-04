import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Stack,
  Chip
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const About = () => {
  const features = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Advanced Trading Tools',
      description: 'Professional Expert Advisors and trading robots built by experienced developers for optimal market performance.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure & Reliable',
      description: 'All EAs are thoroughly tested and verified. Secure payment processing and license management system.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Instant Deployment',
      description: 'Download and start using your EA immediately. Quick setup process with comprehensive documentation.'
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: '24/7 Support',
      description: 'Dedicated customer support team ready to help you with any questions or technical issues.'
    }
  ];

  const stats = [
    { label: 'Active Traders', value: '10,000+' },
    { label: 'Expert Advisors', value: '500+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Countries', value: '50+' }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - MQL5 Marketplace</title>
        <meta 
          name="description" 
          content="Learn about MQL5 Marketplace - Your premier destination for professional Expert Advisors, trading robots, and automated trading solutions."
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}
          >
            About MQL5 Marketplace
          </Typography>
          
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            Your premier destination for professional Expert Advisors, trading robots, 
            and automated trading solutions for MetaTrader 5 platform.
          </Typography>

          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center" 
            flexWrap="wrap"
            sx={{ gap: 1 }}
          >
            <Chip label="Established 2024" color="primary" />
            <Chip label="Licensed & Regulated" color="primary" />
            <Chip label="Global Community" color="primary" />
          </Stack>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} mb={8}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Box textAlign="center">
                <Typography 
                  variant="h3" 
                  component="div" 
                  color="primary.main"
                  fontWeight="bold"
                >
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Mission Section */}
        <Box mb={8}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            Our Mission
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            textAlign="center"
            sx={{ maxWidth: '800px', mx: 'auto', fontSize: 18, lineHeight: 1.8 }}
          >
            We strive to democratize algorithmic trading by providing a secure, reliable platform 
            where traders can access high-quality Expert Advisors. Our mission is to bridge the gap 
            between professional trading strategies and retail traders, empowering everyone to 
            participate in automated trading with confidence.
          </Typography>
        </Box>

        {/* Features Section */}
        <Box mb={8}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" mb={6}>
            Why Choose Us?
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.shadows[8]
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="flex-start" gap={2}>
                      <Box flexShrink={0}>
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Company Info */}
        <Box textAlign="center">
          <Typography variant="h4" component="h2" gutterBottom>
            Our Story
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', fontSize: 16, lineHeight: 1.8 }}
          >
            Founded in 2024, MQL5 Marketplace was born from a simple idea: make professional 
            trading tools accessible to everyone. Our team of experienced developers and traders 
            work tirelessly to curate, test, and deliver the highest quality Expert Advisors 
            for the MetaTrader 5 platform.
            <br /><br />
            Today, we serve thousands of traders worldwide, from beginners taking their first 
            steps in automated trading to seasoned professionals looking for cutting-edge strategies. 
            Our platform continues to evolve, driven by community feedback and the latest 
            developments in financial technology.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default About;

