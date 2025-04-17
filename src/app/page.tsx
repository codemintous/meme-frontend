"use client"
import Image from "next/image";
import Link from "next/link";
import TrendingAgentCard from "@/components/TrendingAgentCard";
import TrendingTokenCard from "@/components/TrendingTokenCard";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

export default function Home() {
  const trendingAgents = [
    {
      name: "The Nutting Professor",
      category: "Science",
      chain: "PRONUT",
      id: "b3l49nw_jr",
      image: "/agents/meme1.png",
      description: "Trust me, you don't want to run into The Nutting Professor after the last bell rings!"
    },
    {
      name: "ClapCat",
      category: "Gaming",
      chain: "SCLAP",
      id: "9b3j_mzk",
      image: "/agents/meme2.png",
      description: "Sister to the famous $POPCAT"
    },
    {
      name: "Akita",
      category: "Dogs",
      chain: "DOGS",
      id: "akita",
      image: "/agents/meme3.png",
      description: "Akita"
    },
    {
      name: "Non-Playable Coin",
      category: "Gaming",
      chain: "NPC/ETHEREUM",
      id: "0x8e_08f6",
      image: "/agents/meme4.jpeg",
      description: "A meme for every 🤖 on Earth"
    },
    {
      name: "Beaver",
      category: "Animals",
      chain: "DAM/SUI",
      id: "0x34_7fa0",
      image: "/agents/meme5.jpeg",
      description: "You are Beaver AI Ambassador, the friendly ambassador and human's chat"
    }
  ];

  const trendingTokens = [
    {
      name: "The Nutting Professor",
      symbol: "PRONUT",
      chain: "Solana",
      marketCap: "913.02K",
      lastHour: "-",
      image: "/agents/meme1.png"
    },
    {
      name: "ClapCat",
      symbol: "SCLAP",
      chain: "Solana",
      marketCap: "883.57K",
      lastHour: "-",
      image: "/agents/meme2.png"
    },
    {
      name: "Kolt",
      symbol: "SKOLT",
      chain: "Solana",
      marketCap: "30.82K",
      lastHour: "-",
      image: "/agents/meme3.png"
    },
    {
      name: "Non-Playable Coin",
      symbol: "NPC",
      chain: "Ethereum",
      marketCap: "104.25M",
      lastHour: "0.33",
      image: "/agents/meme4.jpeg"
    },
    {
      name: "Hana",
      symbol: "HANA",
      chain: "Ethereum",
      marketCap: "883.57K",
      lastHour: "-",
      image: "/agents/meme2.png"
    },
    {
      name: "Kitten",
      symbol: "KHAI",
      chain: "Solana",
      marketCap: "883.57K",
      lastHour: "-",
      image: "/agents/meme2.png"
    },
    {
      name: "NPC Blue",
      symbol: "NPCS",
      chain: "Solana",
      marketCap: "883.57K",
      lastHour: "-",
      image: "/agents/meme2.png"
    },
  ];

  return (
    <div className="text-white p-8">
      {/* Random Meme Generator Card */}
      <div className="mb-12 relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900 to-blue-900 p-8">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-2">New feature alert:</h2>
          <h3 className="text-5xl font-bold mb-4">Generate a Random Meme</h3>
          <p className="text-lg mb-6 text-gray-300">No ideas? No problem, let us handle this for you!</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium">
            Spawn a random meme now!
          </button>
        </div>
      </div>

      {/* Trending Agents Section */}
      <div className="mb-12">


        <div className="relative px-8">
          {/* Left Chevron */}
          <button
            onClick={() => {
              const container = document.getElementById('agents-container');
              if (container) {
                container.scrollLeft -= 300;
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm cursor-pointer"
          >
            <ChevronLeft />
          </button>

          {/* Agents Container */}
          <div>

            <div className="flex items-center gap-2 mb-6">
              <TrendingUp />
              <h2 className="text-2xl font-bold">Trending Agents</h2>
            </div>

            <div
              id="agents-container"
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide rounded-lg"
            >
              {trendingAgents.map((agent) => (
                <TrendingAgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>


          {/* Right Chevron */}
          <button
            onClick={() => {
              const container = document.getElementById('agents-container');
              if (container) {
                container.scrollLeft += 300;
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm cursor-pointer"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Trending Tokens Section */}
      <div>


        <div className="relative px-6">
          {/* Left Chevron */}
          <button
            onClick={() => {
              const container = document.getElementById('tokens-container');
              if (container) {
                container.scrollLeft -= 300;
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm cursor-pointer"
          >
            <ChevronLeft />
          </button>

          {/* Tokens Container */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp />
              <h2 className="text-2xl font-bold">Trending Tokens</h2>
            </div>
            <div
              id="tokens-container"
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
            >
              {trendingTokens.map((token) => (
                <TrendingTokenCard key={token.symbol} token={token} />
              ))}
            </div>
          </div>


          {/* Right Chevron */}
          <button
            onClick={() => {
              const container = document.getElementById('tokens-container');
              if (container) {
                container.scrollLeft += 300;
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm cursor-pointer"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

    </div>
  );
}
