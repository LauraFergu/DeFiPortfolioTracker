import React, { useState } from 'react';
import './YieldOptimizer.css';

interface OptimizationSuggestion {
  id: string;
  type: 'move' | 'stake' | 'provide_liquidity';
  title: string;
  description: string;
  currentAPY: number;
  suggestedAPY: number;
  estimatedGain: number;
  riskLevel: 'low' | 'medium' | 'high';
  protocol: string;
}

const mockSuggestions: OptimizationSuggestion[] = [
  {
    id: '1',
    type: 'move',
    title: 'Move USDC to Aave',
    description: 'Move your USDC from Compound to Aave for higher yield',
    currentAPY: 4.2,
    suggestedAPY: 5.8,
    estimatedGain: 45.67,
    riskLevel: 'low',
    protocol: 'Aave'
  },
  {
    id: '2',
    type: 'provide_liquidity',
    title: 'Add ETH/USDC LP',
    description: 'Provide liquidity to ETH/USDC pool on Uniswap V3',
    currentAPY: 0,
    suggestedAPY: 15.3,
    estimatedGain: 234.5,
    riskLevel: 'medium',
    protocol: 'Uniswap V3'
  },
  {
    id: '3',
    type: 'stake',
    title: 'Stake ETH with Lido',
    description: 'Stake idle ETH to earn staking rewards while maintaining liquidity',
    currentAPY: 0,
    suggestedAPY: 5.2,
    estimatedGain: 89.12,
    riskLevel: 'low',
    protocol: 'Lido'
  }
];

const YieldOptimizer: React.FC = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'high': return '#f44336';
      default: return '#ffffff';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'move': return '↗️';
      case 'stake': return '🥩';
      case 'provide_liquidity': return '💧';
      default: return '💡';
    }
  };

  return (
    <div className="yield-optimizer">
      <div className="optimizer-header">
        <h3>Yield Optimization Suggestions</h3>
        <span className="suggestions-count">{mockSuggestions.length} opportunities</span>
      </div>

      <div className="suggestions-list">
        {mockSuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`suggestion-card ${selectedSuggestion === suggestion.id ? 'selected' : ''}`}
            onClick={() => setSelectedSuggestion(
              selectedSuggestion === suggestion.id ? null : suggestion.id
            )}
          >
            <div className="suggestion-main">
              <div className="suggestion-icon">
                {getTypeIcon(suggestion.type)}
              </div>
              <div className="suggestion-content">
                <div className="suggestion-header-row">
                  <h4>{suggestion.title}</h4>
                  <div className="apy-comparison">
                    {suggestion.currentAPY > 0 && (
                      <span className="current-apy">{suggestion.currentAPY}%</span>
                    )}
                    <span className="arrow">→</span>
                    <span className="suggested-apy">{suggestion.suggestedAPY}%</span>
                  </div>
                </div>
                <p className="suggestion-description">{suggestion.description}</p>
                <div className="suggestion-meta">
                  <span 
                    className="risk-badge"
                    style={{ backgroundColor: getRiskColor(suggestion.riskLevel) }}
                  >
                    {suggestion.riskLevel} risk
                  </span>
                  <span className="protocol-name">{suggestion.protocol}</span>
                  <span className="estimated-gain">
                    +${suggestion.estimatedGain}/month
                  </span>
                </div>
              </div>
            </div>
            
            {selectedSuggestion === suggestion.id && (
              <div className="suggestion-details">
                <div className="details-row">
                  <div className="detail-item">
                    <span className="detail-label">Estimated Annual Gain</span>
                    <span className="detail-value">
                      ${(suggestion.estimatedGain * 12).toFixed(2)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Gas Costs</span>
                    <span className="detail-value">~$15-25</span>
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="learn-more-btn">Learn More</button>
                  <button className="execute-btn">Execute Strategy</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="optimizer-footer">
        <p className="disclaimer">
          ⚠️ Yield optimization involves risks. Always research protocols and consider gas costs before moving funds.
        </p>
      </div>
    </div>
  );
};

export default YieldOptimizer;