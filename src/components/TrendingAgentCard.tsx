'use client';

import { Box, Card, CardContent, IconButton, Typography, styled } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { MemeAgent } from '@/utils/interface';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

// interface TrendingAgent {
//   name: string;
//   category: string;
//   chain: string;
//   id: string;
//   image: string;
//   description: string;
// }

// interface TrendingAgentCardProps {
//   agent: TrendingAgent;
// }

// Styled Components
const AgentCard = styled(Card)(() => ({
  width: 180,
  height: 419,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'box-shadow 0.5s, border-color 0.5s',
  border: '1px solid rgba(113, 113, 122, 0.5)',
  boxShadow: 'none',
  '&:hover': {
    borderColor: '#ffffff',
    boxShadow: '0 0 18px 0 #ffffff80',
  },
}));


const TopOverlay = styled(Box)({
  height: 80,
  width: '100%',
  padding: '14px 16px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  background: 'linear-gradient(to bottom, #000000, rgba(0,0,0,0))',
});

const BottomOverlay = styled(CardContent)({
  background: 'linear-gradient(to top, #000000, #18181b, transparent)',
  padding: '20px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  color: '#fafafa',
});


const AgentName = styled(Typography)({
  fontWeight: 500,
  fontSize: '0.875rem',
  lineHeight: 1.5,
});

const AgentCategory = styled(Typography)({
  fontWeight: 600,
  fontSize: '0.75rem',
  color: '#a1a1aa',
  textTransform: 'capitalize',
});

const AgentDescription = styled(Typography)({
  fontWeight: 500,
  fontSize: '0.75rem',
  lineHeight: 1.5,
  color: '#fafafa',
  overflowWrap: 'break-word', // natural wrap
  whiteSpace: 'normal', // ensure it's allowed to wrap to next line
});
export default function TrendingAgentCard({ agent }: { agent: MemeAgent }) {

  const [likeCount, setLikeCount] = useState(agent.likes || 0);
  const [isLiked, setIsLiked] = useState(false); // optional toggle
  const { jwtToken } = useAuth();

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes/${agent._id}/like`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(response);
      setIsLiked(true); // optional
      setLikeCount((prev: number) => prev + 1);
    } catch (error) {
      console.error('Error liking meme:', error);
    }
  };

  return (
    <AgentCard sx={{ backgroundImage: `url(${agent.profileImageUrl})` , width: 180, flexShrink: 0 }}>
      {/* Top gradient overlay */}
      
      <TopOverlay>
        <Typography
          variant="body2"
          sx={{ color: '#fafafa', fontWeight: 500, textTransform: 'uppercase' }}
        >
          {agent.tokenDetails.symbol}
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <IconButton
            onClick={handleLike}
            sx={{ color: '#fafafa', '&:hover': { color: '#8b5cf6' }, padding: 0.5 }}
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2" sx={{ color: '#fafafa' }}>
            {likeCount}
          </Typography>
        </Box>
      </TopOverlay>

      {/* Middle Click Area */}
      <Box component={Link} href={`/${agent._id}`} sx={{ flexGrow: 1 }} />

      {/* Bottom gradient content */}
      <Link href={`/${agent._id}`} style={{ textDecoration: 'none' }}>
        <BottomOverlay>
          <Box>
            <AgentName>{agent.agentName}</AgentName>
            <AgentCategory>{agent.category}</AgentCategory>
          </Box>
          <AgentDescription>
            {agent.description.length > 55
              ? `${agent.description.slice(0, 55)}...`
              : agent.description}
          </AgentDescription>
        </BottomOverlay>
      </Link>
    </AgentCard>
  );
}
