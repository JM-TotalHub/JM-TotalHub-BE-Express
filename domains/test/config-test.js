const dotenv = require('dotenv');

dotenv.config();

const config = {
  REDIS_URL: process.env.SIGNAL_APP_REDIS_URL,
  REDIS_PASSWORD: process.env.SIGNAL_APP_REDIS_PASSWORD,
};

module.exports = config;
