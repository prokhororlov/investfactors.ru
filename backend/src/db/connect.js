const firebase = require('firebase');
const config = require('./config');

const db = firebase.initializeApp(config.options);

module.exports = db;
