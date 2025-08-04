import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp,
  People,
  Download,
  Star,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CustomButton from '../ui/Button';
import { FadeInUp } from '../ui/Animations';

const CTASection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.common.white, 0.15),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  borderRadius: 20,
  color: theme.palette.common.white,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    background: alpha(theme.palette.common.white, 0.25),
  },
}));

const CTA = () => {
  const theme = useTheme();

  const stats = [
    {
      icon: <People />,
      number: '15,000+',
      label: 'Active Traders',
    },
    {
      icon: <Download />,
      number: '50,000+',
      label: 'EA Downloads',
    },
    {
      icon: <TrendingUp />,
      number: '89%',
      label: 'Success Rate',
    },
    {
      icon: <Star />,
      number: '4.9/5',
      label: 'User Rating',
    },
  ];

  return (
    <CTASection>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ py: 12, textAlign: 'center' }}>
          <FadeInUp>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'white',
                textShadow: '0px 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              Start Your Trading Journey Today
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                mb: 6,
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Join thousands of successful traders using our Expert Advisors. 
              Get instant access to professional trading algorithms.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 8, flexWrap: 'wrap' }}>
              <CustomButton
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  background: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0px 8px 25px rgba(0,0,0,0.2)',
                  },
                }}
              >
                Get Started Now
              </CustomButton>
              
              <CustomButton
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                View Products
              </CustomButton>
            </Box>
          </FadeInUp>

          {/* Stats */}
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <FadeInUp delay={index * 0.1}>
                  <StatCard>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box sx={{ mb: 2, opacity: 0.9 }}>
                        {React.cloneElement(stat.icon, { sx: { fontSize: 40 } })}
                      </Box>
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 1,
                          textShadow: '0px 2px 5px rgba(0,0,0,0.3)',
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={{ opacity: 0.9 }}
                      >
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </StatCard>
                </FadeInUp>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </CTASection>
  );
};

export default CTA;

