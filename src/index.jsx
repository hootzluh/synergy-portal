import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { WalletProvider } from './services/walletContext';
import theme from './theme';
import App from './App';
import './styles/main.css'; // Compiled from SASS

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading fonts and resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <WalletProvider>
        <Router>
          <App isLoading={isLoading} />
        </Router>
      </WalletProvider>
    </ChakraProvider>
  );
};

// Render the Root component to the DOM
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root />);
