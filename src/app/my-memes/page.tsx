"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import MyMemesCard from "@/components/MyMemesCard";
import { useAuth } from "@/context/AuthContext";

import ConnectWalletPrompt from "@/components/ConnectWalletPrompt";

export default function MyMemes() {
  const { jwtToken } = useAuth();

  if (!jwtToken) {
    return (
      <ConnectWalletPrompt/>
    );
  }

  const memes = [
    {
      memeId: "1",
      title: "Miracle Generator",
      description:
        "Witness divine coding interventions, last-minute saves, and logic that defies reality. The Miracle G...",
      image: "/agents/latestmeme1.png",
    },
    {
      memeId: "2",
      title: "Tom & Jerry",
      description: "Generate meme",
      image: "/agents/latestmeme2.png",
    },
  ];

  return (
    <Box p={4} color="white">
      <Box display="flex" alignItems="center" gap={1} mb={4}>
        <Typography variant="h4" fontWeight="bold">
          My Memes
        </Typography>
        <Typography variant="h5" component="span" sx={{ cursor: "pointer" }}>
          ↻
        </Typography>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={3}>
        {memes.map((meme) => (
          <MyMemesCard key={meme.memeId} {...meme} />
        ))}
      </Box>
    </Box>
  );
}
