// components/TradeForm.tsx
import { Box, Typography, Tabs, Tab, TextField, Button } from "@mui/material";
import { useState } from "react";
import factory_contract_abi from "@/data/factory_contract_abi.json"
import { BrowserProvider, Contract, parseEther } from "ethers";

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
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<number>(0);
  const [slippage, setSlippage] = useState<number>(0);


  const handleBuy = async () => {
    try {
     
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });



      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Connected user:", userAddress);
  
      const network = await provider.getNetwork();
      console.log("Connected to network:", network);
  
      const contract = new Contract(
        process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS!,
        factory_contract_abi,
        signer
      );

      if (!tokenAddress) {
        console.error("Token address is undefined.");
        return;
      }
      console.log("token address...........", tokenAddress);
      const totalCost = (parseInt(amount.toString()) * 0.0001).toString();

      const tx = await contract.buyTokens(tokenAddress, parseEther(amount.toString()), 
      {
        value: parseEther(totalCost)
      }
    );
      
      console.log("buy cost..................", parseEther(totalCost));
      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction mined:", receipt);


    } catch (error) {
      console.error('Error during buy transaction:', error);
    } finally {
      console.log("finally block....");
    }
  };

  const handleSell = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Connected user:", userAddress);
  
      const network = await provider.getNetwork();
      console.log("Connected to network:", network);
  
      if (!tokenAddress) {
        console.error("Token address is undefined.");
        return;
      }

      const contract = new Contract(
        process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS!,
        factory_contract_abi,
        signer
      );
     
      const tx = await contract.sellTokens(tokenAddress, parseEther(amount.toString()));
      
      console.log("Sell transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Sell transaction confirmed:", receipt);
    } catch (error) {
      console.error('Error during sell transaction:', error);
    } finally {
      console.log("Sell finally block....");
    }
  };

  const handleSubmit = () => {
    if (mode === "buy") {
      handleBuy();
    } else {
      handleSell();
    }
    onSubmit(mode, amount, slippage);
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
        onChange={(e) => setAmount(Number(e.target.value))}
        InputProps={{ sx: { color: "white" } }}
        InputLabelProps={{ sx: { color: "white" } }}
        sx={{ backgroundColor: "#2b2b2b", borderRadius: 1 }}
      />
      <TextField
        type="number"
        variant="outlined"
        size="small"
        label="Slippage %"
        value={slippage}
        onChange={(e) => setSlippage(Number(e.target.value))}
        InputProps={{ sx: { color: "white" } }}
        InputLabelProps={{ sx: { color: "white" } }}
        sx={{ backgroundColor: "#2b2b2b", borderRadius: 1 }}
      />

      <Button
        variant="contained"
        color={mode === "buy" ? "secondary" : "error"}
        fullWidth
        sx={{ mt: "auto" }}
        onClick={handleSubmit}
      >
        {mode === "buy" ? "Buy" : "Sell"}
      </Button>
    </Box>
  );
}



// {
//   "tokenAddress": "0x82E5556AAe3cE3810ac9AEFe76F80cf7567BFd5D",
//   "name": "MemeFiesta",
//   "symbol": "ROFL",
//   "description": "MemeFiesta ($ROFL) is the ultimate meme-powered token that fuels laughter across the internet."
// }
