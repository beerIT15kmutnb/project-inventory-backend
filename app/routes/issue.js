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
const co = require("co-express");
const issue_1 = require("../models/issue");
const products_1 = require("../models/products");
const router = express.Router();
const issueModel = new issue_1.IssueModel();
const productModel = new products_1.ProductModel();
router.get('/getTransactionIssues', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let rs = yield issueModel.getTransactionIssues(db);
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
    const decoded = req.decoded;
    try {
        const totalReceive = yield issueModel.getSerial(db);
        if (totalReceive[0]) {
            _issueCode = 'iss-';
            var pad_char = '0';
            var pad = new Array(1 + 8).join(pad_char);
            _issueCode += (pad + totalReceive[0].total).slice(-pad.length);
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
            transaction_issue_id: summary.transactionId,
            comment: summary.comment,
            people_user_id: req.decoded.people_user_id
        };
        let rsSummary = yield issueModel.saveIssueSummary(db, data);
        products.forEach((v) => {
            let pdata = {
                issue_id: rsSummary[0],
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
        _summary.transaction_issue_id = summary.transactionId;
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
router.get('/', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let limit = +req.query.limit || 20;
    let offset = +req.query.offset || 0;
    let status = req.query.status || null;
    try {
        let rs = yield issueModel.getListIssues(db, +limit, offset, status);
        let rsTotal = yield issueModel.getListTotal(db, status);
        console.log('++++++', rs, rsTotal);
        res.send({ ok: true, rows: rs, total: +rsTotal[0].total });
    }
    catch (error) {
        console.log('-----------');
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
exports.default = router;
//# sourceMappingURL=issue.js.map