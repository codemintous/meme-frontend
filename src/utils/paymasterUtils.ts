import { BrowserProvider, Contract, JsonRpcProvider } from "ethers";

// Add TypeScript declarations for window properties
declare global {
  interface Window {
    ethereum?: any;
    coinbaseWallet?: any;
  }
}

// Function to create a provider with paymaster support
export const createPaymasterProvider = async () => {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      throw new Error('Not in browser environment');
    }

    // Skip trying to get the wallet client from wagmi due to TypeScript issues
    
    // Look for Coinbase Wallet specifically
    if (window.ethereum) {
      // If there are multiple providers, find Coinbase Wallet
      if (window.ethereum.providers) {
        const coinbaseProvider = window.ethereum.providers.find((p: any) => 
          p.isCoinbaseWallet || p.isCoinbase || p.isWalletLink
        );
        
        if (coinbaseProvider) {
          console.log("Using Coinbase Wallet provider from window.ethereum.providers");
          return new BrowserProvider(coinbaseProvider);
        }
      }
      
      // Check if the default provider is Coinbase Wallet
      if (window.ethereum.isCoinbaseWallet || window.ethereum.isCoinbase || window.ethereum.isWalletLink) {
        console.log("Using Coinbase Wallet provider from window.ethereum");
        return new BrowserProvider(window.ethereum);
      }
      
      // If MetaMask is detected, log a warning but still use it as a fallback
      if (window.ethereum.isMetaMask) {
        console.warn("MetaMask detected, but we prefer Coinbase Wallet for this application");
      }
      
      // Use whatever provider is available as a last resort
      console.warn("Using default provider as fallback");
      return new BrowserProvider(window.ethereum);
    }
    
    throw new Error('No Ethereum provider found. Please install Coinbase Wallet.');
  } catch (error) {
    console.error('Error creating provider:', error);
    throw new Error('Failed to create wallet provider. Please connect your wallet first.');
  }
};

// Function to create a contract with paymaster support
export const createPaymasterContract = async (
  contractAddress: string,
  contractAbi: any
) => {
  const provider = await createPaymasterProvider();
  const signer = await provider.getSigner();
  
  // Create a contract with the signer
  const contract = new Contract(contractAddress, contractAbi, signer);
  
  return contract;
};

// Function to execute a transaction with paymaster support
export const executePaymasterTransaction = async (
  contract: Contract,
  method: string,
  args: any[] = [],
  options: any = {}
) => {
  try {
    // Execute the transaction
    const tx = await contract[method](...args, options);
    console.log(`Transaction sent: ${tx.hash}`);
    
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log(`Transaction mined: ${receipt.hash}`);
    
    return receipt;
  } catch (error) {
    console.error(`Error executing transaction: ${error}`);
    throw error;
  }
};
