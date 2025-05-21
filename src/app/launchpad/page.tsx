"use client";
import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    CircularProgress,
} from "@mui/material";
import LaunchedTokenCard from "@/components/LaunchedTokenCard";
import { useAuth } from "@/context/AuthContext";
import ConnectWalletPrompt from "@/components/ConnectWalletPrompt";
import axios from "axios";
import { MemeAgent } from "@/utils/interface";

const categories = ["Trending", "AI", "Gaming", "Memes", "Tools", "Community"];

export default function LaunchpadPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const { jwtToken } = useAuth();
    const [memeAgents, setMemeAgents] = useState<MemeAgent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes`
                );
                setMemeAgents(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching meme agents:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMemes();
    }, []);

    if (!jwtToken) {
        return <ConnectWalletPrompt />;
    }

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 5 }}>
            {/* Top Bar: Categories + Search */}
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
                                opacity: 1,
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{
                            backgroundColor: '#9333ea',
                            '&:hover': { backgroundColor: '#7e22ce' },
                        }}
                    >
                        Launch
                    </Button>
                </Box>
            </Box>

            {/* Token Cards or Loading Spinner */}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                    <CircularProgress sx={{ color: "#9333ea" }} />
                </Box>
            ) : (
                <Box display="flex" flexWrap="wrap" justifyContent="evenly">
                    {memeAgents.map((token) => (
                        <Box
                            key={token._id}
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
            )}
        </Container>
    );
}
