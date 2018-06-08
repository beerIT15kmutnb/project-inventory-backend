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
router.put('/isactive', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let Id = req.body.id;
        let item = {
            is_active: req.body.is_active
        };
        let rs = yield productModel.isactive(db, item, Id);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/search-all-autocomplete', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    const query = req.query.q;
    const labelerId = req.query.labelerId;
    try {
        let rs = yield productModel.adminSearchAllProducts(db, query);
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
router.get('/search-autocomplete', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    const query = req.query.q;
    const labelerId = req.query.labelerId;
    try {
        let rs = yield productModel.searchProducts(db, query);
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
router.get('/getProductPackage/:id', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let id = req.params.id;
    try {
        let rs = yield productModel.getProductPackage(db, id);
        res.send({ ok: true, rows: rs });
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
    let query = req.body.query;
    try {
        let rsTotal;
        let rs;
        if (query !== '') {
            rsTotal = yield productModel.adminGetSearchProductTotal(db, query);
        }
        else {
            rsTotal = yield productModel.adminGetAllProductTotal(db);
        }
        rs = yield productModel.adminGetAllProducts(db, query, limit, offset);
        res.send({ ok: true, rows: rs, total: rsTotal[0].total });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/transection/list', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = +req.body.limit || 50;
    let offset = +req.body.offset || 0;
    try {
        let products = yield productModel.gettransectionList(db, limit, offset);
        res.send({ ok: true, rows: products });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/getGenericType', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let products = yield productModel.getGenericType(db);
        res.send({ ok: true, rows: products });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/addUnit', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let items = req.body.items;
        let item = {
            unit_name: items.unit_name,
            is_active: items.is_active
        };
        let rs = yield productModel.addUnit(db, item);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/editUnit', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let items = req.body.items;
        let item = {
            unit_name: items.unit_name,
            is_active: items.is_active
        };
        let unitId = items.unit_id;
        let rs = yield productModel.editUnit(db, item, unitId);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/getUnit', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let products = yield productModel.getUnit(db);
        res.send({ ok: true, rows: products });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/getLot', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let productId = req.query.productId;
    try {
        let products = yield productModel.getLot(db, productId);
        res.send({ ok: true, data: products });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/expired', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let products = yield productModel.expired(db);
        res.send({ ok: true, data: products });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/productsExpired', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let products = yield productModel.productsExpired(db);
        res.send({ ok: true, data: products });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/remain', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let product_id = req.body.product_id;
    try {
        let products = yield productModel.getProductRemain(db, product_id);
        console.log(products[0]);
        res.send({ ok: true, data: products[0] });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/saveAddProduct', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let items = req.body.items;
    let user_id = req.decoded.people_user_id;
    let item = {
        product_name: items.product_name,
        generic_id: items.generic_id,
        is_active: items.is_active,
        product_code: items.product_code,
        large_unit_id: items.large_unit_id,
        small_qty: items.small_qty,
        description: items.description,
        user_create_id: user_id
    };
    try {
        let rs = yield productModel.saveAddProduct(db, item);
        res.send({ ok: true, rows: rs[0] });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/saveAddGenerics', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let items = req.body.items;
    let user_id = req.decoded.people_user_id;
    let item = {
        generic_name: items.generic_name,
        generic_type_id: items.generic_type_id,
        is_active: items.is_active,
        min_qty: items.min_qty,
        max_qty: items.max_qty,
        small_unit_id: items.small_unit_id,
        generic_code: items.generic_code,
        comment: items.comment,
        user_create_id: user_id
    };
    try {
        let rs = yield productModel.saveAddGeneric(db, item);
        res.send({ ok: true, rows: rs[0] });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/saveEditGenerics', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let items = req.body.items;
    let id = items.generic_id;
    let user_id = req.decoded.people_user_id;
    let item = {
        generic_name: items.generic_name,
        generic_type_id: items.generic_type_id,
        is_active: items.is_active,
        small_unit_id: items.small_unit_id,
        min_qty: items.min_qty,
        max_qty: items.max_qty,
        generic_code: items.generic_code,
        comment: items.comment
    };
    try {
        let rs = yield productModel.saveEditGeneric(db, id, item);
        res.send({ ok: true, rows: rs[0] });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/saveEditProduct', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let items = req.body.items;
    let id = items.product_id;
    let item = {
        product_name: items.product_name,
        generic_id: items.generic_id,
        is_active: items.is_active,
        product_code: items.product_code,
        large_unit_id: items.large_unit_id,
        small_qty: items.small_qty,
        description: items.description
    };
    try {
        let rs = yield productModel.saveEditProduct(db, id, item);
        res.send({ ok: true, rows: rs[0] });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/stock/generics/all', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = req.body.limit || 10;
    let offset = req.body.offset || 0;
    let query = req.body.query;
    try {
        let rsTotal;
        let rs;
        if (query !== '') {
            rsTotal = yield productModel.adminGetSearchGnericTotal(db, query);
        }
        else {
            rsTotal = yield productModel.adminGetAllGenericTotal(db);
        }
        rs = yield productModel.adminGetAllGeneric(db, query, limit, offset);
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
router.get('/generic-search-autocomplete', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    const query = req.query.q;
    try {
        let rs = yield productModel.adminSearchGenerics(db, query);
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
router.get('/generic-all-search-autocomplete', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    const query = req.query.q;
    try {
        let rs = yield productModel.adminSearchAllGenerics(db, query);
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