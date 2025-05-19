import { BrowserProvider, Contract, InterfaceAbi } from "ethers";

// Define proper types for wallet providers
export interface WalletProvider {
  isCoinbaseWallet?: boolean;
  isCoinbase?: boolean;
  isWalletLink?: boolean;
  isMetaMask?: boolean;
  providers?: WalletProvider[];
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

// Use module augmentation only for coinbaseWallet
export {}

declare global {
  interface Window {
    coinbaseWallet?: WalletProvider;
  }
}
// Function to create a provider with paymaster support
export const createPaymasterProvider = async (): Promise<BrowserProvider> => {
  if (typeof window === 'undefined') throw new Error('Not in browser environment');

  if (window.ethereum) {
    if (window.ethereum.providers) {
      const coinbaseProvider = window.ethereum.providers.find((p: WalletProvider) =>
        p.isCoinbaseWallet || p.isCoinbase || p.isWalletLink
      );
      if (coinbaseProvider) {
        console.log("Using Coinbase Wallet provider from window.ethereum.providers");
        return new BrowserProvider(coinbaseProvider);
      }
    }

    if (window.ethereum.isCoinbaseWallet || window.ethereum.isCoinbase || window.ethereum.isWalletLink) {
      console.log("Using Coinbase Wallet provider from window.ethereum");
      return new BrowserProvider(window.ethereum);
    }

    if (window.ethereum.isMetaMask) {
      console.warn("MetaMask detected, but we prefer Coinbase Wallet for this application");
    }

    console.warn("Using default provider as fallback");
    return new BrowserProvider(window.ethereum);
  }

  throw new Error('No Ethereum provider found. Please install Coinbase Wallet.');
};

// Create a contract instance
export const createPaymasterContract = async (
  contractAddress: string,
  contractAbi: InterfaceAbi
): Promise<Contract> => {
  const provider = await createPaymasterProvider();
  const signer = await provider.getSigner();
  return new Contract(contractAddress, contractAbi, signer);
};

// Transaction options interface
interface TransactionOptions {
  gasLimit?: bigint;
  gasPrice?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  value?: bigint;
}

// Execute a transaction on the contract
export const executePaymasterTransaction = async (
  contract: Contract,
  method: string,
  args: unknown[] = [],
  options: TransactionOptions = {}
): Promise<unknown> => {
  try {
    const tx = await contract[method](...args, options);
    console.log(`Transaction sent: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Transaction mined: ${receipt.hash}`);
    return receipt;
  } catch (error) {
    console.error(`Error executing transaction: ${error}`);
    throw error;
  }
};
