import React from 'react';
import { useWallet } from '../hooks/useWallet';
import './WalletConnect.css';

const WalletConnect: React.FC = () => {
  const { address, isConnected, isLoading, error, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <button 
          className="connect-button"
          onClick={connectWallet}
          disabled={isLoading}
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="wallet-info">
          <span className="wallet-address">{formatAddress(address!)}</span>
          <button className="disconnect-button" onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default WalletConnect;