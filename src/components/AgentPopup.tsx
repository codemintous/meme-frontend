import React from 'react';
import {
  Dialog,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RedeemIcon from '@mui/icons-material/Redeem';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

interface AgentPopupProps {
    open: boolean;
    handleClose: () => void;
  }
  

export default function AgentPopup({ open, handleClose }: AgentPopupProps) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth
    PaperProps={{
        sx: {
          borderRadius: 6,
          bgcolor: '#000',
          overflow: 'visible',
          border: '1px solid #555', // Gray border
        },
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          height: 120,
          background: 'url(/agents/meme1.png)',
          backgroundSize: 'cover',
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
          src="/agents/meme1.png"
          sx={{ width: 96, height: 96, border: '4px solid #000' }}
        />
      </Box>

      {/* Content */}
      <Box textAlign="center" px={3} pb={3} mt={1}>
        <Typography variant="h6" color="white" fontWeight="bold">Akita</Typography>
        <Typography variant="body2" color="gray" mb={2}>Akita</Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          p={2}
          borderRadius={2}
          bgcolor="#111"
          mt={2}
        >
          <EmojiObjectsIcon sx={{ color: 'white' }} />
          <Box>
            <Typography variant="caption" color="gray">Akita has</Typography>
            <Typography variant="body1" color="white" fontWeight="bold">
              24,770 credits
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
