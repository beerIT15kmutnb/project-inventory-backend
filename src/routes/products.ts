'use strict';

import * as express from 'express';
import * as moment from 'moment';
import { unitOfTime } from 'moment';
import * as wrap from 'co-express';

import { ProductModel } from '../models/products'
import _ = require('lodash');

const router = express.Router();
const productModel = new ProductModel();
/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({ ok: true, message: 'Product API server' });
});


/////////////////////////////////////
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

/////////////////////////////////////





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

router.get('/getGenericType', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let products = await productModel.getGenericType(db);
    res.send({ ok: true, rows: products })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}))
router.put('/addUnit', wrap(async (req, res, next) => {
  let db = req.db;
  try {
    let items = req.body.items
    let item = {
      unit_name: items.unit_name,
      is_active: items.is_active
    }
    // let genericTypeId = items.generic_type_id
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
    generic_id: items.generic_id,
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
router.put('/saveAddGenerics', wrap(async (req, res, next) => {
  let db = req.db;
  let items = req.body.items
  let user_id = req.decoded.people_user_id
  let item = {
    generic_name: items.generic_name,
    generic_type_id: items.generic_type_id,
    is_active: items.is_active,
    min_qty: items.min_qty,
    max_qty: items.max_qty,
    small_unit_id:items.small_unit_id,
    generic_code: items.generic_code,
    comment: items.comment,
    user_create_id: user_id
  }
  try {
    let rs = await productModel.saveAddGeneric(db, item);
    res.send({ ok: true, rows: rs[0] })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.put('/saveEditGenerics', wrap(async (req, res, next) => {
  let db = req.db;
  let items = req.body.items
  let id = items.generic_id
  let user_id = req.decoded.people_user_id
  let item = {
    generic_name: items.generic_name,
    generic_type_id: items.generic_type_id,
    is_active: items.is_active,
    small_unit_id:items.small_unit_id,
    min_qty: items.min_qty,
    max_qty: items.max_qty,
    generic_code: items.generic_code,
    comment: items.comment
  }
  try {
    let rs = await productModel.saveEditGeneric(db, id, item);
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
    generic_id: items.generic_id,
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
router.post('/stock/generics/all', wrap(async (req, res, next) => {
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
      rsTotal = await productModel.adminGetAllGenericTotal(db);
    }
    rs = await productModel.adminGetAllGeneric(db, query, limit, offset);
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


router.get('/generic-search-autocomplete', wrap(async (req, res, next) => {

  let db = req.db;
  const query = req.query.q;

  try {
    let rs = await productModel.adminSearchGenerics(db, query);


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
router.get('/generic-all-search-autocomplete', wrap(async (req, res, next) => {

  let db = req.db;
  const query = req.query.q;

  try {
    let rs = await productModel.adminSearchAllGenerics(db, query);


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