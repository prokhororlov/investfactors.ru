/* -------------------------------------------------
Is needed to start once in a day e.g. to save
tickers from Tinkoff Investments
------------------------------------------------- */

try { require('dotenv').config() } catch {}

const db = require('../src/db/connect');
const TinkoffAPI = require('../src/services/tinkoff/api');
const MoexAPI = require("moex-api");

const api = {
  tinkoff: TinkoffAPI,
  moex: new MoexAPI
}

const data = {
  tinkoffStocks: null,
}

const getTinkoffStocks = () => (
  data.tinkoffStocks
  ? Promise.resolve(data.tinkoffStocks)
  : api.tinkoff.stocks()
    .then(({instruments}) => {
      const result = {}

      instruments
        .map(instrument => {
          Object.assign(result, {
            [instrument.ticker]: {
              ticker: instrument.ticker,
              name: instrument.name,
            }
          })
        })
      
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
    }

    // получаем мету
    response.securities.data
      .filter(i => Object.keys(boards).includes(i[1]) && i[3]) // есть на нужной доске и есть цена
      .map(i => {
        const info = {}

        response.securities.columns.map((column, index) => {
          Object.assign(info, {
            ...info,
            [column]: i[index]
          })
        })  

        boards[info.BOARDID][info.SECID] = {
          board: info.BOARDID,
          ticker: info.SECID,
          name: info.SECNAME,
          currency: info.FACEUNIT === 'SUR' ? 'RUB' : info.FACEUNIT,
        }
      })
  
    // получаем состояние рынка
    response.marketdata.data
      .filter(i => Object.keys(boards).includes(i[1])) // есть на нужной доске
      .map(i => {

        // собираем информацию по тикеру
        const info = {}
        response.marketdata.columns.map((column, index) => info[column] = i[index])  

        // распределяем по доскам
        boards[info.BOARDID][info.SECID] = {
          ...boards[info.BOARDID][info.SECID],
          price: info.LAST || info.MARKETPRICE,
          cap: info.ISSUECAPITALIZATION,
          change: Math.floor(info.CHANGE / info.OPEN * 10000) / 100 || 0,
          market: 'MOEX',
        }
      })

    return {
      ...boards.SMAL,
      ...boards.TQBR,
    }
  })
);

const update = () => Promise.all([getTinkoffStocks(), getMoexStocks()])
  .then(([tinkoffStocks, moexStocks]) => {
    return Object.values(moexStocks)
      .filter(stock => tinkoffStocks[stock.ticker])
      .map(stock => ({...stock, ...tinkoffStocks[stock.ticker] }))
  })
  .then(instruments => db.database().ref('stocks').set(instruments) && instruments)
  .then(instruments => console.log('Successfull stocks update:', instruments.length, 'set'))
  .catch((error) => console.warn(error.message));

const clear = () => {
  data.tinkoffStocks = null
}

module.exports = {
  start: () => {
    setInterval(clear, 1000 * 60 * 60 * 8) // раз в 8 часов
    setInterval(update, 1000 * 5) // раз в 5 секунд
  },
};