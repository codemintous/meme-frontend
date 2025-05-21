
export interface MemeAgent {
    _id: string;
    description: string;
    personality: string;
    creator: string;
    tokenDetails: {
      tokenAddress: string;
      name: string;
      symbol: string;
      description: string;
    };
    profileImageUrl: string;
    coverImageUrl: string;
    likes: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
    name : string;
    category: string;
    agentContractAddress: string;

  }