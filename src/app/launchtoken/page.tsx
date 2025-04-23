"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Divider,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { Close, CloudUpload } from "@mui/icons-material";
import Image from "next/image";

export default function LaunchTokenPage() {
  // const [chain, setChain] = React.useState("solana");
  // const [dex, setDex] = React.useState("raydium");

  const [iconImage, setIconImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);


  const iconInputRef = React.useRef<HTMLInputElement>(null);
const bannerInputRef = React.useRef<HTMLInputElement>(null);

const handleUploadClick = (type: "icon" | "banner") => {
  const inputRef = type === "icon" ? iconInputRef : bannerInputRef;
  inputRef.current?.click();
};

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: "icon" | "banner") => {
  const file = e.target.files?.[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file); // ✅ local preview

  if (type === "icon") {
    setIconImage(previewUrl);
  } else {
    setBannerImage(previewUrl);
  }

  try {
    const ipfsHash = await uploadToPinata(file);
    console.log("Uploaded to IPFS:", ipfsHash);
  } catch (error) {
    console.error(error);
  }
};


const uploadToPinata = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: "AgentImage",
    keyvalues: { uploadedBy: "AgentBuilder" },
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({ cidVersion: 1 });
  formData.append("pinataOptions", options);

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw new Error("Failed to upload image");
  }
};




  const commonTextFieldStyles = {
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiInputLabel-root": { color: "gray" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray" },
      "&:hover fieldset": { borderColor: "gray" },
      "&.Mui-focused fieldset": { borderColor: "gray" },
    },
  };

  return (
    <Box sx={{ p: 4, color: "white", bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Launch Token on Solana
      </Typography>

      {/* Token Info */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField fullWidth label="Token Name" variant="outlined" sx={commonTextFieldStyles} />
        <TextField fullWidth label="Token Symbol" variant="outlined" sx={commonTextFieldStyles} />
      </Box>

      {/* Description */}
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        multiline
        rows={3}
        sx={{ ...commonTextFieldStyles, mb: 3 }}
      />

      {/* Links */}
      <Typography sx={{ mb: 1 }}>Links</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField fullWidth label="Discord" variant="outlined" sx={commonTextFieldStyles} />
        <TextField fullWidth label="Telegram" variant="outlined" sx={commonTextFieldStyles} />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Website"
          defaultValue=""
          variant="outlined"
          sx={commonTextFieldStyles}
        />
        <TextField fullWidth label="X" variant="outlined" sx={commonTextFieldStyles} />
      </Box>

      {/* Uploads */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      {["icon", "banner"].map((type) => {
        const image = type === "icon" ? iconImage : bannerImage;
        const inputRef = type === "icon" ? iconInputRef : bannerInputRef;

        return (
          <Box
            key={type}
            onClick={() => !image && handleUploadClick(type as "icon" | "banner")}
            sx={{
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: 2,
              width: "50%",
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              cursor: image ? "default" : "pointer",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFileChange(e, type as "icon" | "banner")}
            />
            {image ? (
              <>
<Image
  src={image}
  alt={`${type} preview`}
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
  fill
  unoptimized
/>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (type === "icon") {
                      setIconImage(null);
                    } else {
                      setBannerImage(null);
                    }
                  }}
                  
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    zIndex: 1,
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  color: "#888",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CloudUpload />
                <Typography variant="body2" mt={1}>
                  Upload {type === "icon" ? "Icon" : "Banner"}
                </Typography>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>


      {/* Initial Buy */}
      <Divider sx={{ borderColor: "gray", mb: 2 }} />
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Initial Buy
      </Typography>
      <Typography variant="caption" sx={{ color: "gray", mb: 1, display: "block" }}>
        Optional: Be the very first person to buy your token!
      </Typography>
      <TextField
        fullWidth
        placeholder="0"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography sx={{ color: "white" }}>HBAR</Typography>
            </InputAdornment>
          ),
          style: { color: "white" },
        }}
        sx={{ mb: 1, ...commonTextFieldStyles }}
      />
      <Typography variant="caption" sx={{ color: "gray" }}>
        You spend 0 to receive your newly created tokens.
      </Typography>

      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mt: 4, // margin-top to create spacing from the form
  }}
>
  <Button
    variant="contained"
    sx={{
      bgcolor: "#7f5af0",
      textTransform: "none",
      fontWeight: "bold",
      "&:hover": { bgcolor: "#6848d8" },
      width: "fit-content",
    }}
  >
    Connect Wallet
  </Button>
</Box>

     

    </Box>
  );
}
