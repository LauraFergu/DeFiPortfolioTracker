import React, { useState } from 'react';
import './ChainSelector.css';

interface Chain {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const SUPPORTED_CHAINS: Chain[] = [
  { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: '#627eea' },
  { id: 'polygon', name: 'Polygon', icon: '⬟', color: '#8247e5' },
  { id: 'bsc', name: 'BSC', icon: '●', color: '#f3ba2f' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '◆', color: '#28a0f0' },
];

interface ChainSelectorProps {
  selectedChains: string[];
  onChainToggle: (chainId: string) => void;
}

const ChainSelector: React.FC<ChainSelectorProps> = ({ selectedChains, onChainToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chain-selector">
      <button 
        className="chain-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Networks ({selectedChains.length})</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="chain-dropdown">
          {SUPPORTED_CHAINS.map((chain) => (
            <label key={chain.id} className="chain-option">
              <input
                type="checkbox"
                checked={selectedChains.includes(chain.id)}
                onChange={() => onChainToggle(chain.id)}
              />
              <span className="chain-info">
                <span 
                  className="chain-icon" 
                  style={{ color: chain.color }}
                >
                  {chain.icon}
                </span>
                <span className="chain-name">{chain.name}</span>
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChainSelector;