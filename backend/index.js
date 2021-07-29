try { require('dotenv').config() } catch {}

const express = require('express');
const path = require('path');
const db = require('./src/db');

const app = express();

const PORT = process.env.PORT || 80;
const APP_REQUEST_HANDLER = express.static(path.resolve(__dirname, '../frontend/dist'));
const APP_URL_MAP = ['/', '/openStock', '/stocks', '/stocks/:ticker'];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

APP_URL_MAP.map(url => {
  app.use(url, APP_REQUEST_HANDLER)
})

app.post('/api/stocks/', db.stocks.getList);

app.listen(PORT, () => {
  console.log('http://localhost');
})