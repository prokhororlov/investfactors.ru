const axios = require('axios');

const api = axios.create({
  baseURL: 'http://iss.moex.com/iss/',
  timeout: 1000,
});

function arrSetToObj(a, b) {
  return a.reduce((prev, next, i) => ({
    ...prev,
    [a[i]]: b[i],
  }), {});
}

function getStocks(query) {
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return api.get(`/engines/stock/markets/shares/boards/tqbr/securities.json${search}`)
    .then((res) => {
      const { securities, marketdata } = res.data;
      const result = {};

      const insertToRes = (item) => {
        result[item.SECID] = {
          ...result[item.SECID],
          ...item,
        };
      };

      securities.data.forEach((_, i) => {
        insertToRes(arrSetToObj(securities.columns, securities.data[i]));
        insertToRes(arrSetToObj(marketdata.columns, marketdata.data[i]));
      });

      return result;
    });
}

module.exports = {
  getStocks,
};
