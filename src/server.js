import http from 'http';

import Log from './utilities/logHandler';

class Server {
  constructor(app, port) {
    this._app = app;
    this._port = port;
    this._httpServer = null;
  }

  async start() {
    await this._app.init();

    this._httpServer = http.createServer(this._app.instance);
    this._httpServer.listen(this._port);

    this._httpServer.on('listening', () => {
      Log.info(`Running ${this._app.toString()} and listening on port: ${this._httpServer.address().port}`);
    });

    this._httpServer.on('error', (err) => {
      Log.error(err);
    });

    return this._httpServer;  
  }

  stop() {
    if (this._app) {
      this._app.dispose();
    }

    if (this._httpServer) {
      this._httpServer.close(() => Log.info('Server stopped.'));
    }
  }
}

export default Server;