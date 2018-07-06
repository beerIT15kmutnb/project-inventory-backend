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
const report_1 = require("./../models/report");
const router = express.Router();
const reportModel = new report_1.ReportModel();
var moment = require('moment-timezone');
moment.locale('th');
const printDate = 'วันที่พิมพ์ ' + moment.tz('Asia/Bangkok').format('D MMMM ') + (moment.tz('Asia/Bangkok').get('year') + 543) + moment.tz('Asia/Bangkok').format(', HH:mm:ss น.');
const printMount = moment.tz('Asia/Bangkok').format('MMMM ');
router.get('/', (req, res, next) => {
    res.send({ ok: true, message: 'Welcome to Inventory API server' });
});
router.get('/report/addGen/:additionId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let additionId = req.params.additionId;
    try {
        let _rs = yield reportModel.getGenType(db);
        for (let _genType of _rs) {
            console.log(_genType.generic_type_id);
            console.log(additionId);
            let rs = yield reportModel.getReportGeneric(db, _genType.generic_type_id, additionId);
            _genType.detail = rs[0];
        }
        res.render('addition', {
            _rs: _rs,
            printMount: printMount
        });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/report/addEqui/:additionId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let additionId = req.params.additionId;
    try {
        let _rs = yield reportModel.getEquipType(db).transacting();
        for (let _genType of _rs) {
            console.log(_genType.generic_type_id);
            console.log(additionId);
            let rs = yield reportModel.getReportEquipment(db, _genType.generic_type_id, additionId);
            _genType.detail = rs[0];
        }
        res.render('addition-equipment', {
            _rs: _rs,
            printMount: printMount
        });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
exports.default = router;
//# sourceMappingURL=index.js.map