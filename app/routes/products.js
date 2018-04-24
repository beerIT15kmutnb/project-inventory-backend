'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const wrap = require("co-express");
const products_1 = require("../models/products");
const router = express.Router();
const productModel = new products_1.ProductModel();
router.get('/', (req, res, next) => {
    res.send({ ok: true, message: 'Product API server' });
});
router.get('/getList', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let products = yield productModel.getList(db);
        res.send({ ok: true, data: products });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/stock/products/all', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = req.body.limit || 10;
    let offset = req.body.offset || 0;
    try {
        let rsTotal = yield productModel.adminGetAllProductTotal(db);
        let rs = yield productModel.adminGetAllProducts(db, limit, offset);
        res.send({ ok: true, rows: rs, total: rsTotal[0].total });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/stock/products/search', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = req.body.limit || 10;
    let offset = req.body.offset || 0;
    let query = req.body.query;
    let _pgs = [];
    try {
        let rsTotal = yield productModel.adminSearchProductsTotal(db, query);
        let rs = yield productModel.adminSearchProducts(db, query, limit, offset);
        res.send({ ok: true, rows: rs[0], total: rsTotal[0].length });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/search-autocomplete', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    const query = req.query.q;
    const labelerId = req.query.labelerId;
    try {
        let rs;
        if (labelerId) {
            rs = yield productModel.adminSearchAllProductsLabeler(db, query, labelerId);
        }
        else {
            rs = yield productModel.adminSearchAllProducts(db, query);
        }
        if (rs[0].length) {
            res.send(rs[0]);
        }
        else {
            res.send([]);
        }
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
exports.default = router;
//# sourceMappingURL=products.js.map