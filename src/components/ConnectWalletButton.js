import React from 'react';
import { Box, Button, Text, HStack, useDisclosure } from '@chakra-ui/react';
import WalletOptionsModal from './WalletOptionsModal';
import { useWallet } from '../services/walletContext';

const ConnectWalletButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isConnected, 
    walletAddress, 
    snsName, 
    isConnecting,
    formatAddress,
    connectWithInjectedProvider,
    connectWithWalletConnect,
    disconnectWallet 
  } = useWallet();

  const handleConnectInjected = async () => {
    const success = await connectWithInjectedProvider();
    if (success) {
      onClose();
    }
  };

  const handleConnectWalletConnect = async () => {
    const success = await connectWithWalletConnect();
    if (success) {
      onClose();
    }
  };

  return (
    <>
      {!isConnected ? (
        <Button 
          onClick={onOpen}
          variant="connect-wallet"
          className="connect-wallet-btn blue-glow"
          isLoading={isConnecting}
          loadingText="Connecting"
        >
          Connect Wallet
        </Button>
      ) : (
        <HStack spacing={2}>
          <Box className="wallet-address">
            <Text fontWeight="medium">
              {snsName ? `${snsName} (${formatAddress(walletAddress)})` : formatAddress(walletAddress)}
            </Text>
          </Box>
          <Button 
            onClick={disconnectWallet}
            variant="glass"
            size="sm"
            className="blue-glow"
          >
            Disconnect
          </Button>
        </HStack>
      )}

      <WalletOptionsModal 
        isOpen={isOpen} 
        onClose={onClose}
        onConnectInjected={handleConnectInjected}
        onConnectWalletConnect={handleConnectWalletConnect}
        isConnecting={isConnecting}
      />
    </>
  );
};

export default ConnectWalletButton;
