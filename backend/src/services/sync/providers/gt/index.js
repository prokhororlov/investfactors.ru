const gtAPI = require('./api');

const cache = {
  moex: [],
  nasdaq: [],
  nyse: [],
};

const getFullStocks = (market) => (
  gtAPI.getStocks(market)
    .then((response) => (
      response.map((item) => ({
        name: item.name || '-',
        ticker: item.ticker || '-',
        currency: market === 'moex' ? 'RUB' : 'USD',
        price: item.price || 0,
        cap: item.marketcap || 0,
        change: item.changepct || 0,
        volume: item.volume || 0,
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
          volume: rows[i][4] || cache.market[i].volume,
        }))
    ))
    .catch(() => Promise.resolve(cache[market]))
);

const getStocks = () => (
  Promise.all(Object.keys(cache)
    .map((key) => {
      cache[key] = cache[key].length
        ? getStocksCheap(key)
        : getFullStocks(key);
      return cache[key];
    }))
    .then((result) => result.flat(result))
);

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
