const MoexAPI = require('./api');

const cache = {
  data: [],
};

const getStocks = () => (
  MoexAPI.getStocks()
    .then((response) => {
      cache.data = response.map((item) => ({
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
      }));
      return cache.data;
    })
    .catch(() => Promise.resolve(cache.data))
);

module.exports = {
  getStocks,
};
