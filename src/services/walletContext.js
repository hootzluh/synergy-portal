import React, { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

// Create wallet context
const WalletContext = createContext();

// Validate Synergy address format
const isSynergyAddress = (addr) => {
  return /^sYn[QU]1[ac-hj-np-z02-9]{30,42}$/.test(addr);
};

// Format address for display
const formatAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [snsName, setSnsName] = useState('');
  const [provider, setProvider] = useState(null);
  const [providerType, setProviderType] = useState(null); // 'injected' or 'walletconnect'
  const [isConnecting, setIsConnecting] = useState(false);
  const toast = useToast();

  // Check if Synergy wallet is available
  const isSynergyWalletAvailable = () => {
    return typeof window !== 'undefined' && window.synergy !== undefined;
  };

  // Initialize wallet connection on page load
  useEffect(() => {
    const checkExistingConnection = async () => {
      // Check for existing connection in localStorage
      const savedWallet = localStorage.getItem('synergy_wallet_connection');
      
      if (savedWallet) {
        try {
          const walletData = JSON.parse(savedWallet);
          
          if (walletData.connected && walletData.address) {
            // Verify the wallet is still connected
            if (isSynergyWalletAvailable()) {
              try {
                const accounts = await window.synergy.request({ method: 'synergy_getAccounts' });
                
                if (accounts && accounts.length > 0 && accounts.includes(walletData.address)) {
                  setWalletAddress(walletData.address);
                  setSnsName(walletData.snsName || '');
                  setIsConnected(true);
                  setProvider(window.synergy);
                  setProviderType('injected');
                } else {
                  // Wallet no longer connected, clear saved data
                  localStorage.removeItem('synergy_wallet_connection');
                }
              } catch (error) {
                console.error('Error checking existing connection:', error);
                localStorage.removeItem('synergy_wallet_connection');
              }
            }
          }
        } catch (error) {
          console.error('Error parsing saved wallet data:', error);
          localStorage.removeItem('synergy_wallet_connection');
        }
      }
    };
    
    checkExistingConnection();
  }, []);

  // Save connection to localStorage when connected
  useEffect(() => {
    if (isConnected && walletAddress) {
      localStorage.setItem('synergy_wallet_connection', JSON.stringify({
        connected: true,
        address: walletAddress,
        snsName: snsName || '',
        providerType
      }));
    }
  }, [isConnected, walletAddress, snsName, providerType]);

  // Connect using injected provider
  const connectWithInjectedProvider = async () => {
    setIsConnecting(true);
    
    try {
      if (isSynergyWalletAvailable()) {
        const accounts = await window.synergy.request({ method: 'synergy_requestAccounts' });
        
        if (accounts && accounts.length > 0) {
          const address = accounts[0];
          
          // Validate address format
          if (isSynergyAddress(address)) {
            setWalletAddress(address);
            setIsConnected(true);
            setProvider(window.synergy);
            setProviderType('injected');
            
            // Try to get SNS name if available
            try {
              const snsResult = await window.synergy.request({ 
                method: 'synergy_resolveSNS',
                params: [address] 
              });
              
              if (snsResult && snsResult.name) {
                setSnsName(snsResult.name);
              }
            } catch (snsError) {
              console.error('Error fetching SNS name:', snsError);
            }
            
            toast({
              title: 'Wallet Connected',
              description: 'Your Synergy wallet has been connected successfully.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            
            return true;
          } else {
            throw new Error('Invalid Synergy address format');
          }
        }
      } else {
        throw new Error('Synergy wallet not detected');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect wallet. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Connect with WalletConnect
  const connectWithWalletConnect = async () => {
    setIsConnecting(true);
    
    try {
      // This would be implemented with WalletConnect v2 client
      toast({
        title: 'WalletConnect',
        description: 'WalletConnect integration coming soon.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      return false;
    } catch (error) {
      console.error('Error connecting with WalletConnect:', error);
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect with WalletConnect. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setSnsName('');
    setProvider(null);
    setProviderType(null);
    
    // Remove from localStorage
    localStorage.removeItem('synergy_wallet_connection');
    
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  // Sign a message with the connected wallet
  const signMessage = async (message) => {
    if (!isConnected || !provider) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to sign messages.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return null;
    }
    
    try {
      const signature = await provider.request({
        method: 'synergy_signMessage',
        params: [walletAddress, message]
      });
      
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      toast({
        title: 'Signing Failed',
        description: error.message || 'Failed to sign message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return null;
    }
  };

  // Get wallet balance
  const getBalance = async () => {
    if (!isConnected || !provider) {
      return null;
    }
    
    try {
      const balance = await provider.request({
        method: 'synergy_getBalance',
        params: [walletAddress, 'latest']
      });
      
      return balance;
    } catch (error) {
      console.error('Error getting balance:', error);
      return null;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        snsName,
        provider,
        providerType,
        isConnecting,
        formatAddress,
        isSynergyAddress,
        connectWithInjectedProvider,
        connectWithWalletConnect,
        disconnectWallet,
        signMessage,
        getBalance
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use wallet context
export const useWallet = () => useContext(WalletContext);

export default WalletContext;
