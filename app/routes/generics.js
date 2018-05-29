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
const generics_1 = require("../models/generics");
const router = express.Router();
const genericModel = new generics_1.GenericModel();
router.get('/getGenericType', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let rs = yield genericModel.getGenericType(db);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.put('/addType', co((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let items = req.body.items;
        let item = {
            generic_type_name: items.generic_type_name,
            is_active: items.is_active
        };
        let rs = yield genericModel.addType(db, item);
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
            generic_type_name: items.generic_type_name,
            is_active: items.is_active
        };
        let genericTypeId = items.generic_type_id;
        let rs = yield genericModel.editType(db, item, genericTypeId);
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
//# sourceMappingURL=generics.js.map