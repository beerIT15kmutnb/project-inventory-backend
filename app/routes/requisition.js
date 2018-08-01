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
const moment = require("moment");
const co = require("co-express");
const requisition_1 = require("../models/requisition");
const serial_1 = require("../models/serial");
const issue_1 = require("../models/issue");
const router = express.Router();
const issueModel = new issue_1.IssueModel();
const requisitionModel = new requisition_1.RequisitionModel();
const serialModel = new serial_1.SerialModel();
router.get('/orders/waiting', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = +req.query.limit || 15;
    let offset = +req.query.offset || 0;
    let query = req.query.query;
    let fillterCancel = req.query.fillterCancel;
    let warehouseId = req.decoded.warehouseId;
    try {
        let rs = yield requisitionModel.getListWaiting(db, null, warehouseId, limit, offset, query, fillterCancel);
        let total = yield requisitionModel.totalListWaiting(db, null, warehouseId, query, fillterCancel);
        res.send({ ok: true, rows: rs[0], total: total[0] });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/orders/setReqs/:id', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let id = req.params.id;
    let warehouseId = req.decoded.warehouseId;
    try {
        let rs = yield requisitionModel.setReqs(db, id);
        res.send({ ok: true, rows: rs[0] });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/orders/setReqsDetail/:id', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let id = req.params.id;
    try {
        let rs = yield requisitionModel.setReqsDetail(db, id);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/orders/setReqsProductDetail/:id', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let id = req.params.id;
    try {
        let rs = yield requisitionModel.setReqsProductDetail(db, id);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.delete('/remove', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let requisitionId = req.query.requisitionId;
        let data = {};
        data.is_cancel = 'Y';
        yield requisitionModel.removeRequisition(db, requisitionId, data);
        res.send({ ok: true });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
}));
router.put('/orders/approveRequisitionOrder/:id', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let order = {};
    let id = req.params.id;
    let products = req.body.products;
    let people_id = req.decoded.people_id;
    try {
        order.is_approve = 'Y';
        order.user_confirm_id = people_id;
        order.confirm_date = moment().format('YYYY-MM-DD HH:mm:ss');
        yield requisitionModel.updateOrder(db, id, order);
        let item = [];
        for (let p of products) {
            let items = [];
            p.items.forEach((v) => {
                if (v.qty > 0) {
                    let obj = {
                        requisition_order_id: id,
                        wm_product_id: v.wm_product_id,
                        confirm_qty: v.qty
                    };
                    items.push(obj);
                }
            });
            yield requisitionModel.saveItemsDetail(db, items);
            let _cutProduct = [];
            items.forEach(e => {
                if (e.confirm_qty != 0) {
                    let cutProduct = {};
                    cutProduct.cutQty = e.confirm_qty;
                    cutProduct.wm_product_id = e.wm_product_id;
                    _cutProduct.push(cutProduct);
                }
            });
            yield issueModel.saveProductStock(db, _cutProduct);
        }
        res.send({ ok: true });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/orders/saveRequisitionOrder', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let order = req.body.order;
    let products = req.body.products;
    let people_id = req.decoded.people_id;
    let year = moment(order.requisition_date, 'YYYY-MM-DD').get('year');
    let month = moment(order.requisition_date, 'YYYY-MM-DD').get('month') + 1;
    try {
        let reqsCode;
        let _reqsCode;
        let _reqsTmpCode;
        const totalreqs = yield requisitionModel.getSerial(db);
        if (totalreqs[0]) {
            _reqsCode = 'RQ-';
            var pad_char = '0';
            var pad = new Array(1 + 8).join(pad_char);
            _reqsCode += (pad + (+totalreqs[0].total + 1)).slice(-pad.length);
        }
        _reqsTmpCode = _reqsCode;
        if (order.requisition_code) {
            reqsCode = order.requisition_code;
        }
        else {
            reqsCode = _reqsCode;
        }
        order.requisition_code = reqsCode;
        order.people_id = people_id;
        order.create_date = moment().format('YYYY-MM-DD HH:mm:ss');
        let rsOrder = yield requisitionModel.saveOrder(db, order);
        let requisitionId = rsOrder[0];
        let items = [];
        products.forEach((v) => {
            let obj = {
                requisition_order_id: requisitionId,
                product_id: v.product_id,
                requisition_qty: v.requisition_qty
            };
            items.push(obj);
        });
        yield requisitionModel.saveItems(db, items);
        res.send({ ok: true });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/orders/approved', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = +req.query.limit || 15;
    let offset = +req.query.offset || 0;
    let query = req.query.query;
    let warehouseId = req.decoded.warehouseId;
    let fillterCancel = 'all';
    try {
        let rs = yield requisitionModel.getListApproved(db, null, warehouseId, limit, offset, query, fillterCancel);
        let rst = yield requisitionModel.gettotalApproved(db, null, warehouseId, limit, offset, query, fillterCancel);
        res.send({ ok: true, rows: rs[0], total: rst[0] });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
}));
router.put('/orders/updateRequisitionOrder/:requisitionId', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let people_id = req.decoded.people_id;
    let requisitionId = req.params.requisitionId;
    let order = req.body.order;
    let products = req.body.products;
    let year = moment(order.requisition_date, 'YYYY-MM-DD').get('year');
    let month = moment(order.requisition_date, 'YYYY-MM-DD').get('month') + 1;
    try {
        let _order = {};
        _order.people_id = people_id;
        _order.requisition_date = order.requisition_date;
        let rsOrder = yield requisitionModel.updateOrder(db, requisitionId, _order);
        let items = [];
        products.forEach((v) => {
            let obj = {
                requisition_order_id: requisitionId,
                product_id: v.product_id,
                requisition_qty: v.requisition_qty,
            };
            items.push(obj);
        });
        yield requisitionModel.removeItems(db, requisitionId);
        yield requisitionModel.saveItems(db, items);
        res.send({ ok: true });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
exports.default = router;
//# sourceMappingURL=requisition.js.map