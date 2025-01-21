# DeFi Portfolio Tracker

A decentralized finance (DeFi) portfolio tracker that helps you monitor your investments across multiple protocols and blockchains.

## Features

- 🔗 **Wallet Connection**: Connect your MetaMask wallet
- 📊 **Portfolio Overview**: View total portfolio value and breakdown by protocol type
- 🌐 **Multi-Chain Support**: Track assets across Ethereum, Polygon, BSC, and Arbitrum
- 💰 **Protocol Integration**: Monitor positions in lending protocols (Compound, Aave), DEX liquidity (Uniswap, SushiSwap), and staking platforms
- 📱 **Mobile Responsive**: Optimized for both desktop and mobile devices
- ⚡ **Real-time Data**: Live portfolio updates and APY tracking

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Web3 Integration**: Ethers.js v6
- **Styling**: Custom CSS with modern gradients and animations
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- MetaMask browser extension

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LauraFergu/DeFiPortfolioTracker.git
cd DeFiPortfolioTracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your MetaMask wallet
2. **Select Networks**: Use the network selector to choose which blockchains to track
3. **View Portfolio**: Your portfolio will automatically load showing positions across different protocols
4. **Monitor Performance**: Track APY rates and total values for each position

## Project Structure

```
src/
├── components/          # React components
│   ├── WalletConnect/  # Wallet connection component
│   ├── Dashboard/      # Main portfolio dashboard
│   ├── ChainSelector/  # Network selection component
│   └── LoadingSpinner/ # Loading state component
├── hooks/              # Custom React hooks
│   └── useWallet/     # Wallet connection logic
├── data/              # Mock data and utilities
└── types/             # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

- [ ] Real API integration with DeFi protocols
- [ ] Historical portfolio performance charts
- [ ] Transaction history tracking
- [ ] Yield farming opportunity scanner
- [ ] Portfolio export functionality
- [ ] Price alerts and notifications

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This tool is for informational purposes only. Always verify your actual positions directly with the respective DeFi protocols. The developers are not responsible for any financial decisions made based on this application.