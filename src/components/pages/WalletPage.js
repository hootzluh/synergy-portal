import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Button, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { useWallet } from '../services/walletContext';

// Blockchain service for wallet page
const blockchainService = {
  // Get supported networks
  getSupportedNetworks: () => {
    return [
      { id: 'ethereum', name: 'Ethereum', icon: '🔷' },
      { id: 'bitcoin', name: 'Bitcoin', icon: '₿' },
      { id: 'solana', name: 'Solana', icon: '◎' },
      { id: 'bsc', name: 'Binance Smart Chain', icon: '🔶' },
      { id: 'polygon', name: 'Polygon', icon: '🟣' },
      { id: 'avalanche', name: 'Avalanche', icon: '🔺' },
      { id: 'cosmos', name: 'Cosmos', icon: '⚛' },
      { id: 'arbitrum', name: 'Arbitrum', icon: '🔵' }
    ];
  },
  
  // Get mock transaction history - in production this would call the actual API
  getTransactionHistory: async (address) => {
    // This would be replaced with actual API calls in production
    return [];
  }
};

const WalletPage = () => {
  const { isConnected, walletAddress, snsName, formatAddress } = useWallet();
  const [networks, setNetworks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.25)');
  
  useEffect(() => {
    // Load supported networks
    setNetworks(blockchainService.getSupportedNetworks());
    
    // Load transaction history if connected
    if (isConnected && walletAddress) {
      setIsLoading(true);
      blockchainService.getTransactionHistory(walletAddress)
        .then(txs => {
          setTransactions(txs);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error loading transactions:', error);
          setIsLoading(false);
        });
    }
  }, [isConnected, walletAddress]);
  
  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Heading as="h1" mb={6} fontWeight="black">
        Synergy Wallet
      </Heading>
      
      {!isConnected ? (
        <Box className="glass-container" p={8} textAlign="center">
          <Heading as="h2" mb={4} fontWeight="bold">
            Connect Your Wallet
          </Heading>
          <Text mb={6}>
            Connect your Synergy wallet to view your balance, transaction history, and manage your assets.
          </Text>
          <Button 
            variant="connect-wallet"
            className="connect-wallet-btn blue-glow"
            size="lg"
            onClick={() => document.querySelector('.connect-wallet-btn').click()}
          >
            Connect Wallet
          </Button>
        </Box>
      ) : (
        <>
          <Box className="glass-container" mb={6}>
            <Heading as="h2" mb={4} fontWeight="bold">
              Wallet Overview
            </Heading>
            <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
              <Box flex="1" className="glass" p={4} borderRadius="md">
                <Text fontSize="sm" opacity={0.7}>Address</Text>
                <Text fontWeight="medium" fontSize="md" wordBreak="break-all">
                  {walletAddress}
                </Text>
                {snsName && (
                  <>
                    <Text fontSize="sm" opacity={0.7} mt={2}>SNS Name</Text>
                    <Text fontWeight="bold" fontSize="lg">{snsName}</Text>
                  </>
                )}
              </Box>
              <Box flex="1" className="glass" p={4} borderRadius="md">
                <Text fontSize="sm" opacity={0.7}>Balance</Text>
                <Text fontWeight="bold" fontSize="2xl">0 SYN</Text>
                <Text fontSize="sm" opacity={0.7}>$0.00 USD</Text>
              </Box>
            </Flex>
          </Box>
          
          <Box className="glass-container" mb={6}>
            <Heading as="h2" mb={4} fontWeight="bold">
              Supported Networks
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              {networks.map(network => (
                <Box 
                  key={network.id} 
                  className="glass-card blue-glow" 
                  p={4} 
                  borderRadius="md"
                  textAlign="center"
                  cursor="pointer"
                >
                  <Text fontSize="2xl" mb={2}>{network.icon}</Text>
                  <Text fontWeight="medium">{network.name}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          
          <Box className="glass-container">
            <Heading as="h2" mb={4} fontWeight="bold">
              Transaction History
            </Heading>
            {isLoading ? (
              <Text>Loading transactions...</Text>
            ) : transactions.length > 0 ? (
              <Box>
                {/* Transaction list would go here */}
                <Text>Transaction history will appear here</Text>
              </Box>
            ) : (
              <Box textAlign="center" py={8}>
                <Text fontSize="lg" mb={4}>No transactions found</Text>
                <Text opacity={0.7}>
                  Your transaction history will appear here once you start using your Synergy wallet.
                </Text>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default WalletPage;
