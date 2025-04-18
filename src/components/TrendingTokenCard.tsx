import Image from 'next/image';
import { Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface TrendingToken {
  name: string;
  symbol: string;
  chain: string;
  marketCap: string;
  lastHour: string;
  image: string;
}

interface TrendingTokenCardProps {
  token: TrendingToken;
}

// Styled Components

const TokenCard = styled(Card)({
  backgroundColor: '#18181b',
  border: '1px solid rgba(113, 113, 122, 0.5)',
  borderRadius: '12px',
  padding: '16px',
  width: '280px',
  flexShrink: 0,
  overflow: 'hidden',
  color: '#ffffff',
  transition: 'all 0.5s ease-in-out',
  '&:hover': {
    borderColor: '#ffffff',
    boxShadow: '0px 0px 18px 0px #FFFFFF40',
  },
  display: 'flex',
  flexDirection: 'column',
});

const TokenHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
});

const TokenImageWrapper = styled(Box)({
  width: 48,
  height: 48,
  position: 'relative',
  borderRadius: '50%',
  overflow: 'hidden',
});

const TokenInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const InfoSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.875rem',
});

const Label = styled(Typography)({
 
  fontSize: '0.875rem',
});

const Value = styled(Typography)({
  fontWeight: 500,
});

export default function TrendingTokenCard({ token }: TrendingTokenCardProps) {
  const isNegative = token.lastHour.startsWith('-');

  return (
    <TokenCard>
      <TokenHeader>
        <TokenImageWrapper>
          <Image src={token.image} alt={token.name} fill style={{ objectFit: 'cover' }} />
        </TokenImageWrapper>
        <TokenInfo>
          <Typography variant="subtitle1" fontWeight={700}>
            {token.name}
          </Typography>
          <Typography variant="body2">
            {token.symbol} / {token.chain}
          </Typography>
        </TokenInfo>
      </TokenHeader>
      <InfoSection>
        <Box>
          <Label>Market Cap:</Label>
          <Value>${token.marketCap}</Value>
        </Box>
        <Box>
          <Label>Last Hour:</Label>
          <Value sx={{ color: isNegative ? '#ef4444' : '#22c55e' }}>
            {token.lastHour !== '-' ? `${token.lastHour}%` : '-'}
          </Value>
        </Box>
      </InfoSection>
    </TokenCard>
  );
}
