import express from 'express';

class IndexRouter {
  static get() {
    const router = express.Router();

    router.get('/', (req, res, next) => {
      res.status(200).send(JSON.parse('{ "isItWorking": "Yes it is!" }'));
    })

    return router;
  }
}

export default IndexRouter;