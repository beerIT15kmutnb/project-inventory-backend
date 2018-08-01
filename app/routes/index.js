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
const path = require('path');
const fse = require('fs-extra');
const json2xls = require('json2xls');
const fs = require('fs');
const router = express.Router();
const reportModel = new report_1.ReportModel();
var moment = require('moment-timezone');
moment.locale('th');
const printDate = 'วันที่พิมพ์ ' + moment.tz('Asia/Bangkok').format('D MMMM ') + (moment.tz('Asia/Bangkok').get('year') + 543) + moment.tz('Asia/Bangkok').format(', HH:mm:ss น.');
const printMount = moment.tz('Asia/Bangkok').format('MMMM ');
const printYear = (moment.tz('Asia/Bangkok').get('year') + 543);
router.get('/', (req, res, next) => {
    res.send({ ok: true, message: 'Welcome to Inventory API server' });
});
router.get('/report/addGen/:additionId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let additionId = req.params.additionId;
    try {
        let _rs = yield reportModel.getGenType(db);
        for (let _genType of _rs) {
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
router.get('/report/addGen2/:additionId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let additionId = req.params.additionId;
    try {
        let _rs = yield reportModel.getGenType(db);
        for (let _genType of _rs) {
            let rs = yield reportModel.getReportGeneric(db, _genType.generic_type_id, additionId);
            _genType.detail = rs[0];
        }
        res.send({ ok: true, rows: { _rs: _rs, printMount: printMount } });
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
        let year = (moment.tz('Asia/Bangkok').get('year') + 543);
        let _rs = yield reportModel.getEquipType(db);
        for (let _genType of _rs) {
            let rs = yield reportModel.getReportEquipment(db, _genType.equipment_id, additionId);
            _genType.detail = rs[0];
        }
        res.render('addition-equipment', {
            _rs: _rs,
            year: printYear
        });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/report/addEqui2/:additionId', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let additionId = req.params.additionId;
    try {
        let year = (moment.tz('Asia/Bangkok').get('year') + 543);
        let _rs = yield reportModel.getEquipType(db);
        for (let _genType of _rs) {
            let rs = yield reportModel.getReportEquipment(db, _genType.equipment_id, additionId);
            _genType.detail = rs[0];
        }
        res.send({ ok: true, rows: { _rs: _rs, printMount: printYear } });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/report/generics/requisition', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let year = 0;
        let m = moment.tz('Asia/Bangkok').format('MM');
        let tmp = 0;
        let rs = [];
        let genAll = yield reportModel.genAll(db);
        let mm = [];
        let start = moment.tz('Asia/Bangkok').format('MMMM ') + (moment.tz('Asia/Bangkok').get('year') + 543);
        let end;
        for (let i = 12; i >= 1; i--) {
            let startDate = new Date((moment.tz('Asia/Bangkok').get('year')) - year, +m - 1 - tmp, 1);
            let dayLast = new Date((moment.tz('Asia/Bangkok').get('year')) - year, +m - tmp, 0);
            end = startDate;
            startDate = moment(startDate).format('YYYY-MM-DD');
            dayLast = moment(dayLast).format('YYYY-MM-DD');
            let _rs = yield reportModel.genAllReq(db, startDate, dayLast);
            rs.push(_rs[0]);
            mm.push(moment(startDate).format('MMM'));
            if (+m - tmp == 0) {
                m = 12;
                tmp = 0;
                year += 1;
            }
            tmp++;
        }
        end = moment(end).format('MMMM ') + (moment(end).get('year') + 543);
        res.render('all-gen-req', {
            genAll: genAll[0],
            rs: rs,
            mm: mm,
            start: start,
            end: end
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