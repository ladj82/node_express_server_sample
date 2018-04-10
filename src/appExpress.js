import path from 'path';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';

import Config from './utilities/config';
import App from './app';
import IndexRouter from './routes/indexRouter';

class AppExpress extends App {
  constructor(db) {
    super(db);
    this._app = null;
  }

  toString() {
    return 'Express App';
  }

  get instance() {
    if (this._app) {
      return this._app;
    }

    let errorMessage = 'Error while getting app instance. Make sure the app was initialized.'; 
    Log.error(errorMessage);
    throw new Error(errorMessage);
  }

  async init() {
    await super.init();

    this._app = express();
    this._setupUtilities();
    this._setupRouteLogger();
    this._setupRoutes();
    this._setupErrorLogger();
  }

  dispose() {
    return super.dispose();
  }

  _setupUtilities() {
    this._app.use(cors());
    this._app.use(compression());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this._app.use(bodyParser.json());
  }

  _setupRouteLogger() {
    this._app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true,
          silent: ['prd','qas'].includes(Config.env)
        })],
        msg: 'HTTP {{req.method}} {{req.url}}',
        expressFormat: true,
        colorize: false,
        ignoreRoute: (req, res) => { return false; }
    }));
  }

  _setupRoutes() {
    this._app.use(IndexRouter.get());
  }

  _setupErrorLogger() {
    this._app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true,
          silent: ['prd','qas'].includes(Config.env)
        })]
    }));
  }
}

export default AppExpress;