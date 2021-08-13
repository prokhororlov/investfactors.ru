/* -------------------------------------------------
Is needed to start once in a day e.g. to save
tickers from Tinkoff Investments
------------------------------------------------- */
const MoexAPI = require('moex-api');
const db = require('../../db/connect');
const TinkoffAPI = require('../tinkoff/api');
const config = require('../../db/config');
const logger = require('../../../utils/logger');

const api = {
  tinkoff: TinkoffAPI,
  moex: new MoexAPI(),
};

const data = {
  tinkoffStocks: null,
};

const getTinkoffStocks = () => (
  data.tinkoffStocks
    ? Promise.resolve(data.tinkoffStocks)
    : api.tinkoff.stocks()
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

        data.tinkoffStocks = result;
        return result;
      })
);

const getMoexStocks = () => (
  api.moex.securitiesDataRaw('stock', 'shares', '').then((response) => {
    // доски (нейминг by MOEX)
    const boards = {
      SMAL: {},
      TQBR: {},
    };

    // получаем мету
    response.securities.data
      .filter((i) => Object.keys(boards).includes(i[1]) && i[3]) // есть на нужной доске и есть цена
      .map((i) => {
        const info = {};

        response.securities.columns.map((column, index) => (
          Object.assign(info, {
            ...info,
            [column]: i[index],
          })
        ));

        boards[info.BOARDID][info.SECID] = {
          board: info.BOARDID,
          ticker: info.SECID,
          name: info.SECNAME,
          currency: info.FACEUNIT === 'SUR' ? 'RUB' : info.FACEUNIT,
        };

        return null;
      });

    // получаем состояние рынка
    response.marketdata.data
      .filter((i) => Object.keys(boards).includes(i[1])) // есть на нужной доске
      .map((i) => {
        // собираем информацию по тикеру
        const info = {};
        response.marketdata.columns.map((column, index) => {
          info[column] = i[index];
          return null;
        });

        // распределяем по доскам
        boards[info.BOARDID][info.SECID] = {
          ...boards[info.BOARDID][info.SECID],
          price: info.LAST || info.MARKETPRICE || info.LCURRENTPRICE,
          cap: info.ISSUECAPITALIZATION,
          change: info.CHANGE || 0,
          changePercent: Math.floor((info.CHANGE / info.OPEN) * 10000) / 100 || 0,
          volume: info.VALTODAY,
          volumeToCap: (info.ISSUECAPITALIZATION
            && Math.floor(((info.VALTODAY || 0) / info.ISSUECAPITALIZATION) * 10000) / 100) || 0,
          market: 'MOEX',
        };

        return null;
      });

    return {
      ...boards.SMAL,
      ...boards.TQBR,
    };
  })
);

const isValidTime = () => {
  const date = new Date();
  date.setHours(date.getUTCHours() + 3);

  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const currentTime = +[hours, minutes, seconds].join('');

  return ![6, 7].includes[day] // exclude weekends
    && currentTime > 92959 + 1500 // 09:29:59 + 00:15:00 (moex delay)
    && currentTime < 235959 + 1500; // 23:59:59 + 00:15:00 (moex delay)
};

function update() {
  if (!isValidTime()) return;

  Promise.all([getTinkoffStocks(), getMoexStocks()])
    .then(([tinkoffStocks, moexStocks]) => (
      Object.values(moexStocks)
        .filter((stock) => tinkoffStocks[stock.ticker])
        .map((stock) => ({ ...stock, ...tinkoffStocks[stock.ticker] }))
    ))
    .then((instruments) => db.database().ref(config.refs.stocks).set(instruments) && instruments)
    .then((instruments) => logger.info(`Successfull stocks update: ${instruments.length} set`))
    .catch((error) => logger.warn(error.message));
}

const clear = () => {
  data.tinkoffStocks = null;
};

module.exports = {
  start: () => {
    setInterval(clear, 1000 * 60 * 60 * 8); // раз в 8 часов
    setInterval(update, 1000 * 5); // раз в 5 секунд
  },
};
