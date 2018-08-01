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
const crypto = require("crypto");
const wrap = require("co-express");
const people_1 = require("./../models/people");
const router = express.Router();
const peopleModel = new people_1.PeopleModel();
router.get('/', (req, res, next) => {
    res.send({ ok: true, message: 'Welcome API server' });
});
router.get('/getUser', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let rs = yield peopleModel.getUser(db);
        let rsT = yield peopleModel.getUserTotal(db);
        res.send({ ok: true, rows: rs, total: rsT });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/getPeople', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let rs = yield peopleModel.getPeople(db);
        let rsT = yield peopleModel.getPeopleTotal(db);
        res.send({ ok: true, rows: rs, total: rsT });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.get('/getTitles', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    try {
        let rs = yield peopleModel.getTitles(db);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/savePeople', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let items = req.body.items;
    console.log(req.body);
    try {
        let item = {
            title_id: items.title_id,
            fname: items.fname,
            is_active: items.is_active,
            lname: items.lname,
        };
        console.log(item);
        let rs = yield peopleModel.savePeople(db, item);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/editUser', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let items = req.body.items;
    try {
        let itemUser = {
            password: crypto.createHash('md5').update(items.password).digest('hex')
        };
        console.log(itemUser);
        let rs = yield peopleModel.editUser(db, itemUser, items.user_id);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/saveUser', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let items = req.body.items;
    try {
        let itemUser = {
            username: items.username,
            is_active: items.is_active,
            password: crypto.createHash('md5').update(items.password).digest('hex'),
            access_right: items.access_right,
            warehouse_id: items.access_right == 'admin' ? 1 : 2
        };
        console.log(itemUser);
        let rs = yield peopleModel.saveUser(db, itemUser);
        let itemPu = {
            people_id: items.people_id,
            is_active: items.is_active,
            user_id: rs[0]
        };
        let rst = yield peopleModel.savePeoUser(db, itemPu);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
    finally {
        db.destroy();
    }
})));
router.post('/editPeople', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.db;
    let items = req.body.items;
    try {
        let item = {
            title_id: items.title_id,
            fname: items.fname,
            is_active: items.is_active,
            lname: items.lname
        };
        let id = items.people_id;
        let rs = yield peopleModel.editPeople(db, item, id);
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
//# sourceMappingURL=people.js.map