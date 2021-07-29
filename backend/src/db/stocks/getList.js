const db = require('../connect');

module.exports = async (req, res) => {
  try {
    const snapshot = await db.database().ref(`stocks/`).once('value')
    res.status(200).send(snapshot.val())
  } catch (error) {
    res.status(400).send(error.message)
  }
}