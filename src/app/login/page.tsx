"use client"

import React, { useState } from 'react';
import { Box, Button, CircularProgress, IconButton,  TextField, Typography, Link, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Simulate login
            setTimeout(() => {
                setIsLoading(false);
                router.push('/dashboard');
            }, 1000);
        } catch (err) {
            setError('Login failed');
            setIsLoading(false);
            console.log("erroe msg ", err)
        }
    };

    return (
        <Box
            display="flex"
            minHeight="100vh"
            alignItems="center"
            justifyContent="center"
            sx={{
                background: 'linear-gradient(to bottom, black, rgba(76,29,149,0.2), black)',
                p: 2,
            }}
        >
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 400, width: '100%', position: 'relative', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>

                {/* Close Button */}
                <IconButton
                    onClick={() => router.push('/')}
                    sx={{ position: 'absolute', top: 16, right: 16, color: 'gray' }}
                >
                    <CloseIcon />
                </IconButton>

                <Box textAlign="center" mb={3}>
                    <Link href="/" underline="none">
                        <Box
                            sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'primary.main', opacity: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', backdropFilter: 'blur(4px)' }}
                        >
                            <Typography fontSize={24}>📊</Typography>
                        </Box>
                    </Link>
                    <Typography variant="h5" fontWeight="bold" mt={2} mb={1} sx={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome Back</Typography>
                    <Typography variant="body2" color="gray">Sign in to your meme-frontend account</Typography>
                </Box>

                {error && (
                    <Box mb={2} p={2} bgcolor="rgba(239, 68, 68, 0.2)" borderRadius={2} border="1px solid rgba(239, 68, 68, 0.5)">
                        <Typography color="error.main">{error}</Typography>
                    </Box>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        InputProps={{
                            sx: {
                                bgcolor: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#a855f7', // purple border
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#c084fc',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#c084fc',
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: 'white',
                                '&.Mui-focused': {
                                    color: '#c084fc',
                                },
                            },
                        }}
                        placeholder="Enter your email"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        placeholder="Enter your password"
                        InputProps={{
                            sx: {
                                bgcolor: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#a855f7',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#c084fc',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#c084fc',
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: 'white',
                                '&.Mui-focused': {
                                    color: '#c084fc',
                                },
                            },
                        }}
                        helperText={
                            <Link href="#" sx={{ color: '#c084fc', fontSize: 14 }}>
                                Forgot Password?
                            </Link>
                        }
                    />


                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        sx={{ backgroundColor: '#9333ea', '&:hover': { backgroundColor: '#7e22ce' } }}
                        endIcon={!isLoading && <ArrowForwardIcon />}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
                    </Button>


                </form>
            </Paper>
        </Box>
    );
}
