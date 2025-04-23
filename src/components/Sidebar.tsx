"use client"

import Link from 'next/link';
import { 
  Box, 
  Typography, 
  Button, 
  List, 
  ListItem, 
 
  IconButton,
  Stack,

  styled
} from '@mui/material';
import { 
  ChevronLeft, 

  Info, 
  Plus, 
  Rocket, 
  Search, 
  TrendingUp, 
  Trophy, 
  User, 
  UserPlus, 
  UsersRound 
} from 'lucide-react';

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

const LoginButton = styled(Button)({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  backgroundColor: '#9333ea', // purple-600
  color: 'white',
  borderRadius: '8px',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#7e22ce', // purple-700
  }
});

const SignupButton = styled(Button)({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  backgroundColor: 'black',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
});

const Sidebar = () => {
  return (
    <SidebarContainer>
      {/* Logo Section */}
      <LogoContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogoCircle />
          <Typography variant="h6" fontWeight="bold">MYMEMES</Typography>
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
          {/* <NavItem disablePadding>
            <StyledLink href="/trending">
              <TrendingUp size={20} />
              <Typography>Trending</Typography>
            </StyledLink>
          </NavItem> */}
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
            <StyledLink href="/about">
              <Info size={20} />
              <Typography>About</Typography>
            </StyledLink>
          </NavItem>
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
        
        <Stack direction="row" spacing={1}>
          <LoginButton>
            <User size={20} />
            Login
          </LoginButton>
          <SignupButton>
            <UserPlus size={20} />
            Sign Up
          </SignupButton>
        </Stack>
      </Box>
    </SidebarContainer>
  );
};

export default Sidebar;