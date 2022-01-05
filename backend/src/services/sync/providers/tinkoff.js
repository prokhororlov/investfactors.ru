const TinkoffAPI = require('../../../api/tinkoff');

const cache = {
  data: null,
};

const getStocks = () => (cache.data
  ? Promise.resolve(cache.data)
  : TinkoffAPI.stocks()
    .then(({ instruments }) => {
      const result = {};

      instruments
        .map((instrument) => (
          Object.assign(result, {
            [instrument.ticker]: {
              ticker: instrument.ticker,
              name: instrument.name,
            },
          })
        ));

      cache.data = result;
      return result;
    })
);

const clearCache = () => {
  cache.data = null;
};

module.exports = {
  getStocks,
  clearCache,
};
