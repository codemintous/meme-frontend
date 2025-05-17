"use client"

import Link from 'next/link';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,

  IconButton,

  styled,
  TextField
} from '@mui/material';
import {
  ChevronLeft,

  Info,
  Plus,
  Rocket,
  Search,
  TrendingUp,
  Trophy,

  UsersRound
} from 'lucide-react';

import WalletButton from './WalletButton';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
// import { ConnectAndSIWE } from './ConnectAndSIWE';

import platform_contract_abi from "../data/platform_contract_abi.json"
import { formatUnits, parseEther, Contract, JsonRpcProvider } from "ethers";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
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

// Styled components
const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  width: '280px',
  height: '100vh',
  backgroundColor: 'black',
  color: 'white',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)'
}));

const LogoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '32px'
});

const LogoCircle = styled(Box)({
  width: '40px',
  height: '40px',
  backgroundColor: '#9333ea', // purple-600
  borderRadius: '50%'
});

const NavItem = styled(ListItem)({
  borderRadius: '8px',
  padding: '12px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
});

const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  color: 'inherit',
  width: '100%'
});



const Sidebar = () => {

  const { address, isConnected } = useAccount();
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [donatePopup, setDonatePopup] = useState(false);
  const [donateAmount, setDonateAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<{hash?: string; status: string; error?: string}>({ status: '' });

  const fetchTokenBalance = async (
    address: string,
    setTokenBalance: (balance: string) => void
  ) => {
    try {
      if (!window.ethereum) {
        console.error("Ethereum provider not found.");
        return;
      }

      const memeTokenAddress = process.env.NEXT_PUBLIC_PLATFORMBALANCE_CONTRACT_ADDRESS;
      if (!memeTokenAddress) {
        console.error("Contract address is not defined in environment variables");
        return;
      }
      console.log("[DEBUG] Fetching MEME balance for user address:", address);
      console.log("[DEBUG] Using MEME token contract address:", memeTokenAddress);

      // Use ethers.js to call balanceOf
      // Use a public Base Sepolia RPC provider for read-only queries
      const rpcUrl = "https://base-sepolia-rpc.publicnode.com";
      const provider = new JsonRpcProvider(rpcUrl);
      const contract = new Contract(
        memeTokenAddress,
        platform_contract_abi,
        provider
      );
      console.log('[DEBUG] Contract address:', memeTokenAddress);
      console.log('[DEBUG] Calling balanceOf with address:', address);
      let balance;
      try {
        balance = await contract.balanceOf(address);
        console.log('[DEBUG] Raw balance value (BigNumber):', balance.toString());
      } catch (err) {
        console.error('[DEBUG] Error calling balanceOf:', err);
        setTokenBalance('0');
        return;
      }
      let formattedBalance;
      try {
        formattedBalance = formatUnits(balance, 18); // 18 decimals typical for ERC20
        console.log('[DEBUG] Formatted balance:', formattedBalance);
      } catch (err) {
        console.error('[DEBUG] Error formatting balance:', err);
        setTokenBalance('0');
        return;
      }
      setTokenBalance(formattedBalance);
    } catch (err) {
      console.error("Error fetching token balance:", err);
      setTokenBalance('0');
    }
  };

useEffect(() => {
    if (address) {
        fetchTokenBalance(address , setTokenBalance);
    }
  }, [ isConnected, address]);


  // Create contract parameters for onchainkit Transaction
  const getContracts = (amount: string) => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return [];
    }
    
    const contractAddress = process.env.NEXT_PUBLIC_PLATFORMBALANCE_CONTRACT_ADDRESS as Address;
    if (!contractAddress) {
      console.error("Contract address is not defined in environment variables");
      return [];
    }
    
    // Format amount exactly like TradeForm
    const parsedAmount = parseFloat(amount);
    const displayAmount = parsedAmount.toString();
    
    // Convert to BigInt for contract call - parseEther like in TradeForm
    const tokenAmount = parseEther(displayAmount);
    console.log('Creating transaction with amount:', displayAmount);
    console.log('Token amount in wei:', tokenAmount.toString());
    
    // Define the contract function parameters following TradeForm pattern exactly
    return [{
      address: contractAddress,
      abi: platform_contract_abi,
      functionName: 'mintTokens',
      args: [tokenAmount], // Using parseEther value
  

    }] as ContractFunctionParameters[];
  };

  // Handle transaction success
  const handleSuccess = (response: TransactionResponse) => {
    console.log("Mint transaction successful:", response);
    setTxStatus({ status: 'Success! Tokens minted successfully' });
    // Update token balance
    if (address) {
      fetchTokenBalance(address, setTokenBalance);
    }
    // Instantly clear all state and close modal
    setIsLoading(false);
    setDonatePopup(false);
    setDonateAmount('');
    setTxStatus({ status: '' });
  };

  // Handle transaction error
  const handleError = (error: TransactionError) => {
    console.error("Mint transaction error:", error);
    setTxStatus({ status: 'Error', error: error.message || 'Transaction failed' });
    setIsLoading(false);
  };


  return (
    <SidebarContainer>
      {/* Logo Section */}
      <LogoContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <Box
      component="img"
      src="/agents/memelogo.png" // replace with your actual image path
      alt="Logo"
      sx={{ width: 42, height: 42, borderRadius: '50%' }}
    />
    <Typography variant="h6" fontWeight="bold">MemeMinto AI</Typography>
  </Box>
        <IconButton color="inherit" size="small">
          <ChevronLeft />
        </IconButton>
      </LogoContainer>

      {/* Navigation Links */}
      <Box component="nav" sx={{ flexGrow: 1 }}>
        <List sx={{ '& > li': { mb: 1 } }}>
          <NavItem disablePadding>
            <StyledLink href="/">
              <Search size={20} />
              <Typography>Explore</Typography>
            </StyledLink>
          </NavItem>

          <NavItem disablePadding>
            <StyledLink href="/my-memes">
              <UsersRound size={20} />
              <Typography>My Memes</Typography>
            </StyledLink>
          </NavItem>
          <NavItem disablePadding>
            <StyledLink href="/launchpad">
              <Rocket size={20} />
              <Typography>Launchpad</Typography>
            </StyledLink>
          </NavItem>
          <NavItem disablePadding>
            <StyledLink href="/rankings">
              <Trophy size={20} />
              <Typography>Rankings</Typography>
            </StyledLink>
          </NavItem>
          {/* <NavItem disablePadding>
            <StyledLink href="/trending">
              <TrendingUp size={20} />
              <Typography>Trending</Typography>
            </StyledLink>
          </NavItem> */}
          <NavItem disablePadding>
            <StyledLink href="/about">
              <Info size={20} />
              <Typography>About</Typography>
            </StyledLink>
          </NavItem>
          {/*<ConnectAndSIWE/>*/}


        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      Platform Token Balance : <br />
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Plus size={20} />}
          sx={{
            borderColor: '#9333ea',
            color: '#9333ea',
           
          }}
          onClick={() => setDonatePopup(true)}

        >
         
{Number(tokenBalance ?? 0).toFixed(2)} 
</Button>
<Link href={"/creatememe"}>

        <Button
          variant="contained"
          fullWidth
          startIcon={<Plus size={20} />}
          sx={{ backgroundColor: '#9333ea', '&:hover': { backgroundColor: '#7e22ce' } }}
        >
            Create Meme

        </Button>
        </Link>

        <WalletButton />
      </Box>


       <Dialog
          open={donatePopup}
          onClose={() => setDonatePopup(false)}
          PaperProps={{
            sx: {
              backdropFilter: 'blur(12px)',
              background: 'rgba(30,30,30,0.85)',
              borderRadius: 4,
              color: 'white',
              minWidth: 400,
              boxShadow: 8,
              p: 2,
              position: 'relative'
            },
          }}
        >
          {/* Close icon */}
          <Box sx={{ position: 'absolute', top: 12, right: 14, zIndex: 2 }}>
            <button onClick={() => setDonatePopup(false)} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 22, cursor: 'pointer' }}>&times;</button>
          </Box>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 3 }}>
            <Typography variant="h5" fontWeight={700} mb={1} sx={{ letterSpacing: 1, color: '#fff' }}>Mint Tokens</Typography>
            <Typography variant="subtitle2" sx={{ color: '#aaa', mb: 2 }}>Mint Meme tokens instantly to your wallet. Gasless & sponsored!</Typography>
                          {/* <Typography variant="h6" mb={2}>Mint Tokens</Typography> */}
      
            <TextField
              label="Amount to Mint"
              type="number"
              fullWidth
              disabled={isLoading}
              value={donateAmount}
              onChange={(e) => setDonateAmount(e.target.value)}
              InputProps={{
                sx: { color: "white", fontSize: 22, fontWeight: 600, letterSpacing: 1, borderRadius: 2, background: 'rgba(255,255,255,0.04)' }
              }}
              InputLabelProps={{
                sx: { color: "#aaa", fontWeight: 400, fontSize: 15 }
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(147, 51, 234, 0.3)' },
                  '&:hover fieldset': { borderColor: '#9333ea' },
                  '&.Mui-focused fieldset': { borderColor: '#9333ea' },
                }
              }}
            />
            {/* Live Preview */}
            {/* {donateAmount && Number(donateAmount) > 0 && (
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 1, mb: 1, px: 2, py: 1,
                bgcolor: 'rgba(147,51,234,0.08)', borderRadius: 2, border: '1px solid #9333ea',
                minWidth: 180, justifyContent: 'center'
              }}>
                <img src="/meme-token.png" alt="MEME" width={26} height={26} style={{ marginRight: 8 }} />
                <Typography variant="h6" sx={{ color: '#9333ea', fontWeight: 700, letterSpacing: 1 }}>+{donateAmount} MEME</Typography>
              </Box>
            )} */}
                          

                          {/* Transaction Status */}
                          {isLoading && (
                            <Box sx={{ mt: 1, textAlign: 'center' }}>
                              <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
                                {txStatus.status}
                              </Typography>
                              {txStatus.hash && (
                                <Typography variant="caption" sx={{ color: "#9333ea" }}>
                                  Transaction Hash: {txStatus.hash.slice(0, 6)}...{txStatus.hash.slice(-4)}
                                </Typography>
                              )}
                            </Box>
                          )}
                          

                          {txStatus.error && (
                            <Typography variant="body2" sx={{ color: "red", mt: 1 }}>
                              Error: {txStatus.error}
                            </Typography>
                          )}
                          

                          {txStatus.status === 'Success! Tokens minted successfully' && (
                            <Typography variant="body2" sx={{ color: "#4ade80", mt: 1 }}>
                              Success! Tokens have been minted to your account.
                            </Typography>
                          )}
                      </DialogContent>
                      <DialogActions>
                          {/* <Button 
                            onClick={() => {
                              setDonatePopup(false);
                              setTxStatus({ status: '' });
                            }} 
                            sx={{ color: "#aaa" }}
                            disabled={isLoading}
                          >
                              Close
                          </Button> */}
                          {/* Replace button with Transaction component */}
                          {/* Using a key to force re-render when amount changes */}
                          <Transaction
                            key={`mint-transaction-${donateAmount}`}
                            contracts={getContracts(donateAmount)}
                            chainId={84532} // Base Sepolia Chain ID
                            onError={handleError}
                            onSuccess={handleSuccess}
                            isSponsored={true}
                          >
                            <TransactionButton 
                              style={{
                                color: "white", 
                                backgroundColor: "#9333ea",
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                minWidth: '120px'
                              }}
                              disabled={!donateAmount || isLoading || Number(donateAmount) <= 0}
                              text={isLoading ? 'Processing...' : `Mint ${donateAmount} Tokens`}
                              onClick={() => setIsLoading(true)}
                            />
                            <Box sx={{ mt: 2 }}>
                              <TransactionStatus>
                                <TransactionStatusLabel />
                                <TransactionStatusAction />
                              </TransactionStatus>
                            </Box>
                          </Transaction>
                          

                          {/* Display transaction preview to help debug */}
                          {/* {donateAmount && Number(donateAmount) > 0 && (
                            <Box sx={{ mt: 2, p: 1, bgcolor: '#333', borderRadius: 1 }}>
                              <Typography variant="subtitle2" sx={{ color: '#fff' }}>Transaction Preview:</Typography>
                              <Typography variant="body2" sx={{ color: '#4caf50' }}>
                                +{donateAmount} MEME
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#aaa' }}>Gasless transaction | Sponsored</Typography>
                            </Box>
                          )} */}
                      </DialogActions>
                  </Dialog>
    </SidebarContainer>
  );
};

export default Sidebar;