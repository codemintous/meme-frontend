"use client";
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  InputAdornment,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import ImageUploadSection from '@/components/ImageUploadSection';
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import TokenInfo from '@/components/TokenInfo';
import { uploadToPinata } from "@/utils/pinataUploader";
import { useAuth } from "@/context/AuthContext";
import ConnectWalletPrompt from "@/components/ConnectWalletPrompt";
import axios from 'axios';

const categories = ['Meme', 'DeFi', 'NFT', 'Utility'];

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#888',
    },
    '&:hover fieldset': {
      borderColor: '#aaa',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ccc',
    },
  },

  '& .MuiInputAdornment-root svg': {
    color: '#888',
  },
  '& label': {
    color: 'white',
  },
  '& input, & textarea': { color: 'white' },              // text color
  '& input::placeholder, & textarea::placeholder': {      // placeholder color
    color: 'gray',
    opacity: 1,
  },
  '& .MuiSelect-select': {
    color: 'white', // ensures selected value is white
  },
};

export default function EditPage() {
  const [tab, setTab] = React.useState(0);
  const [avatarImage, setAvatarImage] = React.useState<string | null>(null);
  const [bgImage, setBgImage] = React.useState<string | null>(null);




  const router = useRouter();
  const params = useParams();
  const memeId = params?.memeId;
  console.log("memeid in edit for navigate to chat....", memeId);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [personality, setPersonality] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    telegram: '',
    instagram: '',
  });


  // Optional: token info if needed later
  const [tokenDetails, setTokenDetails] = useState({
    name: '',
    symbol: '',
    description: '',
    tokenAddress: '',
  });

  const handleChange = (key: string, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [key]: value }));
  };

  const socials = [
    { icon: <TwitterIcon />, label: 'X', placeholder: 'https://x.com/undefined', key: 'twitter' },
    { icon: <TelegramIcon />, label: 'Telegram', placeholder: 'https://t.me/undefined', key: 'telegram' },
    { icon: <InstagramIcon />, label: 'Instagram', placeholder: 'https://instagram.com/undefined', key: 'instagram' },
  ];


  const { jwtToken } = useAuth();

  if (!jwtToken) {
    return (
      <ConnectWalletPrompt />
    );
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'avatar' | 'background'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const ipfsHash = await uploadToPinata(file);
      const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

      if (type === 'avatar') {
        setAvatarImage(url);
      }

      if (type === 'background') {
        setBgImage(url);
      }

      console.log(`${type} image uploaded to IPFS: ${url}`);
    } catch (error) {
      console.error(`Failed to upload ${type} image:`, error);
    }
  };




  const handleSubmit = async () => {
    const payload = {
      agentName: name,
      category,
      description,
      personality,
      socialMediaLinks: {
        twitter: socialLinks.twitter,
        instagram: socialLinks.instagram,
        telegram: socialLinks.telegram,
      },
      profileImageUrl: avatarImage,
      coverImageUrl: bgImage,
      tokenDetails,
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

      console.log('Meme created successfully:', response.data);
      setTokenDetails(response.data);
    
    } catch (error) {
      console.error('Error creating meme:', error);
     
    }
  };


  return (
    <Box sx={{ p: 4, backgroundColor: '#0f0f0f', minHeight: '100vh', color: 'white' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap", // optional for responsiveness
          gap: 2,
        }}
      >
        {/* Tabs Section */}
        <Tabs
          value={tab}
          onChange={(e, newVal) => setTab(newVal)}
          textColor="inherit"
          indicatorColor="primary"
          sx={{ flexShrink: 1 }}
        >
          <Tab label="Main info" />
          <Tab label="Visual Representation" />
          <Tab label="Token infos" />
        </Tabs>

        {/* Buttons Section */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RocketLaunchIcon />}
            sx={{
              textTransform: "none",
              color: "white",
              borderColor: "gray",
              borderRadius: 2,
              fontWeight: 500,
              ":hover": {
                borderColor: "#aaa",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
            onClick={() => {
              router.push('/launchpad');
            }}
          >
            Launch
          </Button>
          <Button
            variant="outlined"
            startIcon={<ChatBubbleOutlineIcon />}
            sx={{
              textTransform: "none",
              color: "white",
              borderColor: "gray",
              borderRadius: 2,
              fontWeight: 500,
              ":hover": {
                borderColor: "#aaa",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
            onClick={() => {
              router.push(`/${memeId}`);
            }}
          >
            Chat
          </Button>
        </Box>
      </Box>

      {tab === 0 && (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} width="100%">
          {/* LEFT SECTION */}




          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Main info
            </Typography>

            {/* Card with Background Image */}
            <Box
              sx={{
                bgcolor: '#1e1e1e',
                borderRadius: 2,
                p: 2,
                position: 'relative',
                minHeight: 160,
                mb: 6,
                backgroundImage: bgImage ? `url(${bgImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Edit Background Button */}
              <IconButton
                component="label"
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                <EditIcon sx={{ color: 'white' }} />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageUpload(e, 'background')}
                />
              </IconButton>

              {/* Avatar */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <Avatar
                  src={avatarImage || undefined}
                  sx={{ width: 60, height: 60, bgcolor: '#444' }}
                />
                <IconButton
                  component="label"
                  sx={{
                    bgcolor: '#2c2c2c',
                    position: 'absolute',
                    right: -10,
                    bottom: -10,
                    p: 0.5,
                  }}
                >
                  <EditIcon fontSize="small" sx={{ color: 'white' }} />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImageUpload(e, 'avatar')}
                  />
                </IconButton>
              </Box>
            </Box>

            {/* Name & Category */}
            <Box display="flex" gap={2} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={textFieldStyles}
              />

              <TextField
                select
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={textFieldStyles}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Description */}
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
              sx={{ mb: 2, ...textFieldStyles }}
            />

            <TextField
              label="Personality"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 2, ...textFieldStyles }}
            />
            {/* Templates Button */}
            <Box textAlign="right">
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, bgcolor: '#875CFF', textTransform: 'none' }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Box>
          </Box>

          {/* RIGHT SECTION - SOCIALS */}
          <Box flex={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6">Social Infos</Typography>
              <IconButton sx={{ color: 'white' }}>
                <AddIcon />
              </IconButton>
            </Box>

            {socials.map((social, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  {social.label}
                </Typography>
                <TextField
                  fullWidth
                  placeholder={social.placeholder}
                  value={socialLinks[social.key as keyof typeof socialLinks]}
                  onChange={(e) => handleChange(social.key, e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{social.icon}</InputAdornment>
                    ),
                  }}
                  sx={textFieldStyles}
                />
              </Box>
            ))}

            {/* My Memes Link */}
            <Box mt={4}>
              <Typography variant="subtitle2" gutterBottom>
                My Memes link
              </Typography>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar sx={{ width: 24, height: 24, bgcolor: '#333' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ color: 'white' }}>
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
              <Typography variant="caption" sx={{ color: '#aaa', mt: 0.5 }}>
                https://meme-frontend
              </Typography>
            </Box>

          </Box>

        </Box>
      )}



      {tab === 1 && (
        <ImageUploadSection />
      )}

      {tab === 2 && (
        <TokenInfo />
      )}

    </Box>
  );
}
