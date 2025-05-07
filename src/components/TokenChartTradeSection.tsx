import { Box, Card, Typography, TextField, Button, Tabs, Tab } from "@mui/material";
import { useState } from "react";

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
    // const isNegative = token.lastHour?.startsWith("-");
    const [mode, setMode] = useState<"buy" | "sell">("buy");

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
                {/* Chart Section - 70% */}
                <Box flex={{ xs: "1 1 100%", md: "1 1 70%" }} sx={{ border: "1px solid #333", borderRadius: 2, overflow: "hidden" }}>
                    <iframe
                        src={`https://dexscreener.com/solana/DHkguUzSuKRAZQTQ394tfQpa8CqrFoKSGggBr7XsawJr?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15`}
                        style={{ width: "100%", height: "400px", border: "none" }}
                        title={`${token.name} Chart`}
                    />
                </Box>

                {/* Buy/Sell Form - 30% */}
                <Box flex={{ xs: "1 1 100%", md: "1 1 30%" }} display="flex" flexDirection="column" gap={2}>
                    {/* Token Info */}


                    <Box>
                        <Typography variant="h6" fontWeight="bold">{token.name}</Typography>
                        <Typography variant="body2" color="gray">
                            {token.symbol} / {token.chain}
                        </Typography>
                      

                    </Box>
                    <Box display="flex" gap={2}>
                        <Box
                            flex={1}
                            sx={{
                                backgroundColor: "#141414",
                                px: 1.5,
                                borderRadius: 1,
                                border: "1px solid #333",
                            }}
                        >
                            <Typography variant="caption" color="gray">
                                Price:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {token.price || "0.000000"}
                            </Typography>
                        </Box>

                        <Box
                            flex={1}
                            sx={{
                                backgroundColor: "#141414",
                                px: 1.5,
                                borderRadius: 1,
                                border: "1px solid #333",
                            }}
                        >
                            <Typography variant="caption" color="gray">
                                Market Cap:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {token.marketCap || "—"}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Tabs for Buy/Sell */}
                    <Tabs
                        value={mode}
                        onChange={(e, newValue) => setMode(newValue)}
                        textColor="inherit"
                        indicatorColor="secondary"
                    
                    >
                        <Tab value="buy" label="Buy" />
                        <Tab value="sell" label="Sell" />
                    </Tabs>

                    {/* Form Fields */}
                    <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        label="Amount"
                        InputProps={{ sx: { color: "white" } }}
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{ backgroundColor: "#2b2b2b", borderRadius: 1 }}
                    />
                    <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        label="Slippage %"
                        InputProps={{ sx: { color: "white" } }}
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{ backgroundColor: "#2b2b2b", borderRadius: 1 }}
                    />

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        color={mode === "buy" ? "secondary" : "error"}
                        fullWidth
                        sx={{ mt: "auto" }}
                    >
                        {mode === "buy" ? "Buy" : "Sell"}
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}
