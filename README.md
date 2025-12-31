# Aether Loot

A decentralized artifact vault and lootbox protocol built on Ethereum. Aether Loot provides a transparent, provably fair system for randomized item distribution where drop rates are immutable and every roll is verifiable on-chain.

## Features

- **Provably Fair RNG**: Every roll uses on-chain VRF (Verifiable Random Function), ensuring developers cannot tamper with outcomes
- **Immutable Drop Rates**: Drop rates are hard-coded into the smart contract and cannot be changed without a visible, public transaction
- **Instant Interoperability**: All looted items are standard ERC-721 NFTs that can be traded on marketplaces or used in other dApps
- **Absolute Ownership**: Items live in your wallet, protected by your private keys - not on centralized servers
- **Secondary Market Liquidity**: Rare drops are liquid assets that can be instantly swapped
- **Provable History**: Every mint generates a permanent blockchain record preserving rarity and historical data

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Blockchain**: Ethers.js v6
- **Network**: Sepolia Testnet
- **Encryption**: Zama FHE (Fully Homomorphic Encryption) Relayer SDK
- **Smart Contract**: Deployed at `0x0842A24806Deb96c70576e2b380042042c009F83`

## Project Structure

```
aether-loot/
├── components/          # Reusable UI components
│   ├── Footer.tsx
│   ├── InventoryView.tsx
│   ├── ItemDisplay.tsx
│   └── Navbar.tsx
├── hooks/              # Custom React hooks
│   ├── useLootContract.ts  # Smart contract interactions
│   └── useWeb3.ts          # Web3 wallet connection
├── views/              # Main application views
│   ├── LandingView.tsx     # Landing page
│   ├── UserView.tsx        # User portal for buying/looting
│   └── DeveloperView.tsx  # Developer portal for creating tiers/blueprints
├── constants.tsx       # Application constants and catalog
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH for transactions

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd aether-loot
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### User Portal

1. Connect your Web3 wallet (MetaMask recommended)
2. Navigate to the User Portal
3. Buy tickets using the displayed ticket price
4. Use your tickets to loot items - each loot roll uses on-chain randomness
5. View your inventory of looted items

### Developer Portal

1. Connect your Web3 wallet
2. Navigate to the Developer Portal
3. Create tiers with custom rarity and modulo targets
4. Create blueprints for items within tiers with max supply limits

## Smart Contract

The smart contract is deployed on Sepolia testnet at:

```
0x0842A24806Deb96c70576e2b380042042c009F83
```

### Key Functions

- `buyTicket(string memory _seed, uint256 amount)`: Purchase loot tickets
- `loot(string memory seed)`: Roll for items using purchased tickets
- `getTicketPrice()`: Get the current ticket price
- `addTier(string name, uint256 modulo_target, uint256 rarity)`: Create a new tier (developer only)
- `addBlueprint(uint256 tier_rarity, string name, uint256 max_supply)`: Create a new blueprint (developer only)

### Events

- `minedSuccessfully`: Emitted when a user successfully loots an item, containing player address, item name, block number, tier name, blueprint name, and rarity

## Development

### Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## License

This project is private and proprietary.

## Contributing

This is a private project. Contributions are not currently accepted.

## Support

For issues or questions, please contact the project maintainers.
