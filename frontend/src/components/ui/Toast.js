import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Slide,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const StyledAlert = styled(Alert)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: `0px 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
  backdropFilter: 'blur(20px)',
  '&.MuiAlert-standardSuccess': {
    background: alpha(theme.palette.success.main, 0.9),
    color: theme.palette.success.contrastText,
  },
  '&.MuiAlert-standardError': {
    background: alpha(theme.palette.error.main, 0.9),
    color: theme.palette.error.contrastText,
  },
  '&.MuiAlert-standardWarning': {
    background: alpha(theme.palette.warning.main, 0.9),
    color: theme.palette.warning.contrastText,
  },
  '&.MuiAlert-standardInfo': {
    background: alpha(theme.palette.info.main, 0.9),
    color: theme.palette.info.contrastText,
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const Toast = ({ toast, onClose }) => {
  const { id, message, title, severity, duration, action } = toast;

  return (
    <Snackbar
      key={id}
      open={true}
      autoHideDuration={duration}
      onClose={() => onClose(id)}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ mt: 8 }}
    >
      <StyledAlert
        severity={severity}
        variant="standard"
        action={
          <>
            {action}
            <IconButton
              size="small"
              color="inherit"
              onClick={() => onClose(id)}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </StyledAlert>
    </Snackbar>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      severity: 'info',
      duration: 4000,
      ...toast,
    };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message, options = {}) => {
    return addToast({ message, severity: 'success', ...options });
  }, [addToast]);

  const showError = useCallback((message, options = {}) => {
    return addToast({ message, severity: 'error', duration: 6000, ...options });
  }, [addToast]);

  const showWarning = useCallback((message, options = {}) => {
    return addToast({ message, severity: 'warning', duration: 5000, ...options });
  }, [addToast]);

  const showInfo = useCallback((message, options = {}) => {
    return addToast({ message, severity: 'info', ...options });
  }, [addToast]);

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={removeToast}
        />
      ))}
    </ToastContext.Provider>
  );
};

export default Toast;

