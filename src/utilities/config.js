import dotenv from 'dotenv';

class Config {
  constructor() {
    dotenv.config({path: './.env'});

    return {
      env: process.env.NODE_ENV || 'dev',
      serverPort: process.env.SERVER_PORT,
      dbUserName: process.env.DB_USERNAME,
      dbPassword: process.env.DB_PASSWORD,
      dbHost: process.env.DB_HOST,
      dbName: process.env.DB_NAME
    }
  }
}

export default new Config();