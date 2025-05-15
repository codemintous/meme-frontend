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

import platform_contract_abi from "@/data/platform_contract_abi.json"
import { BrowserProvider, Contract, formatUnits, parseEther } from "ethers";
import { Dialog, DialogActions, DialogContent } from "@mui/material";

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

  const fetchTokenBalance = async (
    address: string,
    setTokenBalance: (balance: string) => void
  ) => {
    try {
      if (!window.ethereum) {
        console.error("Ethereum provider not found.");
        return;
      }
  
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
  
      const contract = new Contract(
        process.env.NEXT_PUBLIC_PLATFORMBALANCE_CONTRACT_ADDRESS!,
        platform_contract_abi,
        signer
      );
  
      const tx = await contract.getTokenBalance(address);
      const formattedBalance = formatUnits(tx , 0);
  
      console.log("User token balance:", formattedBalance , tx);
      setTokenBalance(formattedBalance);
    } catch (err) {
      console.error("Error fetching token balance:", err);
    }
  };

useEffect(() => {
    if (address) {
        fetchTokenBalance(address , setTokenBalance);
    }
  }, [ isConnected, address]);


  const handleDonate = async () => {
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
        process.env.NEXT_PUBLIC_PLATFORMBALANCE_CONTRACT_ADDRESS!,
        platform_contract_abi,
        signer
      );

      const totalCost = (parseInt(donateAmount.toString()) * 0.0001).toString();
      console.log("buy cost..................", parseEther(totalCost));

      const tx = await contract.buyTokens({
        value: parseEther(totalCost)
    });

 
      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction mined:", receipt);

      if (userAddress ) {
        await fetchTokenBalance(userAddress, setTokenBalance);
      }


    } catch (error) {
      console.error('Error during buy transaction:', error);
    } finally {
      console.log("finally block....");
    }
  };


  return (
    <SidebarContainer>
      {/* Logo Section */}
      <LogoContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogoCircle />
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
          <NavItem disablePadding>
            <StyledLink href="/trending">
              <TrendingUp size={20} />
              <Typography>Trending</Typography>
            </StyledLink>
          </NavItem>
          <NavItem disablePadding>
            <StyledLink href="/about">
              <Info size={20} />
              <Typography>About</Typography>
            </StyledLink>
          </NavItem>
          {/* <ConnectAndSIWE/> */}


        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
          {tokenBalance} MM
        </Button>

        <Button
          variant="contained"
          fullWidth
          startIcon={<Plus size={20} />}
          sx={{ backgroundColor: '#9333ea', '&:hover': { backgroundColor: '#7e22ce' } }}
        >
          <Link href={"/creatememe"}>
            Create Meme
          </Link>

        </Button>

        <WalletButton />
      </Box>


       <Dialog
                      open={donatePopup}
                      onClose={() => setDonatePopup(false)}
                      PaperProps={{
                          sx: {
                              backgroundColor: "#1e1e1e",
                              borderRadius: 3,
      
                              color: "white",
                              minWidth: 360
                          },
                      }}
                  >
                      <DialogContent>
                          <Typography variant="h6" mb={2}>Add MemeMinto Tokens </Typography>
      
                          <TextField
                              fullWidth
                              type="number"
                              variant="outlined"
                              size="small"
                              label="Tokens"
                              value={donateAmount}
                              onChange={(e) => setDonateAmount(e.target.value)}
                              InputProps={{ sx: { color: "white" } }}
                              InputLabelProps={{ sx: { color: "white" } }}
                              sx={{ backgroundColor: "#2b2b2b", borderRadius: 1 }}
                          />
                          <Typography variant="body2" sx={{ color: "white" }}>
                              You will be charged {(Number(donateAmount) * 0.0001)} base sepolia
                          </Typography>
                      </DialogContent>
                      <DialogActions>
                          <Button onClick={() => setDonatePopup(false)} sx={{ color: "#aaa" }}>
                              Cancel
                          </Button>
                          <Button
                              onClick={() => {
                                  handleDonate();
                                  console.log('Donating:', donateAmount);
                                  setDonatePopup(false);
                              }}
                              sx={{ color: "#9333ea" }}
                          >
                              Add Tokens
                          </Button>
                      </DialogActions>
                  </Dialog>
    </SidebarContainer>
  );
};

export default Sidebar;