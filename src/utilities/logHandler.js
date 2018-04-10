import winston from 'winston';

import Config from './config';

class Log {
  constructor() {
    this._engine = new (winston.Logger)({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true,
          silent: ['prd','qas'].includes(Config.env)
        })]
    });
  }

  log(message, level = null) {
    this._engine.log(['error', 'warn', 'info', 'verbose', 'debug', 'silly'].includes(level) ? level : 'info', message);
  }

  error(message) {
    this.log(message, 'error');
  }

  warn(message) {
    this.log(message, 'warn');
  }

  info(message) {
    this.log(message, 'info');
  }

  verbose(message) {
    this.log(message, 'verbose');
  }

  debug(message) {
    this.log(message, 'debug');
  }

  silly(message) {
    this.log(message, 'silly');
  }
}

export default new Log();