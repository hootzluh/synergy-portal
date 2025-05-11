import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Flex,
  Icon,
  Card,
  CardBody,
  CardHeader,
  Divider,
  useColorModeValue,
  Grid,
  GridItem,
  HStack,
  Badge
} from '@chakra-ui/react';
import { FaServer, FaCubes, FaExchangeAlt, FaUsers, FaNetworkWired } from 'react-icons/fa';

// Mock data for demonstration
const networkStats = {
  blocks: 1458732,
  transactions: 32567891,
  validators: 128,
  activeNodes: 512,
  blockTime: 2.5,
  tps: 4200,
  synPoints: 2467890,
  activeClusters: 12,
  synPrice: 0.025,
  priceChange: 5.2,
  marketCap: 250000000,
  totalStaked: 3500000000
};

const StatCard = ({ title, value, helpText, icon, change, isIncrease }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
      <CardBody>
        <Flex justify="space-between">
          <Stat>
            <StatLabel>{title}</StatLabel>
            <StatNumber>{value}</StatNumber>
            {helpText && (
              <StatHelpText>
                {change && (
                  <StatArrow type={isIncrease ? 'increase' : 'decrease'} />
                )}
                {helpText}
              </StatHelpText>
            )}
          </Stat>
          <Flex
            w={12}
            h={12}
            align={'center'}
            justify={'center'}
            rounded={'full'}
            bg={'synergy.100'}
            color={'synergy.500'}
          >
            {icon}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default function DashboardPage() {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Container maxW="7xl" py={8}>
      <Heading as="h1" mb={8}>Network Dashboard</Heading>

      {/* Network Status Banner */}
      <Card
        bg="synergy.500"
        color="white"
        mb={8}
        borderRadius="lg"
        overflow="hidden"
      >
        <CardBody>
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={FaNetworkWired} w={6} h={6} />
              <Text fontWeight="bold" fontSize="lg">Network Status:</Text>
              <Badge colorScheme="green" p={1} fontSize="md">Operational</Badge>
            </HStack>
            <HStack>
              <Text>Current Block:</Text>
              <Text fontWeight="bold">{formatNumber(networkStats.blocks)}</Text>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      {/* Main Stats */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard
          title="Blocks"
          value={formatNumber(networkStats.blocks)}
          helpText="Last block: 2 seconds ago"
          icon={<Icon as={FaCubes} w={6} h={6} />}
        />
        <StatCard
          title="Transactions"
          value={formatNumber(networkStats.transactions)}
          helpText="24h: +156,789"
          icon={<Icon as={FaExchangeAlt} w={6} h={6} />}
          change={true}
          isIncrease={true}
        />
        <StatCard
          title="Validators"
          value={networkStats.validators}
          helpText={`${networkStats.activeClusters} active clusters`}
          icon={<Icon as={FaUsers} w={6} h={6} />}
        />
        <StatCard
          title="Active Nodes"
          value={formatNumber(networkStats.activeNodes)}
          helpText="10% increase this week"
          icon={<Icon as={FaServer} w={6} h={6} />}
          change={true}
          isIncrease={true}
        />
      </SimpleGrid>

      {/* Performance Metrics */}
      <Heading as="h2" size="lg" mb={4}>Performance Metrics</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
          <CardHeader pb={0}>
            <Heading size="md">Block Time</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatNumber>{networkStats.blockTime} seconds</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                12% improvement
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
          <CardHeader pb={0}>
            <Heading size="md">Transactions Per Second</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatNumber>{networkStats.tps}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                8% increase
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
          <CardHeader pb={0}>
            <Heading size="md">Synergy Points</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatNumber>{formatNumber(networkStats.synPoints)}</StatNumber>
              <StatHelpText>
                Total network contribution score
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Token Economics */}
      <Heading as="h2" size="lg" mb={4}>Token Economics</Heading>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6} mb={8}>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
            <CardHeader>
              <Heading size="md">SYN Token Overview</Heading>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                <Stat>
                  <StatLabel>Current Price</StatLabel>
                  <StatNumber>${networkStats.synPrice}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    {networkStats.priceChange}%
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Market Cap</StatLabel>
                  <StatNumber>${formatNumber(networkStats.marketCap)}</StatNumber>
                  <StatHelpText>
                    Based on circulating supply
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Total Supply</StatLabel>
                  <StatNumber>10,000,000,000 SYN</StatNumber>
                  <StatHelpText>
                    Fixed maximum supply
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Total Staked</StatLabel>
                  <StatNumber>{formatNumber(networkStats.totalStaked)} SYN</StatNumber>
                  <StatHelpText>
                    {(networkStats.totalStaked / 100000000).toFixed(1)}% of total supply
                  </StatHelpText>
                </Stat>
              </SimpleGrid>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" height="100%">
            <CardHeader>
              <Heading size="md">Validator Rewards (24h)</Heading>
            </CardHeader>
            <CardBody>
              <Stat>
                <StatNumber>125,000 SYN</StatNumber>
                <StatHelpText>
                  Distributed to 128 validators
                </StatHelpText>
              </Stat>
              <Divider my={4} />
              <Text>Average reward per validator: 976.5 SYN</Text>
              <Text>Top validator reward: 2,345 SYN</Text>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" height="100%">
            <CardHeader>
              <Heading size="md">Transaction Fees (24h)</Heading>
            </CardHeader>
            <CardBody>
              <Stat>
                <StatNumber>8,750 SYN</StatNumber>
                <StatHelpText>
                  From 156,789 transactions
                </StatHelpText>
              </Stat>
              <Divider my={4} />
              <Text>Burned: 2,625 SYN (30%)</Text>
              <Text>Average fee: 0.056 SYN</Text>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Recent Activity */}
      <Heading as="h2" size="lg" mb={4}>Recent Activity</Heading>
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
        <CardHeader>
          <Heading size="md">Latest Events</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={1} spacing={4}>
            <Box p={3} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
              <Flex justify="space-between">
                <Text fontWeight="bold">Validator Cluster Reshuffled</Text>
                <Text color="gray.500">10 minutes ago</Text>
              </Flex>
              <Text mt={1}>Cluster #7 was reshuffled with 12 validators</Text>
            </Box>

            <Box p={3} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
              <Flex justify="space-between">
                <Text fontWeight="bold">Large Transaction</Text>
                <Text color="gray.500">32 minutes ago</Text>
              </Flex>
              <Text mt={1}>250,000 SYN transferred from Exchange to Validator Pool</Text>
            </Box>

            <Box p={3} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
              <Flex justify="space-between">
                <Text fontWeight="bold">Governance Proposal Passed</Text>
                <Text color="gray.500">2 hours ago</Text>
              </Flex>
              <Text mt={1}>Proposal #23: Adjust minimum validator stake requirement</Text>
            </Box>

            <Box p={3} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
              <Flex justify="space-between">
                <Text fontWeight="bold">Network Upgrade</Text>
                <Text color="gray.500">6 hours ago</Text>
              </Flex>
              <Text mt={1}>Protocol upgraded to version 1.2.5</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Container>
  );
}
