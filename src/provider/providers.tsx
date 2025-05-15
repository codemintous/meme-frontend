'use client';
 
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia } from 'wagmi/chains';
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi';

function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_CDP_API_KEY}
      chain={baseSepolia}
      config={{
        appearance: {
          name: 'Meme Frontend',
          mode: 'auto',
          theme: 'default',
        },
        wallet: {
          display: 'modal',
        },
        paymaster: process.env.NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT
      }}
    >
      <WagmiProvider config={config}>
        {props.children}
      </WagmiProvider>
    </OnchainKitProvider>
  );
}

export default Providers;