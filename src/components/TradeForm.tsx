// components/TradeForm.tsx
import { Box, Typography, Tabs, Tab, TextField, Button } from "@mui/material";
import { useState } from "react";

interface TradeFormProps {
  tokenName: string;
  tokenSymbol: string;
  chain: string;
  price: number;
  marketCap: string;
  onSubmit: (mode: "buy" | "sell", amount: number, slippage: number) => void;
}

export default function TradeForm({
  tokenName,
  tokenSymbol,
  chain,
  price,
  marketCap,
  onSubmit,
}: TradeFormProps) {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<number>(0);
  const [slippage, setSlippage] = useState<number>(0.5);

  const handleSubmit = () => {
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
        label="Amount"
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
