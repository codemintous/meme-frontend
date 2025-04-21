import Link from "next/link";

interface TrendingAgent {
  name: string;
  category: string;
  chain: string;
  id: string;
  image: string;
  description: string;
}

interface TrendingAgentCardProps {
  agent: TrendingAgent;
}

export default function TrendingAgentCard({ agent }: TrendingAgentCardProps) {
  return (
    <div 
      className="h-[419px] w-[180px] flex-shrink-0 flex flex-col gap-2 rounded-lg bg-zinc-900 border border-zinc-700/50 shadow-zinc-50 overflow-hidden hover:border-zinc-50 hover:shadow-[0px_0px_18px_0px_#FFFFFF80] transition-colors duration-500 ease-in-out"
      style={{
        backgroundImage: `url(${agent.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Top gradient overlay with header content */}
      <div className="w-full bg-gradient-to-b from-black to-black/0 px-4 pt-3.5 flex items-start justify-between h-20">
        <div className="flex flex-col items-start">
          <p className="text-zinc-50 text-sm leading-6 font-medium uppercase h-6">
            {agent.chain}
          </p>
        </div>
        <div>
          <button className="whitespace-nowrap rounded-md text-sm md:text-base font-medium transition-all duration-300 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border-none bg-transparent shadow-sm text-foreground hover:text-accent-foreground focus-visible:ring-0 flex items-center justify-center gap-2 p-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart transition-all duration-300 w-6 h-6 text-zinc-50 hover:text-violet-500">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Middle section - clickable area */}
      <Link href={`/agent/${agent.id}`} className="w-full flex-1" />

      {/* Bottom gradient overlay with content */}
      <Link href={`/agent/${agent.id}`}>
        <div className="w-full flex-1 flex flex-col gap-2 px-4 py-2.5 bg-gradient-to-t from-black via-zinc-900 to-transparent">
          <div className="flex flex-col items-start">
            <h2 className="text-zinc-50 text-sm leading-6 font-medium">
              {agent.name}
            </h2>
            <h3 className="text-zinc-400 text-sm leading-5 font-semibold capitalize">
              {agent.category}
            </h3>
          </div>
          <div className="h-15">
          <p className="text-zinc-50 text-xs leading-5 font-medium text-wrap">
              {agent.description.length > 55 
                ? `${agent.description.slice(0, 55)}...`
                : agent.description
              }
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
} 