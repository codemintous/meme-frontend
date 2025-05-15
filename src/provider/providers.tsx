'use client';
 
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia  } from 'wagmi/chains'; // add baseSepolia for testing 
import { WagmiProvider } from 'wagmi'
import { config } from './wagmi'

 
function Providers(props: { children: ReactNode }) {
  return (
  

    <OnchainKitProvider
  apiKey={process.env.ONCHAINKIT_API_KEY}
  chain={baseSepolia}
  config={{
    appearance: {
      name: 'Your App Name',
      logo: 'https://your-logo.com',
      mode: 'auto',
      theme: 'default',
    },
    wallet: {
      display: 'modal',
      termsUrl: 'https://...',
      privacyUrl: 'https://...',
      supportedWallets: { 
        // rabby: true, 
        // trust: true, 
        // frame: true, 
      }, 
    },
  }}
>  <WagmiProvider config={config}>
      {props.children}
      </WagmiProvider>
    </OnchainKitProvider>
   
  );
}

export default Providers