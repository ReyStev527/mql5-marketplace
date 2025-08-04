import React from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  '& .loading-icon': {
    animation: `${pulse} 2s ease-in-out infinite`,
  },
}));

const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
}));

const LoadingSpinner = ({ 
  size = 40,
  message = 'Loading...',
  fullScreen = false,
  color = 'primary',
  variant = 'indeterminate'
}) => {
  const LoadingContent = (
    <LoadingContainer>
      <CustomCircularProgress
        size={size}
        color={color}
        variant={variant}
        className="loading-icon"
        sx={{ mb: 2 }}
      />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </LoadingContainer>
  );

  if (fullScreen) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
        }}
        open={true}
      >
        {LoadingContent}
      </Backdrop>
    );
  }

  return LoadingContent;
};

export default LoadingSpinner;

