import { Box, Card } from "@mui/material";
import TradeForm from "@/components/TradeForm"; // Adjust import path if needed

interface Token {
  name: string;
  symbol: string;
  chain: string;
  marketCap: string;
  lastHour: string;
  image: string;
  price: number;
}
interface TokenChartTradeSectionProps {
  token: Token;
}

export default function TokenChartTradeSection({ token }: TokenChartTradeSectionProps) {
  const handleTradeSubmit = (
    mode: "buy" | "sell",
    amount: number,
    slippage: number
  ) => {
    console.log(`User wants to ${mode}:`, { amount, slippage });
    // Handle buy/sell logic here
  };

  return (
    <Box my={4}>
      <Card
        sx={{
          backgroundColor: "#1f1f1f",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          color: "white",
          p: 3,
        }}
      >
        {/* Chart */}
        <Box flex={{ xs: "1 1 100%", md: "1 1 70%" }} sx={{ border: "1px solid #333", borderRadius: 2, overflow: "hidden" }}>
          <iframe
            src={`https://dexscreener.com/solana/DHkguUzSuKRAZQTQ394tfQpa8CqrFoKSGggBr7XsawJr?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15`}
            style={{ width: "100%", height: "400px", border: "none" }}
            title={`${token.name} Chart`}
          />
        </Box>

        {/* Trade Form */}
        <Box flex={{ xs: "1 1 100%", md: "1 1 30%" }}>
          <TradeForm
            tokenName={token.name}
            tokenSymbol={token.symbol}
            chain={token.chain}
            price={token.price}
            marketCap={token.marketCap}
            onSubmit={handleTradeSubmit}
          />
        </Box>
      </Card>
    </Box>
  );
}
