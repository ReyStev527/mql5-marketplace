import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { typography } from './typography';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    grey: colors.grey,
    background: colors.background,
  },
  typography,
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.12)',
    '0px 8px 16px rgba(0, 0, 0, 0.14)',
    '0px 12px 24px rgba(0, 0, 0, 0.16)',
    '0px 16px 32px rgba(0, 0, 0, 0.18)',
    '0px 20px 40px rgba(0, 0, 0, 0.20)',
    '0px 24px 48px rgba(0, 0, 0, 0.22)',
    '0px 28px 56px rgba(0, 0, 0, 0.24)',
    '0px 32px 64px rgba(0, 0, 0, 0.26)',
    '0px 36px 72px rgba(0, 0, 0, 0.28)',
    '0px 40px 80px rgba(0, 0, 0, 0.30)',
    '0px 44px 88px rgba(0, 0, 0, 0.32)',
    '0px 48px 96px rgba(0, 0, 0, 0.34)',
    '0px 52px 104px rgba(0, 0, 0, 0.36)',
    '0px 56px 112px rgba(0, 0, 0, 0.38)',
    '0px 60px 120px rgba(0, 0, 0, 0.40)',
    '0px 64px 128px rgba(0, 0, 0, 0.42)',
    '0px 68px 136px rgba(0, 0, 0, 0.44)',
    '0px 72px 144px rgba(0, 0, 0, 0.46)',
    '0px 76px 152px rgba(0, 0, 0, 0.48)',
    '0px 80px 160px rgba(0, 0, 0, 0.50)',
    '0px 84px 168px rgba(0, 0, 0, 0.52)',
    '0px 88px 176px rgba(0, 0, 0, 0.54)',
    '0px 92px 184px rgba(0, 0, 0, 0.56)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 32px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover fieldset': {
              borderColor: colors.primary.main,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: colors.grey[800],
        },
      },
    },
  },
});
