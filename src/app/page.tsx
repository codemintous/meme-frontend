"use client";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import {
  TrendingUp,
} from "@mui/icons-material";
import TrendingAgentCard from "@/components/TrendingAgentCard";
import TrendingTokenCard from "@/components/TrendingTokenCard";
import DiscoverAgentCard from "@/components/DiscoverAgentCard";
import { useEffect, useState } from "react";
import LatestMemes from "@/components/LatestMemes";
import homePageData from '../data/homePageData.json';
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import Providers from '../provider/providers';
import TokenChartTradeSection from "@/components/TokenChartTradeSection"; 
import axios from "axios";
import { MemeAgent } from "@/utils/interface";


export default function Home() {

  const [memeAgents, setMemeAgents] = useState<MemeAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedToken, setSelectedToken] =  useState<MemeAgent | null>(null);
  const { trendingAgents, latestMemes } = homePageData;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes`
        );
        setMemeAgents(response.data); // assuming the response data is an array
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching meme agents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  if (loading) return <div>Loading memes...</div>;



  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Optional: apply a filter or fetch new results
  };

  return (
    <Providers>

   
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

      <HorizontalScrollSection id="agents-container" title="Trending Agents" icon={<TrendingUp />}>
        {memeAgents.map((agent) => (
          <TrendingAgentCard key={agent._id} agent={agent} />
        ))}
      </HorizontalScrollSection>

      <HorizontalScrollSection id="tokens-container" title="Trending Tokens" icon={<TrendingUp />}>
  {memeAgents.map((token) => (
    <Box key={token._id} onClick={() => setSelectedToken(token)} sx={{ cursor: "pointer" }}>
      <TrendingTokenCard token={token} />
    </Box>
  ))}
</HorizontalScrollSection>

      {selectedToken && (
  <TokenChartTradeSection token={selectedToken} />
)}

      {/* Discover Agents */}

      <HorizontalScrollSection
        id="discover-container"
        title="Discover Agents"
        icon={<TrendingUp />}
        headerRight={
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'gray',
                  '& fieldset': { borderColor: 'gray' },
                  '&.Mui-focused fieldset': { borderColor: '#9333ea' },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'gray',
                  opacity: 1,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ backgroundColor: '#9333ea', '&:hover': { backgroundColor: '#7e22ce' } }}
            >
              Search
            </Button>
          </Box>
        }
      >
        {trendingAgents.map((agent) => (
          <DiscoverAgentCard key={agent.id} agent={agent} />
        ))}
      </HorizontalScrollSection>
      <LatestMemes memes={latestMemes} />
    </Container>
    </Providers>
  );
}
//  For Paymaster
// https://api.developer.coinbase.com/rpc/v1/base-sepolia/gR6PmoRBDn1FPRzapilyIaGWgOMQEdDm


