"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const fieldSx = {
  mb: 2,
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'gray' },
    '&:hover fieldset': { borderColor: 'gray' },
    '&.Mui-focused fieldset': { borderColor: 'white' },
    '& input, & textarea': { color: 'white' },              // text color
    '& input::placeholder, & textarea::placeholder': {      // placeholder color
      color: 'gray',
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': { color: 'gray' },
};
export default function MemeForm({ onBack }: { onBack: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      {/* Heading */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Create your meme
        </Typography>
        <Typography variant="body1">
          Upload your meme image, give it a name, and add a short description. Simple and quick!
        </Typography>
      </Box>

      {/* Avatar + edit icon */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={image || undefined}
            sx={{ width: 100, height: 100, bgcolor: "#2c2c2c" }}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "#444",
              p: 0.5,
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <EditIcon fontSize="small" sx={{ color: "white" }} />
          </IconButton>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </Box>
      </Box>

      {/* Name */}
      <TextField
        fullWidth
        label="Name*"
        placeholder="Name"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        sx={fieldSx}
      />

      {/* Description */}
      <TextField
        fullWidth
        label={`Description ${description.length}/200`}
        placeholder="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 200) {
            setDescription(value);
          }
        }}
        error={description.length === 200}
        helperText={
          description.length === 200
            ? "You've reached the 200 character limit."
            : ""
        }
        InputLabelProps={{ shrink: true }}
        sx={fieldSx}
      />


      {/* Create & Back buttons */}
      <Box mt={3}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#875CFF",
            textTransform: "none",
            py: 1.5,
            fontWeight: "bold",
            "&:hover": { bgcolor: "#7a4fff" },
          }}
        >
          Create meme
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={onBack}
          sx={{
            mt: 2,
            color: "white",
            borderColor: "gray",
            textTransform: "none",
            "&:hover": { borderColor: "white" },
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
