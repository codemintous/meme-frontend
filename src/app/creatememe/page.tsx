"use client"
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Link,
  Stack,
  Container,
} from '@mui/material';
import TokenForm from '@/components/TokenForm';

const CreateMeme = () => {
  const [hasToken, setHasToken] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        {!hasToken ? (
          <Box textAlign="center">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Create your meme
            </Typography>
            <Typography variant="body1" gutterBottom>
              In this page, you can bring your funniest ideas to life. Ready to start creating your own memes?
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 4 }}>
              Tell me a little more, do you have a live token?
            </Typography>
            <Stack spacing={2} mt={3}>
              <Button
                variant="contained"
                onClick={() => setHasToken(true)}
                sx={{ bgcolor: '#875CFF', '&:hover': { bgcolor: '#7a4fff' } }}
              >
                Yes, I already have a token
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#e0e0e0',
                  color: 'black',
                  '&:hover': { bgcolor: '#d5d5d5' },
                }}
              >
                No, I don’t have one
              </Button>
            </Stack>
            <Link href="#" underline="hover" sx={{ mt: 3, display: 'block', color: 'white' }}>
              How it works?
            </Link>
          </Box>
        ) : (
          <TokenForm onBack={() => setHasToken(false)} />
        )}
      </Container>
    </Box>
  );
};

export default CreateMeme;
