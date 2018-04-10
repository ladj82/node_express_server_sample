class App {
  constructor(db) {
  	this._db = db;
  }

  async init() {
  	return await this._db.connect();
  }

  dispose() {
  	return this._db.disconnect();
  }
}

export default App;