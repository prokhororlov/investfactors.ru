require('dotenv').config();
const gt = require('./providers/gt');

const db = require('../../db/connect');
const config = require('../../db/config');

const ref = db.database().ref(config.refs.stocks);

const logger = require('../../../utils/logger');

const { isValidTime } = require('./utils');

let isPending = false;

function save(instruments) {
  const count = Object.values(instruments).map(Object.keys).flat().length;
  return ref.update(instruments)
    .then(() => logger.info(`Successfull stocks update: ${count} set`))
    .catch((error) => logger.warn('Stocks update error', error));
}

function update() {
  const isTradingTime = isValidTime('06:59:59', '01:30:00');
  if (!isTradingTime || isPending) return;

  logger.info('Updating stocks...');

  isPending = true;

  gt.getStocks()
    .then(save)
    .catch((error) => {
      logger.warn('Get stocks error:', error);
    })
    .finally(() => {
      isPending = false;
    });
}

function start() {
  update();
  setInterval(update, 1000 * 10); // once in 10 sec
}

function init() {
  gt.init()
    .then(start)
    .catch((error) => logger.warn('Init error:', error));
}

module.exports = {
  init,
};
