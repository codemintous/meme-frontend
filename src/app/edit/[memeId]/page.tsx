"use client";
import React from 'react';
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
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import ImageUploadSection from '@/components/ImageUploadSection';

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
};

export default function EditPage() {
  const [tab, setTab] = React.useState(0);
  const [avatarImage, setAvatarImage] = React.useState<string | null>(null);
  const [bgImage, setBgImage] = React.useState<string | null>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'avatar' | 'background'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'avatar') {
          setAvatarImage(reader.result as string);
        } else {
          setBgImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#0f0f0f', minHeight: '100vh', color: 'white' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, newVal) => setTab(newVal)}
        sx={{ mb: 4 }}
        textColor="inherit"
        indicatorColor="primary"
      >
        <Tab label="Main info" />
        <Tab label="Visual Representation" />
        <Tab label="Token infos" />
      </Tabs>

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
         defaultValue=""
         required
         sx={textFieldStyles}
       />
       <TextField
         select
         fullWidth
         label="Category"
         defaultValue=""
         sx={textFieldStyles}
         InputProps={{ sx: { color: 'white' } }}
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
       placeholder="Description"
       multiline
       fullWidth
       rows={3}
       inputProps={{ maxLength: 200 }}
       sx={{ mb: 2, ...textFieldStyles }}
     />

     {/* Personality */}
     <TextField
       fullWidth
       multiline
       rows={4}
       label="Personality"
       placeholder="Enter custom personality here"
       sx={{ mb: 2, ...textFieldStyles }}
     />

     {/* Templates Button */}
     <Box textAlign="right">
       <Button variant="contained" sx={{ bgcolor: '#875CFF', textTransform: 'none' }}>
         Templates
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

     {[{ icon: <TwitterIcon />, label: 'X', placeholder: 'https://x.com/undefined' },
     { icon: <TelegramIcon />, label: 'Telegram', placeholder: 'https://t.me/undefined' },
     { icon: <InstagramIcon />, label: 'Instagram', placeholder: 'https://instagram.com/undefined' },
     ].map((social, index) => (
       <Box key={index} sx={{ mb: 2 }}>
         <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
           {social.label}
         </Typography>
         <TextField
           fullWidth
           placeholder={social.placeholder}
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

{/* {tab === 2 && (
  // Your Token Infos Section (you can fill this in later)
)} */}



    </Box>
  );
}
