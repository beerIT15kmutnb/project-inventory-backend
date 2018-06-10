"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require('uuid/v4');
const express = require("express");
const moment = require("moment");
const co = require("co-express");
const receive_1 = require("../models/receive");
const products_1 = require("../models/products");
const serial_1 = require("../models/serial");
const router = express.Router();
const receiveModel = new receive_1.ReceiveModel();
const productModel = new products_1.ProductModel();
const serialModel = new serial_1.SerialModel();
router.post('/', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let summary = req.body.summary;
    let products = req.body.products;
    if (summary.deliveryCode && summary.deliveryDate && products.length) {
        let productsData = [];
        try {
            let year = moment(summary.receiveDate, 'YYYY-MM-DD').get('year');
            let month = moment(summary.receiveDate, 'YYYY-MM-DD').get('month') + 1;
            let receiveCode;
            let _receiveCode;
            let _receiveTmpCode;
            const totalReceive = yield receiveModel.getSerial(db);
            if (totalReceive[0]) {
                _receiveCode = 'IN-';
                var pad_char = '0';
                var pad = new Array(1 + 8).join(pad_char);
                _receiveCode += (pad + (+totalReceive[0].total + 1)).slice(-pad.length);
            }
            _receiveTmpCode = _receiveCode;
            if (summary.receiveCode) {
                receiveCode = summary.receiveCode;
            }
            else {
                receiveCode = _receiveCode;
            }
            const data = {
                receive_code: _receiveCode,
                receive_date: summary.receiveDate,
                delivery_code: summary.deliveryCode,
                delivery_date: summary.deliveryDate,
                people_user_id: req.decoded.people_user_id
            };
            let rsSummary = yield receiveModel.saveReceiveSummary(db, data);
            products.forEach((v) => {
                let pdata = {
                    receive_id: rsSummary[0],
                    product_id: v.product_id,
                    receive_qty: +v.receive_qty,
                    lot_no: v.lot_no,
                    expired_date: moment(v.expired_date, 'DD/MM/YYYY').isValid() ? moment(v.expired_date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
                };
                productsData.push(pdata);
            });
            yield receiveModel.saveReceiveDetail(db, productsData);
            res.send({ ok: true });
        }
        catch (error) {
            res.send({ ok: false, error: error.message });
        }
        finally {
            db.destroy();
        }
    }
    else {
        res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
    }
})));
router.put('/:receiveId', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let receiveId = req.params.receiveId;
    let summary = req.body.summary;
    let products = [];
    products = req.body.products;
    if (receiveId && summary.deliveryCode && summary.deliveryDate && summary.receiveDate && products.length) {
        const data = {
            delivery_code: summary.deliveryCode,
            delivery_date: summary.deliveryDate,
            receive_date: summary.receiveDate,
            people_user_id: req.decoded.people_user_id
        };
        let productsData = [];
        products.forEach((v) => {
            let pdata = {
                receive_id: receiveId,
                product_id: v.product_id,
                receive_qty: +v.receive_qty,
                lot_no: v.lot_no,
                expired_date: moment(v.expired_date, 'DD/MM/YYYY').isValid() ? moment(v.expired_date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
            };
            productsData.push(pdata);
        });
        try {
            yield receiveModel.updateReceiveSummary(db, receiveId, data);
            yield receiveModel.removeReceiveDetail(db, receiveId);
            yield receiveModel.saveReceiveDetail(db, productsData);
            res.send({ ok: true });
        }
        catch (error) {
            res.send({ ok: false, error: error.message });
        }
        finally {
            db.destroy();
        }
    }
    else {
        res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
    }
})));
router.post('/approve', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let db = req.db;
        let userId = req.decoded.id;
        let peopleId = req.decoded.people_id;
        let receiveIds = req.body.receiveIds;
        try {
            yield receiveModel.saveApprove(db, receiveIds);
            let _rproducts = yield receiveModel.getReceiveProductsImport(db, receiveIds);
            let products = [];
            _rproducts.forEach((v) => {
                let id = uuid();
                let obj_adjust = {};
                let obj = {
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
            console.log('++++++++', products);
            yield receiveModel.saveProducts(db, products);
            res.send({ ok: true });
        }
        catch (error) {
            res.send({ ok: false, error: error.message });
        }
        finally {
            db.destroy();
        }
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
})));
router.get('/products', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let receiveId = req.query.receiveId;
    if (receiveId) {
        try {
            let results = yield receiveModel.getReceiveProducts(db, receiveId);
            res.send({ ok: true, rows: results });
        }
        catch (error) {
            res.send({ ok: false, errror: error.message });
        }
        finally {
            db.destroy();
        }
    }
    else {
        res.send({ ok: false, error: 'กรุณาระบุเลขที่ใบรับ' });
    }
})));
router.delete('/remove', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let receiveId = req.query.receiveId;
    if (receiveId) {
        try {
            let peopleUserId = req.decoded.people_user_id;
            yield receiveModel.removeReceive(db, receiveId, peopleUserId);
            res.send({ ok: true });
        }
        catch (error) {
            res.send({ ok: false, error: error.message });
        }
        finally {
            db.destroy();
        }
    }
    else {
        res.send({ ok: false, error: 'กรุณาระบุเลขที่ใบรับ' });
    }
})));
router.get('/info', co((req, res, nex) => __awaiter(this, void 0, void 0, function* () {
    try {
        let db = req.db;
        try {
            let receiveId = req.query.receiveId;
            const rows = yield receiveModel.getReceiveInfo(db, receiveId);
            res.send({ ok: true, rows: rows[0] });
        }
        catch (error) {
            res.send({ ok: false, error: error.message });
        }
        finally {
            db.destroy();
        }
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
})));
router.post('/status', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = +req.body.limit;
    let offset = +req.body.offset;
    let status = req.body.status;
    try {
        let rsTotal = yield receiveModel.getReceiveStatusTotal(db, status);
        let total = +rsTotal[0][0].total;
        const results = yield receiveModel.getReceiveStatus(db, limit, offset, status);
        res.send({ ok: true, rows: results[0], total: total });
    }
    catch (error) {
        console.log(error);
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/status/search', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = +req.body.limit;
    let offset = +req.body.offset;
    let warehouseId = req.decoded.warehouseId;
    let status = req.body.status;
    let query = req.body.query;
    try {
        let rsTotal = yield receiveModel.getReceiveStatusSearchTotal(db, warehouseId, status, query);
        let total = +rsTotal[0][0].total;
        const results = yield receiveModel.getReceiveStatusSearch(db, limit, offset, warehouseId, status, query);
        res.send({ ok: true, rows: results[0], total: total });
    }
    catch (error) {
        console.log(error);
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
exports.default = router;
//# sourceMappingURL=receives.js.map