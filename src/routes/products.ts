'use strict';

import * as express from 'express';
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


export default router;