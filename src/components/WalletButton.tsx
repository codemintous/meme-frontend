// components/WalletButton.tsx
"use client";

import { Wallet } from '@coinbase/onchainkit/wallet';
import { useWalletAuth } from '@/hooks/useWalletAuth';

const WalletButton = () => {
  useWalletAuth(); // triggers auth logic when wallet is connected

  return <Wallet />;
};

export default WalletButton;
