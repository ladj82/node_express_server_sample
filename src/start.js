import 'babel-polyfill';

import Config from './utilities/config';
import Server from './server';
import MongoDb from './utilities/mongoDbHandler';
import AppExpress from './appExpress';

const appServer = new Server(new AppExpress(MongoDb), Config.serverPort);

appServer.start();