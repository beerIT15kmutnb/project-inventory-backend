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
const co = require("co-express");
const receive_1 = require("../models/receive");
const products_1 = require("../models/products");
const router = express.Router();
const receiveModel = new receive_1.ReceiveModel();
const productModel = new products_1.ProductModel();
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
router.post('/status', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = +req.body.limit;
    let offset = +req.body.offset;
    try {
        let rsTotal = yield receiveModel.getReceiveStatusTotal(db);
        let total = +rsTotal[0][0].total;
        const results = yield receiveModel.getReceiveStatus(db, limit, offset);
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