import { useTheme as useMuiTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

export const useTheme = () => {
  const theme = useMuiTheme();

  const createGradient = (color1, color2, direction = '135deg') => {
    return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
  };

  const createGlassMorphism = (opacity = 0.1, blur = 20) => ({
    background: alpha(theme.palette.background.paper, opacity),
    backdropFilter: `blur(${blur}px)`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  });

  const createHoverEffect = (translateY = -4, scale = 1.02) => ({
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: `translateY(${translateY}px) scale(${scale})`,
      boxShadow: theme.shadows[8],
    },
  });

  const createPulseAnimation = (duration = '2s') => ({
    animation: `pulse ${duration} ease-in-out infinite`,
    '@keyframes pulse': {
      '0%, 100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '50%': {
        transform: 'scale(1.05)',
        opacity: 0.8,
      },
    },
  });

  const createFloatAnimation = (duration = '6s', distance = 20) => ({
    animation: `float ${duration} ease-in-out infinite`,
    '@keyframes float': {
      '0%, 100%': {
        transform: 'translateY(0px)',
      },
      '50%': {
        transform: `translateY(-${distance}px)`,
      },
    },
  });

  return {
    ...theme,
    utils: {
      createGradient,
      createGlassMorphism,
      createHoverEffect,
      createPulseAnimation,
      createFloatAnimation,
      alpha,
    },
  };
};
