import chai from 'chai';
import chaiHttp from 'chai-http';

import Config from '../dist/utilities/config';
import Server from '../dist/server';
import MongoDb from '../dist/utilities/mongoDbHandler';
import AppExpress from '../dist/appExpress';

chai.use(chaiHttp); 

describe('API tests', () => {
  let request = null;
  let server = null;

  before(async () => {
    server = new Server(new AppExpress(MongoDb), Config.serverPort);
    let httpServer = await server.start();
    request = chai.request(httpServer);
  });

  after(() => {
    request = null;
    server.stop();
  });

  it('should return 200', done => {
    request
      .get('/')
      .end((err, res) => {
        chai.assert.equal(200, res.statusCode);
        done();
      });
	});
});