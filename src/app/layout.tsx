import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Box, CssBaseline } from "@mui/material";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyMemes - Create and Share Memes",
  description: "A platform for creating and sharing memes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ backgroundColor: "#000", color: "#fff" }}
      >
        <CssBaseline />
        <Box display="flex" minHeight="100vh">
          <Box width="280px" flexShrink={0}>
            <Sidebar />
          </Box>
          <Box flexGrow={1} overflow="auto">
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
