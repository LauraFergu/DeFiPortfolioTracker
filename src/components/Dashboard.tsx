import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { getTotalPortfolioValue, getPositionsByCategory, ProtocolPosition } from '../data/mockData';
import LoadingSpinner from './LoadingSpinner';
import ChainSelector from './ChainSelector';
import TokenDetails from './TokenDetails';
import PortfolioChart from './PortfolioChart';
import YieldOptimizer from './YieldOptimizer';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { isConnected, address } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChains, setSelectedChains] = useState(['ethereum']);
  const [selectedPosition, setSelectedPosition] = useState<ProtocolPosition | null>(null);
  
  const totalValue = getTotalPortfolioValue();
  const lendingPositions = getPositionsByCategory('lending');
  const dexPositions = getPositionsByCategory('dex');
  const stakingPositions = getPositionsByCategory('staking');

  const handleChainToggle = (chainId: string) => {
    setSelectedChains(prev => 
      prev.includes(chainId) 
        ? prev.filter(id => id !== chainId)
        : [...prev, chainId]
    );
  };

  useEffect(() => {
    if (isConnected && address) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConnected, address, selectedChains]);

  if (!isConnected) {
    return (
      <div className="dashboard">
        <div className="connect-prompt">
          <h2>Connect Your Wallet</h2>
          <p>Please connect your wallet to view your DeFi portfolio</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="dashboard">
        <LoadingSpinner size="large" text="Fetching portfolio data..." />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Portfolio Overview</h2>
          <ChainSelector 
            selectedChains={selectedChains} 
            onChainToggle={handleChainToggle} 
          />
        </div>
        <div className="total-value">
          <span className="label">Total Portfolio Value</span>
          <span className="value">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      <PortfolioChart />
      
      <YieldOptimizer />
      
      <div className="portfolio-grid">
        <div className="portfolio-card">
          <h3>Lending Protocols</h3>
          <div className="protocol-list">
            {lendingPositions.map((position) => (
              <div 
                key={position.protocol} 
                className="protocol-item clickable"
                onClick={() => setSelectedPosition(position)}
              >
                <div className="protocol-info">
                  <span className="protocol-name">{position.protocol}</span>
                  <span className="protocol-apy">{position.apy}% APY</span>
                </div>
                <span className="protocol-value">
                  ${position.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="portfolio-card">
          <h3>DEX Liquidity</h3>
          <div className="protocol-list">
            {dexPositions.map((position) => (
              <div 
                key={position.protocol} 
                className="protocol-item clickable"
                onClick={() => setSelectedPosition(position)}
              >
                <div className="protocol-info">
                  <span className="protocol-name">{position.protocol}</span>
                  <span className="protocol-apy">{position.apy}% APY</span>
                </div>
                <span className="protocol-value">
                  ${position.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="portfolio-card">
          <h3>Staking</h3>
          <div className="protocol-list">
            {stakingPositions.map((position) => (
              <div 
                key={position.protocol} 
                className="protocol-item clickable"
                onClick={() => setSelectedPosition(position)}
              >
                <div className="protocol-info">
                  <span className="protocol-name">{position.protocol}</span>
                  <span className="protocol-apy">{position.apy}% APY</span>
                </div>
                <span className="protocol-value">
                  ${position.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedPosition && (
        <TokenDetails 
          position={selectedPosition} 
          onClose={() => setSelectedPosition(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;