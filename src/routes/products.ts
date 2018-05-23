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

router.post('/transaction/list',  wrap(async (req, res, next) => {
  let db = req.db;
  let limit = +req.body.limit || 50;
  let offset = +req.body.offset || 0;
  try {
      let products = await productModel.getTransactionList(db,limit,offset);
      res.send({ ok: true, rows: products})
  } catch (error){
      res.send({ ok: false, error: error.message });
  } finally {
      db.destroy();
  }
}));

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
router.get('/getLot',  wrap(async (req, res, next) => {
  let db = req.db;
  let productId = req.query.productId
  try {
      let products = await productModel.getLot(db,productId);
      res.send({ ok: true, data: products})
  } catch (error){
      res.send({ ok: false, error: error.message });
  } finally {
      db.destroy();
  }
}));

router.post('/remain',  wrap(async (req, res, next) => {
  let db = req.db;
  let product_id = req.body.product_id
  try {
      let products = await productModel.getProductRemain(db,product_id);
      console.log(products[0]);
      
      res.send({ ok: true, data: products[0]})
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

  router.get('/search-autocomplete', wrap(async (req, res, next) => {

    let db = req.db;
    const query = req.query.q;
    const labelerId = req.query.labelerId;
  
    try {
      let rs: any;
      if(labelerId){
        rs = await productModel.adminSearchAllProductsLabeler(db, query, labelerId);
      } else {
        rs = await productModel.adminSearchAllProducts(db, query);
      }
      
      if (rs[0].length) {
        res.send(rs[0]);
      } else {
        res.send([]);
      }
    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }
  
  }));

export default router;