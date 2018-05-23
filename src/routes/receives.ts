const uuid = require('uuid/v4');

import * as express from 'express';
import * as moment from 'moment';
import * as Random from 'random-js';
import * as co from 'co-express';
import * as _ from 'lodash';

import * as fse from 'fs-extra';
import * as path from 'path';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as gulp from 'gulp';
import * as gulpData from 'gulp-data';
import * as gulpPug from 'gulp-pug';
// import * as pdf from 'html-pdf';
import * as json2xls from 'json2xls';
import * as numeral from 'numeral';

import { ReceiveModel } from '../models/receive';
import { ProductModel } from "../models/products";
// import { LocationModel } from "../models/location";
// import { WarehouseModel } from '../models/warehouse';
// import { LotModel } from '../models/lot';
// import { ThaiBath } from '../models/thaiBath';

// import { PeopleModel } from '../models/people';
import { SerialModel } from '../models/serial';
// import { StockCard } from '../models/stockcard';
// import { TransactionType } from '../interfaces/basic';
// import { PeriodModel } from '../models/period';

const router = express.Router();

const receiveModel = new ReceiveModel();
const productModel = new ProductModel();
// const locationModel = new LocationModel();
// const warehouseModel = new WarehouseModel();
// const peopleModel = new PeopleModel();
// const lotModel = new LotModel();
// const thaiBath = new ThaiBath();
const serialModel = new SerialModel();


router.post('/', co(async (req, res, next) => {

  let db = req.db;
  let summary = req.body.summary;
  let products = req.body.products;

  if (summary.deliveryCode && summary.deliveryDate && products.length) {

    let productsData = [];

    try {

      let year = moment(summary.receiveDate, 'YYYY-MM-DD').get('year');
      let month = moment(summary.receiveDate, 'YYYY-MM-DD').get('month') + 1;


      let receiveCode: null;
      let _receiveCode: any;
      let _receiveTmpCode: null;


      const totalReceive = await receiveModel.getSerial(db);
      if (totalReceive[0]) {
        _receiveCode = 'IN-'
        var pad_char = '0';
        var pad = new Array(1 + 8).join(pad_char);
        _receiveCode += (pad + (+totalReceive[0].total + 1)).slice(-pad.length);
      }

      _receiveTmpCode = _receiveCode;


      if (summary.receiveCode) {
        receiveCode = summary.receiveCode;
      } else {
        receiveCode = _receiveCode;
      }

      const data: any = {
        receive_code: _receiveCode,
        receive_date: summary.receiveDate,
        delivery_code: summary.deliveryCode,
        delivery_date: summary.deliveryDate,
        people_user_id: req.decoded.people_user_id
      }

        let rsSummary = await receiveModel.saveReceiveSummary(db, data);

        products.forEach((v: any) => {

          let pdata: any = {
            receive_id: rsSummary[0],
            product_id: v.product_id,
            receive_qty: +v.receive_qty,
            lot_no: v.lot_no,
            expired_date: moment(v.expired_date, 'DD/MM/YYYY').isValid() ? moment(v.expired_date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
          }

          productsData.push(pdata);
        });

        await receiveModel.saveReceiveDetail(db, productsData);
        res.send({ ok: true });

    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }

  } else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
  }

}));

router.put('/:receiveId', co(async (req, res, next) => {

  let db = req.db;
  let receiveId = req.params.receiveId;
  let summary = req.body.summary;
  let products: any = [];
  products = req.body.products;

  if (receiveId && summary.deliveryCode && summary.deliveryDate && summary.receiveDate && products.length) {

    const data: any = {
      // receive_code: summary.receiveCode,
      delivery_code: summary.deliveryCode,
      delivery_date: summary.deliveryDate,
      receive_date: summary.receiveDate,
      people_user_id: req.decoded.people_user_id
    }

    let productsData = [];
    products.forEach((v: any) => {
      let pdata: any = {
        receive_id: receiveId,
        product_id: v.product_id,
        receive_qty: +v.receive_qty,
        lot_no: v.lot_no,
        expired_date: moment(v.expired_date, 'DD/MM/YYYY').isValid() ? moment(v.expired_date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
      }

      productsData.push(pdata);
    });

    try {

      await receiveModel.updateReceiveSummary(db, receiveId, data);
      // remove old data
      await receiveModel.removeReceiveDetail(db, receiveId);
      // insert new data
      await receiveModel.saveReceiveDetail(db, productsData);
      res.send({ ok: true });


    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }


  } else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
  }

}));


// router.get('/other/expired/list', co(async (req, res, next) => {
//   let db = req.db;
//   let limit = req.query.limit;
//   let offset = req.query.offset;

//   try {
//     let rs = await receiveModel.getOtherExpired(db, limit, offset);
//     let rsTotal = await receiveModel.getOtherExpiredTotal(db);
//     res.send({ ok: true, rows: rs[0], total: rsTotal[0][0].total });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));

// router.get('/other/expired/search', co(async (req, res, next) => {
//   let db = req.db;
//   const q = req.query.q;
//   const _q = '%' + q + '%';
//   try {
//     let rs = await receiveModel.getOtherExpiredSearch(db, _q);
//     res.send({ ok: true, rows: rs[0] });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));

// router.get('/expired/list', co(async (req, res, next) => {
//   let db = req.db;
//   let limit = req.query.limit;
//   let offset = req.query.offset;

//   try {
//     let rs = await receiveModel.getExpired(db, limit, offset);
//     let rsTotal = await receiveModel.getExpiredTotal(db);
//     res.send({ ok: true, rows: rs[0], total: rsTotal[0][0].total });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));

// router.get('/expired/search', co(async (req, res, next) => {
//   let db = req.db;
//   const q = req.query.q;
//   const _q = '%' + q + '%';
//   try {
//     let rs = await receiveModel.getExpiredSearch(db, _q);
//     res.send({ ok: true, rows: rs[0] });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));

// router.get('/other/product-list/:receiveOtherId', co(async (req, res, next) => {
//   let db = req.db;
//   let receiveOtherId = req.params.receiveOtherId;

//   try {
//     let rs = await receiveModel.getReceiveOtherProductList(db, receiveOtherId);
//     res.send({ ok: true, rows: rs[0] });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));

// router.delete('/other/:receiveOtherId', co(async (req, res, next) => {

//   let db = req.db;
//   let receiveOtherId = req.params.receiveOtherId;

//   if (receiveOtherId) {
//     try {
//       let peopleUserId: any = req.decoded.people_user_id;
//       await receiveModel.removeReceiveOther(db, receiveOtherId, peopleUserId);
//       res.send({ ok: true });
//     } catch (error) {
//       console.log(error);
//       res.send({ ok: false, error: error.message });
//     } finally {
//       db.destroy();
//     }
//   } else {
//     res.send({ ok: false, error: 'ไม่พบรายการที่ต้องการลบ' });
//   }

// }));

// router.get('/other/detail/:receiveOtherId', co(async (req, res, next) => {

//   let db = req.db;
//   let receiveOtherId = req.params.receiveOtherId;

//   if (receiveOtherId) {
//     try {
//       let rs = await receiveModel.getReceiveOtherDetail(db, receiveOtherId);
//       res.send({ ok: true, detail: rs });
//     } catch (error) {
//       console.log(error);
//       res.send({ ok: false, error: error.message });
//     } finally {
//       db.destroy();
//     }
//   } else {
//     res.send({ ok: false, error: 'ไม่พบรายการที่ต้องการ' });
//   }

// }));

// router.get('/other/detail/product-list/:receiveOtherId', co(async (req, res, next) => {

//   let db = req.db;
//   let receiveOtherId = req.params.receiveOtherId;

//   if (receiveOtherId) {
//     try {
//       let rs = await receiveModel.getReceiveOtherEditProductList(db, receiveOtherId);
//       res.send({ ok: true, rows: rs[0] });
//     } catch (error) {
//       console.log(error);
//       res.send({ ok: false, error: error.message });
//     } finally {
//       db.destroy();
//     }
//   } else {
//     res.send({ ok: false, error: 'ไม่พบรายการที่ต้องการ' });
//   }

// }));

// router.post('/other', co(async (req, res, next) => {

//   let db = req.db;
//   let summary = req.body.summary;
//   let products: any = [];
//   products = req.body.products;

//   if (summary.receiveDate && summary.receiveTypeId && summary.donatorId && products.length) {
//     try {
//       let receiveCode = await serialModel.getSerial(db, 'RO');
//       // let receiveId = moment().format('x');

//       const data: any = {
//         receive_code: receiveCode,
//         receive_type_id: summary.receiveTypeId,
//         receive_date: summary.receiveDate,
//         receive_status_id: summary.receiveStatusId,
//         comment: summary.comment,
//         delivery_code: summary.deliveryCode,
//         donator_id: summary.donatorId,
//         people_user_id: req.decoded.people_user_id,
//         created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
//         comment_expired: summary.comment_expired,
//         is_expired: summary.is_expired
//       }

//       let year = moment(summary.receiveDate, 'YYYY-MM-DD').get('year');
//       let month = moment(summary.receiveDate, 'YYYY-MM-DD').get('month') + 1;

//       let isClose = await periodModel.isPeriodClose(db, year, month);

//       if (isClose) {
//         res.send({ ok: false, error: 'บัญชีถูกปิดแล้ว' });
//       } else {
//         let rsSummary = await receiveModel.saveReceiveSummaryOther(db, data);

//         let productsData = [];

//         products.forEach((v: any) => {
//           let pdata: any = {
//             // conversion_qty: +v.conversion_qty,
//             receive_other_id: rsSummary[0],
//             product_id: v.product_id,
//             receive_qty: +v.receive_qty,
//             unit_generic_id: v.unit_generic_id,
//             location_id: v.location_id,
//             warehouse_id: v.warehouse_id,
//             cost: +v.cost,
//             lot_no: v.lot_no,
//             expired_date: moment(v.expired_date, 'DD/MM/YYYY').isValid() ? moment(v.expired_date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
//             manufacturer_labeler_id: v.manufacture_id
//           }
//           productsData.push(pdata);
//         });

//         await receiveModel.saveReceiveDetailOther(db, productsData);
//         res.send({ ok: true, rows: rsSummary });
//       }

//     } catch (error) {
//       res.send({ ok: false, error: error.message });
//     } finally {
//       db.destroy();
//     }

//   } else {
//     res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
//   }

// }));

// router.put('/other/:receiveOtherId', co(async (req, res, next) => {

//   let db = req.db;
//   let receiveOtherId = req.params.receiveOtherId;
//   let summary = req.body.summary;
//   let products: any = [];

//   products = req.body.products;

//   if (summary.receiveDate && summary.receiveTypeId && summary.donatorId && products.length) {

//     const data: any = {
//       receive_type_id: summary.receiveTypeId,
//       receive_date: summary.receiveDate,
//       comment: summary.comment,
//       delivery_code: summary.deliveryCode,
//       donator_id: summary.donatorId,
//       people_user_id: req.decoded.people_user_id,
//       is_expired: summary.is_expired,
//       comment_expired: summary.comment_expired
//     }

//     let productsData = [];

//     products.forEach((v: any) => {
//       let pdata: any = {
//         receive_other_id: receiveOtherId,
//         // conversion_qty: +v.conversion_qty,
//         product_id: v.product_id,
//         receive_qty: +v.receive_qty,
//         unit_generic_id: v.unit_generic_id,
//         location_id: v.location_id,
//         warehouse_id: v.warehouse_id,
//         cost: +v.cost,
//         lot_no: v.lot_no,
//         expired_date: moment(v.expired_date, 'DD/MM/YYYY').isValid() ? moment(v.expired_date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
//         manufacturer_labeler_id: v.manufacture_id
//       }
//       productsData.push(pdata);
//     });

//     try {

//       let year = moment(summary.receiveDate, 'YYYY-MM-DD').get('year');
//       let month = moment(summary.receiveDate, 'YYYY-MM-DD').get('month') + 1;

//       let isClose = await periodModel.isPeriodClose(db, year, month);

//       if (isClose) {
//         res.send({ ok: false, error: 'บัญชีถูกปิดแล้ว' });
//       } else {
//         await receiveModel.updateReceiveSummaryOther(db, receiveOtherId, data);
//         await receiveModel.removeReceiveDetailOther(db, receiveOtherId);
//         await receiveModel.saveReceiveDetailOther(db, productsData);
//         res.send({ ok: true });
//       }

//     } catch (error) {
//       res.send({ ok: false, error: error.message });
//     } finally {
//       db.destroy();
//     }

//   } else {
//     res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
//   }

// }));

router.post('/approve', co(async (req, res, next) => {
  try {
    let db = req.db;
    let userId = req.decoded.id;
    let peopleId = req.decoded.people_id;
    let receiveIds = req.body.receiveIds;
    try {
      await receiveModel.saveApprove(db, receiveIds);
      // get product
      let _rproducts = await receiveModel.getReceiveProductsImport(db, receiveIds);
      let products: any = [];
      _rproducts.forEach((v: any) => {
        let id = uuid();
        let obj_adjust: any = {};
        let obj: any = {
          wm_product_id: id,
          warehouse_id: 1,
          product_id: v.product_id,
          qty: v.receive_qty,
          lot_no: v.lot_no,
          expired_date: moment(v.expired_date, 'YYYY-MM-DD').isValid() ? moment(v.expired_date, 'YYYY-MM-DD').format('YYYY-MM-DD') : null,
          people_user_id: req.decoded.people_user_id
        };
        // add product
        products.push(obj);
      });
      console.log('++++++++', products);

      await receiveModel.saveProducts(db, products);
      res.send({ ok: true });
    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }
}));



router.get('/products', co(async (req, res, next) => {
  let db = req.db;
  let receiveId = req.query.receiveId;
  if (receiveId) {
    try {
      let results = await receiveModel.getReceiveProducts(db, receiveId);
      res.send({ ok: true, rows: results });
    } catch (error) {
      res.send({ ok: false, errror: error.message });
    } finally {
      db.destroy();
    }
  } else {
    res.send({ ok: false, error: 'กรุณาระบุเลขที่ใบรับ' });
  }
}));

// router.delete('/remove', co(async (req, res, next) => {
//   let db = req.db;
//   let receiveId = req.query.receiveId;
//   if (receiveId) {
//     try {
//       let peopleUserId: any = req.decoded.people_user_id;
//       await receiveModel.removeReceive(db, receiveId, peopleUserId)
//       res.send({ ok: true })
//     } catch (error) {
//       res.send({ ok: false, error: error.message });
//     } finally {
//       db.destroy();
//     }
//   } else {
//     res.send({ ok: false, error: 'กรุณาระบุเลขที่ใบรับ' });
//   }
// }));

// router.get('/purchases/list', co(async (req, res, nex) => {
//   let limit = req.query.limit;
//   let offset = req.query.offset;
//   let db = req.db;
//   try {
//     const rows = await receiveModel.getPurchaseList(db, limit, offset);
//     const rstotal = await receiveModel.getPurchaseListTotal(db);
//     let total = +rstotal[0][0].total
//     res.send({ ok: true, rows: rows[0], total: total });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }

// }));

// router.get('/purchases/list/search', co(async (req, res, nex) => {
//   let limit = req.query.limit;
//   let offset = req.query.offset;
//   let query = req.query.query;
//   let db = req.db;
//   try {
//     const rows = await receiveModel.getPurchaseListSearch(db, limit, offset, query);
//     const rstotal = await receiveModel.getPurchaseListTotalSearch(db, query);
//     let total = +rstotal[0][0].total
//     res.send({ ok: true, rows: rows[0], total: total });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }

// }));

router.get('/info', co(async (req, res, nex) => {
  try {
    let db = req.db;
    try {
      let receiveId: any = req.query.receiveId;
      const rows = await receiveModel.getReceiveInfo(db, receiveId);
      res.send({ ok: true, rows: rows[0] });
    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }
}));
// router.get('/info/:receiveId', co(async (req, res, nex) => {
//   try {
//     const rows = await receiveModel.getPurchaseInfo(db, purchaseOrderId);
//     res.send({ ok: true, detail: rows[0] });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }

// }));

// router.get('/purchases/product-list', co(async (req, res, nex) => {

//   let db = req.db;
//   let purchaseOrderId = req.query.purchaseOrderId;
//   if (purchaseOrderId) {
//     try {
//       const rows = await receiveModel.getPurchaseProductList(db, purchaseOrderId);
//       res.send({ ok: true, rows: rows[0] });
//     } catch (error) {
//       res.send({ ok: false, error: error.message });
//     } finally {
//       db.destroy();
//     }
//   } else {
//     res.send({ ok: false, error: 'กรุณาระบุรหัสใบสั่งซื้อ' });
//   }

// }));
// router.get('/purchases/check-holiday', co(async (req, res, nex) => {
//   let date = req.query.date
//   let db = req.db;
//   date = moment(date).format('YYYY-MM-DD');
//   let dateNotYear = '2000' + moment(date).format('-MM-DD');
//   console.log('..............');

//   console.log(date);

//   const lastWeek: any = moment(date).format('d');
//   console.log(lastWeek);

//   if (lastWeek == 0 || lastWeek == 6) {
//     res.send({ ok: false, error: 'วันที่คุณเลือกเป็นวันหยุดราชการ จะรับสินค้าหรือไม่' });
//   } else {
//     try {
//       const rows = await receiveModel.getPurchaseCheckHoliday(db, date);
//       const row_notYear = await receiveModel.getPurchaseCheckHoliday(db, dateNotYear);


//       if (rows.length > 0 || row_notYear.length > 0) {
//         res.send({ ok: false, error: 'วันที่คุณเลือกเป็นวันหยุดราชการ จะรับสินค้าหรือไม่' });
//       } else {
//         res.send({ ok: true });
//       }
//     } catch (error) {
//       res.send({ ok: false, error: error.message });
//     } finally {
//       db.destroy();
//     }
//   }
// }));
// router.get('/purchases/check-expire', co(async (req, res, nex) => {
//   let genericId: any = req.query.genericId  //[{product_id:product_id,expired_date:expired_date}]
//   let expiredDate: any = req.query.expiredDate

//   let db = req.db;
//   let i = 0;
//   let l = 0;
//   let diffday: any;
//   try {
//     const rows = await receiveModel.getPurchaseCheckExpire(db, genericId);
//     const day = rows[0].num_days;
//     moment.locale('th');
//     console.log(moment(expiredDate));

//     diffday = moment(expiredDate).diff(moment(), 'days');
//     console.log(diffday);

//     if (day > diffday) {
//       i++;
//     }
//     if (diffday < 0) {
//       l++;
//     }

//     if (i == 0) {
//       res.send({ ok: true });
//     } else {
//       res.send({ ok: false, error: 'มียาใกล้หมดอายุภายใน ' + day + ' วัน ต้องการรับสินค้าหรือไม่' });
//     }
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }
// ));

// router.put('/update/cost', co(async (req, res, nex) => {

//   let db = req.db;
//   let products = req.body.products;
//   let productsData = [];
//   products.forEach((v: any) => {
//     if (v.cost != 0) {
//       let pdata: any = {
//         unit_generic_id: v.unit_generic_id,
//         cost: v.cost
//       }
//       productsData.push(pdata);
//     }
//   });
//   try {
//     const rows = await receiveModel.updateCost(db, productsData);
//     res.send({ ok: true, rows: rows[0] });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }


// }));

// router.get('/count/approve', (req, res, next) => {
//   let db = req.db;
//   let warehouseId = req.decoded.warehouseId
//   receiveModel.getCountApprove(db, warehouseId)
//     .then((results: any) => {
//       res.send({ ok: true, rows: results[0] });
//     })
//     .catch(error => {
//       res.send({ ok: false, error: error.message })
//     })
//     .finally(() => {
//       db.destroy();
//     });
// });


router.post('/status', co(async (req, res, next) => {
  let db = req.db;
  let limit = +req.body.limit;
  let offset = +req.body.offset;
  try {
    let rsTotal = await receiveModel.getReceiveStatusTotal(db);
    let total = +rsTotal[0][0].total;
    const results = await receiveModel.getReceiveStatus(db, limit, offset);
    res.send({ ok: true, rows: results[0], total: total });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.post('/status/search', co(async (req, res, next) => {
  let db = req.db;
  let limit = +req.body.limit;
  let offset = +req.body.offset;
  let warehouseId = req.decoded.warehouseId;
  let status = req.body.status;
  let query = req.body.query;
  try {
    let rsTotal = await receiveModel.getReceiveStatusSearchTotal(db, warehouseId, status, query);
    let total = +rsTotal[0][0].total;
    const results = await receiveModel.getReceiveStatusSearch(db, limit, offset, warehouseId, status, query);
    res.send({ ok: true, rows: results[0], total: total });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
export default router;
