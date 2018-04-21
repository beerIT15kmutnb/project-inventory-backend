'use strict';

import * as express from 'express';
import * as moment from 'moment';
import { unitOfTime } from 'moment';
import * as wrap from 'co-express';

import { ProductModel } from '../models/products'

const router = express.Router();
const productModel = new ProductModel();
/* GET home page. */
router.get('/', (req, res, next) => {
    res.send({ ok: true, message: 'Product API server' });
});

router.get('/getList',  wrap(async (req, res, next) => {
    let db = req.db;
    try {
        let products = await productModel.getList(db);
        res.send({ ok: true, data: products})
    } catch (error){
        res.send({ ok: false, error: error.message });
    } finally {
        db.destroy();
    }
}));

router.post('/stock/products/all', wrap(async (req, res, next) => {
    let db = req.db;
    let limit = req.body.limit || 10;
    let offset = req.body.offset || 0;
      try {
        let rsTotal = await productModel.adminGetAllProductTotal(db);
        let rs = await productModel.adminGetAllProducts(db, limit, offset);
        res.send({ ok: true, rows: rs, total: rsTotal[0].total });
      } catch (error) {
        res.send({ ok: false, error: error.message });
      } finally {
        db.destroy();
      }
  
  }));

  router.post('/stock/products/search', wrap(async (req, res, next) => {
    let db = req.db;
    let limit = req.body.limit || 10;
    let offset = req.body.offset || 0;
    let query = req.body.query;
    let _pgs = [];
      try {
        let rsTotal = await productModel.adminSearchProductsTotal(db, query);
        let rs = await productModel.adminSearchProducts(db, query , limit, offset);
        res.send({ ok: true, rows: rs[0], total: rsTotal[0].length });
      } catch (error) {
        res.send({ ok: false, error: error.message });
      } finally {
        db.destroy();
      }

  }));

export default router;