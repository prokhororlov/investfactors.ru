## Backend README

The backend of Invest Factors serves as the API layer and handles data synchronization.

### Key Responsibilities:
- Provides API endpoints for stock data and user information
- Syncs stock data from multiple sources (MOEX, NASDAQ, NYSE)
- Handles authentication and user sessions
- Manages database connections

### Installation:

```
cd backend
yarn install
```

### Running the Server:

```
node index.js
```

### Data Synchronization:
- Automatically updates stock data every 10 seconds
- Uses Firebase as the database
- Sources data from Google Sheets and MOEX API

### Tech Stack:
- Node.js with Express
- Firebase for database
- Axios for API requests
- Winston for logging
- Morgan for request logging
