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
const express = require("express");
const wrap = require("co-express");
const crypto = require("crypto");
const jwt_1 = require("../models/jwt");
const login_1 = require("../models/login");
const loginModel = new login_1.LoginModel();
const jwt = new jwt_1.Jwt();
const router = express.Router();
router.post('/genpass', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let password = req.body.password || '123456';
    let encPassword = crypto.createHash('md5').update(password).digest('hex');
    res.send({ password: password, hash: encPassword });
})));
router.post('/', wrap((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let username = req.body.username;
    let password = req.body.password;
    let db = req.db;
    if (username && password) {
        try {
            let encPassword = crypto.createHash('md5').update(password).digest('hex');
            let user = yield loginModel.doLogin(db, username, encPassword);
            if (user.length) {
                const payload = {
                    fullname: user[0].fullname,
                    id: user[0].user_id,
                    accessRight: user[0].access_right,
                    people_user_id: user[0].people_user_id,
                    people_id: user[0].people_id,
                    warehouseId: user[0].warehouse_id,
                    warehouseName: user[0].warehouse_name
                };
                const token = jwt.sign(payload);
                res.send({ ok: true, token: token });
            }
            else {
                res.send({ ok: false, error: 'ชื่อผู้ใช้งาน/รหัสผ่านไม่ถูกต้อง' });
            }
        }
        catch (error) {
            res.send({ ok: false, error: error.message });
        }
        finally {
            db.destroy();
        }
    }
    else {
        res.send({ ok: false, error: 'กรุณาระบุชื่อผู้ใช้งานและรหัสผ่าน' });
    }
})));
exports.default = router;
//# sourceMappingURL=login.js.map