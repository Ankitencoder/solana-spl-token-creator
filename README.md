# Solana SPL Token Creator

A beginner-friendly platform for creating, managing, and transferring SPL tokens on the Solana blockchain. Built with React, TypeScript, and Express.js.

![Solana SPL Token Creator](https://img.shields.io/badge/Solana-SPL%20Token%20Creator-9945FF?style=for-the-badge&logo=solana)

## Features

### 🪙 Token Creation
- **Easy Form Interface**: Create SPL tokens with name, symbol, supply, and decimals
- **Real-time Preview**: See your token details before deployment
- **Cost Calculator**: View estimated SOL fees for token creation
- **Validation**: Form validation ensures proper token parameters

### 💳 Wallet Integration
- **Phantom Wallet Support**: Connect your Phantom wallet seamlessly
- **Balance Display**: Real-time SOL balance monitoring
- **Demo Mode**: Test without wallet for development

### 📊 Token Management
- **Dashboard View**: See all your created tokens
- **Token Details**: View mint addresses, supply, and metadata
- **Copy Functions**: Easy copy-to-clipboard for addresses
- **Quick Actions**: Mint, burn, and update token metadata

### 🔄 Token Transfers
- **Send Tokens**: Transfer tokens to any Solana wallet
- **Address Validation**: Ensures valid recipient addresses
- **Transaction Summary**: Preview fees and amounts before sending
- **Balance Checking**: Verify sufficient token balance

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Blockchain**: Solana Web3.js + SPL Token
- **UI**: Tailwind CSS + Shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query
- **Database**: In-memory storage (easily replaceable)

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and services
│   │   └── pages/          # Page components
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schemas
└── package.json           # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Phantom wallet browser extension (optional for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ankitencoder/solana-spl-token-creator.git
   cd solana-spl-token-creator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

### Environment Setup

The application runs on Solana Devnet by default, which is perfect for testing without real SOL costs.

For production deployment to Mainnet, update the RPC endpoint in `client/src/lib/solana.ts`:

```typescript
// For Mainnet (use with caution)
const SOLANA_RPC_URL = 'https://api.mainnet-beta.solana.com';
```

## Usage Guide

### 1. Connect Your Wallet
- Click "Connect Wallet" in the navigation
- Approve the connection in your Phantom wallet
- Your SOL balance will display automatically

### 2. Create a Token
- Fill out the token creation form
- Preview your token details and costs
- Click "Create Token" to deploy to Solana
- Your token will appear in the management dashboard

### 3. Manage Tokens
- View all your created tokens
- Copy mint addresses for external use
- Access quick actions for token operations

### 4. Transfer Tokens
- Select a token from your created tokens
- Enter recipient wallet address
- Specify transfer amount
- Review transaction details and send

## API Endpoints

### Tokens
- `GET /api/tokens/:walletAddress` - Get tokens by wallet
- `POST /api/tokens` - Create new token
- `GET /api/token/:mintAddress` - Get token by mint address

### Transfers
- `GET /api/transfers/:walletAddress` - Get transfers by wallet
- `POST /api/transfers` - Record new transfer

### Network
- `GET /api/network/status` - Get network status

## Development

### Key Components

- **CreateTokenForm**: Token creation interface with validation
- **ManageTokens**: Token dashboard and management
- **TransferTokens**: Token transfer functionality
- **WalletProvider**: Wallet connection context
- **SolanaService**: Blockchain interaction service

### Adding Features

1. **New API Endpoints**: Add routes in `server/routes.ts`
2. **Database Operations**: Extend `server/storage.ts`
3. **UI Components**: Create in `client/src/components/`
4. **Type Safety**: Define schemas in `shared/schema.ts`

## Deployment

### Replit Deployment
1. Click the "Deploy" button in Replit
2. Configure custom domain (optional)
3. Your app will be live with automatic HTTPS

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy to your preferred hosting platform
3. Ensure environment variables are set correctly

## Security Notes

- **Devnet vs Mainnet**: Default configuration uses Devnet for safe testing
- **Private Keys**: Never expose private keys in client-side code
- **Validation**: All inputs are validated on both client and server
- **HTTPS**: Always use HTTPS in production for wallet security

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## Roadmap

- [ ] Metadata upload to IPFS/Arweave
- [ ] Token freeze/thaw authority management
- [ ] Bulk token operations
- [ ] Token analytics dashboard
- [ ] Multi-signature wallet support
- [ ] Integration with major DEXs

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

- **Documentation**: [Solana Docs](https://docs.solana.com/)
- **Issues**: [GitHub Issues](https://github.com/Ankitencoder/solana-spl-token-creator/issues)
- **Community**: [Solana Discord](https://discord.gg/solana)

## Acknowledgments

- Built on [Solana](https://solana.com/) blockchain
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**⚠️ Disclaimer**: This application is for educational purposes. Always test thoroughly on Devnet before using on Mainnet. Cryptocurrency transactions are irreversible.