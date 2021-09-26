require('dotenv').config({ path: './config/app.env' });

const config = {
  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
  db: {
    address: process.env.DB_ADDRESS,
    name: process.env.DB_NAME,
    credential: {
      $USER: process.env.DB_USER,
      $PASS: process.env.DB_PASS,
    },
  },
  pokedex: {
    api: process.env.POKEDEX_API,
  },
};

module.exports = config;
