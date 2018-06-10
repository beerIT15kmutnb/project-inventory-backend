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
const issue_1 = require("../models/issue");
const products_1 = require("../models/products");
const router = express.Router();
const issueModel = new issue_1.IssueModel();
const productModel = new products_1.ProductModel();
router.get('/gettransectionIssues', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let rs = yield issueModel.gettransectionIssues(db);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/saveIssue', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    const summary = req.body.summary;
    const products = req.body.products;
    let issueCode;
    let _issueCode;
    let _issueTmpCode;
    let productsData = [];
    let productsDetail = [];
    const decoded = req.decoded;
    try {
        const totalReceive = yield issueModel.getSerial(db);
        if (totalReceive[0]) {
            _issueCode = 'iss-';
            var pad_char = '0';
            var pad = new Array(1 + 8).join(pad_char);
            _issueCode += (pad + (+totalReceive[0].total + 1)).slice(-pad.length);
        }
        _issueTmpCode = _issueCode;
        if (summary.issueCode) {
            issueCode = summary.issueCode;
        }
        else {
            issueCode = _issueCode;
        }
        const data = {
            issue_code: issueCode,
            issue_date: summary.issueDate,
            transection_issue_id: summary.transectionId,
            comment: summary.comment,
            people_user_id: req.decoded.people_user_id,
            create_date: moment().format('YYYY-MM-DD'),
        };
        let rsSummary = yield issueModel.saveIssueSummary(db, data);
        console.log();
        for (let v of products) {
            let pdata = {
                issue_id: rsSummary[0],
                product_id: v.product_id,
                qty: +v.issue_qty
            };
            let ipId = yield issueModel.saveIssueDetail(db, pdata);
            for (let e of v.items) {
                let pdetail;
                if (e.qty > 0) {
                    pdetail = {
                        issue_product_id: ipId[0],
                        product_id: e.product_id,
                        lot_no: e.lot_no,
                        qty: e.qty,
                        wm_product_id: e.wm_product_id
                    };
                }
                yield issueModel.saveIssueProductDetail(db, pdetail);
            }
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
router.get('/setIssueDetail/:issueId', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let issue_id = req.params.issueId;
    try {
        let rs = yield issueModel.setIssueDetail(db, issue_id);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/setIssueProductDetail/:issuePId', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let issuePId = req.params.issuePId;
    try {
        let rs = yield issueModel.setIssueProductDetail(db, issuePId);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/setIssues/:issueId', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let issue_id = req.params.issueId;
    try {
        let rs = yield issueModel.setIssues(db, issue_id);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/update/:issueId', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let summary = req.body.summary;
    let products = req.body.products;
    let issueId = req.params.issueId;
    let productsData = [];
    try {
        let _summary = {};
        _summary.issue_date = summary.issueDate;
        _summary.transection_issue_id = summary.transectionId;
        _summary.comment = summary.comment;
        _summary.people_user_id = req.decoded.people_user_id,
            yield issueModel.updateSummary(db, issueId, _summary);
        yield issueModel.removeProduct(db, issueId);
        products.forEach((v) => {
            let pdata = {
                issue_id: issueId,
                product_id: v.product_id,
                qty: +v.issue_qty,
            };
            productsData.push(pdata);
        });
        yield issueModel.saveIssueDetail(db, productsData);
        res.send({ ok: true });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/approveIssue', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let issueIds = req.body.issueId;
    try {
        const decoded = req.decoded;
        const warehouseId = decoded.warehouseId;
        console.log(issueIds);
        for (let v of issueIds) {
            let summary = {
                is_approve: 'Y',
                approve_date: moment().format('YYYY-MM-DD'),
                approve_people_user_id: req.decoded.people_user_id
            };
            let rs = yield issueModel.getIssueApprove(db, v, warehouseId);
            let data = [];
            let _cutProduct = [];
            console.log(rs.out_qty + "----------------------");
            rs[0].forEach(e => {
                if (e.out_qty != 0) {
                    let cutProduct = {};
                    cutProduct.cutQty = e.out_qty > e.balance_qty ? e.balance_qty : e.out_qty;
                    cutProduct.wm_product_id = e.wm_product_id;
                    _cutProduct.push(cutProduct);
                }
            });
            console.log(_cutProduct + "++++++++++++++++++++");
            yield issueModel.updateSummaryApprove(db, v, summary);
            yield issueModel.saveProductStock(db, _cutProduct);
        }
        res.send({ ok: true });
    }
    catch (error) {
        console.log(error);
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.delete('/remove', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let issueId = req.query.issues;
    try {
        let data = {};
        data.is_cancel = 'Y';
        yield issueModel.removeIssueSummary(db, issueId, data);
        res.send({ ok: true });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/listDetail', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let id = req.query.id;
    try {
        let rs = yield issueModel.setIssueDetail(db, id);
        res.send({ ok: true, rows: rs, });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = +req.query.limit || 20;
    let offset = +req.query.offset || 0;
    let status = req.query.status || null;
    try {
        let rs = yield issueModel.getListIssues(db, +limit, offset, status);
        let rsTotal = yield issueModel.getListTotal(db, status);
        res.send({ ok: true, rows: rs, total: +rsTotal[0].total });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/info/products', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let issueId = req.query.issueId;
    try {
        let rs = yield issueModel.getProductDetail(db, issueId);
        res.send({ ok: true, rows: rs[0] });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/addType', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let items = req.body.items;
        console.log(items);
        let item = {
            transection_name: items.transection_name,
            is_active: items.is_active
        };
        let rs = yield issueModel.addType(db, item);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/isactive', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let Id = req.body.id;
        let item = {
            is_active: req.body.is_active
        };
        let rs = yield issueModel.isactive(db, item, Id);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/editType', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let items = req.body.items;
        let item = {
            transection_name: items.transection_name,
            is_active: items.is_active
        };
        let Id = items.transection_id;
        let rs = yield issueModel.editType(db, item, Id);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/getType', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let rs = yield issueModel.getType(db);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
exports.default = router;
//# sourceMappingURL=issue.js.map