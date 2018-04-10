import mongodb from 'mongodb';

import Log from './logHandler';
import Config from './config';

class MongoDatabaseHandler {
  constructor() {
    this._client = null;
    this._connectionString = `mongodb+srv://${Config.dbUserName}:${Config.dbPassword}@${Config.dbHost}/${Config.dbName}`;
  }

  get instance() {
    if (this._client) {
      return this._client.db();
    }

    let errorMessage = 'Error while getting database instance. Make sure the app is connected to the database.'; 
    Log.error(errorMessage);
    throw new Error(errorMessage);
  }

  async connect() {
    try {
      if (this._client === null) {
        let MongoClient = mongodb.MongoClient;
        this._client = await MongoClient.connect(this._connectionString);

        if (this._client) {
          Log.info('Connected to the database.');
          return true;  
        }

        return false;
      }

      return true;
    }
    catch(err) {
      Log.error('Error while connecting to the database.');
      throw err;
    }
  }

  disconnect() {
    try {
      if (this._client !== null) {
        this._client.close();
        this._client = null;

        Log.info('Disconnected from the database.');
      }

      return true;
    }
    catch(ex) {
      Log.error('Error while disconnecting the database.', '');
      throw err;
    }
  }
}

export default new MongoDatabaseHandler();