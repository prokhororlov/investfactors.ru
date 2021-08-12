const db = require('../connect');
const config = require('../config');

module.exports = async (req, res) => {
  try {
    const snapshot = await db.database().ref(config.refs.stocks).once('value')
    res.status(200).send(snapshot.val())
  } catch (error) {
    res.status(400).send(error.message)
  }
}