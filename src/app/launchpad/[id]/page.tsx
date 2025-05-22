"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MemeAgent } from "@/utils/interface";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
} from "@mui/material";
import TokenChartTradeSection from "@/components/TokenChartTradeSection";
import { createPublicClient, http, parseAbiItem } from "viem";
import { baseSepolia } from "viem/chains";

type TransferEvent = {
    from: string;
    to: string;
    value: string;
    txHash: string;
  };
  

export default function TokenDetailPage() {
  const [memeDetail, setMemeDetail] = useState<MemeAgent | null>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [recentTransfers, setRecentTransfers] = useState<TransferEvent[]>([]);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/memes/${id}`
        );
        setMemeDetail(response.data);
      } catch (error) {
        console.error("Error fetching meme agent:", error);
      }
    };

    if (id) {
      fetchMemes();
    }
  }, [id]);

  useEffect(() => {
    const fetchRecentTransfers = async (tokenAddress: `0x${string}`) => {
      const client = createPublicClient({
        chain: baseSepolia,
        transport: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL!),
      });

      try {
        const logs = await client.getLogs({
          address: tokenAddress,
          event: parseAbiItem(
            "event Transfer(address indexed from, address indexed to, uint256 value)"
          ),
          fromBlock: "earliest", // You can change this to a specific recent block
          toBlock: "latest",
        });

        const transfers = logs.map((log) => ({
            from: log.args?.from ?? "",
            to: log.args?.to ?? "",
            value: log.args?.value?.toString() ?? "",
            txHash: log.transactionHash,
          }));

        console.log(transfers.reverse().slice(0, 10))

        setRecentTransfers(transfers.reverse().slice(0, 10)); // latest 10
      } catch (err) {
        console.error("Error fetching recent transfers:", err);
      }
    };

    const tokenAddress = memeDetail?.tokenDetails?.tokenAddress;
    if (tokenAddress) {
      fetchRecentTransfers(tokenAddress as `0x${string}`);
    }
  }, [memeDetail]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {memeDetail && <TokenChartTradeSection token={memeDetail} />}

      <Card
        sx={{
          mt: 5,
          p: 3,
          backgroundColor: "#1f1f1f",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab
            label="Recent Trades"
            sx={{
              color: tabIndex === 0 ? "secondary.main" : "white",
            }}
          />
          <Tab
            label="Holders"
            sx={{
              color: tabIndex === 1 ? "secondary.main" : "white",
            }}
          />
        </Tabs>

        {tabIndex === 0 && (
          <Box
            mt={3}
            sx={{ overflowX: "auto", maxHeight: 400, overflowY: "auto" }}
          >
            <Table
              size="small"
              sx={{
                "& th, & td": {
                  color: "white",
                  borderColor: "#333",
                },
                minWidth: 800,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Txn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentTransfers.map((tx, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{tx.from?.slice(0, 6)}...{tx.from?.slice(-4)}</TableCell>
                    <TableCell>{tx.to?.slice(0, 6)}...{tx.to?.slice(-4)}</TableCell>
                    <TableCell>{Number(tx.value) / 1e18}</TableCell>
                    <TableCell>
                      <a
                        href={`https://sepolia.basescan.org/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        🔗
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box mt={3} sx={{ color: "white" }}>
            <Typography variant="body2">
              Holders tab content coming soon...
            </Typography>
          </Box>
        )}
      </Card>
    </Container>
  );
}
