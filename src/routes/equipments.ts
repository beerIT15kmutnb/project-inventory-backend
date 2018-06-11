'use strict';

import * as express from 'express';
import * as moment from 'moment';

import * as co from 'co-express';
import * as uuid from 'uuid/v4';
import * as _ from 'lodash';

import { EquipmentModel } from '../models/equipments';

const router = express.Router();
const equipmentModel = new EquipmentModel()
/* GET home page. */
// router.get('/getEquipmentType', co(async (req, res, next) => {
//   let db = req.db;
//   try {
//     let rs = await equipmentModel.getEquipmentType(db);
//     res.send({ ok: true, rows: rs })
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));
router.get('/detail/:equipmentId', co(async (req, res, next) => {
  let db = req.db;
  let equipmentId = req.params.equipmentId
  try {
    let rs = await equipmentModel.getEquipment(db,equipmentId);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
// router.put('/addType', co(async (req, res, next) => {
//   let db = req.db;
//   try {
//     let items = req.body.items
//     let item = {
//       // equipment_type_name: items.equipment_type_name,
//       is_active: items.is_active
//     }
//     // let equipmentTypeId = items.equipment_type_id
//     let rs = await equipmentModel.addType(db, item);
//     res.send({ ok: true, rows: rs })
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));
// router.put('/editType', co(async (req, res, next) => {
//   let db = req.db;
//   try {
//     let items = req.body.items
//     let item = {
//       equipment_type_name: items.equipment_type_name,
//       is_active: items.is_active
//     }
//     let equipmentTypeId = items.equipment_type_id
//     let rs = await equipmentModel.editType(db, item, equipmentTypeId);
//     res.send({ ok: true, rows: rs })
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));
// router.put('/isactive', co(async (req, res, next) => {
//   let db = req.db;
//   try {
//     let Id = req.body.id
//     let item = {
//       is_active: req.body.is_active
//     }
   
//     let rs = await equipmentModel.isactive(db, item, Id);
//     res.send({ ok: true, rows: rs })
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));

export default router;