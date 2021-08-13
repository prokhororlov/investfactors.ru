require('dotenv').config();
const OpenAPI = require('@tinkoff/invest-openapi-js-sdk');

const apiURL = 'https://api-invest.tinkoff.ru/openapi/sandbox';
const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
const secretToken = process.env.TINKOFF_SANDBOX_TOKEN;
const api = new OpenAPI({ apiURL, secretToken, socketURL });

module.exports = api;
