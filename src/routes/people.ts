'use strict';

import * as express from 'express';

import _ = require('lodash');
import * as moment from 'moment';
import * as wrap from 'co-express';
import { PeopleModel } from './../models/people'

const router = express.Router();
const peopleModel = new PeopleModel()
router.get('/', (req, res, next) => {
  res.send({ ok: true, message: 'Welcome API server' });
});

router.get('/getUser', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let rs: any = await peopleModel.getUser(db);
    let rsT: any = await peopleModel.getUserTotal(db);
    res.send({ ok: true, rows: rs, total: rsT })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.get('/getPeople', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let rs: any = await peopleModel.getPeople(db);
    let rsT: any = await peopleModel.getPeopleTotal(db);
    res.send({ ok: true, rows: rs, total: rsT })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

export default router;