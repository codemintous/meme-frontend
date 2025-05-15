// components/WalletButton.tsx
"use client";

import { Wallet } from '@coinbase/onchainkit/wallet';
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { Box } from '@mui/material';

const WalletButton = () => {
  useWalletAuth(); // triggers auth logic when wallet is connected

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"  
      textAlign="center"
      sx={{
        position: 'relative',
        zIndex: 9999 // Add high z-index to ensure popup appears above other elements
      }}
    >
      <Wallet />
    </Box>
  );
};

export default WalletButton;
