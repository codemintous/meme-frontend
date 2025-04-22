"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import TokenForm from "@/components/TokenForm";
import { useRouter } from "next/navigation";

export default function TokenInfo() {
  const [step, setStep] = useState<"select" | "token" | "meme">("select");
  const router = useRouter();

  return (
    <Box
      sx={{
       
        backgroundColor: "#0f0f0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        {step === "select" && (
          <Box textAlign="center">
            <LanguageIcon sx={{ fontSize: 48, color: "white", mb: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              You don’t have a token yet
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 4, color: "#ccc" }}>
              Create your token now with MyMemes, or register an existing one
            </Typography>

            <Stack spacing={2} alignItems="center">
              <Button
                variant="contained"
                fullWidth
                onClick={() => router.push(`/launchtoken`)}
                sx={{
                  bgcolor: "#875CFF",
                  "&:hover": { bgcolor: "#7a4fff" },
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "16px",
                  py: 1.5,
                  borderRadius: "8px",
                }}
            
              >
                Create my token
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => setStep("token")}
                sx={{
                  color: "white",
                  borderColor: "#ffffff33",
                  "&:hover": {
                    backgroundColor: "#1a1a1a",
                    borderColor: "#ffffff55",
                  },
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "16px",
                  py: 1.5,
                  borderRadius: "8px",
                }}
              >
                Register Existing Token
              </Button>
            </Stack>
          </Box>
        )}

        {step === "token" && <TokenForm onBack={() => setStep("select")} />}
      </Container>
    </Box>
  );
}
