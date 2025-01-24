import React, { useState } from 'react';
import { ProtocolPosition } from '../data/mockData';
import './TokenDetails.css';

interface TokenDetailsProps {
  position: ProtocolPosition;
  onClose: () => void;
}

const TokenDetails: React.FC<TokenDetailsProps> = ({ position, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens'>('overview');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="token-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{position.protocol} Details</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === 'tokens' ? 'active' : ''}`}
            onClick={() => setActiveTab('tokens')}
          >
            Token Breakdown
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="detail-card">
                <div className="detail-header">
                  <h3>Position Summary</h3>
                  <span className="category-badge">{position.category}</span>
                </div>
                <div className="detail-stats">
                  <div className="stat-item">
                    <span className="stat-label">Total Value</span>
                    <span className="stat-value">
                      ${position.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Current APY</span>
                    <span className="stat-value apy">{position.apy}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Protocol</span>
                    <span className="stat-value">{position.protocol}</span>
                  </div>
                </div>
              </div>

              <div className="performance-card">
                <h3>Performance Metrics</h3>
                <div className="metrics-grid">
                  <div className="metric">
                    <span className="metric-label">24h Change</span>
                    <span className="metric-value positive">+2.34%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">7d Change</span>
                    <span className="metric-value positive">+8.91%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">30d Change</span>
                    <span className="metric-value negative">-1.23%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Total Earned</span>
                    <span className="metric-value">$45.67</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="tokens-tab">
              <h3>Token Composition</h3>
              <div className="token-list">
                {position.tokens.map((token, index) => (
                  <div key={index} className="token-item">
                    <div className="token-info">
                      <span className="token-symbol">{token.symbol}</span>
                      <span className="token-amount">
                        {token.amount.toLocaleString('en-US', { 
                          minimumFractionDigits: token.amount < 1 ? 6 : 2,
                          maximumFractionDigits: token.amount < 1 ? 6 : 2 
                        })}
                      </span>
                    </div>
                    <div className="token-value">
                      <span className="token-price">
                        ${token.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="token-total">
                        ${(token.amount * token.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;