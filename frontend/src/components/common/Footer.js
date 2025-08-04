import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
  TrendingUp,
  Security,
  Support,
  Speed,
  Star,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
  color: 'white',
  marginTop: 'auto',
}));

const FooterSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  fontSize: '1.5rem',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[300],
  textDecoration: 'none',
  fontSize: '0.875rem',
  marginBottom: theme.spacing(1),
  display: 'block',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(4px)',
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[400],
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  margin: theme.spacing(0, 0.5),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 25px rgba(${theme.palette.primary.main}, 0.3)`,
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    fontSize: '1.2rem',
  },
}));

const BottomBar = styled(Box)(({ theme }) => ({
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

const Footer = () => {
  const theme = useTheme();

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/story' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
    Products: [
      { label: 'Browse EAs', href: '/products' },
      { label: 'Featured', href: '/featured' },
      { label: 'Categories', href: '/categories' },
      { label: 'New Releases', href: '/new' },
      { label: 'Top Rated', href: '/top-rated' },
    ],
    Support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Contact Support', href: '/support' },
      { label: 'Community', href: '/community' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' },
      { label: 'Licensing', href: '/licensing' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <LinkedIn />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Instagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <YouTube />, href: 'https://youtube.com', label: 'YouTube' },
  ];

  const features = [
    { icon: <Security />, text: 'Enterprise Security' },
    { icon: <Support />, text: '24/7 Support' },
    { icon: <Speed />, text: 'Lightning Fast' },
    { icon: <Star />, text: 'Premium Quality' },
  ];

  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <FooterSection>
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid size={{ xs: 12, md: 4 }}>
              <LogoSection>
                <TrendingUp sx={{ mr: 1, fontSize: 28, color: 'primary.main' }} />
                <LogoText variant="h6">
                  MQL5 Marketplace
                </LogoText>
              </LogoSection>
              
              <Typography variant="body2" color="grey.300" sx={{ mb: 3, lineHeight: 1.7 }}>
                The premier destination for MetaTrader Expert Advisors. 
                Connect with professional traders and automated trading solutions 
                that deliver consistent results.
              </Typography>

              {/* Features */}
              <Box sx={{ mb: 3 }}>
                {features.map((feature, index) => (
                  <FeatureItem key={index}>
                    {feature.icon}
                    <Typography variant="body2" color="grey.300">
                      {feature.text}
                    </Typography>
                  </FeatureItem>
                ))}
              </Box>

              {/* Social Links */}
              <Box>
                <Typography variant="body2" color="grey.300" sx={{ mb: 2 }}>
                  Follow Us
                </Typography>
                <Box>
                  {socialLinks.map((social, index) => (
                    <SocialIconButton
                      key={index}
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </SocialIconButton>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <Grid size={{ xs: 6, sm: 3, md: 2 }} key={title}>
                <Typography 
                  variant="h6" 
                  color="white" 
                  sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}
                >
                  {title}
                </Typography>
                <Stack spacing={0.5}>
                  {links.map((link, index) => (
                    <FooterLink
                      key={index}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        // Add navigation logic here
                        console.log(`Navigate to: ${link.href}`);
                      }}
                    >
                      {link.label}
                    </FooterLink>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" color="white" sx={{ mb: 2, fontWeight: 600 }}>
                Get In Touch
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ color: 'primary.main', mr: 1, fontSize: '1.2rem' }} />
                    <Typography variant="body2" color="grey.300">
                      support@mql5marketplace.com
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ color: 'primary.main', mr: 1, fontSize: '1.2rem' }} />
                    <Typography variant="body2" color="grey.300">
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ color: 'primary.main', mr: 1, fontSize: '1.2rem' }} />
                    <Typography variant="body2" color="grey.300">
                      New York, NY 10001
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Bottom Bar */}
          <BottomBar>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="grey.400">
                  © {new Date().getFullYear()} MQL5 Marketplace. All rights reserved.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  mt: { xs: 2, md: 0 }
                }}>
                  <Typography variant="body2" color="grey.400">
                    Made with ❤️ for traders worldwide
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </BottomBar>
        </FooterSection>
      </Container>
    </FooterContainer>
  );
};

export default Footer;

