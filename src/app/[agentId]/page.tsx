'use client';

import {
    Box,
    Avatar,
    Button,
    Tab,
    Tabs,
    TextField,
    Typography,
    IconButton,
    Divider,
    Menu,
    MenuItem,
    Paper,
    Stack
} from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import SendIcon from '@mui/icons-material/Send';
import { Info , Edit } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AgentPopup from '@/components/AgentPopup';
import { useRouter } from 'next/navigation';
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useParams } from "next/navigation";


export default function AgentDetailPage() {
    const [tab, setTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'bot' }[]>([]);
    const open = Boolean(anchorEl);
 const router = useRouter();
   const params = useParams();
   const agentId = params?.agentId;

 
    const [popupOpen, setPopupOpen] = useState(false);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSend = () => {
        if (inputValue.trim()) {
            const newMessages: { text: string; sender: 'user' | 'bot' }[] = [
                ...messages,
                { text: inputValue, sender: 'user' }
            ];
            setMessages(newMessages);
            setInputValue('');

            // Simulate bot response
            setTimeout(() => {
                setMessages((prev) => [...prev, { text: "I'm BigBrainPepe, here's your response!", sender: 'bot' }]);
            }, 800);
        }
    };

    return (
        <Box display="flex" flexDirection="row" height="100vh">
            {/* Left/Main Section */}
            <Box flex={1} display="flex" flexDirection="column" p={2} bgcolor="#0a0a0a">
                {/* Header */}
                <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mb={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src="/agents/meme1.png" alt="BigBrainPepe" sx={{ width: 56, height: 56 }} />
                        <Box>
                            <Typography variant="h6" color="white">BigBrainPepe</Typography>
                            <Typography variant="body2" color="gray">The Biggest Brain in Crypto.</Typography>
                        </Box>
                    </Box>
                    <Stack direction="row" spacing={1}>
                    <IconButton
                        sx={{
                            color: 'white',
                        }}
                        onClick={() => setPopupOpen(true)}
                    >
                        <Info />
                    </IconButton>
                    <IconButton
                       sx={{ color: 'white',}}
                       onClick={() => { router.push(`/launchpad`)}}
                   >
                       <RocketLaunchIcon />
                   </IconButton>
                   <IconButton
                       sx={{ color: 'white',}}
                       onClick={()=> {
                        router.push(`/edit/${agentId}`)
                       }}
                   >
                       <Edit />
                   </IconButton>
                    </Stack>
                </Box>



                {/* Chat Area */}
                <Box flexGrow={1} overflow="auto" px={1}>
                    {messages.map((msg, i) => (
                        <Box
                            key={i}
                            display="flex"
                            justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                            mb={1}
                        >
                            <Paper
                                sx={{
                                    p: 1.5,
                                    px: 2,
                                    maxWidth: '70%',
                                    borderRadius: 4,
                                    backgroundColor: msg.sender === 'user' ? '#9333ea' : '#27272a',
                                    color: 'white'
                                }}
                                elevation={2}
                            >
                                {msg.text}
                            </Paper>
                        </Box>
                    ))}
                </Box>

                {/* Prompt & Chat Input */}
                <Box mt={2} display="flex" gap={1} alignItems="center">
                    <TextField
                        placeholder="Have a conversation with BigBrainPepe..."
                        fullWidth
                        variant="outlined"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        sx={{
                            bgcolor: '#181818',
                            borderRadius: '6px',
                            flex: 1,
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                                height: 48,
                                borderRadius: '6px',
                                '& fieldset': {
                                    borderColor: 'gray',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#9333ea',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#9333ea',
                                },
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: 'white',
                                opacity: 0.5,
                            },
                        }}
                    />
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box position="relative" height={48}>
                            <Button
                                variant="outlined"
                                endIcon={<ArrowDropDownIcon />}
                                onClick={handleDropdownClick}
                                sx={{
                                    color: 'white',
                                    borderColor: 'gray',
                                    whiteSpace: 'nowrap',
                                    borderRadius: '6px',
                                    height: '100%',
                                    px: 2,
                                }}
                            >
                                Chat
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            >
                                <MenuItem onClick={handleMenuClose}>Chat</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Meme</MenuItem>
                            </Menu>
                        </Box>

                        <IconButton
                            sx={{
                                bgcolor: '#9333ea',
                                color: 'white',
                                borderRadius: '8px',
                                width: 48,
                                height: 48,
                            }}
                            onClick={handleSend}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Box width={300} bgcolor="#111" p={2} display="flex" flexDirection="column">
                <Tabs value={tab} onChange={handleTabChange} textColor="inherit">
                    <Tab label="Community" />
                    <Tab label="By Me" />
                </Tabs>

                {/* Meme Thumbnails */}
                <Box
                    mt={2}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        maxHeight: 350, // Limit height for scrolling
                        overflowY: 'auto', // Allow scrolling vertically
                        '&::-webkit-scrollbar': {
                            display: 'none', // Hide scrollbar
                        },
                    }}
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <Box
                            key={i}
                            width={120}
                            height={120}
                            borderRadius={2}
                            overflow="hidden"
                            position="relative"
                        >
                            <Image
                                src="/agents/meme1.png"
                                alt={`meme-${i}`}
                                layout="fill"
                                objectFit="cover"
                            />
                        </Box>
                    ))}
                </Box>

                {/* Comments */}
                <Box
                    mt={4}
                    sx={{
                        maxHeight: 200, // Limit height for scrolling
                        overflowY: 'auto', // Allow scrolling vertically
                        '&::-webkit-scrollbar': {
                            display: 'none', // Hide scrollbar
                        },
                    }}
                >
                    <Typography variant="subtitle2" color="gray" gutterBottom>
                        Latest Comments
                    </Typography>
                    <Divider sx={{ bgcolor: '#333' }} />
                    {[1, 2].map((i) => (
                        <Box key={i} display="flex" alignItems="flex-start" mt={2} gap={1}>
                            <Avatar src="/pepe.png" sx={{ width: 32, height: 32 }} />
                            <Box>
                                <Typography color="white" variant="body2">Danilo</Typography>
                                <Typography color="gray" variant="caption">2025-03-08 13:21:46</Typography>
                                <Typography color="white" variant="body2" mt={0.5}>Nice one!</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>


            <AgentPopup open={popupOpen} handleClose={() => setPopupOpen(false)} />
        </Box>
    );
}



