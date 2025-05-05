"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Link,
  Stack,
  Container,
} from "@mui/material";
import TokenForm from "@/components/TokenForm";
import MemeForm from "@/components/MemeForm";


export default function CreateMeme() {
  const [step, setStep] = useState<"select" | "token" | "meme">("select");

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Create your meme
            </Typography>
            <Typography variant="body1" gutterBottom>
              In this page, you can bring your funniest ideas to life. Ready to
              start creating your own memes?
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 4 }}>
              Tell me a little more, do you have a live token?
            </Typography>

            <Stack spacing={2} mt={3}>
              <Button
                variant="contained"
                onClick={() => setStep("token")}
                sx={{
                  bgcolor: "#875CFF",
                  "&:hover": { bgcolor: "#7a4fff" },
                  textTransform: "none",
                }}
              >
                Yes, I already have a token
              </Button>
              <Button
                variant="contained"
                onClick={() => setStep("meme")}
                sx={{
                  bgcolor: "#e0e0e0",
                  color: "black",
                  "&:hover": { bgcolor: "#d5d5d5" },
                  textTransform: "none",
                }}
              >
                No, I don’t have one
              </Button>
            </Stack>

            <Link
              href="#"
              underline="hover"
              sx={{ mt: 3, display: "block", color: "white" }}
            >
              How it works?
            </Link>
          </Box>
        )}

        {step === "token" && <TokenForm onBack={() => setStep("select")} />}

        {step === "meme" && <MemeForm onBack={() => setStep("select")} />}
      </Container>
    </Box>
  );
}
