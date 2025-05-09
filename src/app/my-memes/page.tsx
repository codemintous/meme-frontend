// "use client";

// import React from "react";
// import { Box, Typography } from "@mui/material";
// import MyMemesCard from "@/components/MyMemesCard";
// import { useAuth } from "@/context/AuthContext";

// import ConnectWalletPrompt from "@/components/ConnectWalletPrompt";

// export default function MyMemes() {
//   const { jwtToken } = useAuth();

//   // if (!jwtToken) {
//   //   return (
//   //     <ConnectWalletPrompt/>
//   //   );
//   // }

//   const memes = [
//     {
//       memeId: "1",
//       title: "Miracle Generator",
//       description:
//         "Witness divine coding interventions, last-minute saves, and logic that defies reality. The Miracle G...",
//       image: "/agents/latestmeme1.png",
//     },
//     {
//       memeId: "2",
//       title: "Tom & Jerry",
//       description: "Generate meme",
//       image: "/agents/latestmeme2.png",
//     },
//   ];

//   return (
//     <Box p={4} color="white">
//       <Box display="flex" alignItems="center" gap={1} mb={4}>
//         <Typography variant="h4" fontWeight="bold">
//           My Memes
//         </Typography>
//         <Typography variant="h5" component="span" sx={{ cursor: "pointer" }}>
//           ↻
//         </Typography>
//       </Box>

//       <Box display="flex" flexWrap="wrap" gap={3}>
//         {memes.map((meme) => (
//           <MyMemesCard key={meme.memeId} {...meme} />
//         ))}
//       </Box>
//     </Box>
//   );
// }





"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MyMemesCard from "@/components/MyMemesCard";
import { useAuth } from "@/context/AuthContext";
import ConnectWalletPrompt from "@/components/ConnectWalletPrompt";
import { useAccount } from "wagmi";
import axios from "axios";
import { MemeAgent } from "@/utils/interface";

export default function MyMemes() {
  const { jwtToken } = useAuth();
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();

  useEffect(() => {
    const fetchMemes = async () => {
      if (!address) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes/my`,
          {
            params: { userAddress: address },
            // headers: {
            //   Authorization: `Bearer ${jwtToken}`,
            // },
          }
        );

        setMemes(res.data);
        console.log("my meme list......",res.data);
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, [address, jwtToken]);

  if (!jwtToken) {
    return <ConnectWalletPrompt />;
  }

  return (
    <Box p={4} color="white">
      <Box display="flex" alignItems="center" gap={1} mb={4}>
        <Typography variant="h4" fontWeight="bold">
          My Memes
        </Typography>
        <Typography variant="h5" component="span" sx={{ cursor: "pointer" }}>
          ↻
        </Typography>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : memes.length === 0 ? (
        <Typography>No memes found.</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={3}>
          {memes.map((meme:MemeAgent) => (
            <MyMemesCard key={meme._id} meme= {meme} />
          ))}
        </Box>
      )}
    </Box>
  );
}
