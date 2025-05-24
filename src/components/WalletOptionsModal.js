import React from 'react';
import { Box, VStack, Text, Button, Image, useColorModeValue, Spinner } from '@chakra-ui/react';

const WalletOptionsModal = ({ isOpen, onClose, onConnectInjected, onConnectWalletConnect, isConnecting }) => {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.25)');
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.08)');
  
  if (!isOpen) return null;
  
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0, 0, 0, 0.7)"
      backdropFilter="blur(5px)"
      zIndex="1000"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        className="glass"
        p={6}
        borderRadius="xl"
        maxWidth="400px"
        width="90%"
        onClick={(e) => e.stopPropagation()}
        bg={bgColor}
        borderColor={borderColor}
      >
        <VStack spacing={4} align="stretch">
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Connect Your Wallet
          </Text>
          
          <Button
            variant="glass"
            className="blue-glow"
            onClick={onConnectInjected}
            p={6}
            justifyContent="flex-start"
            isDisabled={isConnecting}
          >
            <Image 
              src="/synergy-wallet-icon.png" 
              fallbackSrc="https://via.placeholder.com/30?text=SW" 
              boxSize="30px" 
              mr={3} 
              alt="Synergy Wallet"
            />
            <VStack align="start" spacing={0} flex="1">
              <Text fontWeight="bold">Synergy Wallet</Text>
              <Text fontSize="xs" opacity={0.8}>Connect using Synergy browser extension</Text>
            </VStack>
            {isConnecting && <Spinner size="sm" ml={2} />}
          </Button>
          
          <Button
            variant="glass"
            className="blue-glow"
            onClick={onConnectWalletConnect}
            p={6}
            justifyContent="flex-start"
            isDisabled={isConnecting}
          >
            <Image 
              src="/walletconnect-icon.png" 
              fallbackSrc="https://via.placeholder.com/30?text=WC" 
              boxSize="30px" 
              mr={3} 
              alt="WalletConnect"
            />
            <VStack align="start" spacing={0} flex="1">
              <Text fontWeight="bold">WalletConnect</Text>
              <Text fontSize="xs" opacity={0.8}>Scan with your mobile wallet</Text>
            </VStack>
            {isConnecting && <Spinner size="sm" ml={2} />}
          </Button>
          
          <Text fontSize="xs" textAlign="center" opacity={0.7} mt={2}>
            By connecting your wallet, you agree to the Terms of Service and Privacy Policy
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default WalletOptionsModal;
