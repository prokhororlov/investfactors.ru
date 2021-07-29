/* -------------------------------------------------
Is needed to start once in a day e.g. to save
tickers from Tinkoff Investments
------------------------------------------------- */

try { require('dotenv').config() } catch {}

const db = require('../src/db/connect');
const api = require('../src/services/tinkoff/api');

try {
  api.stocks()
    .then(result => result.instruments
      .map((instrument) => ({
        ticker: instrument.ticker,
        name: instrument.name,
      })))
    .then(instruments => db.database().ref('stocks').set(instruments) && instruments)
    .then(instruments => console.log('Succeed:', instruments.length, 'set'))
    .catch((error) => console.warn(error.message));
} catch(error) {
  console.warn(error.message);
}