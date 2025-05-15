import { Box, Avatar, Typography, Paper } from '@mui/material';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  avatar?: string;
  timestamp: string;
}

export default function ChatMessage({ message, isUser, avatar, timestamp }: ChatMessageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      {!isUser && (
        <Avatar
          src={avatar}
          sx={{ width: 40, height: 40, mr: 1 }}
        />
      )}
      <Box sx={{ maxWidth: '70%' }}>
        <Paper
          sx={{
            p: 2,
            bgcolor: isUser ? 'primary.main' : 'background.paper',
            color: isUser ? 'white' : 'text.primary',
            borderRadius: 2,
          }}
        >
          <Typography>{message}</Typography>
        </Paper>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'block',
            textAlign: isUser ? 'right' : 'left',
            color: 'text.secondary',
          }}
        >
          {timestamp}
        </Typography>
      </Box>
      {isUser && (
        <Avatar
          sx={{
            width: 40,
            height: 40,
            ml: 1,
            bgcolor: 'primary.main',
          }}
        >
          U
        </Avatar>
      )}
    </Box>
  );
} 