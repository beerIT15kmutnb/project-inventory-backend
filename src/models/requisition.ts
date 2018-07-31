import Knex = require('knex');
import * as moment from 'moment';

export class RequisitionModel {
  gettotalApproved(db: Knex, srcWarehouseId: any = null, dstWarehouseId: any = null, limit: number, offset: number, query = '', fillterCancel) {
    let _query = `%${query}%`;
    let sql = `
    select count(ro.requisition_code) as total
    from wm_requisition_orders as ro
    where ro.is_approve='Y' `;
    if (query) {
      sql += ` and ro.requisition_code like '${_query}' `;
    }

    sql += `  order by ro.requisition_code DESC`;
    return db.raw(sql);

  }
  getListApproved(db: Knex, srcWarehouseId: any = null, dstWarehouseId: any = null, limit: number, offset: number, query = '', fillterCancel) {
    let _query = `%${query}%`;
    let sql = `
    select ro.*,
    (
    select sum(wm.qty) 
    from wm_products as wm 
    inner join mm_products as mp on mp.product_id=wm.product_id 
    inner join wm_requisition_order_items as roi on roi.product_id = mp.product_id
    where roi.requisition_order_id=ro.requisition_order_id
    ) as total_remain ,
    CONCAT(up.fname,' ',up.lname) as fullName 

    from wm_requisition_orders as ro 
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
    from wm_products as wm 
    inner join mm_products as mp on mp.product_id=wm.product_id 
    inner join wm_requisition_order_items as roi on roi.product_id = mp.product_id
    where roi.requisition_order_id=ro.requisition_order_id
    ) as total_remain ,
    CONCAT(up.fname,' ',up.lname) as fullName 

    from wm_requisition_orders as ro 
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
    from wm_requisition_orders as ro
    where ro.is_approve='N' `;

    if (query) {
      sql += ` and (ro.requisition_code like '${_query}')`;
    }
    // if (fillterCancel === 'nCancel') {
    //   sql += ` and ro.is_cancel = 'N' `;
    // } 
    // else if (fillterCancel === 'cancel') {
    //   sql += ` and ro.is_cancel = 'Y' `;
    // }
    // if (srcWarehouseId) {
    //   sql += ` and ro.wm_requisition = ?`;
    //   return db.raw(sql, [srcWarehouseId]);
    // } else {
    //   sql += ` and ro.wm_withdraw = ?`;
    //   return db.raw(sql, [dstWarehouseId]);
    // }
    return db.raw(sql);
  }
  getSerial(knex: Knex) {
    return knex('wm_requisition_orders')
      .count('* as total')
  }
  saveOrder(knex: Knex, datas: any) {
    return knex('wm_requisition_orders')
      .insert(datas);
  }
  updateOrder(knex: Knex, id: any, datas: any) {
    return knex('wm_requisition_orders')
      .where('requisition_order_id', id)
      .update(datas);
    // .insert(datas);
  }
  removeItems(knex: Knex, id: any) {
    return knex('wm_requisition_order_items')
      .where('requisition_order_id', id)
      .del();
  }
  saveItemsDetail(knex: Knex, data: any) {
    let sqls = [];
    for (let datas of data) {
      let sql = `
    INSERT INTO wm_requisition_confirm_item
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
    return knex('wm_requisition_order_items')
      .insert(datas);
  }
  setReqs(knex: Knex, id: any) {
    return knex('wm_requisition_orders')
      .select('*')
      .where('requisition_order_id', id)
  }
  removeRequisition(knex: Knex, requisitionId: any, data: any) {
    return knex('wm_requisition_orders')
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
  wm_requisition_orders AS ip
    LEFT JOIN wm_requisition_confirm_item AS ipd ON ip.requisition_order_id = ipd.requisition_order_id
    LEFT JOIN (
  SELECT
    wp.product_id,
    wp.wm_product_id,
    sum( wp.qty ) AS remainQty,
    wp.lot_no,
    wp.expired_date 
  FROM
    wm_products AS wp 
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
    q.generic_name,
    IFNULL( q.remainQty, 0 ) AS remainQty,
    q.small_qty,
    q.sm,
    q.lm 
  FROM
  wm_requisition_order_items AS ip
    LEFT JOIN mm_products AS mp ON mp.product_id = ip.product_id
    LEFT JOIN (
  SELECT
    sum( wp.qty ) AS remainQty,
    mp.small_qty,
    mg.generic_name,
    ug1.unit_name AS sm,
    ug2.unit_name AS lm,
    wp.product_id 
  FROM
    mm_products AS mp
    LEFT JOIN wm_products AS wp ON wp.product_id = mp.product_id
    left join mm_generics as mg on mg.generic_id = mp.generic_id 
    LEFT JOIN mm_units AS ug1 ON ug1.unit_id = mg.small_unit_id
    LEFT JOIN mm_units AS ug2 ON ug2.unit_id = mp.large_unit_id 
  GROUP BY
    mp.product_id 
    ) AS q ON q.product_id = ip.product_id 
  WHERE
    ip.requisition_order_id = ${id} `
    return knex.raw(sql)
  }
  //////
  list(knex: Knex) {
    // let sql = `
    //   select re.requisition_id,wh1.warehouse_name as wm_requisition_name ,wh2.warehouse_name as wm_withdraw_name,
    //   re.confirm_requisition,re.approve_requisition, re.payable_requisition, re.admission_requisition, re.requisition_status,
    //   re.requisition_date
    //   from  wm_requisition re
    //   left join wm_warehouses wh1 on re.wm_requisition = wh1.warehouse_id
    //   left join wm_warehouses wh2 on re.wm_withdraw = wh2.warehouse_id
    //   where re.confirm_requisition = 'N'
    //    `;
    // // return knex('wm_requisition')
    // return knex.raw(sql);
  }



  getCheckId(knex: Knex, requisitionId: string) {
    // return knex('wm_requisition_check as rc')
    // .select('rc.check_id')
    // .where('requisition_id', requisitionId)
  }

  removeDetail(knex: Knex, requisitionId: string) {
    // return knex('wm_requisition_detail')
    //   .where('requisition_id', requisitionId)
    //   .del();
  }

  removeCheckDetail(knex: Knex, checkId: string) {
    // return knex('wm_requisition_check_detail')
    // .where('check_id',checkId)
    // .del();
  }

  saveDetail(knex: Knex, details: any) {
    // return knex('wm_requisition_detail')
    // .insert(details);
  }

  saveCheckDetail(knex: Knex, checkDetail: any) {
    // return knex('wm_requisition_check_detail')
    // .insert(checkDetail);
  }



  saveBorrow(knex: Knex, datasb: any) {
    // return knex('wm_requisition_preborrow')
    //   .insert(datasb);
  }


  update(knex: Knex, typeId: string, datas: any) {
    // return knex('wm_requisition')
    //   .where('requisition_id', typeId)
    //   .update(datas);
  }

  doCancel(knex: Knex, requisitionId: string) {
    // return knex('wm_requisition')
    //   .where('requisition_id', requisitionId)
    //   .update('requisition_status','C');
  }

  detail(knex: Knex, typeId: string) {
    // return knex('wm_requisition as re')
    //   .select('re.*', 'wh1.warehouse_name as wm_requisition_name', 'wh2.warehouse_name as wm_withdraw_name')
    //   .leftJoin('wm_warehouses as wh1', 're.wm_requisition', 'wh1.warehouse_id')
    //   .leftJoin('wm_warehouses as wh2', 'wh2.warehouse_id', 're.wm_withdraw')
    //   .where('re.requisition_id', typeId);
  }

  remove(knex: Knex, typeId: string) {
    // return knex('wm_requisition')
    //   .where('requisition_id', typeId)
    //   .del();
  }

  search(knex: Knex, query, warehouseid) {
    //     let _query = `%${query}%`;
    //     let sql = `
    //     select p.product_id,p.product_name,
    // sum(wp.qty) as amtqty
    //     from mm_products as p
    // 		left join wm_products as wp on wp.product_id = p.product_id
    //     where p.product_id like ? or p.product_name like ?
    // 		and wp.warehouse_id = ?
    // 		group by p.product_id
    //     order by p.product_name
    //     limit 50
    //     `;
    //     return knex.raw(sql, [_query, _query, warehouseid]);
  }

  //ค้นหารายการสินค้าทั้งหมดที่มีในคลัง
  searchall(knex: Knex, warehouseid) {
    //     let sql = `
    // select wwp.warehouse_id, wwp.product_id, mp.product_name, sum(wp.qty) as qty,wwp.min_qty, wwp.max_qty, mp.is_raw_material
    // from wm_warehouse_products as wwp
    // inner join mm_products mp on wwp.product_id = mp.product_id
    // left join wm_products wp on wwp.warehouse_id = wp.warehouse_id and wwp.product_id = wp.product_id
    // where wwp.warehouse_id = ?
    // group by wwp.warehouse_id,wwp.product_id
    //     `;
    //     return knex.raw(sql, [warehouseid]);
  }

  getRequisitionInfo(knex: Knex, requisitionId: any) {
    // return knex('wm_requisition as re')
    //   .select('re.requisition_id', 're.requisition_type_id', 're.requisition_date', 're.wm_requisition'
    //   , 'wh1.warehouse_name as wm_requisition_name', 'wh2.warehouse_name as wm_withdraw_name', 're.wm_withdraw', 'rt.requisition_type')
    //   .leftJoin('wm_warehouses as wh1', 're.wm_requisition', 'wh1.warehouse_id')
    //   .leftJoin('wm_warehouses as wh2', 'wh2.warehouse_id', 're.wm_withdraw')
    //   .leftJoin('wm_requisition_type as rt', 're.requisition_type_id', 'rt.requisition_type_id')
    //   .where('re.requisition_id', requisitionId);
  }

  getReceiveProducts(knex: Knex, requisitionId: any) {
    // let sql = `
    // select wr.requisition_id,mp.generic_id,mg.generic_name,wrd.product_id,mp.product_name,wrd.requisition_qty,(wrd.requisition_qty / mug.qty) as requisition_edit_qty,
    // (select sum(wp.qty) from wm_products as wp where wp.product_id = mp.product_id and wp.warehouse_id = wr.wm_withdraw) as remain_qty,
    // 		(select sum(wp.qty) from wm_products as wp where wp.product_id = mp.product_id and wp.warehouse_id = wr.wm_requisition) as onhand_qty,
    // '' as small_unit, wrd.cost,
    // wrd.lot_no,wpl.expired_date,wrd.unit_generic_id,mug.from_unit_id,
    // large_unit.unit_name as large_unit_name,mug.to_unit_id,small_unit.unit_name as small_unit_name,
    // mug.qty as unit_qty,mmp.min_qty,mmp.max_qty
    // from wm_requisition as wr
    // inner join wm_requisition_detail as wrd on wr.requisition_id = wrd.requisition_id
    // inner join mm_products as mp on wrd.product_id = mp.product_id
    // left join mm_generics mg on mp.generic_id = mg.generic_id
    // left join wm_products wpl on wrd.product_id = wpl.product_id and wrd.warehouse_id = wpl.warehouse_id  and wrd.lot_no = wpl.lot_no
    // inner join mm_unit_generics mug on wrd.unit_generic_id = mug.unit_generic_id
    // left join mm_product_planning mmp on mmp.warehouse_id = wr.wm_requisition and mmp.source_warehouse_id = wr.wm_withdraw and wrd.product_id = mmp.product_id
    // left join mm_units as large_unit on mug.from_unit_id = large_unit.unit_id
    // left join mm_units as small_unit on mug.to_unit_id = small_unit.unit_id
    // where wr.requisition_id = ? 
    //   `;
    // return knex.raw(sql, [requisitionId]);
  }


  saveConfirmSummary(knex: Knex, data: any) {
    // return knex('wm_requisition_check')
    //   .insert(data);
  }

  getApproveStatus(knex: Knex, requisitionId: any) {
    // return knex('wm_requisition_approve')
    //   .where('requisition_id', requisitionId);
  }

  //saveStock = saveProducts , wm_products = wm_stocks
  saveProducts(knex: Knex, data: any) {
    // return knex('wm_stocks')
    //   .insert(data);
  }

  saveApprove(knex: Knex, requisitionId: any, approveStatus: any, approveDate: any) {
    // return knex('wm_requisition_approve')
    //   .insert({
    //     approve_id: moment().format('x'),
    //     requisition_id: requisitionId,
    //     approve_status: approveStatus,
    //     approve_date: approveDate
    //   });
  }

  updateApprove(knex: Knex, requisitionId: any, approveStatus: any, approveDate: any) {
    // return knex('wm_requisition_approve')
    //   .update({
    //     approve_status: approveStatus,
    //     approve_date: approveDate
    //   })
    //   .where('requisition_id', requisitionId);
  }

  updateRequisition(knex: Knex, requisitionId: any, requisitionStatus: any) {
    // return knex('wm_requisition')
    //   .update({
    //     requisition_status: 'Y',
    //   })
    //   .where('requisition_id', requisitionId);
  }

  updateConfirm(knex: Knex, requisitionId: any, approveStatus: any) {
    // return knex('wm_requisition')
    //   .update({
    //     confirm_requisition: 'Y',
    //   })
    //   .where('requisition_id', requisitionId);
  }

  checkDuplicatedApprove(knex: Knex, requistionId: any) {
    // return knex('wm_requisition_approve')
    //   .count('* as total')
    //   .where('requisition_id', requistionId);
  }

  //borrow receive product
  getAllBorrowProducts(knex: Knex) {
    // return knex('mm_products as p')
    //   .select('p.product_id', 'p.product_name', 'gp.generic_id',
    //   'v.generic_name', 'v.generic_type', ' l.labeler_name')
    //   .innerJoin('mm_generic_product as gp', 'gp.product_id', 'p.product_id')
    //   .innerJoin('wm_all_products_view as v', 'v.generic_id', 'gp.generic_id')
    //   .innerJoin('mm_product_labeler as pl', 'pl.product_id', 'p.product_id')
    //   .innerJoin('mm_labelers as l', 'l.labeler_id', 'pl.labeler_id ')
    //   .where('pl.type_id', "M");
  }

  //ใบหยิบสินค้า
  getReceiveProductCheckList(knex: Knex) {
    //     let sql = `
    //     SELECT
    //     wcd.product_id,
    //     wcd.warehouse_id as withdraw_warehouse_id,
    //     r.receive_id, 
    //     wcd.location_id,
    //     r.receive_code,
    //     r.delivery_code,
    //     wp.product_name,
    //     wcd.expired_date,
    //     '' as lot_id,
    //     wcd.lot_no,	
    //     wcd.receive_qty as qty,
    //     wcd.cost,
    //     wcd.unit_generic_id,
    //     mup.qty as unit_qty,
    //     mul.unit_name as large_unit_name, mus.unit_name as small_unit_name
    //   FROM
    //     wm_receive_detail AS wcd
    //   INNER JOIN wm_receives AS r ON r.receive_id = wcd.receive_id
    //   INNER JOIN mm_products AS wp ON wp.product_id = wcd.product_id
    //   LEFT JOIN wm_receive_approve AS ra ON r.receive_id = ra.receive_id
    //   inner join mm_unit_generics as mup on wcd.unit_generic_id = mup.unit_generic_id
    //   inner join mm_units as mul on mup.from_unit_id = mul.unit_id
    //   inner join mm_units as mus on mup.to_unit_id = mus.unit_id
    // 	where r.is_success != 'Y' and r.is_completed != 'Y'
    //   ORDER BY
    //     wcd.receive_id ASC
    //  `;
    //     return knex.raw(sql, []);
  }

  getAllReserveRequisitionQty(knex: Knex, productId: any, srcWarehouseId: any) {
    // let sql = `
    // select r.wm_requisition,r.wm_withdraw,rcd.product_id,sum(rcd.requisition_qty) as allqty,rcd.conversion_qty,rcd.unit_generic_id,
    // mul.unit_name as large_unit_name, mus.unit_name as small_unit_name
    // from wm_requisition as r 
    // inner join wm_requisition_check as rc on r.requisition_id = rc.requisition_id
    // inner join wm_requisition_check_detail as rcd on rc.check_id = rcd.check_id
    // left join mm_unit_generics mug on rcd.unit_generic_id = mug.unit_generic_id
    // left join mm_units as mul on mug.from_unit_id = mul.unit_id
    // left join mm_units as mus on mug.to_unit_id = mus.unit_id
    // where r.confirm_requisition = 'Y' and r.requisition_status = 'N'
    // and rcd.product_id = ? and r.wm_withdraw = ?
    // group by rcd.product_id
    // `;
    // return knex.raw(sql, [productId, srcWarehouseId]);
  }

  getGenericsFromRequisition(db: Knex, requisitionId: any) {
    // let sql = `
    // select distinct generic_id from wm_requisition_order_items
    // where requisition_order_id=?
    // `;
    // return db.raw(sql, [requisitionId]);
  }

  getProductInWarehousesByGenerics(db: Knex, generics: any[], warehouseId: any) {
    // return db('wm_products as wp')
    //   .select('wp.*', 'mp.generic_id', 'ug.unit_generic_id', 'ug.qty as conversion_qty',
    //     db.raw('ifnull(rv.remain_qty, 0) as remain_with_reserve'), 'rv.reserve_qty')
    //   .innerJoin('mm_products as mp', 'mp.product_id', 'wp.product_id')
    //   .innerJoin('mm_unit_generics as ug', 'ug.unit_generic_id', 'wp.unit_generic_id')
    //   .leftJoin('view_product_reserve as rv', 'rv.wm_product_id', 'wp.wm_product_id')
    //   .whereIn('mp.generic_id', generics)
    //   .where('wp.warehouse_id', warehouseId)
    //   .orderBy('wp.expired_date', 'asc')
    //   .groupBy('wp.wm_product_id');
  }

  getRequisitionOrderItems(db: Knex, requisitionId: any) {
    // return db('wm_requisition_order_items')
    //   .where('requisition_order_id', requisitionId);
  }

}
