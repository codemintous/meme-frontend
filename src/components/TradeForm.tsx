// components/TradeForm.tsx
import { Box, Typography, Tabs, Tab, TextField } from "@mui/material";
import { useState, useMemo } from "react";
import factory_contract_abi from "@/data/factory_contract_abi.json"
import { parseEther } from "ethers";
import { useAccount } from "wagmi";
import WalletButton from "./WalletButton";
import { isValidTokenAddress, normalizeTokenAddress } from "@/utils/tokenUtils";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { ContractFunctionParameters, Address } from 'viem';

interface TradeFormProps {
  tokenName: string;
  tokenSymbol: string;
  chain: string;
  price: number;
  marketCap: string;
  tokenAddress: string;
  onSubmit: (mode: "buy" | "sell", amount: number, slippage: number) => void;
}

export default function TradeForm({
  tokenName,
  tokenSymbol,
  chain,
  price,
  marketCap,
  tokenAddress,
  onSubmit,
}: TradeFormProps) {
  console.log('TradeForm tokenAddress:', tokenAddress);
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<string>('');
  const [slippage, setSlippage] = useState<string>('');
  const { isConnected } = useAccount();

  // Validate inputs
  // const isValidInput = () => {
  //   const parsedAmount = parseFloat(amount);
  //   const parsedSlippage = parseFloat(slippage);

  //   if (isNaN(parsedAmount) || parsedAmount <= 0) {
  //     alert('Please enter a valid amount');
  //     return false;
  //   }

  //   if (isNaN(parsedSlippage) || parsedSlippage < 0 || parsedSlippage > 100) {
  //     alert('Please enter a valid slippage percentage (0-100)');
  //     return false;
  //   }

  //   if (!isValidTokenAddress(tokenAddress)) {
  //     alert("This token doesn't have a valid contract address. It may not have been launched yet.");
  //     return false;
  //   }

  //   return true;
  // };

  // Validate inputs
  const isValidInput = () => {
    const parsedAmount = parseFloat(amount);
    const parsedSlippage = parseFloat(slippage);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount');
      return false;
    }

    if (isNaN(parsedSlippage) || parsedSlippage < 0 || parsedSlippage > 100) {
      alert('Please enter a valid slippage percentage (0-100)');
      return false;
    }

    if (!isValidTokenAddress(tokenAddress)) {
      alert("This token doesn't have a valid contract address. It may not have been launched yet.");
      return false;
    }

    return true;
  };

  // Create contract parameters for onchainkit Transaction
  const contracts = useMemo(() => {
    if (!isValidTokenAddress(tokenAddress)) return [];
    
    const normalizedAddress = normalizeTokenAddress(tokenAddress);
    const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as Address;
    
    // Parse the display amount for preview
    const displayAmount = amount || '0';
    const isValidInput = (input: string): boolean => {
      const parsed = parseFloat(input);
      return !isNaN(parsed) && parsed > 0; // Ensure input is valid and positive
    };
    
    // Validate input
    if (!isValidInput(amount)) {
      console.error('Invalid input amount:', amount);
      // Return empty array instead of undefined
      return [] as unknown as ContractFunctionParameters[];
    }
    
    const parsedAmount = parseFloat(displayAmount);
    
    // Calculate ETH amount based on exchange rate: 0.0001 ETH = 1 MATH
    const ethAmountPerToken = 0.0001; // Fixed exchange rate
    const ethForTransaction = (parsedAmount * ethAmountPerToken).toFixed(18);
    
    // For the actual blockchain transaction
    const tokenAmount = parseEther(displayAmount); // Full token amount
    const ethValue = parseEther(ethForTransaction); // ETH based on exchange rate
    
    console.log('Display amount (user input):', displayAmount);
    console.log('Exchange rate: 1 MATH =', ethAmountPerToken, 'ETH');
    console.log('ETH amount for transaction:', ethForTransaction);
    console.log('Token amount in wei:', tokenAmount.toString());
    console.log('ETH value in wei:', ethValue.toString());
    
    if (mode === 'buy') {
      // BUY: Spend ethForTransaction ETH to buy displayAmount MATH
      return [{
        address: factoryAddress,
        abi: factory_contract_abi,
        functionName: 'buyTokens',
        args: [normalizedAddress, tokenAmount], // Full token amount
        value: ethValue, // ETH value based on exchange rate
        meta: {
          assetChanges: [
            {
              type: 'increment',
              symbol: 'MATH',
              amount: displayAmount // Full token amount
            },
            {
              type: 'decrement',
              symbol: 'ETH',
              amount: ethForTransaction // ETH based on exchange rate
            }
          ],
          description: `Buy ${displayAmount} MATH for ${ethForTransaction} ETH`
        }
      }] as unknown as ContractFunctionParameters[];
    } else {
      // SELL: Spend displayAmount MATH to receive ethForTransaction ETH
      return [{
        address: factoryAddress,
        abi: factory_contract_abi,
        functionName: 'sellTokens',
        args: [normalizedAddress, tokenAmount], // Full token amount
        value: BigInt(0),
        meta: {
          assetChanges: [
            {
              type: 'decrement',
              symbol: 'MATH',
              amount: displayAmount // Full token amount
            },
            {
              type: 'increment',
              symbol: 'ETH',
              amount: ethForTransaction // ETH based on exchange rate
            }
          ],
          description: `Sell ${displayAmount} MATH for ${ethForTransaction} ETH`
        }
      }] as unknown as ContractFunctionParameters[];
    }
  }, [tokenAddress, mode, amount]);

  // Handle transaction success
  const handleSuccess = (response: TransactionResponse) => {
    console.log(`${mode === 'buy' ? 'Buy' : 'Sell'} transaction successful:`, response);
    const parsedAmount = parseFloat(amount);
    const parsedSlippage = parseFloat(slippage);
    onSubmit(mode, parsedAmount, parsedSlippage);
  };

  // Handle transaction error
  const handleError = (error: TransactionError) => {
    console.error(`${mode === 'buy' ? 'Buy' : 'Sell'} transaction error:`, error);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Token Info */}
      <Box>
        <Typography variant="h6" fontWeight="bold">{tokenName}</Typography>
        <Typography variant="body2" color="gray">
          {tokenSymbol} / {chain}
        </Typography>
      </Box>

      {/* Token Price & Market Cap */}
      <Box display="flex" gap={2}>
        <Box
          flex={1}
          sx={{
            backgroundColor: "#141414",
            px: 1.5,
            borderRadius: 1,
            border: "1px solid #333",
          }}
        >
          <Typography variant="caption" color="gray">Price:</Typography>
          <Typography variant="body1" fontWeight="bold">
            {price || "0.000000"}
          </Typography>
        </Box>
        <Box
          flex={1}
          sx={{
            backgroundColor: "#141414",
            px: 1.5,
            borderRadius: 1,
            border: "1px solid #333",
          }}
        >
          <Typography variant="caption" color="gray">Market Cap:</Typography>
          <Typography variant="body1" fontWeight="bold">
            {marketCap || "—"}
          </Typography>
        </Box>
      </Box>

      {/* Mode Switch */}
      <Tabs
        value={mode}
        onChange={(e, newValue) => setMode(newValue)}
        textColor="inherit"
        indicatorColor="secondary"
      >
        <Tab value="buy" label="Buy" />
        <Tab value="sell" label="Sell" />
      </Tabs>

      {/* Input Fields */}
      <TextField
        type="number"
        variant="outlined"
        size="small"
        label="Tokens"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        InputProps={{ sx: { color: "white" } }}
        InputLabelProps={{ sx: { color: "white" } }}
        sx={{ backgroundColor: "#2b2b2b", borderRadius: 1 }}
      />
      {/* Transaction Preview Box */}
      <Box sx={{ 
        backgroundColor: '#333', 
        padding: 1, 
        borderRadius: 1,
        marginTop: 1,
        marginBottom: 1
      }}>
        <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
          Transaction Preview:
        </Typography>
        {mode === "buy" ? (
          <Box>
            <Typography variant="body2" sx={{ color: "#4caf50" }}>
              +{amount || '0'} {tokenSymbol || 'MATH'}
            </Typography>
            <Typography variant="body2" sx={{ color: "#f44336" }}>
              -{Number(amount || '0') * 0.0001} ETH
            </Typography>
            {/* <Typography variant="caption" sx={{ color: "#aaa" }}>
              Exchange rate: 1 MATH = 0.0001 ETH
            </Typography> */}
          </Box>
        ) : (
          <Box>
            <Typography variant="body2" sx={{ color: "#f44336" }}>
              -{amount || '0'} {tokenSymbol || 'MATH'}
            </Typography>
            <Typography variant="body2" sx={{ color: "#4caf50" }}>
              +{Number(amount || '0') * 0.0001} ETH
            </Typography>
            <Typography variant="caption" sx={{ color: "#aaa" }}>
              Exchange rate: 1 MATH = 0.0001 ETH
            </Typography>
          </Box>
        )}
        <Typography variant="caption" sx={{ color: "#aaa" }}>
          Gasless transaction | Sponsored by Coinbase
        </Typography>
      </Box>
      <TextField
        type="number"
        variant="outlined"
        size="small"
        label="Slippage %"
        value={slippage}
        onChange={(e) => setSlippage(e.target.value)}
        InputProps={{ sx: { color: "white" } }}
        InputLabelProps={{ sx: { color: "white" } }}
        sx={{ backgroundColor: "#2b2b2b", borderRadius: 1 }}
      />

      {!isConnected ? (
        <WalletButton />
      ) : (
        <Transaction
          contracts={contracts}
          className="w-full"
          chainId={84532} // Use Base Sepolia Chain ID directly like the template
          onError={handleError}
          onSuccess={handleSuccess}
          isSponsored={true}
        >
          {/* @ts-ignore - The TransactionButton component does accept children */}
          <TransactionButton 
            className="w-full py-2 mt-2"
            style={{
              backgroundColor: mode === 'buy' ? '#9c27b0' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            text={mode === "buy" ? "Buy" : "Sell"}
          >
            {mode === "buy" ? "Buy" : "Sell"}
          </TransactionButton>
          <TransactionStatus>
            <TransactionStatusLabel />
            <TransactionStatusAction />
          </TransactionStatus>
        </Transaction>
      )}
    </Box>
  );
}
