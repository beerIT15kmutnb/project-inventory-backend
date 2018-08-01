'use strict';
import _ = require('lodash');
import * as express from 'express';
// import * as moment from 'moment';
import { unitOfTime } from 'moment';
import * as wrap from 'co-express';
import { ReportModel } from './../models/report'
const path = require('path')
const fse = require('fs-extra');
const json2xls = require('json2xls');
const fs = require('fs');
const router = express.Router();
const reportModel = new ReportModel();

var moment = require('moment-timezone');
moment.locale('th');
const printDate = 'วันที่พิมพ์ ' + moment.tz('Asia/Bangkok').format('D MMMM ') + (moment.tz('Asia/Bangkok').get('year') + 543) + moment.tz('Asia/Bangkok').format(', HH:mm:ss น.');
const printMount = moment.tz('Asia/Bangkok').format('MMMM ')
const printYear = (moment.tz('Asia/Bangkok').get('year') + 543)
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

      let rs = await reportModel.getReportGeneric(db, _genType.generic_type_id, additionId)
      _genType.detail = rs[0];
    }
    // res.send({ ok: true, rows: { _rs: _rs, printMount: printMount } })
    res.render('addition', {
      _rs: _rs,
      printMount: printMount
    })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.get('/report/addGen2/:additionId', wrap(async (req, res, next) => {
  let db = req.db;
  let additionId = req.params.additionId
  try {
    let _rs = await reportModel.getGenType(db);
    for (let _genType of _rs) {

      let rs = await reportModel.getReportGeneric(db, _genType.generic_type_id, additionId)
      _genType.detail = rs[0];
    }
    res.send({ ok: true, rows: { _rs: _rs, printMount: printMount } })
    // res.render('addition', {
    //   _rs: _rs,
    //   printMount: printMount
    // })
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
    let year = (moment.tz('Asia/Bangkok').get('year') + 543)
    let _rs = await reportModel.getEquipType(db);
    for (let _genType of _rs) {
      let rs = await reportModel.getReportEquipment(db, _genType.equipment_id, additionId)
      _genType.detail = rs[0];
    }
    // res.send({ _rs: _rs });
    res.render('addition-equipment', {
      _rs: _rs,
      year: printYear
    })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.get('/report/addEqui2/:additionId', wrap(async (req, res, next) => {
  let db = req.db;
  let additionId = req.params.additionId
  try {
    let year = (moment.tz('Asia/Bangkok').get('year') + 543)
    let _rs = await reportModel.getEquipType(db);
    for (let _genType of _rs) {
      let rs = await reportModel.getReportEquipment(db, _genType.equipment_id, additionId)
      _genType.detail = rs[0];
    }
    res.send({ ok: true, rows: { _rs: _rs, printMount: printYear } })
    // res.render('addition-equipment', {
    //   _rs: _rs,
    //   year: printYear
    // })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
// router.get('/report/product/all/excel', wrap(async (req, res, next) => {
//   let db = req.db;
//   try {
//     let year = (moment.tz('Asia/Bangkok').get('year') + 543)
//     let _rs = await reportModel.productAll(db);
//     res.send({ _rs: _rs });

//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }


// }));

router.get('/report/generics/requisition', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let year = 0
    let m = moment.tz('Asia/Bangkok').format('MM')
    let tmp = 0
    let rs: any = []
    let genAll = await reportModel.genAll(db)
    let mm: any = []
    let start = moment.tz('Asia/Bangkok').format('MMMM ') + (moment.tz('Asia/Bangkok').get('year') + 543)
    let end: any
    for (let i = 12; i >= 1; i--) {
      let startDate = new Date((moment.tz('Asia/Bangkok').get('year')) - year, +m - 1 - tmp, 1)
      let dayLast = new Date((moment.tz('Asia/Bangkok').get('year')) - year, +m - tmp, 0)
      end = startDate;
      startDate = moment(startDate).format('YYYY-MM-DD');
      dayLast = moment(dayLast).format('YYYY-MM-DD');
      let _rs = await reportModel.genAllReq(db, startDate, dayLast);
      rs.push(_rs[0])
      mm.push(moment(startDate).format('MMM'))
      // rs.push({ startDate: startDate, dayLast: dayLast })
      if (+m - tmp == 0) {
        m = 12
        tmp = 0
        year += 1
      }
      tmp++
    }
    end = moment(end).format('MMMM ') + (moment(end).get('year')+543)
    // res.send({ genAll:genAll[0],rs: rs[11][12] });
    res.render('all-gen-req', {
      genAll: genAll[0],
      rs: rs,
      mm: mm,
      start: start,
      end: end
    })

  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }


}));





export default router;