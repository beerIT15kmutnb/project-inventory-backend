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
exports.default = router;
//# sourceMappingURL=products.js.map