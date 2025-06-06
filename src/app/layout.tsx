import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <div className="flex">
          <div className="w-[280px] flex-none">
            <Sidebar />
          </div>
          <main className="flex-1 min-h-screen bg-black overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}