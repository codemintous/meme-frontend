import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

// ✅ Coinbase Wallet Connector (no projectId here)
export const cbWalletConnector = coinbaseWallet({
  appName: "Meme Frontend",
});

// ✅ WalletConnect Connector (requires projectId and metadata)
export const wcConnector = walletConnect({
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!, // Make sure this is defined in .env
  metadata: {
    name: "Meme Frontend",
    description: "Mint memes and more",
    url: "",
    icons: []
  },
});

export const config = createConfig({
  chains: [baseSepolia],
  multiInjectedProviderDiscovery: false,
  connectors: [cbWalletConnector, wcConnector], // include both connectors
  ssr: true,
  transports: {
    [baseSepolia.id]: http(), // or pass an RPC URL: http("https://rpc.url")
  },
});

// ✅ Wagmi TypeScript Support
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
