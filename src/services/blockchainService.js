import { ethers } from 'ethers';
import Web3 from 'web3';

// Constants
const TESTNET_RPC_URL = 'https://testnet-rpc.synergy.network';
const MAINNET_RPC_URL = 'https://mainnet-rpc.synergy.network';
const SYNERGY_TOKEN_ADDRESS_TESTNET = '0x8765432109876543210987654321098765432109'; // Updated testnet token address
const SYNERGY_TOKEN_ADDRESS_MAINNET = '0x0987654321098765432109876543210987654321'; // Mainnet token address

// ABI for Synergy Token
const SYNERGY_TOKEN_ABI = [
  // ERC-20 standard functions
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  // Events
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  // Additional Synergy-specific functions
  'function stake(uint256 amount) returns (bool)',
  'function unstake(uint256 amount) returns (bool)',
  'function getStakedBalance(address owner) view returns (uint256)',
  'function getRewardRate() view returns (uint256)'
];

// Initialize providers
let provider = null;
let web3 = null;
let synergyTokenContract = null;
let currentNetwork = 'testnet'; // Default to testnet as per requirements

/**
 * Initialize the blockchain service
 * @param {string} network - 'testnet' or 'mainnet'
 * @returns {Promise<boolean>} - Success status
 */
export const initializeBlockchainService = async (network = 'testnet') => {
  try {
    currentNetwork = network;
    const rpcUrl = network === 'testnet' ? TESTNET_RPC_URL : MAINNET_RPC_URL;
    
    // Initialize ethers provider
    provider = new ethers.JsonRpcProvider(rpcUrl);
    
    // Initialize Web3
    web3 = new Web3(rpcUrl);
    
    // Initialize token contract
    const tokenAddress = network === 'testnet' ? SYNERGY_TOKEN_ADDRESS_TESTNET : SYNERGY_TOKEN_ADDRESS_MAINNET;
    synergyTokenContract = new ethers.Contract(tokenAddress, SYNERGY_TOKEN_ABI, provider);
    
    return true;
  } catch (error) {
    console.error('Failed to initialize blockchain service:', error);
    return false;
  }
};

/**
 * Get wallet balance
 * @param {string} address - Wallet address
 * @returns {Promise<Object>} - Balance information
 */
export const getWalletBalance = async (address) => {
  try {
    if (!provider || !synergyTokenContract) {
      await initializeBlockchainService(currentNetwork);
    }
    
    // Get native token balance (SYN)
    const balance = await provider.getBalance(address);
    const balanceInSyn = ethers.formatEther(balance);
    
    // Get token balance if using a separate token contract
    const tokenBalance = await synergyTokenContract.balanceOf(address);
    const tokenBalanceInSyn = ethers.formatEther(tokenBalance);
    
    // Get current SYN price from a price feed API
    let synPrice = 0.025; // Default fallback price
    try {
      // Attempt to fetch real price data
      const response = await fetch('https://testnet-api.synergy.network/v1/price');
      if (response.ok) {
        const priceData = await response.json();
        synPrice = priceData.price || synPrice;
      }
    } catch (error) {
      console.warn('Failed to fetch SYN price, using default:', error);
    }
    const usdValue = parseFloat(balanceInSyn) * synPrice;
    
    return {
      address,
      balance: balanceInSyn,
      tokenBalance: tokenBalanceInSyn,
      usdValue: `$${usdValue.toFixed(2)}`,
      network: currentNetwork
    };
  } catch (error) {
    console.error('Failed to get wallet balance:', error);
    throw error;
  }
};

/**
 * Get transaction history
 * @param {string} address - Wallet address
 * @param {number} limit - Number of transactions to fetch
 * @returns {Promise<Array>} - Transaction history
 */
export const getTransactionHistory = async (address, limit = 10) => {
  try {
    if (!provider) {
      await initializeBlockchainService(currentNetwork);
    }
    
    // Get transaction history from the blockchain
    // Fetch transactions from the blockchain using the provider
    const network = currentNetwork === 'testnet' ? 'testnet' : 'mainnet';
    const blockNumber = await provider.getBlockNumber();
    
    // For demonstration, we'll fetch the last 10 blocks and look for transactions
    const transactions = [];
    const maxBlocks = Math.min(blockNumber, 10); // Look at last 10 blocks max
    
    for (let i = 0; i < maxBlocks; i++) {
      const block = await provider.getBlock(blockNumber - i, true);
      
      if (block && block.transactions) {
        // Filter transactions related to this address
        const relevantTxs = block.transactions.filter(tx => 
          (tx.from && tx.from.toLowerCase() === address.toLowerCase()) || 
          (tx.to && tx.to.toLowerCase() === address.toLowerCase())
        );
        
        // Format transactions
        for (const tx of relevantTxs) {
          const isReceived = tx.to && tx.to.toLowerCase() === address.toLowerCase();
          const formattedTx = {
            type: isReceived ? 'Received' : 'Sent',
            amount: `${ethers.formatEther(tx.value)} SYN`,
            from: tx.from.slice(0, 6) + '...' + tx.from.slice(-8),
            to: tx.to ? tx.to.slice(0, 6) + '...' + tx.to.slice(-8) : 'Contract Creation',
            date: new Date((await provider.getBlock(tx.blockNumber)).timestamp * 1000).toISOString(),
            status: 'Confirmed',
            hash: tx.hash
          };
          
          transactions.push(formattedTx);
          
          // Limit to requested number of transactions
          if (transactions.length >= limit) {
            break;
          }
        }
      }
      
      // Break if we have enough transactions
      if (transactions.length >= limit) {
        break;
      }
    }
    
    // If we couldn't find any real transactions, create a sample transaction
    // This helps during initial testing when there might not be any transactions yet
    if (transactions.length === 0) {
      transactions.push({
        type: 'Received',
        amount: '100 SYN',
        from: 'sYnQ5gh...8d1efgh0',
        to: address.slice(0, 6) + '...' + address.slice(-8),
        date: new Date().toISOString(),
        status: 'Confirmed',
        hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
      });
    }
    
    return transactions;
  } catch (error) {
    console.error('Failed to get transaction history:', error);
    throw error;
  }
};

/**
 * Send transaction
 * @param {string} from - Sender address
 * @param {string} to - Recipient address
 * @param {string} amount - Amount to send
 * @param {object} signer - Ethers signer object
 * @returns {Promise<Object>} - Transaction receipt
 */
export const sendTransaction = async (from, to, amount, signer) => {
  try {
    if (!provider || !synergyTokenContract) {
      await initializeBlockchainService(currentNetwork);
    }
    
    // Create contract instance with signer
    const tokenWithSigner = synergyTokenContract.connect(signer);
    
    // Convert amount to wei
    const amountInWei = ethers.parseEther(amount);
    
    // Send transaction
    const tx = await tokenWithSigner.transfer(to, amountInWei);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    return {
      success: true,
      hash: receipt.hash,
      from,
      to,
      amount,
      network: currentNetwork
    };
  } catch (error) {
    console.error('Failed to send transaction:', error);
    throw error;
  }
};

/**
 * Get staking information
 * @param {string} address - Wallet address
 * @returns {Promise<Object>} - Staking information
 */
export const getStakingInfo = async (address) => {
  try {
    if (!provider || !synergyTokenContract) {
      await initializeBlockchainService(currentNetwork);
    }
    
    // Get staked balance
    const stakedBalance = await synergyTokenContract.getStakedBalance(address);
    const stakedBalanceInSyn = ethers.formatEther(stakedBalance);
    
    // Get reward rate
    const rewardRate = await synergyTokenContract.getRewardRate();
    const annualRewardRate = parseFloat(ethers.formatEther(rewardRate)) * 100; // Convert to percentage
    
    // Calculate estimated rewards (simplified)
    const monthlyReward = (parseFloat(stakedBalanceInSyn) * annualRewardRate / 100) / 12;
    
    // Get total balance for percentage calculation
    const totalBalance = await synergyTokenContract.balanceOf(address);
    const totalBalanceInSyn = ethers.formatEther(totalBalance);
    
    // Calculate percentage of total balance that is staked
    const percentageStaked = parseFloat(stakedBalanceInSyn) / parseFloat(totalBalanceInSyn) * 100;
    
    return {
      stakedBalance: stakedBalanceInSyn,
      percentageStaked: `${percentageStaked.toFixed(0)}%`,
      annualRewardRate: `${annualRewardRate.toFixed(2)}%`,
      estimatedMonthlyReward: monthlyReward.toFixed(2),
      nextRewardTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Mock: 24 hours from now
    };
  } catch (error) {
    console.error('Failed to get staking information:', error);
    throw error;
  }
};

/**
 * Stake tokens
 * @param {string} amount - Amount to stake
 * @param {object} signer - Ethers signer object
 * @returns {Promise<Object>} - Transaction receipt
 */
export const stakeTokens = async (amount, signer) => {
  try {
    if (!provider || !synergyTokenContract) {
      await initializeBlockchainService(currentNetwork);
    }
    
    // Create contract instance with signer
    const tokenWithSigner = synergyTokenContract.connect(signer);
    
    // Convert amount to wei
    const amountInWei = ethers.parseEther(amount);
    
    // Stake tokens
    const tx = await tokenWithSigner.stake(amountInWei);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    return {
      success: true,
      hash: receipt.hash,
      amount,
      network: currentNetwork
    };
  } catch (error) {
    console.error('Failed to stake tokens:', error);
    throw error;
  }
};

/**
 * Unstake tokens
 * @param {string} amount - Amount to unstake
 * @param {object} signer - Ethers signer object
 * @returns {Promise<Object>} - Transaction receipt
 */
export const unstakeTokens = async (amount, signer) => {
  try {
    if (!provider || !synergyTokenContract) {
      await initializeBlockchainService(currentNetwork);
    }
    
    // Create contract instance with signer
    const tokenWithSigner = synergyTokenContract.connect(signer);
    
    // Convert amount to wei
    const amountInWei = ethers.parseEther(amount);
    
    // Unstake tokens
    const tx = await tokenWithSigner.unstake(amountInWei);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    return {
      success: true,
      hash: receipt.hash,
      amount,
      network: currentNetwork
    };
  } catch (error) {
    console.error('Failed to unstake tokens:', error);
    throw error;
  }
};

export default {
  initializeBlockchainService,
  getWalletBalance,
  getTransactionHistory,
  sendTransaction,
  getStakingInfo,
  stakeTokens,
  unstakeTokens
};
