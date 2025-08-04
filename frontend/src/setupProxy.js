const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy API requests to backend
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      ws: true, // Enable WebSocket proxying
    })
  );
  
  // Handle WebSocket connections for hot reload
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true,
      changeOrigin: true,
    })
  );
};
