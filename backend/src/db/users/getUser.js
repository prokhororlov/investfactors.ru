const db = require('../connect');
const config = require('../config');

module.exports = async (req, res) => {
  try {
    const user = await db.database().ref(config.refs.users)
      .child(req.body.uid)
      .once('value');

    res.status(200).send(user.val());
  } catch (error) {
    res.status(400).send(error.message);
  }
};
