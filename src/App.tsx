import React from 'react';
import './App.css';
import WalletConnect from './components/WalletConnect';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DeFi Portfolio Tracker</h1>
        <p>Track your decentralized finance investments across multiple protocols</p>
        <WalletConnect />
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;