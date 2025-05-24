import React, { useState, useEffect } from 'react';
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

export default Root;
