const uuid = require('uuid/v4');

import * as express from 'express';
import * as moment from 'moment';
import * as Random from 'random-js';
import * as co from 'co-express';
import * as _ from 'lodash';

import * as fse from 'fs-extra';
import * as path from 'path';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as gulp from 'gulp';
import * as gulpData from 'gulp-data';
import * as gulpPug from 'gulp-pug';
import * as json2xls from 'json2xls';
import * as numeral from 'numeral';

import { EquipmentReceiveModel } from '../models/equipment-receive';
import { EquipmentProductModel } from "../models/equipment-products";

import { SerialModel } from '../models/serial';

const router = express.Router();

const receiveModel = new EquipmentReceiveModel();
const productModel = new EquipmentProductModel();
const serialModel = new SerialModel();


router.post('/', co(async (req, res, next) => {

  let db = req.db;
  let summary = req.body.summary;
  let products = req.body.products;

  if (summary.deliveryCode && summary.deliveryDate && products.length) {

    let productsData = [];

    try {

      let year = moment(summary.receiveDate, 'YYYY-MM-DD').get('year');
      let month = moment(summary.receiveDate, 'YYYY-MM-DD').get('month') + 1;


      let receiveCode: null;
      let _receiveCode: any;
      let _receiveTmpCode: null;


      const totalReceive = await receiveModel.getSerial(db);
      if (totalReceive[0]) {
        _receiveCode = 'IN-'
        var pad_char = '0';
        var pad = new Array(1 + 8).join(pad_char);
        _receiveCode += (pad + (+totalReceive[0].total + 1)).slice(-pad.length);
      }

      _receiveTmpCode = _receiveCode;


      if (summary.receiveCode) {
        receiveCode = summary.receiveCode;
      } else {
        receiveCode = _receiveCode;
      }

      const data: any = {
        receive_code: _receiveCode,
        receive_date: summary.receiveDate,
        delivery_code: summary.deliveryCode,
        delivery_date: summary.deliveryDate,
        people_user_id: req.decoded.people_user_id
      }

        let rsSummary = await receiveModel.saveReceiveSummary(db, data);

        products.forEach((v: any) => {

          let pdata: any = {
            receive_id: rsSummary[0],
            product_id: v.product_id,
            receive_qty: +v.receive_qty,
            lot_no: v.lot_no,
            expired_date: moment(v.expired_date, 'DD/MM/YYYY').isValid() ? moment(v.expired_date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
          }

          productsData.push(pdata);
        });

        await receiveModel.saveReceiveDetail(db, productsData);
        res.send({ ok: true });

    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }

  } else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
  }

}));



/////////////////////////////////////////
router.put('/:receiveId', co(async (req, res, next) => {

  let db = req.db;
  let receiveId = req.params.receiveId;
  let summary = req.body.summary;
  let products: any = [];
  products = req.body.products;

  if (receiveId && summary.deliveryCode && summary.deliveryDate && summary.receiveDate && products.length) {

    const data: any = {
      delivery_code: summary.deliveryCode,
      delivery_date: summary.deliveryDate,
      receive_date: summary.receiveDate,
      people_user_id: req.decoded.people_user_id
    }

    let productsData = [];
    products.forEach((v: any) => {
      let pdata: any = {
        receive_id: receiveId,
        product_id: v.product_id,
        receive_qty: +v.receive_qty,
        lot_no: v.lot_no,
        expired_date: moment(v.expired_date, 'DD/MM/YYYY').isValid() ? moment(v.expired_date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
      }

      productsData.push(pdata);
    });

    try {

      await receiveModel.updateReceiveSummary(db, receiveId, data);
      // remove old data
      await receiveModel.removeReceiveDetail(db, receiveId);
      // insert new data
      await receiveModel.saveReceiveDetail(db, productsData);
      res.send({ ok: true });


    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }


  } else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
  }

}));



router.post('/approve', co(async (req, res, next) => {
  try {
    let db = req.db;
    let userId = req.decoded.id;
    let peopleId = req.decoded.people_id;
    let receiveIds = req.body.receiveIds;
    receiveIds = Array.isArray(receiveIds) ? receiveIds : [receiveIds]
    try {
      await receiveModel.saveApprove(db, receiveIds);
      let _rproducts = await receiveModel.getReceiveProductsImport(db, receiveIds);
      let products: any = [];
      _rproducts.forEach((v: any) => {
        let id = uuid();
        let obj_adjust: any = {};
        let obj: any = {
          wm_product_id: id,
          warehouse_id: 1,
          product_id: v.product_id,
          qty: v.receive_qty,
          lot_no: v.lot_no,
          expired_date: moment(v.expired_date, 'YYYY-MM-DD').isValid() ? moment(v.expired_date, 'YYYY-MM-DD').format('YYYY-MM-DD') : null,
          people_user_id: req.decoded.people_user_id
        };
        products.push(obj);
      });
      // console.log('++++++++', products);

      await receiveModel.saveProducts(db, products);
      res.send({ ok: true });
    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }
}));



router.get('/products', co(async (req, res, next) => {
  let db = req.db;
  let receiveId = req.query.receiveId;
  if (receiveId) {
    try {
      let results = await receiveModel.getReceiveProducts(db, receiveId);
      res.send({ ok: true, rows: results });
    } catch (error) {
      res.send({ ok: false, errror: error.message });
    } finally {
      db.destroy();
    }
  } else {
    res.send({ ok: false, error: 'กรุณาระบุเลขที่ใบรับ' });
  }
}));

router.delete('/remove', co(async (req, res, next) => {
  let db = req.db;
  let receiveId = req.query.receiveId;
  if (receiveId) {
    try {
      let peopleUserId: any = req.decoded.people_user_id;
      await receiveModel.removeReceive(db, receiveId, peopleUserId)
      res.send({ ok: true })
    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }
  } else {
    res.send({ ok: false, error: 'กรุณาระบุเลขที่ใบรับ' });
  }
}));


router.get('/info', co(async (req, res, nex) => {
  try {
    let db = req.db;
    try {
      let receiveId: any = req.query.receiveId;
      const rows = await receiveModel.getReceiveInfo(db, receiveId);
      res.send({ ok: true, rows: rows[0] });
    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }
}));

router.post('/status', co(async (req, res, next) => {
  let db = req.db;
  let limit = +req.body.limit;
  let offset = +req.body.offset;
  let status = req.body.status;
  try {
    let rsTotal = await receiveModel.getReceiveStatusTotal(db,status);
    let total = +rsTotal[0][0].total;
    const results = await receiveModel.getReceiveStatus(db, limit, offset,status);
    res.send({ ok: true, rows: results[0], total: total });
  } catch (error) {
    // console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.post('/status/search', co(async (req, res, next) => {
  let db = req.db;
  let limit = +req.body.limit;
  let offset = +req.body.offset;
  let warehouseId = req.decoded.warehouseId;
  let status = req.body.status;
  let query = req.body.query;
  try {
    let rsTotal = await receiveModel.getReceiveStatusSearchTotal(db, warehouseId, status, query);
    let total = +rsTotal[0][0].total;
    const results = await receiveModel.getReceiveStatusSearch(db, limit, offset, warehouseId, status, query);
    res.send({ ok: true, rows: results[0], total: total });
  } catch (error) {
    // console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
export default router;
