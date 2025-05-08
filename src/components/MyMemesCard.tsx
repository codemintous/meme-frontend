"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/navigation";

const MyMemesCard = ({
  title,
  description,
  image,
  memeId,
}: {
  title: string;
  description: string;
  image?: string;
  memeId: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    router.push(`/edit/${memeId}`);
    handleMenuClose();
  };

  const handleTalkToMeme = () => {
    router.push(`/${memeId}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Optional: confirm before delete
    console.log(`Delete meme with ID: ${memeId}`);
    handleMenuClose();
  };

  const handleLaunch = () => {
    router.push(`/launchtoken/${memeId}`);
  };

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
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleTalkToMeme}>
            <ListItemIcon>
              <ChatBubbleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Talk to Meme</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
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
