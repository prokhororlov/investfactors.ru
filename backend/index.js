require('dotenv').config();

const morgan = require('morgan');
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const path = require('path');
const db = require('./src/db');
const syncStocks = require('./src/services/sync');
const logger = require('./utils/logger');

const app = express();

const PORT = process.env.PORT || 80;
const APP_REQUEST_HANDLER = express.static(path.resolve(__dirname, '../frontend/dist'));
const APP_URL_MAP = ['/', '/openStock', '/stocks', '/stocks/:ticker', '/portfolio', '/profile'];

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

APP_URL_MAP.map((url) => (
  app.use(url, APP_REQUEST_HANDLER)
));

app.post('/api/stocks/', db.stocks.getList);
app.post('/api/details/', db.stocks.getDetails);

app.use(jwtCheck);

app.listen(PORT, () => {
  logger.info('Server started at: http://localhost');
});

syncStocks.init();
