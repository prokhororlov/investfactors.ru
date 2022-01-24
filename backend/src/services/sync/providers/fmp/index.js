const fmpAPI = require('financialmodelingprep')(process.env.FMP_TOKEN);

const cache = {
  data: null,
};

const getStocks = (tickers) => (
  fmpAPI.stock(tickers).quote()
    .then((response) => {
      cache.data = Object.values(response).map((item) => ({
        name: item.name,
        ticker: item.symbol,
        currency: 'USD',
        price: Math.round(item.price * 100) / 100,
        cap: item.marketCap,
        change: Math.round(item.changesPercentage * 100) / 100,
        volume: item.volume,
        volumeToCap: (item.marketCap
          && Math.floor(((item.volume || 0) / item.marketCap) * 100) / 100) || 0,
        market: item.exchange,
      }));
      return cache.data;
    })
    .catch(() => cache.data && Promise.resolve(cache.data))
);

module.exports = {
  getStocks,
};
