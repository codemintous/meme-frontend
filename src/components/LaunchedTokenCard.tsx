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
import { MemeAgent } from "@/utils/interface";



const LaunchedTokenCard: React.FC<{ token: MemeAgent }> = ({ token }) => {
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
            src={token?.profileImageUrl}
            variant="rounded"
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {token.tokenDetails?.name}
            </Typography>
            <Typography variant="caption" color="gray">
              {token.tokenDetails?.symbol}
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography mt={1} fontSize={14} color="#ccc">
          {token.tokenDetails?.description}
        </Typography>

        {/* Progress */}
        <Box mt={2}>
          <Typography variant="caption" color="gray">
            100%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={70}
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
            <span>↔ 0</span>
            <span>0 vol</span>
            <span>$0</span>
          </Box> 


        </Box>
      </CardContent>
    </Card>
  );
};

export default LaunchedTokenCard;
