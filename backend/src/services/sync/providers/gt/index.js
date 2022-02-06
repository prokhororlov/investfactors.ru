const gtAPI = require('./api');
const { arrToMap } = require('../../utils');

const cache = {
  MOEX: [],
  NASDAQ: [],
  NYSE: [],
};

const getFullStocks = (market) => (
  gtAPI.getStocks(market)
    .then((response) => (
      response.map((item) => ({
        name: item.name || '-',
        ticker: item.ticker || '-',
        currency: market === 'MOEX' ? 'RUB' : 'USD',
        price: item.price || 0,
        cap: Math.max(item.marketcap, item.shares * item.price, 0),
        change: item.changepct === 100 ? 0 : item.changepct || 0,
        volumeavg: item.volumeavg || 0,
        shares: item.shares || 0,
        low52: item.low52 || 0,
        high52: item.high52 || 0,
        pe: item.pe || '-',
        eps: item.eps || '-',
        market: market.toUpperCase() || '-',
      }))
    ))
    .catch(() => cache[market] && Promise.resolve(cache[market]))
);

const getStocksCheap = (market) => (
  gtAPI.getRows(market, 2, 4)
    .then((rows) => (
      cache[market]
        .map((item, i) => ({
          ...item,
          price: rows[i][2] || cache.market[i].price,
          change: rows[i][3] || cache.market[i].change,
        }))
    ))
    .catch(() => Promise.resolve(cache[market]))
);

const getStocks = () => {
  const keys = Object.keys(cache);
  return Promise.all(
    keys.map((key) => {
      cache[key] = cache[key].length
        ? getStocksCheap(key)
        : getFullStocks(key);
      return cache[key];
    }),
  ).then((result) => (
    result.reduce((acc, list, i) => ({
      ...acc,
      [keys[i]]: arrToMap(list, 'ticker'),
    }), {})
  ));
};

const clearCache = () => {
  Object.keys(cache).forEach((key) => {
    cache[key] = {};
  });
};

setInterval(clearCache, 1000 * 60 * 60 * 24); // раз в сутки

module.exports = {
  getStocks,
  init: gtAPI.init,
};
