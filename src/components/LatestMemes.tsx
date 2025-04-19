import {
    Box,
    Typography,
    IconButton,
    Button,
    Card,
    CardMedia,
    Avatar,
  } from '@mui/material';
  import {
    Whatshot,
    AcUnit,
    Image as ImageIcon,
    VideoLibrary,
    ArrowUpward,
    ArrowDownward,
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  type Meme = {
    id: number;
    title: string;
    image: string;
    creator: {
      name: string;
      avatar: string;
    };
    votes: number;
  };
  
  type LatestMemesProps = {
    memes: Meme[];
  };
  
  const filterButtons = [
    { label: 'Hotter', icon: <Whatshot /> },
    { label: 'Coldest', icon: <AcUnit /> },
    { label: 'Images', icon: <ImageIcon /> },
    { label: 'Videos', icon: <VideoLibrary /> },
  ];
  
  const LatestMemes: React.FC<LatestMemesProps> = ({ memes }) => {
    const [activeFilter, setActiveFilter] = useState<string>('Coldest');
  
    return (
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Latest Memes
        </Typography>
  
        {/* Filter Buttons */}
        <Box display="flex" gap={1} mb={3}>
          {filterButtons.map((btn) => (
            <Button
              key={btn.label}
              variant={activeFilter === btn.label ? 'contained' : 'outlined'}
              color="inherit"
              startIcon={btn.icon}
              onClick={() => setActiveFilter(btn.label)}
              sx={{
                borderRadius: 2,
                backgroundColor: activeFilter === btn.label ? '#9333ea' : 'transparent',
                color: '#fff',
                borderColor: '#444',
                '&:hover': {
                  backgroundColor: activeFilter === btn.label ? '#7e22ce' : '#222',
                },
              }}
            >
              {btn.label}
            </Button>
          ))}
        </Box>
  
        {/* Meme Cards */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
          gap={2}
        >
          {memes.map((meme) => (
            <Card
              key={meme.id}
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover .overlay': {
                  opacity: 1,
                },
              }}
            >
              <CardMedia
                component="img"
                height="260"
                image={meme.image}
                alt={meme.title}
              />
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                  color: 'white',
                  p: 2,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {meme.title}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Avatar
                    src={meme.creator.avatar}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Typography variant="caption" mr={2}>
                    {meme.creator.name}
                  </Typography>
                  <IconButton size="small" sx={{ color: 'white' }}>
                    <ArrowUpward fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'white' }}>
                    <ArrowDownward fontSize="small" />
                  </IconButton>
                  <Typography variant="caption">{meme.votes}</Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    );
  };
  
  export default LatestMemes;
  