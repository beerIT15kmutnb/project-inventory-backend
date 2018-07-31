'use strict';

import * as express from 'express';
import * as moment from 'moment';
import * as co from 'co-express';
import * as _ from 'lodash';

import { EquipmentIssueModel } from '../models/equipment-issue';
import { EquipmentProductModel } from '../models/equipment-products';
import { SerialModel } from '../models/serial';

const router = express.Router();

const issueModel = new EquipmentIssueModel();
const productModel = new EquipmentProductModel();
router.get('/gettransectionIssues', co(async (req, res, next) => {
  let db = req.db;
  try {
    let rs = await issueModel.gettransectionIssues(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

router.put('/saveIssue', co(async (req, res, next) => {
  let db = req.db;
  const summary = req.body.summary;
  const products = req.body.products;
  let issueCode: null;
  let _issueCode: any;
  let _issueTmpCode: null;
  let productsData: any = [];
  let productsDetail: any = [];
  const decoded = req.decoded
  try {
    const totalReceive = await issueModel.getSerial(db);
    if (totalReceive[0]) {
      _issueCode = 'iss-'
      var pad_char = '0';
      var pad = new Array(1 + 8).join(pad_char);
      _issueCode += (pad + (+totalReceive[0].total + 1)).slice(-pad.length);
    }
    _issueTmpCode = _issueCode;
    if (summary.issueCode) {
      issueCode = summary.issueCode;
    } else {
      issueCode = _issueCode;
    }
    const data: any = {
      issue_code: issueCode,
      issue_date: summary.issueDate,
      transection_issue_id: summary.transectionId,
      comment: summary.comment,
      people_user_id: req.decoded.people_user_id,
      create_date: moment().format('YYYY-MM-DD'),
    }
    let rsSummary = await issueModel.saveIssueSummary(db, data);
    console.log();

    for (let v of products) {
      let pdata: any = {
        issue_id: rsSummary[0],
        product_id: v.product_id,
        qty: +v.issue_qty
      }
      let ipId = await issueModel.saveIssueDetail(db, pdata);

      for (let e of v.items) {
        let pdetail: any
        if (e.qty > 0) {
          pdetail = {
            issue_product_id: ipId[0],
            product_id: e.product_id,
            lot_no: e.lot_no,
            qty: e.qty,
            wm_product_id: e.wm_product_id
          }
        }
        await issueModel.saveIssueProductDetail(db, pdetail);
      }
    }
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}))
router.get('/setIssueDetail/:issueId', co(async (req, res, next) => {
  let db = req.db;
  let issue_id = req.params.issueId;
  try {
    let rs = await issueModel.setIssueDetail(db, issue_id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message })
  } finally {
    db.destroy();
  }
}))
router.get('/setIssueProductDetail/:issuePId', co(async (req, res, next) => {
  let db = req.db;
  let issuePId = req.params.issuePId;
  try {
    let rs = await issueModel.setIssueProductDetail(db, issuePId);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message })
  } finally {
    db.destroy();
  }
}))
router.get('/setIssues/:issueId', co(async (req, res, next) => {
  let db = req.db;
  let issue_id = req.params.issueId;
  try {
    let rs = await issueModel.setIssues(db, issue_id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message })
  } finally {
    db.destroy();
  }
}))
router.put('/update/:issueId', co(async (req, res, next) => {

  let db = req.db;
  let summary = req.body.summary;
  let products = req.body.products;
  let issueId = req.params.issueId;
  let productsData: any = [];
  try {
    let _summary: any = {};
    _summary.issue_date = summary.issueDate;
    _summary.transection_issue_id = summary.transectionId;
    _summary.comment = summary.comment;
    _summary.people_user_id = req.decoded.people_user_id,

      await issueModel.updateSummary(db, issueId, _summary);
    await issueModel.removeProduct(db, issueId);
    products.forEach((v: any) => {
      let pdata: any = {
        issue_id: issueId,
        product_id: v.product_id,
        qty: +v.issue_qty,
      }
      productsData.push(pdata);
    });

    await issueModel.saveIssueDetail(db, productsData);

    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));

router.post('/approveIssue', co(async (req, res, next) => {

  let db = req.db;
  let issueIds = req.body.issueIds;
  issueIds = Array.isArray(issueIds) ? issueIds : [issueIds]

  try {
    const decoded = req.decoded;
    const warehouseId = decoded.warehouseId;
    console.log(issueIds);

    for (let v of issueIds) {
      let summary = {
        is_approve: 'Y',
        approve_date: moment().format('YYYY-MM-DD'),
        approve_people_user_id: req.decoded.people_user_id
      }

      let rs = await issueModel.getIssueApprove(db, v, warehouseId);
      let data = [];
      let _cutProduct = [];
      console.log(rs.out_qty + "----------------------");

      rs[0].forEach(e => {
        if (e.out_qty != 0) {
          let cutProduct: any = {};
          cutProduct.cutQty = e.out_qty > e.balance_qty ? e.balance_qty : e.out_qty;
          cutProduct.wm_product_id = e.wm_product_id;
          _cutProduct.push(cutProduct);
        }
      });
      console.log(_cutProduct + "++++++++++++++++++++");

      await issueModel.updateSummaryApprove(db, v, summary);
      await issueModel.saveProductStock(db, _cutProduct);
    }

    res.send({ ok: true });

  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));

router.delete('/remove', co(async (req, res, next) => {

  let db = req.db;
  let issueId = req.query.issues;

  try {

    let data: any = {};
    data.is_cancel = 'Y';
    await issueModel.removeIssueSummary(db, issueId, data);

    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));

// use

router.get('/listDetail', co(async (req, res, next) => {
  let db = req.db;
  let id = req.query.id

  try {
    let rs = await issueModel.setIssueDetail(db, id);
    res.send({ ok: true, rows: rs, });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.get('/', co(async (req, res, next) => {
  let db = req.db;
  let limit = +req.query.limit || 20;
  let offset = +req.query.offset || 0;
  let status = req.query.status || null;

  try {
    let rs = await issueModel.getListIssues(db, +limit, offset, status);
    let rsTotal = await issueModel.getListTotal(db, status);
    res.send({ ok: true, rows: rs, total: +rsTotal[0].total });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
//use
// router.get('/info/products', co(async (req, res, next) => {
//   let db = req.db;
//   let issueId = req.query.issueId;

//   try {
//     let rs = await issueModel.getProductDetail(db, issueId);
//     res.send({ ok: true, rows: rs[0] });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   } finally {
//     db.destroy();
//   }
// }));
router.post('/addType', co(async (req, res, next) => {
  let db = req.db;
  try {
    let items = req.body.items
    console.log(items);
    
    let item = {
      transection_name: items.transection_name,
      is_active: items.is_active
    }
    let rs = await issueModel.addType(db, item);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));


router.put('/isactive', co(async (req, res, next) => {
  let db = req.db;
  try {
    let Id = req.body.id
    let item = {
      is_active: req.body.is_active
    }
   
    let rs = await issueModel.isactive(db, item, Id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.put('/editType', co(async (req, res, next) => {
  let db = req.db;
  try {
    let items = req.body.items
    let item = {
      transection_name: items.transection_name,
      is_active: items.is_active
    }
    let Id = items.transection_id
    let rs = await issueModel.editType(db, item, Id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));
router.get('/getType', co(async (req, res, next) => {
  let db = req.db;
  try {
    let rs = await issueModel.getType(db);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }
}));

export default router;
