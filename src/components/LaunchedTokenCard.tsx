"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Avatar,
} from "@mui/material";

interface Token {
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  stats: {
    tx: number;
    volume: string;
    value: string;
    percent: number;
  };
}

const LaunchedTokenCard: React.FC<{ token: Token }> = ({ token }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#1e1e1e",
        color: "#fff",
        borderRadius: 2,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        {/* Header: Avatar + Title/Sub */}
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Avatar
            src={token.logo}
            variant="rounded"
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {token.title}
            </Typography>
            <Typography variant="caption" color="gray">
              {token.subtitle}
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography mt={1} fontSize={14} color="#ccc">
          {token.description}
        </Typography>

        {/* Progress */}
        <Box mt={2}>
          <Typography variant="caption" color="gray">
            {token.stats.percent.toFixed(2)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={token.stats.percent}
            sx={{
              backgroundColor: "#444",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#A259FF",
              },
              borderRadius: 2,
              height: 8,
              mt: 0.5,
            }}
          />

          {/* Stats row */}
          <Box
            mt={1}
            display="flex"
            justifyContent="space-between"
            fontSize={13}
            color="#ccc"
          >
            <span>↔ {token.stats.tx}</span>
            <span>{token.stats.volume} vol</span>
            <span>${token.stats.value}</span>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LaunchedTokenCard;
