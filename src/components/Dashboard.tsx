import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { getTotalPortfolioValue, getPositionsByCategory } from '../data/mockData';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { isConnected, address } = useWallet();
  
  const totalValue = getTotalPortfolioValue();
  const lendingPositions = getPositionsByCategory('lending');
  const dexPositions = getPositionsByCategory('dex');
  const stakingPositions = getPositionsByCategory('staking');

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

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Portfolio Overview</h2>
        <div className="total-value">
          <span className="label">Total Portfolio Value</span>
          <span className="value">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
      
      <div className="portfolio-grid">
        <div className="portfolio-card">
          <h3>Lending Protocols</h3>
          <div className="protocol-list">
            {lendingPositions.map((position) => (
              <div key={position.protocol} className="protocol-item">
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
              <div key={position.protocol} className="protocol-item">
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
              <div key={position.protocol} className="protocol-item">
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
    </div>
  );
};

export default Dashboard;