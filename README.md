# 🧠 Meme Minto AI

Meme Minto AI is the world's first AI-powered meme ecosystem that transforms memes into interactive agents, tradable meme coins, and generative art — all on-chain.

This project is built for the next generation of internet culture, combining AI, tokenization, and community governance in a fun, gasless, and creator-owned platform.

---


## OnchainKit and Paymaster Integration

### OnchainKit Integration
1. **Provider Setup** (`src/provider/providers.tsx`):
```typescript
<OnchainKitProvider 
  apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
  chain={baseSepolia}
>
```

2. **Transaction Components** (`src/components/TradeForm.tsx`):
```typescript
<Transaction
  contracts={contracts}
  className="w-full"
  chainId={84532}
  onError={handleError}
  onSuccess={handleSuccess}
  isSponsored={true}
>
  <TransactionButton />
  <TransactionStatus>
    <TransactionStatusLabel />
    <TransactionStatusAction />
  </TransactionStatus>
</Transaction>
```

3. **Wallet Integration** (`src/components/WalletButton.tsx`):
```typescript
import { Wallet } from '@coinbase/onchainkit/wallet';
```

### Paymaster Integration
1. **Paymaster Utilities** (`src/utils/paymasterUtils.ts`):
```typescript
export const createPaymasterProvider = async () => {
  // Creates a provider with paymaster support
  // Handles Coinbase Wallet integration
}

export const createPaymasterContract = async (
  contractAddress: string,
  contractAbi: any
) => {
  // Creates a contract with paymaster support
}

export const executePaymasterTransaction = async (
  contract: Contract,
  method: string,
  args: any[] = [],
  options: any = {}
) => {
  // Executes transactions with paymaster support
}
```

2. **Transaction Implementation** (`src/app/[agentId]/page.tsx`):
```typescript
const handleDonate = async () => {
  const { createPaymasterContract, executePaymasterTransaction } = await import('@/utils/paymasterUtils');
  const contract = await createPaymasterContract(
    memeDetail.agentContractAddress,
    agent_token_abi
  );
  const receipt = await executePaymasterTransaction(
    contract,
    'mint',
    [],
    { value: valueInWei }
  );
}
```

### Dependencies
The project uses the following key packages for onchainkit and paymaster integration:
- `@coinbase/onchainkit`: ^0.38.10
- `ethers`: ^6.14.0
- `wagmi`: ^2.15.3
- `viem`: ^2.29.4

### Key Features
1. **Sponsored Transactions**: All transactions are sponsored using `isSponsored={true}`
2. **Base Sepolia Chain**: The application runs on Base Sepolia testnet (chainId: 84532)
3. **Coinbase Wallet Integration**: Primary wallet integration with fallback support
4. **Transaction Status Tracking**: Built-in transaction status monitoring and error handling
