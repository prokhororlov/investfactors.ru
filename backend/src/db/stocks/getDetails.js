const db = require('../connect');
const config = require('../config');

module.exports = async (req, res) => {
  try {
    const dbStock = await db.database().ref(config.refs.stocks)
      .child(req.body.market)
      .child(req.body.ticker)
      .once('value');

    const dbDetails = await db.database().ref(config.refs.details)
      .child(req.body.ticker)
      .once('value');

    res.status(200).send({
      ...dbStock.val(),
      ...dbDetails.val(),
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
