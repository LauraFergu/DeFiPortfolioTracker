export interface PortfolioHistoryPoint {
  timestamp: number;
  totalValue: number;
  date: string;
}

export interface ProtocolHistory {
  protocol: string;
  history: PortfolioHistoryPoint[];
}

const generateRandomHistory = (startValue: number, days: number): PortfolioHistoryPoint[] => {
  const history: PortfolioHistoryPoint[] = [];
  let currentValue = startValue;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const volatility = 0.02 + Math.random() * 0.03;
    const change = (Math.random() - 0.5) * volatility;
    currentValue *= (1 + change);
    
    history.push({
      timestamp: date.getTime(),
      totalValue: Math.max(0, currentValue),
      date: date.toISOString().split('T')[0]
    });
  }
  
  return history;
};

export const portfolioHistory: PortfolioHistoryPoint[] = generateRandomHistory(8500, 30);

export const protocolHistories: ProtocolHistory[] = [
  {
    protocol: 'Compound',
    history: generateRandomHistory(1250, 30)
  },
  {
    protocol: 'Aave', 
    history: generateRandomHistory(890, 30)
  },
  {
    protocol: 'Uniswap V3',
    history: generateRandomHistory(2105, 30)
  },
  {
    protocol: 'SushiSwap',
    history: generateRandomHistory(756, 30)
  },
  {
    protocol: 'Lido',
    history: generateRandomHistory(3890, 30)
  }
];

export const getPortfolioPerformance = () => {
  const latest = portfolioHistory[portfolioHistory.length - 1];
  const dayAgo = portfolioHistory[portfolioHistory.length - 2];
  const weekAgo = portfolioHistory[Math.max(0, portfolioHistory.length - 8)];
  const monthAgo = portfolioHistory[0];

  return {
    current: latest.totalValue,
    dayChange: dayAgo ? ((latest.totalValue - dayAgo.totalValue) / dayAgo.totalValue) * 100 : 0,
    weekChange: weekAgo ? ((latest.totalValue - weekAgo.totalValue) / weekAgo.totalValue) * 100 : 0,
    monthChange: monthAgo ? ((latest.totalValue - monthAgo.totalValue) / monthAgo.totalValue) * 100 : 0,
  };
};

export const getProtocolHistory = (protocolName: string): PortfolioHistoryPoint[] => {
  const protocol = protocolHistories.find(p => p.protocol === protocolName);
  return protocol ? protocol.history : [];
};