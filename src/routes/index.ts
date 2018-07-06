'use strict';
import _ = require('lodash');
import * as express from 'express';
// import * as moment from 'moment';
import { unitOfTime } from 'moment';
import * as wrap from 'co-express';
import { ReportModel } from './../models/report'

const router = express.Router();
const reportModel = new ReportModel();

var moment = require('moment-timezone');
moment.locale('th');
const printDate = 'วันที่พิมพ์ ' + moment.tz('Asia/Bangkok').format('D MMMM ') + (moment.tz('Asia/Bangkok').get('year') + 543) + moment.tz('Asia/Bangkok').format(', HH:mm:ss น.');
const printMount = moment.tz('Asia/Bangkok').format('MMMM ')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({ ok: true, message: 'Welcome to Inventory API server' });
});

router.get('/report/addGen/:additionId', wrap(async (req, res, next) => {
  let db = req.db;
  let additionId = req.params.additionId
  try {
    let _rs = await reportModel.getGenType(db);
    for (let _genType of _rs) {
      console.log(_genType.generic_type_id);
      console.log(additionId);
      
      let rs = await reportModel.getReportGeneric(db, _genType.generic_type_id, additionId)
      _genType.detail = rs[0];
    }
    res.render('addition',{
      _rs:_rs,
      printMount: printMount
    })
    // res.send({ _rs: _rs });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.get('/report/addEqui/:additionId', wrap(async (req, res, next) => {
  let db = req.db;
  let additionId = req.params.additionId
  try {
    let _rs = await reportModel.getEquipType(db).transacting();
    for (let _genType of _rs) {
      console.log(_genType.generic_type_id);
      console.log(additionId);
      
      let rs = await reportModel.getReportEquipment(db, _genType.generic_type_id, additionId)
      _genType.detail = rs[0];
    }
    res.render('addition-equipment',{
      _rs:_rs,
      printMount: printMount
    })
    // res.send({ _rs: _rs });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

export default router;