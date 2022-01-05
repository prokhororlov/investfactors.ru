/* -------------------------------------------------
Is needed to start once in a day e.g. to save
tickers from Tinkoff Investments
------------------------------------------------- */
const MoexAPI = require('../../api/moex');
const db = require('../../db/connect');
const TinkoffAPI = require('../tinkoff/api');
const config = require('../../db/config');
const logger = require('../../../utils/logger');

const api = {
  tinkoff: TinkoffAPI,
  moex: MoexAPI,
};

const data = {
  tinkoffStocks: null,
};

const getTinkoffStocks = () => (
  data.tinkoffStocks
    ? Promise.resolve(data.tinkoffStocks)
    : api.tinkoff.stocks()
      .then(({ instruments }) => {
        const result = {};

        instruments
          .map((instrument) => (
            Object.assign(result, {
              [instrument.ticker]: {
                ticker: instrument.ticker,
                name: instrument.name,
              },
            })
          ));

        data.tinkoffStocks = result;
        return result;
      })
);

const getMoexStocks = () => (
  api.moex.getStocks().then((response) => ({
    ...Object.values(response).map((item) => ({
      ticker: item.SECID,
      name: item.SECNAME,
      currency: item.CURRENCYID === 'SUR' ? 'RUB' : item.CURRENCYID,
      price: item.LAST || item.MARKETPRICE || item.LCURRENTPRICE,
      cap: item.ISSUECAPITALIZATION,
      change: Math.floor((item.CHANGE / item.OPEN) * 10000) / 100 || 0,
      volume: item.VALTODAY,
      volumeToCap: (item.ISSUECAPITALIZATION
        && Math.floor(((item.VALTODAY || 0) / item.ISSUECAPITALIZATION) * 10000) / 100) || 0,
      market: 'MOEX',
    })),
  }))
);

const isValidTime = () => {
  const date = new Date();
  date.setHours(date.getUTCHours() + 3);

  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const currentTime = +[hours, minutes, seconds].join('');

  return ![6, 7].includes[day] // exclude weekends
    && currentTime > 75959 + 1500 // 07:29:59 (trading start) + 00:15:00 (moex delay)
    && currentTime < 235959 + 1500; // 23:59:59 (trading start) + 00:15:00 (moex delay)
};

function update() {
  if (!isValidTime()) return;

  Promise.all([getTinkoffStocks(), getMoexStocks()])
    .then(([tinkoffStocks, moexStocks]) => (
      Object.values(moexStocks)
        .filter((stock) => tinkoffStocks[stock.ticker])
        .map((stock) => ({ ...stock, ...tinkoffStocks[stock.ticker] }))
    ))
    .then((instruments) => db.database().ref(config.refs.stocks).set(instruments) && instruments)
    .then((instruments) => logger.info(`Successfull stocks update: ${instruments.length} set`))
    .catch((error) => logger.warn(error.message));
}

const clear = () => {
  data.tinkoffStocks = null;
};

module.exports = {
  start: () => {
    setInterval(clear, 1000 * 60 * 60 * 8); // раз в 8 часов
    setInterval(update, 1000 * 5); // раз в 5 секунд
  },
};
