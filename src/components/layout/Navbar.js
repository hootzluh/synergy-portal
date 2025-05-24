import React from 'react';
import { Box, Flex, HStack, Link, IconButton, useDisclosure, useColorModeValue, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import ConnectWalletButton from '../ConnectWalletButton';

const NavLink = ({ children, to, isActive }) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      px={2}
      py={1}
      rounded={'md'}
      className={`nav-link ${isActive ? 'active blue-glow' : ''}`}
      _hover={{
        textDecoration: 'none',
      }}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  return (
    <Box className="glass-nav" position="sticky" top="0" zIndex="100">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} px={4}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          className="blue-glow"
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Link as={RouterLink} to="/">
              <Image 
                src="/logo.png" 
                fallbackSrc="https://via.placeholder.com/120x40?text=SYNERGY" 
                alt="Synergy Network" 
                height="40px" 
              />
            </Link>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/" isActive={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/dashboard" isActive={location.pathname === '/dashboard'}>
              Dashboard
            </NavLink>
            <NavLink to="/wallet" isActive={location.pathname === '/wallet'}>
              Wallet
            </NavLink>
            <NavLink to="/explorer" isActive={location.pathname === '/explorer'}>
              Explorer
            </NavLink>
            <NavLink to="/ico-presale" isActive={location.pathname === '/ico-presale'}>
              ICO Presale
            </NavLink>
            <NavLink to="/docs" isActive={location.pathname.startsWith('/docs')}>
              Docs
            </NavLink>
            <NavLink to="/gas-station" isActive={location.pathname === '/gas-station'}>
              Gas Station
            </NavLink>
            <NavLink to="/synergy-score" isActive={location.pathname === '/synergy-score'}>
              Synergy Score
            </NavLink>
            <NavLink to="/settings" isActive={location.pathname === '/settings'}>
              Settings
            </NavLink>
          </HStack>
        </HStack>
        <HStack spacing={3}>
          <ThemeToggle />
          <ConnectWalletButton />
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }} className="glass">
          <Flex as={'nav'} direction="column" spacing={4}>
            <NavLink to="/" isActive={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/dashboard" isActive={location.pathname === '/dashboard'}>
              Dashboard
            </NavLink>
            <NavLink to="/wallet" isActive={location.pathname === '/wallet'}>
              Wallet
            </NavLink>
            <NavLink to="/explorer" isActive={location.pathname === '/explorer'}>
              Explorer
            </NavLink>
            <NavLink to="/ico-presale" isActive={location.pathname === '/ico-presale'}>
              ICO Presale
            </NavLink>
            <NavLink to="/docs" isActive={location.pathname.startsWith('/docs')}>
              Docs
            </NavLink>
            <NavLink to="/gas-station" isActive={location.pathname === '/gas-station'}>
              Gas Station
            </NavLink>
            <NavLink to="/synergy-score" isActive={location.pathname === '/synergy-score'}>
              Synergy Score
            </NavLink>
            <NavLink to="/settings" isActive={location.pathname === '/settings'}>
              Settings
            </NavLink>
          </Flex>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
