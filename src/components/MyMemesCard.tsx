"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent, CardMedia, IconButton, Menu, MenuItem } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
const MyMemesCard = ({ title, description, image, memeId }: { title: string; description: string; image?: string; memeId: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State to manage the menu anchor
  const router = useRouter()
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Open the menu when the three dots are clicked
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleEdit = () => {
    router.push(`/edit/${memeId}`); // Navigate to the edit page for this meme
    handleMenuClose(); // Close the menu
  };

  const handleLaunch = () => {
    router.push(`/launchtoken`);
  }

  return (
    <Card
      sx={{
        bgcolor: "transparent",
        border: "1px solid #3e3e3e",
        borderRadius: 2,
        color: "white",
        width: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 400,
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <IconButton sx={{ color: "gray" }} onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </Menu>
      </Box>

      {image ? (
        <CardMedia component="img" image={image} alt={title} sx={{ height: 200 }} />
      ) : (
        <Box sx={{ flexGrow: 1 }} />
      )}

      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="gray">
          {description}
        </Typography>
      </CardContent>

      <Box p={2} pt={0}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<RocketLaunchIcon />}
          sx={{
            borderColor: "gray",
            color: "white",
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 500,
            ":hover": {
              borderColor: "#aaa",
              backgroundColor: "rgba(255,255,255,0.05)",
            },
          }}
          onClick={handleLaunch}
        >
          Launch token
        </Button>
      </Box>
    </Card>
  );
};

export default MyMemesCard;
