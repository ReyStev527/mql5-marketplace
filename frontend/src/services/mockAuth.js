// Mock authentication service for testing without backend
export const mockAuthAPI = {
  login: async (credentials) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login logic
    if (credentials.email === 'admin@mql5marketplace.com' && credentials.password === 'admin123') {
      return {
        data: {
          success: true,
          token: 'mock-admin-jwt-token-12345',
          user: {
            id: '1',
            email: 'admin@mql5marketplace.com',
            name: 'Admin User',
            role: 'admin'
          }
        }
      };
    } else if (credentials.email === 'user@example.com' && credentials.password === 'user123') {
      return {
        data: {
          success: true,
          token: 'mock-user-jwt-token-67890',
          user: {
            id: '2',
            email: 'user@example.com',
            name: 'John Trader',
            role: 'user'
          }
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }
};

// Check if backend is available
export const checkBackendConnection = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/health');
    return response.ok;
  } catch (error) {
    console.warn('Backend not available, using mock mode');
    return false;
  }
};
