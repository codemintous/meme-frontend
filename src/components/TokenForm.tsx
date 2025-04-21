import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  MenuItem,
  Card,
  Avatar,
} from '@mui/material';

type TokenFormProps = {
  onBack: () => void; // specify that it's a function that returns nothing
};


const chains = ['Solana', 'Ethereum', 'Polygon'];

const TokenForm = ({ onBack }: TokenFormProps) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Put your token address
      </Typography>
      <Typography variant="body1" gutterBottom>
        Put your token address and let MyMemes do the rest!
      </Typography>

      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Contract Address
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Contract Address"
          InputProps={{ sx: { color: 'white' } }}
          sx={{
            input: { color: 'white' },
            mb: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#555' },
              '&:hover fieldset': { borderColor: '#999' },
            },
          }}
        />

        <Typography variant="subtitle1" gutterBottom>
          Chain
        </Typography>
        <TextField
          select
          fullWidth
          defaultValue="Solana"
          variant="outlined"
          InputProps={{ sx: { color: 'white' } }}
          sx={{
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#555' },
              '&:hover fieldset': { borderColor: '#999' },
            },
          
          }}
        >
          {chains.map((chain) => (
            <MenuItem key={chain} value={chain}>
              {chain}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Card
        sx={{
          bgcolor: '#1c1c1c',
          mt: 5,
          p: 3,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Avatar sx={{ width: 56, height: 56, bgcolor: '#444' }} />
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, gap: 2 }}>
          <TextField
            placeholder="Token Name"
            fullWidth
            InputProps={{ sx: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#999' },
              },
            }}
          />
          <TextField
            placeholder="Token Symbol"
            fullWidth
            InputProps={{ sx: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#999' },
              },
            }}
          />
        </Box>
      </Card>

      <Stack spacing={2} mt={4}>
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: '#875CFF', '&:hover': { bgcolor: '#7a4fff' } }}
        >
          Yes, this is my token
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: '#aaa' } }}
          onClick={onBack}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
};

export default TokenForm;
