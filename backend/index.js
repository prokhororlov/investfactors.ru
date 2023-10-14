require('dotenv').config();

const morgan = require('morgan');
const express = require('express');
const path = require('path');
const db = require('./src/db');
const syncStocks = require('./src/services/sync');
const logger = require('./utils/logger');

const app = express();

const PORT = process.env.PORT || 80;
const APP_REQUEST_HANDLER = express.static(path.resolve(__dirname, '../frontend/dist'));
const APP_URL_MAP = ['/', '/openStock', '/stocks', '/stocks/:ticker', '/portfolio', '/profile'];

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

APP_URL_MAP.map((url) => (
  app.use(url, APP_REQUEST_HANDLER)
));

app.post('/api/stocks/', db.stocks.getList);
app.post('/api/details/', db.stocks.getDetails);

app.listen(PORT, () => {
  logger.info('Server started at: http://localhost');
});

syncStocks.init();
