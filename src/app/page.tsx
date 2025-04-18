"use client";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "@mui/icons-material";
import TrendingAgentCard from "@/components/TrendingAgentCard";
import TrendingTokenCard from "@/components/TrendingTokenCard";
import DiscoverAgentCard from "@/components/DiscoverAgentCard";

const trendingAgents = [
  {
    name: "The Nutting Professor",
    category: "Science",
    chain: "PRONUT",
    id: "b3l49nw_jr",
    image: "/agents/meme1.png",
    description:
      "Trust me, you don't want to run into The Nutting Professor after the last bell rings!",
  },
  {
    name: "ClapCat",
    category: "Gaming",
    chain: "SCLAP",
    id: "9b3j_mzk",
    image: "/agents/meme2.png",
    description: "Sister to the famous $POPCAT",
  },
  {
    name: "Akita",
    category: "Dogs",
    chain: "DOGS",
    id: "akita",
    image: "/agents/meme3.png",
    description: "Akita",
  },
  {
    name: "Non-Playable Coin",
    category: "Gaming",
    chain: "NPC/ETHEREUM",
    id: "0x8e_08f6",
    image: "/agents/meme4.jpeg",
    description: "A meme for every 🤖 on Earth",
  },
  {
    name: "Beaver",
    category: "Animals",
    chain: "DAM/SUI",
    id: "0x34_7fa0",
    image: "/agents/meme5.jpeg",
    description:
      "You are Beaver AI Ambassador, the friendly ambassador and human's chat",
  },
  {
    name: "Beaver1",
    category: "Animals",
    chain: "DAM/SUI",
    id: "0x34_7fa2",
    image: "/agents/meme5.jpeg",
    description:
      "You are Beaver AI Ambassador, the friendly ambassador and human's chat",
  },
  {
    name: "Beaver2",
    category: "Animals",
    chain: "DAM/SUI",
    id: "0x34_7fa3",
    image: "/agents/meme5.jpeg",
    description:
      "You are Beaver AI Ambassador, the friendly ambassador and human's chat",
  },
 
  
];

const trendingTokens = [
  {
    name: "The Nutting Professor",
    symbol: "PRONUT",
    chain: "Solana",
    marketCap: "913.02K",
    lastHour: "-",
    image: "/agents/meme1.png",
  },
  {
    name: "ClapCat",
    symbol: "SCLAP",
    chain: "Solana",
    marketCap: "883.57K",
    lastHour: "-",
    image: "/agents/meme2.png",
  },
  {
    name: "Kolt",
    symbol: "SKOLT",
    chain: "Solana",
    marketCap: "30.82K",
    lastHour: "-",
    image: "/agents/meme3.png",
  },
  {
    name: "Non-Playable Coin",
    symbol: "NPC",
    chain: "Ethereum",
    marketCap: "104.25M",
    lastHour: "0.33",
    image: "/agents/meme4.jpeg",
  },
  {
    name: "Hana",
    symbol: "HANA",
    chain: "Ethereum",
    marketCap: "883.57K",
    lastHour: "-",
    image: "/agents/meme2.png",
  },
  {
    name: "Kitten",
    symbol: "KHAI",
    chain: "Solana",
    marketCap: "883.57K",
    lastHour: "-",
    image: "/agents/meme2.png",
  },
  {
    name: "NPC Blue",
    symbol: "NPCS",
    chain: "Solana",
    marketCap: "883.57K",
    lastHour: "-",
    image: "/agents/meme2.png",
  },
];

export default function Home() {
  const scrollLeft = (id: string) => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollLeft -= 300;
    }
  };

  const scrollRight = (id: string) => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollLeft += 300;
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* Meme Generator Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #4b0082, #1e3a8a)",
          color: "white",
          p: 4,
          borderRadius: 4,
          mb: 6,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={1}>
          New feature alert:
        </Typography>
        <Typography variant="h3" fontWeight="bold" mb={2}>
          Generate a Random Meme
        </Typography>
        <Typography variant="body1" mb={3}>
          No ideas? No problem, let us handle this for you!
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Spawn a random meme now!
        </Button>
      </Box>

      {/* Trending Agents */}
      <Box position="relative" mb={6}>
        <IconButton
          onClick={() => scrollLeft("agents-container")}
          sx={{
            position: "absolute",
            left: "-42px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ChevronLeft sx={{ color: "white" }} />
        </IconButton>

        <Box mb={2} display="flex" alignItems="center" gap={1}>
          <TrendingUp />
          <Typography variant="h5" fontWeight="bold">
            Trending Agents
          </Typography>
        </Box>

        <Box
          id="agents-container"
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            gap: 2,
            overflowX: "auto",
            pb: 2,
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {trendingAgents.map((agent) => (
            <TrendingAgentCard key={agent.id} agent={agent} />
          ))}
        </Box>

        <IconButton
          onClick={() => scrollRight("agents-container")}
          sx={{
            position: "absolute",
            right: "-42px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ChevronRight sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Trending Tokens */}
      <Box position="relative" mb={6}>
        <IconButton
          onClick={() => scrollLeft("tokens-container")}
          sx={{
            position: "absolute",
            left: "-42px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ChevronLeft sx={{ color: "white" }} />
        </IconButton>

        <Box mb={2} display="flex" alignItems="center" gap={1}>
          <TrendingUp />
          <Typography variant="h5" fontWeight="bold">
            Trending Tokens
          </Typography>
        </Box>

        <Box
          id="tokens-container"
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 2,
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {trendingTokens.map((token) => (
            <TrendingTokenCard key={token.symbol} token={token} />
          ))}
        </Box>

        <IconButton
          onClick={() => scrollRight("tokens-container")}
          sx={{
            position: "absolute",
            right: "-42px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ChevronRight sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Discover Agents */}
      <Box position="relative" mb={6}>
        <IconButton
          onClick={() => scrollLeft("discover-agents-container")}
          sx={{
            position: "absolute",
            left: "-42px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ChevronLeft sx={{ color: "white" }} />
        </IconButton>

        <Box mb={2} display="flex" alignItems="center" gap={1}>
          <TrendingUp />
          <Typography variant="h5" fontWeight="bold">
            Discover Agents
          </Typography>
        </Box>

        <Box
          id="discover-agents-container"
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            gap: 2,
            overflowX: "auto",
            pb: 2,
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {trendingAgents.map((agent) => (
            <DiscoverAgentCard key={agent.id} agent={agent} />
          ))}
        </Box>

        <IconButton
          onClick={() => scrollRight("discover-agents-container")}
          sx={{
            position: "absolute",
            right: "-42px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ChevronRight sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Container>
  );
}
