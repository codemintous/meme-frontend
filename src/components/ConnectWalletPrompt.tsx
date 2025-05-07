// components/ConnectWalletPrompt.tsx
"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import WalletButton from "./WalletButton";

const ConnectWalletPrompt = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      color="white"
      textAlign="center"
      p={2}
    >
      <Typography variant="h5" mb={2}>
        Please connect your wallet.
      </Typography>
      <WalletButton />
    </Box>
  );
};

export default ConnectWalletPrompt;
