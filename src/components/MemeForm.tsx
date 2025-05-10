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
import CloseIcon from "@mui/icons-material/Close";
import { uploadToPinata } from "@/utils/pinataUploader";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { MemeAgent } from "@/utils/interface";


const fieldSx = {
  mb: 2,
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'gray' },
    '&:hover fieldset': { borderColor: 'gray' },
    '&.Mui-focused fieldset': { borderColor: 'white' },
    '& input, & textarea': { color: 'white' },
    '& input::placeholder, & textarea::placeholder': {
      color: 'gray',
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': { color: 'gray' },
};


export default function MemeForm({ onBack }: { onBack: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { jwtToken } = useAuth();
  // const [meme, setMeme] = useState<MemeAgent | null>(null);

  const router = useRouter();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const ipfsHash = await uploadToPinata(file);
        const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        setImage(url);
        console.log("Image uploaded:", url);
      } catch (err) {
        console.error("Failed to upload image:", err);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!image || !name || !description) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      agentName: name,
      category: "",
      description: description,
      personality: "",
      socialMediaLinks: {
        twitter: "",
        instagram: "",
        facebook: "",
      },
      profileImageUrl: image,
      coverImageUrl: "", // Static for now
      tokenDetails: {
        name: "",
        symbol: "",
        description: "",
        tokenAddress: "",
      },
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response) throw new Error("Failed to create meme");

      
      console.log("Meme created:", response);
      router.push(`/edit/${response.data._id}`)
   
    } catch (error) {
      console.error("Create meme error:", error);
      alert("Failed to create meme. Check console for details.");
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

      {/* Avatar + edit + close icon */}
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
          {image && (
            <IconButton
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                bgcolor: "#ff1744",
                p: 0.5,
              }}
              onClick={handleRemoveImage}
            >
              <CloseIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          )}
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
        value={name}
        onChange={(e) => setName(e.target.value)}
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

      {/* Buttons */}
      <Box mt={3}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
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
