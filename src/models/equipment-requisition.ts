import Knex = require('knex');
import * as moment from 'moment';

export class EquipmentRequisitionModel {
  getListApproved(db: Knex, srcWarehouseId: any = null, dstWarehouseId: any = null, limit: number, offset: number, query = '', fillterCancel) {
    let _query = `%${query}%`;
    let sql = `
    select ro.*,
    (
    select sum(wm.qty) 
    from wm_equipment_products as wm 
    inner join mm_equipment_products as mp on mp.product_id=wm.product_id 
    inner join wm_equipment_requisition_order_items as roi on roi.product_id = mp.product_id
    where roi.requisition_order_id=ro.requisition_order_id
    ) as total_remain ,
    CONCAT(up.fname,' ',up.lname) as fullName 

    from wm_equipment_requisition_orders as ro 
    LEFT JOIN um_people as up on up.people_id = ro.people_id
    where ro.is_approve='Y' `;
    if (query) {
      sql += ` and (ro.requisition_code like '${_query}' or 
      w1.warehouse_name like '${_query}')`;
    }
    // if (fillterCancel === 'nCancel') {
    //   sql += ` and ro.is_cancel = 'N' `;
    // } else if (fillterCancel === 'cancel') {
    //   sql += ` and ro.is_cancel = 'Y' `;
    // }

    sql += `  order by ro.requisition_code DESC
      limit ? offset ?`;
    return db.raw(sql, [limit, offset]);

  }
  getListWaiting(db: Knex, srcWarehouseId: any = null, dstWarehouseId: any = null, limit: number, offset: number, query = '', fillterCancel) {
    let _query = `%${query}%`;
    let sql = `
    select ro.*,
    (
    select sum(wm.qty) 
    from wm_equipment_products as wm 
    inner join mm_equipment_products as mp on mp.product_id=wm.product_id 
    inner join wm_equipment_requisition_order_items as roi on roi.product_id = mp.product_id
    where roi.requisition_order_id=ro.requisition_order_id
    ) as total_remain ,
    CONCAT(up.fname,' ',up.lname) as fullName 

    from wm_equipment_requisition_orders as ro 
    LEFT JOIN um_people as up on up.people_id = ro.people_id
    where ro.is_approve='N' `;
    if (query) {
      sql += ` and (ro.requisition_code like '${_query}' or 
      w1.warehouse_name like '${_query}')`;
    }
    // if (fillterCancel === 'nCancel') {
    //   sql += ` and ro.is_cancel = 'N' `;
    // } else if (fillterCancel === 'cancel') {
    //   sql += ` and ro.is_cancel = 'Y' `;
    // }
    if (srcWarehouseId) {
      sql += `  order by ro.requisition_code DESC
      limit ? offset ?`;
      return db.raw(sql, [limit, offset]);
    } else {
      sql += `  order by ro.requisition_code DESC
      limit ? offset ?`;
      return db.raw(sql, [limit, offset]);
    }
  }

  totalListWaiting(db: Knex, srcWarehouseId: any = null, dstWarehouseId: any = null, query = '', fillterCancel) {
    let _query = `%${query}%`;
    let sql = `
    select count(*) as total
    from wm_equipment_requisition_orders as ro
    where ro.is_approve='N' `;

    if (query) {
      sql += ` and (ro.requisition_code like '${_query}')`;
    }
    if (fillterCancel === 'nCancel') {
      sql += ` and ro.is_cancel = 'N' `;
    } else if (fillterCancel === 'cancel') {
      sql += ` and ro.is_cancel = 'Y' `;
    }
    // if (srcWarehouseId) {
    //   sql += ` and ro.wm_equipment_requisition = ?`;
    //   return db.raw(sql, [srcWarehouseId]);
    // } else {
    //   sql += ` and ro.wm_equipment_withdraw = ?`;
    //   return db.raw(sql, [dstWarehouseId]);
    // }
    return db.raw(sql);
  }
  getSerial(knex: Knex) {
    return knex('wm_equipment_requisition_orders')
      .count('* as total')
  }
  saveOrder(knex: Knex, datas: any) {
    return knex('wm_equipment_requisition_orders')
      .insert(datas);
  }
  updateOrder(knex: Knex, id: any, datas: any) {
    return knex('wm_equipment_requisition_orders')
      .where('requisition_order_id', id)
      .update(datas);
    // .insert(datas);
  }
  removeItems(knex: Knex, id: any) {
    return knex('wm_equipment_requisition_order_items')
      .where('requisition_order_id', id)
      .del();
  }
  saveItemsDetail(knex: Knex, data: any) {
    let sqls = [];
    for (let datas of data) {
      let sql = `
    INSERT INTO wm_equipment_requisition_confirm_item
          (requisition_order_id, wm_product_id,confirm_qty)
          VALUES( ${datas.requisition_order_id}, '${datas.wm_product_id}',${datas.confirm_qty})
          ON DUPLICATE KEY UPDATE
          confirm_qty = ${datas.confirm_qty}
    `
      sqls.push(sql);
    }
    let queries = sqls.join(';');
    return knex.raw(queries)
  }
  saveItems(knex: Knex, datas: any) {
    return knex('wm_equipment_requisition_order_items')
      .insert(datas);
  }
  setReqs(knex: Knex, id: any) {
    return knex('wm_equipment_requisition_orders')
      .select('*')
      .where('requisition_order_id', id)
  }
  removeRequisition(knex: Knex, requisitionId: any, data: any) {
    return knex('wm_equipment_requisition_orders')
      .where('requisition_order_id', requisitionId)
      .update(data)
    // .del();
  }

  setReqsProductDetail(knex: Knex, id: any) {
    let sql = `SELECT
    ipd.*,
    wp.remainQty AS remainQty,
    wp.remainQty - ipd.qty AS remainQtyB,
    wp.expired_date 
    
  FROM
  wm_equipment_requisition_orders AS ip
    LEFT JOIN wm_equipment_requisition_confirm_item AS ipd ON ip.requisition_order_id = ipd.requisition_order_id
    LEFT JOIN (
  SELECT
    wp.product_id,
    wp.wm_product_id,
    sum( wp.qty ) AS remainQty,
    wp.lot_no,
    wp.expired_date 
  FROM
    wm_equipment_products AS wp 
  GROUP BY
    wp.product_id,
    wp.lot_no 
  ORDER BY
    wp.expired_date 
    ) AS wp ON wp.wm_product_id = ipd.wm_product_id 
  WHERE
    ip.requisition_order_id = ${id}`
    return knex.raw(sql);
  }
  setReqsDetail(knex: Knex, id: any) {
    let sql = `SELECT
    ip.*,
    mp.product_name,
    q.equipment_name,
    IFNULL( q.remainQty, 0 ) AS remainQty,
    q.small_qty,
    q.sm,
    q.lm 
  FROM
  wm_equipment_requisition_order_items AS ip
    LEFT JOIN mm_equipment_products AS mp ON mp.product_id = ip.product_id
    LEFT JOIN (
  SELECT
    sum( wp.qty ) AS remainQty,
    mp.small_qty,
    mg.equipment_name,
    ug1.unit_name AS sm,
    ug2.unit_name AS lm,
    wp.product_id 
  FROM
    mm_equipment_products AS mp
    LEFT JOIN wm_equipment_products AS wp ON wp.product_id = mp.product_id
    left join mm_equipments as mg on mg.equipment_id = mp.equipment_id 
    LEFT JOIN mm_equipment_units AS ug1 ON ug1.unit_id = mg.small_unit_id
    LEFT JOIN mm_equipment_units AS ug2 ON ug2.unit_id = mp.large_unit_id 
  GROUP BY
    mp.product_id 
    ) AS q ON q.product_id = ip.product_id 
  WHERE
    ip.requisition_order_id = ${id} `
    return knex.raw(sql)
  }
  //////



}
