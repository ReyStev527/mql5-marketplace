import React, { useEffect, useRef, useState } from 'react';
import { Box, Grow, Fade, Slide, Zoom } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
`;

// Animated components
const AnimatedBox = styled(Box)(({ animation, duration = '0.6s', delay = '0s' }) => ({
  animation: `${animation} ${duration} ease-out ${delay} both`,
}));

// Hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

// Animation components
export const FadeInUp = ({ children, delay = 0, duration = 0.6, ...props }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <Box ref={ref} {...props}>
      {isVisible && (
        <AnimatedBox
          animation={fadeInUp}
          duration={`${duration}s`}
          delay={`${delay}s`}
        >
          {children}
        </AnimatedBox>
      )}
    </Box>
  );
};

export const FadeInLeft = ({ children, delay = 0, duration = 0.6, ...props }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <Box ref={ref} {...props}>
      {isVisible && (
        <AnimatedBox
          animation={fadeInLeft}
          duration={`${duration}s`}
          delay={`${delay}s`}
        >
          {children}
        </AnimatedBox>
      )}
    </Box>
  );
};

export const FadeInRight = ({ children, delay = 0, duration = 0.6, ...props }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <Box ref={ref} {...props}>
      {isVisible && (
        <AnimatedBox
          animation={fadeInRight}
          duration={`${duration}s`}
          delay={`${delay}s`}
        >
          {children}
        </AnimatedBox>
      )}
    </Box>
  );
};

export const BounceIn = ({ children, delay = 0, duration = 0.8, ...props }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <Box ref={ref} {...props}>
      {isVisible && (
        <AnimatedBox
          animation={bounceIn}
          duration={`${duration}s`}
          delay={`${delay}s`}
        >
          {children}
        </AnimatedBox>
      )}
    </Box>
  );
};

export const PulseAnimation = ({ children, duration = 2, ...props }) => (
  <AnimatedBox
    animation={pulse}
    duration={`${duration}s`}
    sx={{ animationIterationCount: 'infinite' }}
    {...props}
  >
    {children}
  </AnimatedBox>
);

export const FloatAnimation = ({ children, duration = 3, ...props }) => (
  <AnimatedBox
    animation={float}
    duration={`${duration}s`}
    sx={{ animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
    {...props}
  >
    {children}
  </AnimatedBox>
);

export const ShakeAnimation = ({ children, trigger, duration = 0.5, ...props }) => (
  <AnimatedBox
    animation={trigger ? shake : 'none'}
    duration={`${duration}s`}
    {...props}
  >
    {children}
  </AnimatedBox>
);

// Staggered animation container
export const StaggeredContainer = ({ children, staggerDelay = 0.1, ...props }) => {
  return (
    <Box {...props}>
      {React.Children.map(children, (child, index) => (
        <FadeInUp delay={index * staggerDelay}>
          {child}
        </FadeInUp>
      ))}
    </Box>
  );
};

// Material-UI animation wrappers
export const AnimatedGrow = ({ children, in: inProp, delay = 0, ...props }) => (
  <Grow in={inProp} timeout={{ enter: 500 + delay * 100 }} {...props}>
    <div>{children}</div>
  </Grow>
);

export const AnimatedFade = ({ children, in: inProp, delay = 0, ...props }) => (
  <Fade in={inProp} timeout={{ enter: 500 + delay * 100 }} {...props}>
    <div>{children}</div>
  </Fade>
);

export const AnimatedSlide = ({ children, direction = 'up', in: inProp, delay = 0, ...props }) => (
  <Slide direction={direction} in={inProp} timeout={{ enter: 500 + delay * 100 }} {...props}>
    <div>{children}</div>
  </Slide>
);

export const AnimatedZoom = ({ children, in: inProp, delay = 0, ...props }) => (
  <Zoom in={inProp} timeout={{ enter: 500 + delay * 100 }} {...props}>
    <div>{children}</div>
  </Zoom>
);

// Page transition wrapper
export const PageTransition = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatedFade in={mounted}>
      {children}
    </AnimatedFade>
  );
};

export default {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  BounceIn,
  PulseAnimation,
  FloatAnimation,
  ShakeAnimation,
  StaggeredContainer,
  AnimatedGrow,
  AnimatedFade,
  AnimatedSlide,
  AnimatedZoom,
  PageTransition,
};

