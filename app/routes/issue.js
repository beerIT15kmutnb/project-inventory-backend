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