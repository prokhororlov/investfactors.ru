module.exports = {
  refs: {
    stocks: process.env.NODE_ENV === 'development' ? 'stocks-dev' : 'stocks',
    details: 'company-detail',
  },
  options: {
    apiKey: process.env.FIRE_API_KEY,
    authDomain: process.env.FIRE_AUTH_DOMAIN,
    databaseURL: process.env.FIRE_DATABASE_URL,
    projectId: process.env.FIRE_PROJECT_ID,
    storageBucket: process.env.FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRE_MESSAGING_SENDING_ID,
    appId: process.env.FIRE_APP_ID,
  },
};
