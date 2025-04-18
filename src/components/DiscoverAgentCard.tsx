'use client';

import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import Link from 'next/link';

interface TrendingAgent {
  name: string;
  category: string;
  chain: string;
  id: string;
  image: string;
  description: string;
}

interface TrendingAgentCardProps {
  agent: TrendingAgent;
}

// Styled Components
const AgentCard = styled(Card)(() => ({
  width: 240,
  height: 200, // square
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '1px solid rgba(113, 113, 122, 0.5)',
  boxShadow: 'none',
  position: 'relative',
  transition: '0.3s',
  '&:hover': {
    borderColor: '#fff',
    boxShadow: '0 0 18px 0 #ffffff80',
  },
}));

const TopOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  width: '100%',
  padding: '14px 16px 0',
  display: 'flex',
  justifyContent: 'space-between',
  background: 'linear-gradient(to bottom, #000000aa, transparent)',
  zIndex: 1,
});

const BottomOverlay = styled(CardContent)({
  position: 'absolute',
  bottom: '-20px',
  width: '100%',
  background: 'linear-gradient(to top, #000000, #18181b, transparent)',
  padding: '16px 16px 16px', // control bottom spacing
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  zIndex: 1,
  color: '#fafafa',
});

const Name = styled(Typography)({
  fontWeight: 600,
  fontSize: '0.9rem',
  color: '#fff',
  wordBreak: 'break-word',
  whiteSpace: 'normal',       // Allows text to wrap
  overflow: 'visible',        // Ensure text isn't clipped
  textOverflow: 'unset',
});

const Category = styled(Typography)({
  fontWeight: 500,
  fontSize: '0.875rem',
  color: '#d4d4d8',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  overflow: 'visible',
  textOverflow: 'unset',
});


const IconRow = styled(Box)({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
});

export default function DiscoverAgentCard({ agent }: TrendingAgentCardProps) {
  return (
    <AgentCard sx={{ backgroundImage: `url(${agent.image})` }}>
      <TopOverlay>
        <Typography
          variant="body2"
          sx={{ color: '#fafafa', fontWeight: 500, textTransform: 'uppercase' }}
        >
          {agent.chain}
        </Typography>
        <Box />
      </TopOverlay>

      <Link href={`/${agent.id}`} style={{ textDecoration: 'none', flexGrow: 1 }}>
        <Box sx={{ height: '100%' }} />
      </Link>

      <Link href={`/${agent.id}`} style={{ textDecoration: 'none' }}>
        <BottomOverlay>
          <Name>{agent.name}</Name>
          <Category>{agent.category}</Category>
          <IconRow>
            <IconButton sx={{ color: '#fafafa', padding: '6px' }}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton sx={{ color: '#fafafa', padding: '6px' }}>
              <PhotoLibraryOutlinedIcon />
            </IconButton>
          </IconRow>
        </BottomOverlay>
      </Link>
    </AgentCard>
  );
}
