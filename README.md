# Invest Factors

Invest Factors is a stock market analysis and research platform that allows users to explore and verify factors for buying or selling stocks, participate in discussions, follow top-rated authors, and share their own expertise.

## Features

- Stock screening and filtering
- Company profile information 
- Financial metrics and charts
- Stock price tracking
- User-generated content and analysis
- Discussion forums
- Expert ranking system

## Project Structure

The project consists of two main parts:

### Backend

Location: `/backend`

- Built with Node.js and Express
- Uses Firebase for database
- Handles API requests for stock data and user information
- Syncs stock data from multiple sources (MOEX, NASDAQ, NYSE)
- Key files:
  - `index.js` - Main server file
  - `/src/db/` - Database connections and queries
  - `/src/services/sync/` - Stock data synchronization logic
  - `/utils/` - Utility functions

### Frontend

Location: `/frontend`

- Built with Vue.js 3
- Uses Element Plus UI library
- Integrates TradingView widgets for stock charts
- Key features:
  - Stock list with filtering and sorting
  - Detailed stock view with charts and metrics
  - User profile page
  - Rich text editor for user-generated content
- Key files:
  - `/src/views/` - Main application views
  - `/src/components/` - Reusable UI components  
  - `/src/store/` - Vuex store for state management
  - `/src/router/` - Vue Router configuration

## Installation and Setup

1. Clone the repository
2. Install dependencies:
   ```
   yarn
   ```
3. Set up environment variables:
   - Create `.env` files in `/backend` and `/frontend` directories
   - Add required API keys and configuration

4. Start development server:
   ```
   yarn dev
   ```

## Deployment

For production deployment, use:
```
yarn build
yarn start
```

Deployment script (`_ci/deploy.sh`) handles:
- Pulling latest code
- Building the project
- Restarting the server with PM2

## Technical Details

- **Backend**: Node.js v14+, Express
- **Frontend**: Vue.js 3, Vuex, Vue Router
- **Database**: Firebase
- **Styling**: SCSS, Element Plus
- **Linting**: ESLint, Prettier
- **Testing**: Jest
- **Version Control**: Git, Commitlint for commit message formatting

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

Make sure to follow the existing code style and write tests for new functionality.

## License

This project is licensed under the MIT License.
