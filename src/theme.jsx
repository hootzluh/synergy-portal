// Chakra UI theme extension for Synergy Network
import { extendTheme } from '@chakra-ui/react';

// Synergy Network color scheme
const colors = {
  synergy: {
    primary: '#1399FF', // Electric blue
    secondary: '#0500A3', // Secondary color
    tertiary: '#2A2A2A', // Tertiary color
    accent: '#E9F5FF', // Accent/border color
    gradient: {
      start: '#2A2A2A', // Top left
      mid1: '#484848',
      mid2: '#606060',
      end: '#7A7A7A', // Bottom right
    }
  }
};

// Font configuration
const fonts = {
  heading: "'Inter', sans-serif",
  body: "'Inter', sans-serif",
};

// Component style overrides
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'md',
      _hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(19, 153, 255, 0.3)',
      },
      _active: {
        transform: 'translateY(0)',
      },
    },
    variants: {
      glass: {
        bg: 'rgba(19, 153, 255, 0.2)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(19, 153, 255, 0.3)',
        color: 'white',
        _hover: {
          bg: 'rgba(19, 153, 255, 0.3)',
          border: '1px solid rgba(19, 153, 255, 0.5)',
        },
        _active: {
          bg: 'rgba(19, 153, 255, 0.4)',
        },
      },
      'glass-dark': {
        bg: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        color: 'white',
        _hover: {
          bg: 'rgba(0, 0, 0, 0.35)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        },
      },
      'connect-wallet': {
        bg: 'rgba(19, 153, 255, 0.3)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(19, 153, 255, 0.3)',
        color: 'white',
        fontWeight: 'bold',
        _hover: {
          bg: 'rgba(19, 153, 255, 0.5)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 16px rgba(19, 153, 255, 0.3)',
        },
        _active: {
          bg: 'rgba(19, 153, 255, 0.6)',
          transform: 'translateY(0)',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'lg',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        _hover: {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    variants: {
      glass: {
        container: {
          bg: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
        },
      },
      'glass-light': {
        container: {
          bg: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        },
      },
    },
  },
  Modal: {
    baseStyle: {
      dialog: {
        bg: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 'xl',
      },
    },
  },
  Tooltip: {
    baseStyle: {
      bg: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      borderRadius: 'md',
      px: 3,
      py: 2,
    },
  },
};

// Global style overrides
const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? '#1A1A1A' : '#F5F5F5',
      color: props.colorMode === 'dark' ? 'white' : '#333333',
      transition: 'background-color 0.3s ease',
    },
    // Custom scrollbar
    '::-webkit-scrollbar': {
      width: '10px',
    },
    '::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.2)',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'rgba(19, 153, 255, 0.5)',
      borderRadius: '5px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'rgba(19, 153, 255, 0.7)',
    },
    // Blue glow for interactive elements
    '.blue-glow': {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        background: 'synergy.primary',
        borderRadius: '12px',
        zIndex: '-1',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        filter: 'blur(15px)',
      },
      '&:hover::after, &:focus::after, &:active::after': {
        opacity: '0.5',
      },
    },
    // Page transitions
    '.page-enter': {
      opacity: 0,
      transform: 'translateY(10px)',
    },
    '.page-enter-active': {
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'opacity 300ms, transform 300ms',
    },
    '.page-exit': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '.page-exit-active': {
      opacity: 0,
      transform: 'translateY(-10px)',
      transition: 'opacity 300ms, transform 300ms',
    },
  }),
};

// Config for color mode
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// Create the extended theme
const theme = extendTheme({
  colors,
  fonts,
  components,
  styles,
  config,
});

export default theme;
