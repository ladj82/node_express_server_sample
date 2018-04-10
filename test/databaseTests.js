import chai from 'chai';
import MongoDb from '../dist/utilities/mongoDbHandler';

describe('Database tests', () => {
  it('should throw error getting instance with no available connection', () => {
    try {
      MongoDb.instance;
    }
    catch(err) {
      chai.assert.instanceOf(err, Error);
    }
  });

  it('should connect to the databse', async () => {
    let result = await MongoDb.connect();
    chai.assert.equal(result, true);
  });

  it('should get database instance before open connection', () => {
      let instance = MongoDb.instance;
      chai.assert.isNotNull(instance);
  });

  it('should disconnect to the databse', () => {
    let result = MongoDb.disconnect();
    chai.assert.equal(result, true);
  });

  it('should throw error getting instance with no available connection', () => {
    try {
      MongoDb.instance;
    }
    catch(err) {
      chai.assert.instanceOf(err, Error);
    }
  });
});