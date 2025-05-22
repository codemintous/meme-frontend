import { Box, Card, Typography } from "@mui/material";
import TradeForm from "@/components/TradeForm"; // Adjust import path if needed
import { MemeAgent } from "@/utils/interface";
import { isValidTokenAddress } from "@/utils/tokenUtils";

interface TokenChartTradeSectionProps {
  token: MemeAgent;
}

export default function TokenChartTradeSection({ token }: TokenChartTradeSectionProps) {
  console.log('TokenChartTradeSection token:', token);
  console.log('Token address:', token.tokenDetails?.tokenAddress);
  
  // Check if the token address is valid
  const hasValidTokenAddress = isValidTokenAddress(token.tokenDetails?.tokenAddress);
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
          {hasValidTokenAddress ? (
            <iframe
              src={`https://dexscreener.com/base/0x0fb597d6cfe5be0d5258a7f017599c2a4ece34c7?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15`}
              style={{ width: "100%", height: "500px", border: "none" }}
              title={`${token.tokenDetails?.name} Chart`}
            />
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
              <Typography variant="h6" color="text.secondary">
                Chart not available - Token has not been launched yet
              </Typography>
            </Box>
          )}
        </Box>

        {/* Trade Form */}
        <Box flex={{ xs: "1 1 100%", md: "1 1 30%" }}>
          {hasValidTokenAddress ? (
            <TradeForm
              tokenName={token.tokenDetails?.name}
              tokenSymbol={token.tokenDetails?.symbol}
              chain="base"
              price={0}
              marketCap={`0`}
              tokenAddress={token.tokenDetails?.tokenAddress}
              onSubmit={handleTradeSubmit}
            />
          ) : (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="400px" p={3}>
              <Typography variant="h6" color="error" gutterBottom>
                Trading Not Available
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                This token does not have a valid contract address yet. It may not have been launched.
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
}
