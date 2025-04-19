// app/launchpad/page.tsx
"use client";
import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import LaunchedTokenCard from "@/components/LaunchedTokenCard";
import { Grid } from "@mui/material";
const mockTokens = [
    {
        logo: "/nutting.png",
        title: "The Nutting Professor",
        subtitle: "PRONUT / 4mo",
        description: "Trust me, you don't want to run into The Nutting Professor after the last bell rings!...",
        stats: {
            tx: 11,
            volume: "2.44K",
            value: "925.60K",
            percent: 100
        }
    },
    {
        logo: "/beast.png",
        title: "MrBeast ✓",
        subtitle: "BEAST / 3w",
        description: "This isn't just another crypto. MRBEAST Token is built to fuel impact...",
        stats: {
            tx: 677,
            volume: "10.39K",
            value: "47.49K",
            percent: 96.35
        }
    },
    {
        logo: "/beast.png",
        title: "MrBeast ✓",
        subtitle: "BEAST / 3w",
        description: "This isn't just another crypto. MRBEAST Token is built to fuel impact...",
        stats: {
            tx: 677,
            volume: "10.39K",
            value: "47.49K",
            percent: 96.35
        }
    },
    {
        logo: "/beast.png",
        title: "MrBeast ✓",
        subtitle: "BEAST / 3w",
        description: "This isn't just another crypto. MRBEAST Token is built to fuel impact...",
        stats: {
            tx: 677,
            volume: "10.39K",
            value: "47.49K",
            percent: 96.35
        }
    },
    {
        logo: "/beast.png",
        title: "MrBeast ✓",
        subtitle: "BEAST / 3w",
        description: "This isn't just another crypto. MRBEAST Token is built to fuel impact...",
        stats: {
            tx: 677,
            volume: "10.39K",
            value: "47.49K",
            percent: 96.35
        }
    },
    // Add more...
];

export default function LaunchpadPage() {
    return (
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography variant="h4" color="white" mb={4}>
          Launchpad Tokens
        </Typography>
  
        {/* <Grid container spacing={3}>
          {mockTokens.map((token, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <LaunchedTokenCard token={token} />
            </Grid>
          ))}
        </Grid> */}
  
        <Box textAlign="center" mt={5}>
          <Button variant="contained" color="secondary">
            🚀 Launch Token
          </Button>
        </Box>
      </Container>
    );
  }
  
