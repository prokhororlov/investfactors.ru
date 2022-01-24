require('dotenv').config();
const tinkoff = require('./providers/tinkoff');
const moex = require('./providers/moex');
const fmp = require('./providers/fmp');

const db = require('../../db/connect');
const config = require('../../db/config');
const logger = require('../../../utils/logger');

const { arrToMap, isValidTime } = require('./utils');

const stocks = {
  moex: {
    list: [],
    map: {},
  },
  tinkoff: {
    list: [],
    map: {},
  },
  fmp: {
    list: [],
    map: {},
  },
};

function save(instruments) {
  return db.database().ref(config.refs.stocks).update(instruments)
    .then(() => logger.info(`Successfull stocks update: ${Object.keys(instruments).length} set`));
}

function updateTinkoff() {
  if (!isValidTime(65959, 14459) && stocks.tinkoff.list.length) {
    return Promise.resolve();
  }
  return tinkoff.getStocks()
    .then((items) => {
      stocks.tinkoff.list = items.filter((item) => !/[^A-Z0-9]/g.test(item.ticker));
      stocks.tinkoff.map = arrToMap(stocks.tinkoff.list, 'ticker');
    });
}

function updateMoex() {
  if (!isValidTime(65959, 235959) && stocks.moex.list.length) {
    return Promise.resolve();
  }

  return moex.getStocks()
    .then((items) => {
      stocks.moex.list = items.filter((item) => stocks.tinkoff.map[item.ticker]);
      stocks.moex.map = arrToMap(stocks.moex.list, 'ticker');
      save(stocks.moex.map);
    });
}

function updateFmp() {
  if (!isValidTime(65959, 14459) && stocks.fmp.list.length) {
    return Promise.resolve();
  }

  const tickers = stocks.tinkoff.list
    .map((item) => item.ticker)
    .filter((ticker) => !stocks.moex.map[ticker]);

  return fmp.getStocks(tickers)
    .then((items) => {
      stocks.fmp.list = items;
      stocks.fmp.map = arrToMap(stocks.fmp.list, 'ticker');
      save(stocks.fmp.map);
    });
}

function start() {
  setInterval(updateTinkoff, 1000 * 60 * 60 * 24); // once in a day
  setInterval(updateMoex, 1000 * 10); // once in 10 sec
  setInterval(updateFmp, 1000 * 10); // once in 10 sec
}

function init() {
  return updateTinkoff()
    .then(updateMoex)
    .then(updateFmp)
    .then(start)
    .catch(init);
}

module.exports = {
  init,
};
