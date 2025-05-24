import React from 'react';
import { Box, Flex, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <Box className="glass-footer" py={4}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW="1200px"
        mx="auto"
        px={4}
        justify="space-between"
        align={{ base: 'center', md: 'center' }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Text fontSize="sm">
          &copy; {year} Synergy Network. All rights reserved.
        </Text>
        
        <Flex mt={{ base: 4, md: 0 }} gap={4}>
          <Link as={RouterLink} to="/docs/terms" className="blue-glow" fontSize="sm">
            Terms of Service
          </Link>
          <Link as={RouterLink} to="/docs/privacy" className="blue-glow" fontSize="sm">
            Privacy Policy
          </Link>
          <Link as={RouterLink} to="/docs/faq" className="blue-glow" fontSize="sm">
            FAQ
          </Link>
          <Link href="https://github.com/synergy-network" isExternal className="blue-glow" fontSize="sm">
            GitHub
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
