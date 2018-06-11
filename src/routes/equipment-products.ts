'use strict';

import * as express from 'express';
import * as moment from 'moment';
import { unitOfTime } from 'moment';
import * as wrap from 'co-express';

import { EquipmentProductModel } from '../models/equipment-products'
import _ = require('lodash');

const router = express.Router();
const productModel = new EquipmentProductModel();
/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({ ok: true, message: 'Product API server' });
});


/////////////////////////////////////

router.post('/alert-expired', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let Id = Array.isArray[req.body.ids] ? req.body.ids : [req.body.ids]
    let numDays = {
      num_days: req.body.numDays
    }
    console.log(numDays, Id);

    let rs = await productModel.alertExpired(db, numDays, Id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    console.log(error);
    
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.put('/is-active-product', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let Id = req.body.id
    let item = {
      is_active: req.body.is_active
    }
    let rs = await productModel.isActiveProduct(db, item, Id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.put('/is-active-equipment', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let Id = req.body.id
    let item = {
      is_active: req.body.is_active
    }
    let rs = await productModel.isActiveEquipment(db, item, Id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.put('/isactive', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let Id = req.body.id
    let item = {
      is_active: req.body.is_active
    }
    let rs = await productModel.isactive(db, item, Id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.get('/search-all-autocomplete', wrap(async (req, res, next) => {

  let db = req.db;
  const query = req.query.q;
  const labelerId = req.query.labelerId;

  try {
    let rs: any = await productModel.adminSearchAllProducts(db, query);
    if (rs[0].length) {
      res.send(rs[0]);
    } else {
      res.send([]);
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));
router.get('/search-autocomplete', wrap(async (req, res, next) => {

  let db = req.db;
  const query = req.query.q;
  const labelerId = req.query.labelerId;

  try {
    let rs: any = await productModel.searchProducts(db, query);
    if (rs[0].length) {
      res.send(rs[0]);
    } else {
      res.send([]);
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));
router.get('/getProductPackage/:id', wrap(async (req, res, next) => {
  let db = req.db;
  let id = req.params.id
  try {
    let rs = await productModel.getProductPackage(db, id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.post('/stock/products/all', wrap(async (req, res, next) => {
  let db = req.db;
  let limit = req.body.limit || 10;
  let offset = req.body.offset || 0;
  let query = req.body.query;
  try {
    let rsTotal: any
    let rs: any
    if (query !== '') {
      rsTotal = await productModel.adminGetSearchProductTotal(db, query);
    } else {
      rsTotal = await productModel.adminGetAllProductTotal(db);
    }
    rs = await productModel.adminGetAllProducts(db, query, limit, offset);
    res.send({ ok: true, rows: rs, total: rsTotal[0].total });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));

router.post('/saveAdditionOrder', wrap(async (req, res, next) => {
  let db = req.db;
  let order: any = req.body.order;
  let items = req.body.items;
  let people_id = req.decoded.people_id;

  let year = moment(order.requisition_date, 'YYYY-MM-DD').get('year');
  let month = moment(order.requisition_date, 'YYYY-MM-DD').get('month') + 1;
  try {
    let reqsCode: null;
    let _reqsCode: any;
    let _reqsTmpCode: null;
    const totalreqs = await productModel.getSerial(db);
    if (totalreqs[0]) {
      _reqsCode = 'AD-'
      var pad_char = '0';
      var pad = new Array(1 + 8).join(pad_char);
      _reqsCode += (pad + (+totalreqs[0].total + 1)).slice(-pad.length);
    }
    _reqsTmpCode = _reqsCode;
    if (order.requisition_code) {
      reqsCode = order.requisition_code;
    } else {
      reqsCode = _reqsCode;
    }
    /////
    order.addition_code = reqsCode;
    // order.people_id = people_id;
    order.create_date = moment().format('YYYY-MM-DD');

    let rsOrder: any = await productModel.saveOrder(db, order);
    let requisitionId = rsOrder[0];
    let item: any = [];

    items.forEach((v: any) => {
      let obj: any = {
        addition_id: requisitionId,
        equipment_id: v.equipment_id,
        requisition_qty: v.requisition_qty
      }
      item.push(obj);
    });

    console.log(order, items)
    await productModel.saveItems(db, item);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
  // }

}));
/////////////////////////////////////



router.get('/addition-detail/:additionId', wrap(async (req, res, next) => {
  let db = req.db;
  let additionId = req.params.additionId 
  console.log(additionId);
  
  try {
    let products = await productModel.setAddDetail(db, additionId);
    res.send({ ok: true, rows: products })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.post('/addition/list', wrap(async (req, res, next) => {
  let db = req.db;
  let limit = +req.body.limit || 50;
  let offset = +req.body.offset || 0;
  try {
    let products = await productModel.getAdditionList(db, limit, offset);
    res.send({ ok: true, rows: products })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.post('/transection/list', wrap(async (req, res, next) => {
  let db = req.db;
  let limit = +req.body.limit || 50;
  let offset = +req.body.offset || 0;
  try {
    let products = await productModel.gettransectionList(db, limit, offset);
    res.send({ ok: true, rows: products })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

// router.get('/getEquipmentType', wrap(async (req, res, next) => {
//   let db = req.db;
//   try {
//     let products = await productModel.getEquipmentType(db);
//     res.send({ ok: true, rows: products })
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }))
router.put('/addUnit', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let items = req.body.items
    let item = {
      unit_name: items.unit_name,
      is_active: items.is_active
    }
    // let equipmentTypeId = items.equipment_type_id
    let rs = await productModel.addUnit(db, item);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.put('/editUnit', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let items = req.body.items
    let item = {
      unit_name: items.unit_name,
      is_active: items.is_active
    }
    let unitId = items.unit_id
    let rs = await productModel.editUnit(db, item, unitId);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.get('/getUnit', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let products = await productModel.getUnit(db);
    res.send({ ok: true, rows: products })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}))
// router.get('/getList', wrap(async (req, res, next) => {
//   let db = req.db;
//   try {
//     let products = await productModel.getList(db);
//     res.send({ ok: true, data: products })
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));
router.get('/getLot', wrap(async (req, res, next) => {
  let db = req.db;
  let productId = req.query.productId
  try {
    let products = await productModel.getLot(db, productId);
    res.send({ ok: true, data: products })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.get('/expired', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let products = await productModel.expired(db);
    res.send({ ok: true, data: products })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.get('/productsExpired', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let products = await productModel.productsExpired(db);
    res.send({ ok: true, data: products })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.get('/productsExpired/unset', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let products = await productModel.getUnsetProducts(db);
    res.send({ ok: true, data: products })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.post('/remain', wrap(async (req, res, next) => {
  let db = req.db;
  let product_id = req.body.product_id
  try {
    let products = await productModel.getProductRemain(db, product_id);
    console.log(products[0]);

    res.send({ ok: true, data: products[0] })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.put('/saveAddProduct', wrap(async (req, res, next) => {
  let db = req.db;
  let items = req.body.items
  let user_id = req.decoded.people_user_id
  let item = {
    product_name: items.product_name,
    equipment_id: items.equipment_id,
    is_active: items.is_active,
    product_code: items.product_code,
    large_unit_id: items.large_unit_id,
    small_qty: items.small_qty,
    description: items.description,
    user_create_id: user_id
  }
  try {
    let rs = await productModel.saveAddProduct(db, item);
    res.send({ ok: true, rows: rs[0] })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.put('/saveAddEquipments', wrap(async (req, res, next) => {
  let db = req.db;
  let items = req.body.items
  let user_id = req.decoded.people_user_id
  let item = {
    equipment_name: items.equipment_name,
    // equipment_type_id: items.equipment_type_id,
    is_active: items.is_active,
    min_qty: items.min_qty,
    max_qty: items.max_qty,
    small_unit_id: items.small_unit_id,
    equipment_code: items.equipment_code,
    comment: items.comment,
    user_create_id: user_id
  }
  try {
    let rs = await productModel.saveAddEquipment(db, item);
    res.send({ ok: true, rows: rs[0] })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.put('/saveEditEquipments', wrap(async (req, res, next) => {
  let db = req.db;
  let items = req.body.items
  let id = items.equipment_id
  let user_id = req.decoded.people_user_id
  let item = {
    equipment_name: items.equipment_name,
    // equipment_type_id: items.equipment_type_id,
    is_active: items.is_active,
    small_unit_id: items.small_unit_id,
    min_qty: items.min_qty,
    max_qty: items.max_qty,
    equipment_code: items.equipment_code,
    comment: items.comment
  }
  try {
    let rs = await productModel.saveEditEquipment(db, id, item);
    res.send({ ok: true, rows: rs[0] })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.put('/saveEditProduct', wrap(async (req, res, next) => {
  let db = req.db;
  let items = req.body.items
  let id = items.product_id
  let item = {
    product_name: items.product_name,
    equipment_id: items.equipment_id,
    is_active: items.is_active,
    product_code: items.product_code,
    large_unit_id: items.large_unit_id,
    small_qty: items.small_qty,
    description: items.description
  }
  try {
    let rs = await productModel.saveEditProduct(db, id, item);
    res.send({ ok: true, rows: rs[0] })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.post('/stock/equipments/all', wrap(async (req, res, next) => {
  let db = req.db;
  let limit = req.body.limit || 10;
  let offset = req.body.offset || 0;
  let query = req.body.query;
  try {
    let rsTotal: any
    let rs: any
    if (query !== '') {
      rsTotal = await productModel.adminGetSearchGnericTotal(db, query);
    } else {
      rsTotal = await productModel.adminGetAllEquipmentTotal(db);
    }
    rs = await productModel.adminGetAllEquipment(db, query, limit, offset);
    res.send({ ok: true, rows: rs, total: rsTotal[0].total });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));

router.post('/stock/products/search', wrap(async (req, res, next) => {
  let db = req.db;
  let limit = req.body.limit || 10;
  let offset = req.body.offset || 0;
  let query = req.body.query;
  let _pgs = [];
  try {
    let rsTotal = await productModel.adminSearchProductsTotal(db, query);
    let rs = await productModel.adminSearchProducts(db, query, limit, offset);
    res.send({ ok: true, rows: rs[0], total: rsTotal[0].length });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));


router.get('/equipment-search-autocomplete', wrap(async (req, res, next) => {

  let db = req.db;
  const query = req.query.q;

  try {
    let rs = await productModel.adminSearchEquipments(db, query);


    if (rs[0].length) {
      res.send(rs[0]);
    } else {
      res.send([]);
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));
router.get('/equipment-all-search-autocomplete', wrap(async (req, res, next) => {

  let db = req.db;
  const query = req.query.q;

  try {
    let rs = await productModel.adminSearchAllEquipments(db, query);


    if (rs[0].length) {
      res.send(rs[0]);
    } else {
      res.send([]);
    }
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));


export default router;