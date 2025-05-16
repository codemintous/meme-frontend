'use client';
 
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia } from 'wagmi/chains';
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi';

const queryClient = new QueryClient();

function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider 
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {props.children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </OnchainKitProvider>
  );
}

export default Providers;