import React from 'react';
import { Box } from '@mui/material';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';

const Home = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <SEO 
        title="MQL5 Marketplace - Professional Expert Advisors"
        description="Discover premium MQL5 Expert Advisors for automated trading. Professional-grade algorithms with proven performance and 24/7 support."
        keywords="MQL5, Expert Advisors, Forex Trading, Automated Trading, MetaTrader"
        image="/og-image.jpg"
      />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </Box>
  );
};

export default Home;

