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
    
    // Always use a minimal amount for testing
    const minAmount = BigInt(1);
    
    if (mode === 'buy') {
      return [{
        address: factoryAddress,
        abi: factory_contract_abi,
        functionName: 'buyTokens',
        args: [normalizedAddress, minAmount], // token address and minimal amount
      }] as unknown as ContractFunctionParameters[];
    } else {
      return [{
        address: factoryAddress,
        abi: factory_contract_abi,
        functionName: 'sellTokens',
        args: [normalizedAddress, minAmount], // token address and minimal amount
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
      {mode === "buy" ? (
        <Typography variant="body2" sx={{ color: "white" }}>
          Gasless transaction - testing mode
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ color: "white" }}>
          Gasless transaction - testing mode
        </Typography>
      )}
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
