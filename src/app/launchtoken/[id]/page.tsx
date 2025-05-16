"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";
import Image from "next/image";
import { uploadToPinata } from "@/utils/pinataUploader";
import { useAuth } from "@/context/AuthContext";
import ConnectWalletPrompt from "@/components/ConnectWalletPrompt";
import { useParams } from "next/navigation";
import factory_contract_abi from "@/data/factory_contract_abi.json"
import { BrowserProvider, Contract, Interface, LogDescription, parseUnits } from "ethers";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LaunchTokenPage() {


  const [iconImage, setIconImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [tokenName, setTokenName] = useState("");
  const [tokenDesc, setTokenDesc] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [supply, setSupply] = useState("");
  // const [memeDetail , setMemeDetail] = useState<MemeAgent | null>(null)
  const iconInputRef = React.useRef<HTMLInputElement>(null);
  const bannerInputRef = React.useRef<HTMLInputElement>(null);
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    instagram: '',
    facebook: '',
  });

  const router =  useRouter();
  const param = useParams();
  const id = param.id;

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes/${id}`
        );
        const data = response.data;

        // setMemeDetail(data); // Save full object

        setIconImage(data.profileImageUrl); // Set avatar image (adjust key if needed)
        setBannerImage(data.coverImageUrl);
        setSocialLinks({
          twitter: data.socialMediaLinks.twitter || '',
          instagram: data.socialMediaLinks.instagram || '',
          facebook: data.socialMediaLinks.facebook || '',
        });
        console.log("memedetail...", data);
      } catch (error) {
        console.error("Error fetching meme agent:", error);
      }
    };

    if (id) {
      fetchMemes();
    }
  }, [id]);




  const { jwtToken } = useAuth();

  if (!jwtToken) {
    return (
      <ConnectWalletPrompt />
    );
  }

  const updateTokenDetails = async (tokenAddress: string) => {
    if (!jwtToken) {
      console.error("No JWT token available");
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes/${id}`,
        {
          tokenDetails: {
            tokenAddress,
            name: tokenName,
            symbol: tokenSymbol,
            description: tokenDesc,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Meme agent updated with token info:", response.data);
      router.push(`/${id}`);
    } catch (err) {
      console.error("❌ Failed to update meme with token info:", err);
    }
  };

  const handleLaunchToken = async () => {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Import the paymaster utilities
      const { createPaymasterContract, executePaymasterTransaction } = await import('@/utils/paymasterUtils');

      // Create a contract with paymaster support
      const contract = await createPaymasterContract(
        process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS!,
        factory_contract_abi
      );

      console.log("Factory address:", process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS);

      // Execute the transaction with paymaster support
      const receipt = await executePaymasterTransaction(
        contract,
        'launchToken',
        [
          tokenName,
          tokenSymbol,
          parseUnits(supply, 18),
          parseUnits("1", 14)
        ]
      );

      console.log("Transaction mined:", receipt);

      const iface = new Interface(factory_contract_abi);
      let tokenAddress: string | null = null;

      for (const log of receipt.logs) {
        try {
          const parsed = iface.parseLog(log) as LogDescription;
          if (parsed.name === "TokenLaunched") {
            tokenAddress = parsed.args.token;
            console.log("🚀 Token launched!", tokenAddress);
            break;
          }
        } catch (err) {
          // log did not match ABI, skip
          console.log(err);
        }
      }

      if (tokenAddress) {
        console.log("✅ Token Address found:", tokenAddress);
        await updateTokenDetails(tokenAddress);
      } else {
        console.warn("⚠️ No TokenLaunched event found — skipping API update");
      }

    } catch (error) {
      console.error("❌ Launch token failed:", error);
    }
  };


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
    }
    if (type === "banner") {
      setBannerImage(previewUrl);
    }

    try {
      const ipfsHash = await uploadToPinata(file);
      console.log("Uploaded to IPFS:", ipfsHash);
    } catch (error) {
      console.error(error);
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
        Launch Token
      </Typography>

      {/* Token Info */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Token Name"
          variant="outlined"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          sx={commonTextFieldStyles}
        />

        <TextField
          fullWidth
          label="Token Symbol"
          variant="outlined"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          sx={commonTextFieldStyles}
        />
      </Box>

      {/* Description */}
      <TextField
        fullWidth
        value={tokenDesc}
        onChange={(e) => setTokenDesc(e.target.value)}
        label="Description"
        variant="outlined"
        multiline
        rows={3}
        sx={{ ...commonTextFieldStyles, mb: 3 }}
      />

      {/* Links */}
      <Typography sx={{ mb: 1 }}>Links</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="facebook"
          variant="outlined"
          value={socialLinks.facebook}
          onChange={(e) =>
            setSocialLinks({ ...socialLinks, facebook: e.target.value })
          }
          sx={commonTextFieldStyles}
        />
        <TextField
          fullWidth
          label="Twitter"
          variant="outlined"
          value={socialLinks.twitter}
          onChange={(e) =>
            setSocialLinks({ ...socialLinks, twitter: e.target.value })
          }
          sx={commonTextFieldStyles}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Instagram"
          variant="outlined"
          value={socialLinks.instagram}
          onChange={(e) =>
            setSocialLinks({ ...socialLinks, instagram: e.target.value })
          }
          sx={commonTextFieldStyles}
        />
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



      <Divider sx={{ borderColor: "gray", mb: 2 }} />
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Total Supply
      </Typography>
      {/* <Typography variant="caption" sx={{ color: "gray", mb: 1, display: "block" }}>
        Optional: Be the very first person to buy your token!
      </Typography> */}
      <TextField
        fullWidth
        type="number"
        placeholder="0"
        value={supply}
        onChange={(e) => setSupply(e.target.value)}
        sx={{ mb: 1, ...commonTextFieldStyles }}
      />
     

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4, // margin-top to create spacing from the form
        }}
      >
        <Button
          variant="contained"
          onClick={handleLaunchToken}
          sx={{
            bgcolor: "#7f5af0",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#6848d8" },
            width: "fit-content",
          }}
        >
          Launch
        </Button>
      </Box>


    </Box>
  );
}
