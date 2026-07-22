const gtAPI = require('./api');
const { arrToMap } = require('../../utils');

const cache = {
  // MOEX: [],
  NASDAQ: [],
  NYSE: [],
};

const numberOrFallback = (value, fallback) => (
  Number.isFinite(value) ? value : fallback
);

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
        .map((item, i) => {
          const [marketcap, price, change] = rows[i] || [];

          return {
            ...item,
            cap: numberOrFallback(marketcap, item.cap),
            price: numberOrFallback(price, item.price),
            change: numberOrFallback(change, item.change),
          };
        })
    ))
    .catch(() => Promise.resolve(cache[market]))
);

const updateMarket = (market) => {
  const request = cache[market].length
    ? getStocksCheap(market)
    : getFullStocks(market);

  return request.then((stocks) => {
    cache[market] = stocks;
    return stocks;
  });
};

const getStocks = () => {
  const keys = Object.keys(cache);
  return Promise.all(
    keys.map(updateMarket),
  ).then((result) => (
    result.reduce((acc, list, i) => ({
      ...acc,
      [keys[i]]: arrToMap(list, 'ticker'),
    }), {})
  ));
};

const clearCache = () => {
  Object.keys(cache).forEach((key) => {
    cache[key] = [];
  });
};

setInterval(clearCache, 1000 * 60 * 60 * 24); // раз в сутки

module.exports = {
  getStocks,
  init: gtAPI.init,
};
