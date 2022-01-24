const TinkoffAPI = require('./api');

const cache = {
  data: null,
};

const getStocks = () => (cache.data
  ? Promise.resolve(cache.data)
  : TinkoffAPI.stocks()
    .then(({ instruments }) => {
      cache.data = instruments.map((item) => ({
        name: item.name,
        ticker: item.ticker,
        currency: item.currency,
      }));
      return cache.data;
    })
    .catch(() => Promise.resolve(cache.data))
);

const clearCache = () => {
  cache.data = null;
};

setInterval(clearCache, 1000 * 60 * 60 * 24); // раз в сутки

module.exports = {
  getStocks,
};
