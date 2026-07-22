require('dotenv').config();
const gt = require('./providers/gt');
const moex = require('./providers/moex');

const db = require('../../db/connect');
const config = require('../../db/config');

const ref = db.database().ref(config.refs.stocks);

const logger = require('../../../utils/logger');

const { isValidTime } = require('./utils');

const UPDATE_INTERVAL_MS = 1000 * 60;

let isPending = false;
let initialised = false;

function save(instruments) {
  const count = Object.values(instruments).map(Object.keys).flat().length;
  return ref.update(instruments)
    .then(() => logger.info(`Successfull stocks update: ${count} set`))
    .catch((error) => logger.warn('Stocks update error', error));
}

function update() {
  const isTradingTime = isValidTime('06:59:59', '01:30:00');
  if ((!isTradingTime && initialised) || isPending) return;

  logger.info('Updating stocks...');

  isPending = true;
  initialised = true;

  Promise.all([gt.getStocks(), moex.getStocks()])
    .then(([gtData, moexData]) => save({
      ...gtData,
      MOEX: moexData,
    }))
    .catch((error) => {
      logger.warn('Get stocks error:', error);
    })
    .finally(() => {
      isPending = false;
    });
}

function start() {
  update();
  setInterval(update, UPDATE_INTERVAL_MS);
}

function init() {
  gt.init()
    .then(start)
    .catch((error) => logger.warn('Init error:', error));
}

module.exports = {
  init,
};
