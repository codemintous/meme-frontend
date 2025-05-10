
import { Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { MemeAgent } from '@/utils/interface';


interface TrendingTokenCardProps {
  token: MemeAgent;
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

  console.log("token in trending token.......", token);

  return (
    <TokenCard>
      <TokenHeader>
        <TokenImageWrapper>
          <img src={token?.profileImageUrl} alt={token.agentName} style={{ objectFit: 'cover' }} />
        </TokenImageWrapper>
        <TokenInfo>
          <Typography variant="subtitle1" fontWeight={700}>
            {token.tokenDetails?.name}
          </Typography>
          <Typography variant="body2">
            {token.tokenDetails?.symbol} / base
          </Typography>
        </TokenInfo>
      </TokenHeader>
      <InfoSection>
        <Box>
          <Label>Market Cap:</Label>
          <Value>$0</Value>
        </Box>
        <Box>
          <Label>Last Hour:</Label>
          <Value >
            {'-'}
          </Value>
        </Box>
      </InfoSection>
    </TokenCard>
  );
}
