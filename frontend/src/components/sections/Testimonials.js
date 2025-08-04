import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  useTheme,
  alpha,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FadeInUp, FadeInLeft } from '../ui/Animations';

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: 20,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0px 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  },
}));

const QuoteIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  fontSize: '3rem',
  opacity: 0.1,
  color: theme.palette.primary.main,
  fontFamily: 'serif',
  fontWeight: 'bold',
}));

const Testimonials = () => {
  const theme = useTheme();

  const testimonials = [
    {
      name: 'John Richardson',
      role: 'Professional Trader',
      company: 'Goldman Sachs',
      avatar: '/avatars/john.jpg',
      rating: 5,
      text: 'The Scalping Master EA has transformed my trading completely. Consistent profits every month with minimal drawdown. Outstanding quality and support!',
      stats: { profit: '+185%', trades: '2,340' },
    },
    {
      name: 'Sarah Chen',
      role: 'Hedge Fund Manager',
      company: 'Alpha Capital',
      avatar: '/avatars/sarah.jpg',
      rating: 5,
      text: 'Professional-grade Expert Advisors with exceptional performance. The backtesting results matched live trading perfectly. Highly recommended!',
      stats: { profit: '+267%', trades: '1,890' },
    },
    {
      name: 'Michael Torres',
      role: 'Independent Trader',
      company: 'Private Equity',
      avatar: '/avatars/michael.jpg',
      rating: 5,
      text: 'Been using these EAs for 2 years now. The consistency and reliability are unmatched. Customer support is fantastic too!',
      stats: { profit: '+324%', trades: '3,120' },
    },
    {
      name: 'Emma Williams',
      role: 'Quantitative Analyst',
      company: 'JP Morgan',
      avatar: '/avatars/emma.jpg',
      rating: 5,
      text: 'The code quality is exceptional. Clean, optimized, and well-documented. These EAs represent the pinnacle of algorithmic trading.',
      stats: { profit: '+198%', trades: '1,560' },
    },
    {
      name: 'David Kumar',
      role: 'Portfolio Manager',
      company: 'Bridgewater',
      avatar: '/avatars/david.jpg',
      rating: 5,
      text: 'Risk management features are outstanding. The EAs adapt to market conditions seamlessly. My go-to choice for automated trading.',
      stats: { profit: '+156%', trades: '2,780' },
    },
    {
      name: 'Lisa Thompson',
      role: 'Trading Director',
      company: 'Renaissance Technologies',
      avatar: '/avatars/lisa.jpg',
      rating: 5,
      text: 'Institutional-quality trading algorithms at retail prices. The performance analytics and reporting features are comprehensive.',
      stats: { profit: '+289%', trades: '4,230' },
    },
  ];

  return (
    <Box sx={{ py: 12, backgroundColor: alpha(theme.palette.grey[50], 0.5) }}>
      <Container maxWidth="xl">
        <FadeInUp>
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
              Trusted by Professionals
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
            >
              Join thousands of traders worldwide who have achieved consistent 
              profitability with our Expert Advisors.
            </Typography>
          </Box>
        </FadeInUp>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
              <FadeInLeft delay={index * 0.1}>
                <TestimonialCard>
                  <QuoteIcon>"</QuoteIcon>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        src={testimonial.avatar}
                        sx={{
                          width: 60,
                          height: 60,
                          mr: 2,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        }}
                      >
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'primary.main',
                            fontWeight: 500
                          }}
                        >
                          {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>

                    <Rating
                      value={testimonial.rating}
                      readOnly
                      sx={{ mb: 2 }}
                      size="small"
                    />

                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                        color: 'text.secondary',
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>

                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        pt: 2,
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700,
                            color: 'success.main'
                          }}
                        >
                          {testimonial.stats.profit}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Total Profit
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700,
                            color: 'info.main'
                          }}
                        >
                          {testimonial.stats.trades}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Trades
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </TestimonialCard>
              </FadeInLeft>
            </Grid>
          ))}
        </Grid>

        {/* Trust Indicators */}
        <FadeInUp delay={0.5}>
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
              Trusted by leading financial institutions
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: 6,
                flexWrap: 'wrap',
                opacity: 0.5,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 300 }}>Goldman Sachs</Typography>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>JP Morgan</Typography>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>Bridgewater</Typography>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>Renaissance</Typography>
            </Box>
          </Box>
        </FadeInUp>
      </Container>
    </Box>
  );
};

export default Testimonials;

