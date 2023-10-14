const { arrToMap } = require('../../utils');
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
        market: 'MOEX',
        is_trading: item.TRADINGSTATUS !== 'N',
        low: item.LOW,
        high: item.HIGH,
        meta: {
          status: item.STATUS,
          sec_type: item.SECTYPE,
          list_level: item.LISTLEVEL,
        },
        // high52: item.HIGH, // daily not yearly
        // pe: ',',
        // eps: ',',
      }));
      return arrToMap(cache.data, 'ticker');
    })
    .catch(() => Promise.resolve(arrToMap(cache.data, 'ticker')))
);

module.exports = {
  getStocks,
};
