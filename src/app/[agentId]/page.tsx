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
import { useEffect, useState } from 'react';
import Image from 'next/image';
import SendIcon from '@mui/icons-material/Send';
import { Info, Edit, ContentCopy } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AgentPopup from '@/components/AgentPopup';
import { useRouter } from 'next/navigation';
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useParams } from "next/navigation";
import Link from 'next/link';
import VideoIcon from '@mui/icons-material/VideoCall';
import RefreshIcon from '@mui/icons-material/Refresh';
import { uploadToPinata } from "@/utils/pinataUploader";

import { MemeAgent } from '@/utils/interface';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import TradeForm from "@/components/TradeForm"; // Import your TradeForm component
import { useAccount } from 'wagmi';
import WalletButton from '@/components/WalletButton';
import { useAuth } from '@/context/AuthContext';

import platform_contract_abi from "@/data/platform_contract_abi.json"
import { BrowserProvider, Contract, formatUnits, parseEther } from "ethers";


export default function AgentDetailPage() {
    const [tab, setTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' | 'loading' | 'image' }[]>([]);
    const [selectedMode, setSelectedMode] = useState('Chat');
    const [popupOpen, setPopupOpen] = useState(false);
    const [memeDetail, setMemeDetail] = useState<MemeAgent | null>(null);
    const [isShowWalletModal, setIsShowWalletModal] = useState<boolean>(false); // State for showing wallet modal
    const [popupTrade, setPopupTrade] = useState(false);
    const [donatePopup, setDonatePopup] = useState(false);
    const [donateAmount, setDonateAmount] = useState('');
    const [tokenBalance, setTokenBalance] = useState<string>('0');
    const open = Boolean(anchorEl);
    const router = useRouter();
    const params = useParams();
    const agentId = params?.agentId;
    const { jwtToken } = useAuth();
    const { isConnected, address } = useAccount();
    const [userImages, setUserImages] = useState<string[]>([]);
    const [communityImages, setCommunityImages] = useState<string[]>([]);


    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes/${agentId}`
                );
                setMemeDetail(response.data); // assuming response.data is the object for a single meme
                console.log("memedetail...", response.data);

            } catch (error) {
                console.error("Error fetching meme agent:", error);
            }
        };

        if (agentId) {
            fetchMemes();
        }
    }, [agentId]);

    const fetchTokenBalance = async (
        address: string,
        setTokenBalance: (balance: string) => void
    ) => {
        try {
            if (!window.ethereum) {
                console.error("Ethereum provider not found.");
                return;
            }

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contract = new Contract(
                process.env.NEXT_PUBLIC_PLATFORMBALANCE_CONTRACT_ADDRESS!,
                platform_contract_abi,
                signer
            );

            const tx = await contract.getTokenBalance(address);
            const formattedBalance = formatUnits(tx, 0);

            console.log("User token balance:", formattedBalance, tx);
            setTokenBalance(formattedBalance);
        } catch (err) {
            console.error("Error fetching token balance:", err);
        }
    };

    useEffect(() => {
        if (address) {
            fetchTokenBalance(address, setTokenBalance);
        }
    }, [isConnected, address]);

    useEffect(() => {
        const fetchUserImages = async () => {
            if (tab === 1 && address) { // Only fetch when "By Me" tab is selected and wallet is connected
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/history/user/${address}/images`
                    );
                    setUserImages(response.data);
                } catch (error) {
                    console.error("Error fetching user images:", error);
                }
            }
        };

        fetchUserImages();
    }, [tab, address]);

    useEffect(() => {
        const fetchCommunityImages = async () => {
            if (tab === 0 && agentId) { // Only fetch when "Community" tab is selected
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/history/agent/${agentId}/all-images`
                    );
                    setCommunityImages(response.data);
                } catch (error) {
                    console.error("Error fetching community images:", error);
                }
            }
        };

        fetchCommunityImages();
    }, [tab, agentId]);

    const handleDonate = async () => {
        try {
    
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Import the paymaster utilities
          const { createPaymasterContract, executePaymasterTransaction } = await import('@/utils/paymasterUtils');

          // Create a contract with paymaster support
          const contract = await createPaymasterContract(
            process.env.NEXT_PUBLIC_PLATFORMBALANCE_CONTRACT_ADDRESS!,
            platform_contract_abi
          );

          const totalCost = (parseInt(donateAmount.toString()) * 0.0001).toString();
          console.log("buy cost..................", parseEther(totalCost));

          // Execute the transaction with paymaster support
          const receipt = await executePaymasterTransaction(
            contract,
            'buyTokens',
            [],
            { value: parseEther(totalCost) }
          );

          console.log("Transaction mined:", receipt);

          // Get the signer to fetch the user address
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const userAddress = await signer.getAddress();

          if (userAddress) {
            await fetchTokenBalance(userAddress, setTokenBalance);
          }
    
        } catch (error) {
            console.error('Error during buy transaction:', error);
        } finally {
            console.log("finally block....");
        }
    };

    const handleTradeSubmit = (mode: "buy" | "sell", amount: number, slippage: number) => {
        console.log("Trade submitted:", { mode, amount, slippage });
        // Your transaction logic (Web3, backend, etc.)
        setPopupOpen(false); // Close the popup after submitting
    };





    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleSend = async () => {
        if (inputValue.trim()) {
            const userMessage = { text: inputValue, sender: 'user' as const };
            const loadingMessage = { text: '', sender: 'loading' as const };

            setMessages([...messages, userMessage, loadingMessage]);
            setInputValue('');

            setTimeout(async () => {
                if (selectedMode === 'Meme') {
                    try {
                        // Call the image generation API with correct endpoint
                        const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/generate`,
                            {
                                prompt: inputValue,
                                agentId: agentId
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${jwtToken}`
                                }
                            }
                        );

                        // Get the generated image URL from the response
                        const generatedImageUrl = response.data.imageUrl;

                        // Convert the image URL to a blob and upload to Pinata
                        const imageResponse = await fetch(generatedImageUrl);
                        const blob = await imageResponse.blob();
                        const file = new File([blob], 'generated-meme.png', { type: blob.type });

                        const ipfsHash = await uploadToPinata(file);
                        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

                        setMessages((prev) => [
                            ...prev.slice(0, -1), // Remove loading message
                            { text: ipfsUrl, sender: 'image' as const },
                        ]);
                    } catch (error) {
                        console.error('Error uploading meme to Pinata:', error);
                        setMessages((prev) => [
                            ...prev.slice(0, -1),
                            { text: 'Failed to generate meme.', sender: 'bot' as const },
                        ]);
                    }
                } else {
                    try {
                        const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/api/agents/chat`,
                            {
                                agentId: agentId,
                                message: inputValue
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'Authorization': `Bearer ${jwtToken}` // Uncomment when auth is implemented
                                }
                            }
                        );

                        setMessages((prev) => [
                            ...prev.slice(0, -1),
                            { text: response.data.response, sender: 'bot' as const },
                        ]);
                    } catch (error) {
                        console.error('Error sending message:', error);
                        setMessages((prev) => [
                            ...prev.slice(0, -1),
                            { text: 'Sorry, there was an error processing your message.', sender: 'bot' as const },
                        ]);
                    }
                }
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
                        <Avatar src={`${memeDetail?.profileImageUrl}`} alt="BigBrainPepe" sx={{ width: 56, height: 56 }} />
                        <Box>
                            <Typography variant="h6" color="white">{memeDetail?.name}</Typography>
                            <Typography variant="body2" color="gray">{memeDetail?.description}</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="end" gap={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    boxShadow: 'none'
                                }}
                                onClick={() => setPopupTrade(true)}
                            >
                                Transact
                            </Button>
                            <IconButton sx={{ color: 'white' }} onClick={() => setPopupOpen(true)}>
                                <Info />
                            </IconButton>
                            <IconButton sx={{ color: 'white' }} onClick={() => router.push(`/launchpad`)}>
                                <RocketLaunchIcon />
                            </IconButton>
                            <IconButton sx={{ color: 'white' }} onClick={() => router.push(`/edit/${agentId}`)}>
                                <Edit />
                            </IconButton>
                        </Stack>

                        {/* New Box for Credits and Donate */}
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            bgcolor="#1E1E1E"
                            borderRadius={2}
                            p={1}
                            width="fit-content"
                            boxShadow={3}
                        >
                            <Typography variant="body2" color="white" mr={2}>
                                <strong>mememinto</strong> has <strong>{tokenBalance} credits</strong>
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    paddingX: 2,
                                    paddingY: 0.5,
                                    boxShadow: 'none'
                                }}
                                onClick={() => setDonatePopup(true)}
                            >
                                Donate
                            </Button>
                        </Box>
                    </Box>


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
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}
                                elevation={2}
                            >
                                {msg.sender === 'loading' ? (
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        {[...Array(3)].map((_, j) => (
                                            <Box
                                                key={j}
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'white',
                                                    animation: `bounce 1.4s infinite`,
                                                    animationDelay: `${j * 0.2}s`
                                                }}
                                            />
                                        ))}
                                    </Box>
                                ) : msg.sender === 'image' ? (
                                    <>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <Avatar src="/agents/meme1.png" alt="Agent Name" sx={{ width: 30, height: 30, mr: 1 }} />
                                            <Typography variant="body2" color="white">BigBrainPepe</Typography>
                                        </Box>
                                        <img src={msg.text} alt="Generated Meme" style={{ maxWidth: '100%', borderRadius: '4px' }} />
                                        <Box display="flex" justifyContent="flex-end" mt={1}>
                                            <IconButton sx={{ color: 'white' }} onClick={() => {/* Handle video action */ }}>
                                                <VideoIcon /> {/* Replace with actual video icon */}
                                            </IconButton>
                                            <IconButton sx={{ color: 'white' }} onClick={() => {/* Handle regenerate action */ }}>
                                                <RefreshIcon /> {/* Replace with actual regenerate icon */}
                                            </IconButton>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        {msg.sender !== 'user' && ( // Show agent image and name only for agent responses
                                            <Box display="flex" alignItems="center" mt={1}>
                                                <Avatar src={memeDetail?.profileImageUrl} alt="Agent Name" sx={{ width: 30, height: 30, mr: 1 }} />
                                                <Typography variant="body2" color="white">{memeDetail?.name}</Typography>
                                            </Box>
                                        )}
                                        <Typography variant="body2" color="white">{msg.text}</Typography>

                                        {msg.sender !== 'user' && (
                                            <Box display="flex" >
                                                <IconButton sx={{ color: 'white', fontSize: 'small' }} onClick={() => {/* Handle copy action */ }}>
                                                    <ContentCopy />
                                                </IconButton>
                                                <IconButton sx={{ color: 'white', fontSize: 'small' }} onClick={() => {/* Handle regenerate action */ }}>
                                                    <RefreshIcon />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </>
                                )}
                            </Paper>
                        </Box>
                    ))}
                </Box>


                {/* Prompt & Chat Input */}
                <Box mt={2} display="flex" gap={1} alignItems="center">
                    <TextField
                        // placeholder={
                        //     !isConnected
                        //         ? 'Connect your wallet first...'
                        //         : `Message ${memeDetail?.name}...`
                        // }
                        placeholder={`Message ${memeDetail?.name}...`}
                        fullWidth
                        variant="outlined"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        // onFocus={() => {
                        //     if (!isConnected) setIsShowWalletModal(true);
                        // }}
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
                                {selectedMode}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            >
                                <MenuItem onClick={() => { setSelectedMode('Chat'); handleMenuClose(); }}>Chat</MenuItem>
                                <MenuItem onClick={() => { setSelectedMode('Meme'); handleMenuClose(); }}>Meme</MenuItem>
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
                        maxHeight: 350,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    {tab === 0 ? (
                        // Community tab - show agent's community images
                        communityImages.length > 0 ? (
                            communityImages.map((imageUrl, i) => (
                                <Box
                                    key={i}
                                    width={120}
                                    height={120}
                                    borderRadius={2}
                                    overflow="hidden"
                                    position="relative"
                                >
                                    <Image
                                        src={imageUrl}
                                        alt={`community-meme-${i}`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </Box>
                            ))
                        ) : (
                            <Typography color="gray" sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
                                No community images found
                            </Typography>
                        )
                    ) : (
                        // By Me tab - show user's images
                        userImages.length > 0 ? (
                            userImages.map((imageUrl, i) => (
                                <Box
                                    key={i}
                                    width={120}
                                    height={120}
                                    borderRadius={2}
                                    overflow="hidden"
                                    position="relative"
                                >
                                    <Image
                                        src={imageUrl}
                                        alt={`user-meme-${i}`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </Box>
                            ))
                        ) : (
                            <Typography color="gray" sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
                                {address ? "No images found" : "Connect wallet to view your images"}
                            </Typography>
                        )
                    )}
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    // startIcon={<Plus size={20} />}
                    sx={{ backgroundColor: '#9333ea', '&:hover': { backgroundColor: '#7e22ce' }, margin: '1rem 0' }}
                    onClick={() => {
                        setSelectedMode("Meme");
                    }}
                >
                    <Link href={""} >
                        Generate Meme
                    </Link>

                </Button>

                {/* Comments */}
                <Typography variant="subtitle2" color="gray" gutterBottom>
                    Latest Comments
                </Typography>
                <Box
                    mt={1}
                    sx={{
                        maxHeight: 200, // Limit height for scrolling
                        overflowY: 'auto', // Allow scrolling vertically
                        '&::-webkit-scrollbar': {
                            display: 'none', // Hide scrollbar
                        },
                    }}
                >

                    <Divider sx={{ bgcolor: '#333' }} />
                    {[1, 2, 3].map((i) => (
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

            <Dialog
                open={popupTrade}
                onClose={() => setPopupTrade(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: "#1e1e1e", // Dark background
                        borderRadius: 3,           // Rounded corners (theme.spacing(3))
                        p: 1,                      // Padding inside
                        color: "white",           // Optional: white text
                        minWidth: 360             // Optional: match width from screenshot
                    },
                }}
            >
                <DialogContent>
                    <TradeForm
                        tokenName={memeDetail?.tokenDetails.name || ""}
                        tokenSymbol={memeDetail?.tokenDetails.symbol || ""}
                        tokenAddress={memeDetail?.tokenDetails.tokenAddress || ""}
                        chain={"base"}
                        price={0}
                        marketCap={""}
                        onSubmit={handleTradeSubmit}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPopupTrade(false)} sx={{ color: "#aaa" }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <AgentPopup open={popupOpen} handleClose={() => setPopupOpen(false)} />
            <Dialog
                open={isShowWalletModal}
                onClose={() => setIsShowWalletModal(false)}
               
            >
                <DialogContent
                    sx={{
                        bgcolor: '#121212',
                        color: 'white',
                        textAlign: 'center',
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Connect Your Wallet
                    </Typography>
                    <Typography variant="body2" mb={3}>
                        To start chatting and trading, please connect your wallet.
                    </Typography>

                    <Box display="flex" justifyContent="center" gap={2}>
                        <WalletButton />
                        <Button
                            variant="outlined"
                            onClick={() => {
                                console.log('Cancel clicked');
                                setIsShowWalletModal(false);
                              }}
                            sx={{ color: 'white', borderColor: 'white' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog
                open={donatePopup}
                onClose={() => setDonatePopup(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: "#1e1e1e",
                        borderRadius: 3,

                        color: "white",
                        minWidth: 360
                    },
                }}
            >
                <DialogContent>
                    <Typography variant="h6" mb={2}>Tokens {memeDetail?.name}</Typography>

                    <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        size="small"
                        label="Tokens"
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(e.target.value)}
                        InputProps={{ sx: { color: "white" } }}
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{ backgroundColor: "#2b2b2b", borderRadius: 1 }}
                    />
                    <Typography variant="body2" sx={{ color: "white" }}>
                        You will be charged {(Number(donateAmount) * 0.0001)} base sepolia
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDonatePopup(false)} sx={{ color: "#aaa" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleDonate();
                            console.log('Donating:', donateAmount);
                            setDonatePopup(false);
                        }}
                        sx={{ color: "#9333ea" }}
                    >
                        Donate
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}



