import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';

import { theme } from './theme';
import Header from './components/common/Header_new';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCheckout from './pages/PaymentCheckout';
import PaymentError from './pages/PaymentError';
import PaymentPending from './pages/PaymentPending';
import MockPayment from './pages/MockPayment';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/dashboard/*" element={<UserDashboard />} />
                <Route path="/payment/checkout" element={<PaymentCheckout />} />
                <Route path="/payment/mock" element={<MockPayment />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/error" element={<PaymentError />} />
                <Route path="/payment/pending" element={<PaymentPending />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;