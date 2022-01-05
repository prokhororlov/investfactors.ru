const db = require('../../db/connect');
const config = require('../../db/config');
const logger = require('../../../utils/logger');

const tinkoff = require('./providers/tinkoff');
const moex = require('./providers/moex');

const utils = require('./utils');

function update() {
  if (!utils.isValidTime()) return;

  Promise.all([tinkoff.getStocks(), moex.getStocks()])
    .then(([tinkoffStocks, moexStocks]) => (
      Object.values(moexStocks)
        .filter((stock) => tinkoffStocks[stock.ticker])
        .map((stock) => ({ ...stock, ...tinkoffStocks[stock.ticker] }))
    ))
    .then((instruments) => db.database().ref(config.refs.stocks).set(instruments) && instruments)
    .then((instruments) => logger.info(`Successfull stocks update: ${instruments.length} set`))
    .catch((error) => logger.warn(error.message));
}

module.exports = {
  start: () => {
    setInterval(tinkoff.clearCache, 1000 * 60 * 60 * 8); // раз в 8 часов
    setInterval(update, 1000 * 10); // раз в 5 секунд
  },
};
