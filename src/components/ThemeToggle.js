import React, { useState, useEffect } from 'react';
import { Box, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can show the appropriate icon
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update document class for global theme styling
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('light-theme', colorMode === 'light');
    }
  }, [colorMode, mounted]);

  return (
    <Box className="theme-toggle-wrapper">
      <IconButton
        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        icon={mounted && (colorMode === 'light' ? <MoonIcon /> : <SunIcon />)}
        onClick={toggleColorMode}
        variant="ghost"
        className="theme-toggle"
        size="md"
      />
    </Box>
  );
};

export default ThemeToggle;
