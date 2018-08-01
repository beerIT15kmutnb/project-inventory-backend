'use strict';

import * as express from 'express';
import * as moment from 'moment';

import * as co from 'co-express';
import * as uuid from 'uuid/v4';
import * as _ from 'lodash';

import { unitOfTime } from 'moment';
import { ReceiveModel } from '../models/receive';

import { EquipmentRequisitionModel } from '../models/equipment-requisition';
import { SerialModel } from '../models/serial';
import { EquipmentIssueModel } from '../models/equipment-issue';

const router = express.Router();
const issueModel = new EquipmentIssueModel();
const requisitionModel = new EquipmentRequisitionModel();
const serialModel = new SerialModel();
router.get('/orders/waiting', co(async (req, res, next) => {

  let db = req.db;
  let limit = +req.query.limit || 15;
  let offset = +req.query.offset || 0;
  let query = req.query.query;
  let fillterCancel = req.query.fillterCancel;
  let warehouseId = req.decoded.warehouseId;
  try {
    let rs: any = await requisitionModel.getListWaiting(db, null, warehouseId, limit, offset, query, fillterCancel);
    let total: any = await requisitionModel.totalListWaiting(db, null, warehouseId, query, fillterCancel);
    res.send({ ok: true, rows: rs[0], total: total[0] });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));
router.get('/orders/setReqs/:id', co(async (req, res, next) => {

  let db = req.db;
  let id = req.params.id ;
  let warehouseId = req.decoded.warehouseId;
  try {
    let rs: any = await requisitionModel.setReqs(db, id);
    res.send({ ok: true, rows: rs[0]});
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));
router.get('/orders/setReqsDetail/:id', co(async (req, res, next) => {
  let db = req.db;
  let id = req.params.id;
  try {
    let rs = await requisitionModel.setReqsDetail(db, id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message })
  } finally {
    db.destroy();
  }
}))
router.get('/orders/setReqsProductDetail/:id', co(async (req, res, next) => {
  let db = req.db;
  let id = req.params.id;
  try {
    let rs = await requisitionModel.setReqsProductDetail(db, id);
    res.send({ ok: true, rows: rs })
  } catch (error) {
    res.send({ ok: false, error: error.message })
  } finally {
    db.destroy();
  }
}))

router.delete('/remove', async (req, res, next) => {

  let db = req.db;
  
  try {
    let requisitionId: any = req.query.requisitionId;
    let data: any = {};
    data.is_cancel = 'Y';
    await requisitionModel.removeRequisition(db, requisitionId, data);

    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

});
router.put('/orders/approveRequisitionOrder/:id', co(async (req, res, next) => {
  let db = req.db;
  let order: any ={};
  let id = req.params.id
  let products = req.body.products;
  let people_id = req.decoded.people_id;

  try {
    
    order.is_approve = 'Y';
    order.user_confirm_id = people_id;
    order.confirm_date = moment().format('YYYY-MM-DD HH:mm:ss');

    await requisitionModel.updateOrder(db,id, order);
    
    let item: any = [];
    for(let p of products){
      let items: any = [];
      
      p.items.forEach((v: any) => {
        if(v.qty > 0){
          let obj: any = {
            requisition_order_id: id,
            wm_product_id: v.wm_product_id,
            confirm_qty: v.qty
          }
          items.push(obj)
        } 
        });
        
        await requisitionModel.saveItemsDetail(db, items);
        
        let _cutProduct = [];
        items.forEach(e => {
          if (e.confirm_qty != 0) {
            let cutProduct: any = {};
            cutProduct.cutQty = e.confirm_qty;
            cutProduct.wm_product_id = e.wm_product_id;
            _cutProduct.push(cutProduct);
          }
        });
        
        await issueModel.saveProductStock(db, _cutProduct);
    
    }
    
    
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));
router.put('/orders/saveRequisitionOrder', co(async (req, res, next) => {
  let db = req.db;
  let order: any = req.body.order;
  let products = req.body.products;
  let people_id = req.decoded.people_id;

  let year = moment(order.requisition_date, 'YYYY-MM-DD').get('year');
  let month = moment(order.requisition_date, 'YYYY-MM-DD').get('month') + 1;

  try {
    let reqsCode: null;
    let _reqsCode: any;
    let _reqsTmpCode: null;
    const totalreqs = await requisitionModel.getSerial(db);
    if (totalreqs[0]) {
      _reqsCode = 'RQ-'
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
    order.requisition_code = reqsCode;
    order.people_id = people_id;
    order.create_date = moment().format('YYYY-MM-DD HH:mm:ss');

    let rsOrder: any = await requisitionModel.saveOrder(db, order);
    let requisitionId = rsOrder[0];
    let items: any = [];

    products.forEach((v: any) => {
      let obj: any = {
        requisition_order_id: requisitionId,
        product_id: v.product_id,
        requisition_qty: v.requisition_qty
      }
      items.push(obj);
    });

    await requisitionModel.saveItems(db, items);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

}));

router.get('/orders/approved', async (req, res, next) => {

  let db = req.db;
  let limit = +req.query.limit || 15;
  let offset = +req.query.offset || 0;
  let query = req.query.query;
  let warehouseId = req.decoded.warehouseId;
  let fillterCancel = 'all';

  try {
    let rs: any = await requisitionModel.getListApproved(db, null, warehouseId, limit, offset, query,fillterCancel);
    let rst: any = await requisitionModel.gettotalApproved(db, null, warehouseId, limit, offset, query,fillterCancel);
    
    res.send({ ok: true, rows: rs[0], total:rst[0]});
  } catch (error) {
    res.send({ ok: false, error: error.message });
  } finally {
    db.destroy();
  }

});
// 
router.put('/orders/updateRequisitionOrder/:requisitionId', co(async (req, res, next) => {
  let db = req.db;
  let people_id = req.decoded.people_id;
  let requisitionId: any = req.params.requisitionId;
  let order: any = req.body.order;
  let products = req.body.products;

  let year = moment(order.requisition_date, 'YYYY-MM-DD').get('year');
  let month = moment(order.requisition_date, 'YYYY-MM-DD').get('month') + 1;
    try {
      let _order: any = {};
      _order.people_id = people_id;
      _order.requisition_date = order.requisition_date;

      let rsOrder: any = await requisitionModel.updateOrder(db, requisitionId, _order);

      let items: any = [];
      
      products.forEach((v: any) => {
        let obj: any = {
          requisition_order_id: requisitionId,
          product_id: v.product_id,
          requisition_qty: v.requisition_qty, // small qty
        }
        items.push(obj);
      });
      
      await requisitionModel.removeItems(db, requisitionId);
      await requisitionModel.saveItems(db, items);
      res.send({ ok: true });
    } catch (error) {
      res.send({ ok: false, error: error.message });
    } finally {
      db.destroy();
    }
  

}));

export default router;
