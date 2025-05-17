// components/WalletButton.tsx
"use client";

import { Wallet } from '@coinbase/onchainkit/wallet';
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { Box, Button } from '@mui/material';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { cbWalletConnector } from '@/provider/wagmi';

const WalletButton = () => {
  useWalletAuth(); // triggers auth logic when wallet is connected
  // const { isConnected, address } = useAccount();
  // const { connect } = useConnect();
  // const { disconnect } = useDisconnect();

  // Function to handle connecting with Coinbase Wallet
  // const handleConnect = () => {
  //   connect({ connector: cbWalletConnector });
  // };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"  
      textAlign="center"
    >
      {/* Use the OnchainKit Wallet component for a consistent UI */}
      <Wallet />
      
      {/* Add a specific button for Coinbase Wallet */}
      {/* {!isConnected && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleConnect}
          sx={{ ml: 2, backgroundColor: '#0052FF', '&:hover': { backgroundColor: '#0039CB' } }}
        >
          Connect Base Wallet
        </Button>
      )} */}
    </Box>
  );
};

export default WalletButton;
