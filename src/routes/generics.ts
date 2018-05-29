'use strict';

import * as express from 'express';
import * as moment from 'moment';

import * as co from 'co-express';
import * as uuid from 'uuid/v4';
import * as _ from 'lodash';

import { GenericModel } from '../models/generics';

const router = express.Router();
const genericModel = new GenericModel()
/* GET home page. */
router.get('/getGenericType', co(async (req, res, next) => {
  let db = req.db;
  try {
    let rs = await genericModel.getGenericType(db);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.put('/addType', co(async (req, res, next) => {
  let db = req.db;
  try {
    let items = req.body.items
    let item = {
      generic_type_name: items.generic_type_name,
      is_active: items.is_active
    }
    // let genericTypeId = items.generic_type_id
    let rs = await genericModel.addType(db, item);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.put('/editType', co(async (req, res, next) => {
  let db = req.db;
  try {
    let items = req.body.items
    let item = {
      generic_type_name: items.generic_type_name,
      is_active: items.is_active
    }
    let genericTypeId = items.generic_type_id
    let rs = await genericModel.editType(db, item, genericTypeId);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

export default router;