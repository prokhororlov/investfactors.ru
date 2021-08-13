module.exports = {
  refs: {
    stocks: process.env.NODE_ENV === 'development' ? 'stocks-dev' : 'stocks'
  },
  options: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDING_ID,
    appId: process.env.APP_ID,
  }
}