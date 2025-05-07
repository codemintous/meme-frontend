"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
  
    TextField,
   
} from "@mui/material";

import LaunchedTokenCard from "@/components/LaunchedTokenCard"; // your token card
import { useAuth } from "@/context/AuthContext";
import ConnectWalletPrompt from "@/components/ConnectWalletPrompt";

const mockTokens = [
    {
        logo: "/nutting.png",
        title: "The Nutting Professor",
        subtitle: "PRONUT / 4mo",
        description:
            "Trust me, you don't want to run into The Nutting Professor after the last bell rings!...",
        stats: {
            tx: 11,
            volume: "2.44K",
            value: "925.60K",
            percent: 100,
        },
    },
    {
        logo: "/beast.png",
        title: "MrBeast ✓",
        subtitle: "BEAST / 3w",
        description:
            "This isn't just another crypto. MRBEAST Token is built to fuel impact...",
        stats: {
            tx: 677,
            volume: "10.39K",
            value: "47.49K",
            percent: 96.35,
        },

    },

    {
        logo: "/nutting.png",
        title: "The Nutting Professor",
        subtitle: "PRONUT / 4mo",
        description:
            "Trust me, you don't want to run into The Nutting Professor after the last bell rings!...",
        stats: {
            tx: 11,
            volume: "2.44K",
            value: "925.60K",
            percent: 100,
        },
    },
    {
        logo: "/nutting.png",
        title: "The Nutting Professor",
        subtitle: "PRONUT / 4mo",
        description:
            "Trust me, you don't want to run into The Nutting Professor after the last bell rings!...",
        stats: {
            tx: 11,
            volume: "2.44K",
            value: "925.60K",
            percent: 100,
        },
    },
    {
        logo: "/nutting.png",
        title: "The Nutting Professor",
        subtitle: "PRONUT / 4mo",
        description:
            "Trust me, you don't want to run into The Nutting Professor after the last bell rings!...",
        stats: {
            tx: 11,
            volume: "2.44K",
            value: "925.60K",
            percent: 100,
        },
    },
    {
        logo: "/nutting.png",
        title: "The Nutting Professor",
        subtitle: "PRONUT / 4mo",
        description:
            "Trust me, you don't want to run into The Nutting Professor after the last bell rings!...",
        stats: {
            tx: 11,
            volume: "2.44K",
            value: "925.60K",
            percent: 100,
        },
    },
    // add more mock data
];

const categories = ["Trending", "AI", "Gaming", "Memes", "Tools", "Community"];

export default function LaunchpadPage() {

    const [searchTerm, setSearchTerm] = useState("");

    const { jwtToken } = useAuth();

    if (!jwtToken) {
        return <ConnectWalletPrompt />;
    }

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
        // Optional: apply a filter or fetch new results
    };

    return (
        <Container maxWidth="xl" sx={{ py: 5 }}>
            {/* Top Bar: Title + Wallet */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box
                    sx={{
                        display: "flex",
                        overflowX: "auto",
                        gap: 2,
                      
                      
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >
                    {categories.map((cat, i) => (
                        <Button
                            key={i}
                            variant="outlined"
                            sx={{
                                whiteSpace: "nowrap",
                                borderColor: "#555",
                                color: "white",
                                ":hover": { borderColor: "#888" },
                            }}
                        >
                            {cat}
                        </Button>
                    ))}
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search agents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                color: 'gray',
                                '& fieldset': {
                                    borderColor: 'gray',
                                },

                                '&.Mui-focused fieldset': {
                                    borderColor: '#9333ea',
                                },
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: 'gray',
                                opacity: 1, // optional: makes placeholder fully visible
                            },
                        }}
                    />
                    <Button variant="contained" onClick={handleSearch} sx={{ backgroundColor: '#9333ea', '&:hover': { backgroundColor: '#7e22ce' } }} >
                        Launch
                    </Button>
                </Box>
            </Box>

            {/* Filter Buttons */}


            {/* Search Bar */}


            {/* Token Cards */}
            <Box display="flex" flexWrap="wrap" justifyContent="evenly">
                {mockTokens.map((token, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            flex: "1 1 calc(33.333% - 20px)",
                            borderRadius: 2,
                            p: 2,
                            minWidth: "300px",
                            color: "white",
                        }}
                    >
                        <LaunchedTokenCard token={token} />
                    </Box>
                ))}
            </Box>

            {/* Launch Button */}
           
        </Container>
    );
}
