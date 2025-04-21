"use client";
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
  Divider,
} from "@mui/material";

export default function LaunchTokenPage() {
  const [chain, setChain] = React.useState("solana");
  const [dex, setDex] = React.useState("raydium");

  const commonTextFieldStyles = {
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiInputLabel-root": { color: "gray" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray" },
      "&:hover fieldset": { borderColor: "gray" },
      "&.Mui-focused fieldset": { borderColor: "gray" },
    },
  };

  return (
    <Box sx={{ p: 4, color: "white", bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Launch Token on Solana
      </Typography>

      {/* Chain */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1 }}>Choose a chain</Typography>
        <ToggleButtonGroup
          value={chain}
          exclusive
          onChange={(e, val) => val && setChain(val)}
          sx={{
            "& .MuiToggleButton-root": {
              color: "white",
              border: "1px solid gray",
              borderRadius: 2,
              px: 3,
              mr: 2,
              textTransform: "none",
              "&.Mui-selected": {
                borderColor: "#7f5af0",
                backgroundColor: "#1e1e1e",
                color: "white",
              },
            },
          }}
        >
          <ToggleButton value="solana">Solana</ToggleButton>
          <ToggleButton value="base">Base</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* DEX */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1 }}>Choose a DEX</Typography>
        <ToggleButtonGroup
          value={dex}
          exclusive
          onChange={(e, val) => val && setDex(val)}
          sx={{
            "& .MuiToggleButton-root": {
              color: "white",
              border: "1px solid gray",
              borderRadius: 2,
              px: 3,
              mr: 2,
              textTransform: "none",
              "&.Mui-selected": {
                borderColor: "#7f5af0",
                color: "white",
                backgroundColor: "#1e1e1e",
              },
            },
          }}
        >
          <ToggleButton value="raydium">Raydium</ToggleButton>
          <ToggleButton value="meteora">Meteora</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Token Info */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField fullWidth label="Token Name" variant="outlined" sx={commonTextFieldStyles} />
        <TextField fullWidth label="Token Symbol" variant="outlined" sx={commonTextFieldStyles} />
      </Box>

      {/* Description */}
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        multiline
        rows={3}
        sx={{ ...commonTextFieldStyles, mb: 3 }}
      />

      {/* Links */}
      <Typography sx={{ mb: 1 }}>Links</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField fullWidth label="Discord" variant="outlined" sx={commonTextFieldStyles} />
        <TextField fullWidth label="Telegram" variant="outlined" sx={commonTextFieldStyles} />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Website"
          defaultValue="https://meme-frontend"
          variant="outlined"
          sx={commonTextFieldStyles}
        />
        <TextField fullWidth label="X" variant="outlined" sx={commonTextFieldStyles} />
      </Box>

      {/* Uploads */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Box
          sx={{
            border: "1px solid gray",
            borderRadius: 2,
            width: "50%",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "gray",
          }}
        >
          Upload Icon
        </Box>
        <Box
          sx={{
            border: "1px solid gray",
            borderRadius: 2,
            width: "50%",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "gray",
          }}
        >
          Upload Banner
        </Box>
      </Box>

      {/* Initial Buy */}
      <Divider sx={{ borderColor: "gray", mb: 2 }} />
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Initial Buy
      </Typography>
      <Typography variant="caption" sx={{ color: "gray", mb: 1, display: "block" }}>
        Optional: Be the very first person to buy your token!
      </Typography>
      <TextField
        fullWidth
        placeholder="0"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography sx={{ color: "white" }}>SOL</Typography>
            </InputAdornment>
          ),
          style: { color: "white" },
        }}
        sx={{ mb: 1, ...commonTextFieldStyles }}
      />
      <Typography variant="caption" sx={{ color: "gray" }}>
        You spend 0 to receive your newly created tokens.
      </Typography>

      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mt: 4, // margin-top to create spacing from the form
  }}
>
  <Button
    variant="contained"
    sx={{
      bgcolor: "#7f5af0",
      textTransform: "none",
      fontWeight: "bold",
      "&:hover": { bgcolor: "#6848d8" },
      width: "fit-content",
    }}
  >
    Connect Wallet
  </Button>
</Box>

     

    </Box>
  );
}
