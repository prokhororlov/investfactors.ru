const MoexAPI = require('../../../api/moex');

const cache = {
  data: null,
};

const getStocks = () => (
  MoexAPI.getStocks()
    .then((response) => {
      const result = {};

      Object.values(response).forEach((item) => {
        result[item.SECID] = {
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
        };
      });

      cache.data = result;
      return result;
    })
    .catch(() => cache.data && Promise.resolve(cache.data))
);

const clearCache = () => {
  cache.data = null;
};

module.exports = {
  getStocks,
  clearCache,
};
