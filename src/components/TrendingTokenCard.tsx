import Image from "next/image";

interface TrendingToken {
  name: string;
  symbol: string;
  chain: string;
  marketCap: string;
  lastHour: string;
  image: string;
}

interface TrendingTokenCardProps {
  token: TrendingToken;
}

export default function TrendingTokenCard({ token }: TrendingTokenCardProps) {
  return (
    <div 
      className="bg-zinc-900 border border-zinc-700/50 overflow-hidden 
        hover:border-zinc-50 hover:shadow-[0px_0px_18px_0px_#FFFFFF40] 
        transition-all duration-500 ease-in-out rounded-xl p-4 w-[280px] flex-shrink-0"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 relative rounded-full overflow-hidden">
          <Image
            src={token.image}
            alt={token.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold">{token.name}</h3>
          <p className="text-sm text-gray-400">{token.symbol} / {token.chain}</p>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <p className="text-gray-400">Market Cap:</p>
          <p className="font-medium">${token.marketCap}</p>
        </div>
        <div>
          <p className="text-gray-400">Last Hour:</p>
          <p className={`font-medium ${token.lastHour.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
            {token.lastHour !== '-' ? `${token.lastHour}%` : '-'}
          </p>
        </div>
      </div>
    </div>
  );
} 