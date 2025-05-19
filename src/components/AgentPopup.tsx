import React from 'react';
import {
  Dialog,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RedeemIcon from '@mui/icons-material/Redeem';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { MemeAgent } from '@/utils/interface';

interface AgentPopupProps {
  open: boolean;
  handleClose: () => void;
  agent?: MemeAgent | null;
}

export default function AgentPopup({ open, handleClose, agent }: AgentPopupProps) {
  if (!agent) return null;

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 6,
          bgcolor: '#000',
          overflow: 'visible',
          border: '1px solid #555',
        },
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          height: 200,
          background: `url(${agent.coverImageUrl || agent.profileImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Overlapping Avatar */}
      <Box display="flex" justifyContent="center" mt={-6}>
        <Avatar
          src={agent.profileImageUrl}
          alt={agent.name}
          sx={{ width: 96, height: 96, border: '4px solid #000' }}
        />
      </Box>

      {/* Content */}
      <Box p={3}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
            {agent.name}
          </Typography>
          <Typography variant="body2" color="gray" mb={2}>
            {agent.description}
          </Typography>
          <Typography variant="body2" color="gray">
            Category: {agent.category}
          </Typography>
        </Box>

        {/* Token Details */}
        <Box
          sx={{
            bgcolor: '#111',
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          <Typography variant="h6" color="white" gutterBottom>
            Token Details
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box flex="1 1 45%">
              <Typography variant="body2" color="gray">Name</Typography>
              <Typography variant="body1" color="white">{agent.tokenDetails.name}</Typography>
            </Box>
            <Box flex="1 1 45%">
              <Typography variant="body2" color="gray">Symbol</Typography>
              <Typography variant="body1" color="white">{agent.tokenDetails.symbol}</Typography>
            </Box>
            <Box width="100%">
              <Typography variant="body2" color="gray">Contract Address</Typography>
              <Link 
                href={`https://sepolia.basescan.org/address/${agent.tokenDetails.tokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: '#9333ea',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                <Typography variant="body1" color="white">
                  {agent.tokenDetails.tokenAddress}
                </Typography>
              </Link>
            </Box>
            <Box width="100%">
              <Typography variant="body2" color="gray">Description</Typography>
              <Typography variant="body1" color="white">{agent.tokenDetails.description}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Agent Details */}
        <Box
          sx={{
            bgcolor: '#111',
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          <Typography variant="h6" color="white" gutterBottom>
            Agent Details
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography variant="body2" color="gray">Personality</Typography>
              <Typography variant="body1" color="white">{agent.personality}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="gray">Creator</Typography>
              <Typography variant="body1" color="white">{agent.creator}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="gray">Created</Typography>
              <Typography variant="body1" color="white">
                {new Date(agent.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Credits Section */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          p={2}
          borderRadius={2}
          bgcolor="#111"
        >
          <EmojiObjectsIcon sx={{ color: 'white' }} />
          <Box>
            <Typography variant="caption" color="gray">{agent.name} has</Typography>
            <Typography variant="body1" color="white" fontWeight="bold">
              {agent.likes} credits
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 'auto', textTransform: 'none', bgcolor: 'white', color: '#000' }}
            startIcon={<RedeemIcon />}
          >
            Donate
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
