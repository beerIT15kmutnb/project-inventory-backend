// import { LogModel } from './../models/logs';
import * as express from 'express';
import * as wrap from 'co-express';
import * as moment from 'moment';
import * as crypto from 'crypto';
import * as _ from 'lodash';

import { Jwt } from '../models/jwt';

import { LoginModel } from '../models/login';

const loginModel = new LoginModel();
// const logModel = new LogModel();

const jwt = new Jwt();

const router = express.Router();

router.post('/genpass', wrap(async (req, res, next) => {
  let password = req.body.password || '123456';
  let encPassword = crypto.createHash('md5').update(password).digest('hex');
  res.send({ password: password, hash: encPassword });
}));

router.post('/', wrap(async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let db = req.db;

  if (username && password) {
    // get user detail
    try {
      let encPassword = crypto.createHash('md5').update(password).digest('hex');
      // let sysSetting = await loginModel.sysSettings(db);
      // const settings = await loginModel.getSystemSetting(db);
      // const expired: any = _.filter(settings, { 'action_name': 'WM_EXPIRED_YEAR_FORMAT' });

      let user: any = await loginModel.doLogin(db, username, encPassword);
      if (user.length) {
        console.log(user[0]);
        
        const payload = {
          fullname: user[0].fullname,
          id: user[0].user_id,
          accessRight: user[0].access_right,
          people_user_id: user[0].people_user_id,
          people_id: user[0].people_id,
          warehouseId: user[0].warehouse_id,
          warehouseName: user[0].warehouse_name
        };

        // settings.forEach(v => {
        //   payload[v.action_name] = v.action_value;
        // });
        
        const token = jwt.sign(payload);
        // let logData = {
        //   user_id: user[0].user_id,
        //   system: 'UM',
        //   action: 'LOGIN',
        //   people_user_id: user[0].people_user_id,
        //   remark: `${username} -> Success`,
        //   action_time: moment().format('x')
        // }
        // save log data
        // await logModel.saveLog(db, logData);
        res.send({ ok: true, token: token });
      } else {
        // let logData = {
        //   system: 'UM',
        //   action: 'LOGIN',
        //   remark: `${username} -> Incorrect username or password`,
        //   action_time: moment().format('x')
        // }
        // save log data
        // await logModel.saveLog(db, logData);
        res.send({ ok: false, error: 'ชื่อผู้ใช้งาน/รหัสผ่านไม่ถูกต้อง' });
      }
    } catch (error) {
      console.log(error);
      res.send({ ok: false, error: error.message })
    } finally {
      db.destroy();
    }

  } else {
    res.send({ ok: false, error: 'กรุณาระบุชื่อผู้ใช้งานและรหัสผ่าน' });
  }
}));

export default router;
