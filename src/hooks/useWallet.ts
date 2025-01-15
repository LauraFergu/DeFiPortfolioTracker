import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    isLoading: false,
    error: null
  });

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setWallet(prev => ({ ...prev, error: 'MetaMask is not installed' }));
      return;
    }

    setWallet(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        setWallet({
          address: accounts[0],
          isConnected: true,
          isLoading: false,
          error: null
        });
      }
    } catch (error: any) {
      setWallet(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to connect wallet'
      }));
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnected: false,
      isLoading: false,
      error: null
    });
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWallet(prev => ({ ...prev, address: accounts[0] }));
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return {
    ...wallet,
    connectWallet,
    disconnectWallet
  };
};