export interface ProtocolPosition {
  protocol: string;
  category: 'lending' | 'dex' | 'staking';
  balance: number;
  value: number;
  apy: number;
  tokens: {
    symbol: string;
    amount: number;
    price: number;
  }[];
}

export const mockPositions: ProtocolPosition[] = [
  {
    protocol: 'Compound',
    category: 'lending',
    balance: 1250.45,
    value: 1250.45,
    apy: 4.2,
    tokens: [
      { symbol: 'cUSDC', amount: 500.25, price: 1.02 },
      { symbol: 'cETH', amount: 0.35, price: 2142.86 }
    ]
  },
  {
    protocol: 'Aave',
    category: 'lending',
    balance: 890.32,
    value: 890.32,
    apy: 3.8,
    tokens: [
      { symbol: 'aDAI', amount: 600.12, price: 1.00 },
      { symbol: 'aUSDT', amount: 290.20, price: 1.00 }
    ]
  },
  {
    protocol: 'Uniswap V3',
    category: 'dex',
    balance: 2105.67,
    value: 2105.67,
    apy: 12.5,
    tokens: [
      { symbol: 'ETH', amount: 0.8, price: 1950.45 },
      { symbol: 'USDC', amount: 545.22, price: 1.00 }
    ]
  },
  {
    protocol: 'SushiSwap',
    category: 'dex',
    balance: 756.89,
    value: 756.89,
    apy: 8.7,
    tokens: [
      { symbol: 'SUSHI', amount: 125.45, price: 3.02 },
      { symbol: 'WETH', amount: 0.18, price: 1948.22 }
    ]
  },
  {
    protocol: 'Lido',
    category: 'staking',
    balance: 3890.45,
    value: 3890.45,
    apy: 5.2,
    tokens: [
      { symbol: 'stETH', amount: 2.0, price: 1945.23 }
    ]
  }
];

export const getTotalPortfolioValue = (): number => {
  return mockPositions.reduce((total, position) => total + position.value, 0);
};

export const getPositionsByCategory = (category: string) => {
  return mockPositions.filter(position => position.category === category);
};