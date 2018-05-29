"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequisitionModel {
    getListApproved(db, srcWarehouseId = null, dstWarehouseId = null, limit, offset, query = '', fillterCancel) {
        let _query = `%${query}%`;
        let sql = `
    select ro.*,
    (
    select sum(wm.qty) 
    from wm_products as wm 
    inner join mm_products as mp on mp.product_id=wm.product_id 
    inner join wm_requisition_order_items as roi on roi.product_id = mp.product_id
    where wm.warehouse_id = ro.wm_withdraw 
    and roi.requisition_order_id=ro.requisition_order_id
    ) as total_remain ,
    CONCAT(up.fname,' ',up.lname) as fullName 

    from wm_requisition_orders as ro 
    LEFT JOIN um_people as up on up.people_id = ro.people_id
    where ro.is_approve='Y' `;
        if (query) {
            sql += ` and (ro.requisition_code like '${_query}' or 
      w1.warehouse_name like '${_query}')`;
        }
        if (fillterCancel === 'nCancel') {
            sql += ` and ro.is_cancel = 'N' `;
        }
        else if (fillterCancel === 'cancel') {
            sql += ` and ro.is_cancel = 'Y' `;
        }
        if (srcWarehouseId) {
            sql += ` and ro.wm_requisition = ? order by ro.requisition_code DESC
      limit ? offset ?`;
            return db.raw(sql, [srcWarehouseId, limit, offset]);
        }
        else {
            sql += ` and ro.wm_withdraw = ? order by ro.requisition_code DESC
      limit ? offset ?`;
            return db.raw(sql, [dstWarehouseId, limit, offset]);
        }
    }
    getListWaiting(db, srcWarehouseId = null, dstWarehouseId = null, limit, offset, query = '', fillterCancel) {
        let _query = `%${query}%`;
        let sql = `
    select ro.*,
    (
    select sum(wm.qty) 
    from wm_products as wm 
    inner join mm_products as mp on mp.product_id=wm.product_id 
    inner join wm_requisition_order_items as roi on roi.product_id = mp.product_id
    where wm.warehouse_id = ro.wm_withdraw 
    and roi.requisition_order_id=ro.requisition_order_id
    ) as total_remain ,
    CONCAT(up.fname,' ',up.lname) as fullName 

    from wm_requisition_orders as ro 
    LEFT JOIN um_people as up on up.people_id = ro.people_id
    where ro.is_approve='N' `;
        if (query) {
            sql += ` and (ro.requisition_code like '${_query}' or 
      w1.warehouse_name like '${_query}')`;
        }
        if (fillterCancel === 'nCancel') {
            sql += ` and ro.is_cancel = 'N' `;
        }
        else if (fillterCancel === 'cancel') {
            sql += ` and ro.is_cancel = 'Y' `;
        }
        if (srcWarehouseId) {
            sql += ` and ro.wm_requisition = ? order by ro.requisition_code DESC
      limit ? offset ?`;
            return db.raw(sql, [srcWarehouseId, limit, offset]);
        }
        else {
            sql += ` and ro.wm_withdraw = ? order by ro.requisition_code DESC
      limit ? offset ?`;
            return db.raw(sql, [dstWarehouseId, limit, offset]);
        }
    }
    totalListWaiting(db, srcWarehouseId = null, dstWarehouseId = null, query = '', fillterCancel) {
        let _query = `%${query}%`;
        let sql = `
    select count(*) as total
    from wm_requisition_orders as ro
    where ro.is_approve='N' `;
        if (query) {
            sql += ` and (ro.requisition_code like '${_query}')`;
        }
        if (fillterCancel === 'nCancel') {
            sql += ` and ro.is_cancel = 'N' `;
        }
        else if (fillterCancel === 'cancel') {
            sql += ` and ro.is_cancel = 'Y' `;
        }
        if (srcWarehouseId) {
            sql += ` and ro.wm_requisition = ?`;
            return db.raw(sql, [srcWarehouseId]);
        }
        else {
            sql += ` and ro.wm_withdraw = ?`;
            return db.raw(sql, [dstWarehouseId]);
        }
    }
    getSerial(knex) {
        return knex('wm_requisition_orders')
            .count('* as total');
    }
    saveOrder(knex, datas) {
        return knex('wm_requisition_orders')
            .insert(datas);
    }
    updateOrder(knex, id, datas) {
        return knex('wm_requisition_orders')
            .where('requisition_order_id', id)
            .update(datas);
    }
    removeItems(knex, id) {
        return knex('wm_requisition_order_items')
            .where('requisition_order_id', id)
            .del();
    }
    saveItemsDetail(knex, data) {
        let sqls = [];
        for (let datas of data) {
            let sql = `
    INSERT INTO wm_requisition_confirm_item
          (requisition_order_id, wm_product_id,confirm_qty)
          VALUES( ${datas.requisition_order_id}, '${datas.wm_product_id}',${datas.confirm_qty})
          ON DUPLICATE KEY UPDATE
          confirm_qty = ${datas.confirm_qty}
    `;
            sqls.push(sql);
        }
        let queries = sqls.join(';');
        return knex.raw(queries);
    }
    saveItems(knex, datas) {
        return knex('wm_requisition_order_items')
            .insert(datas);
    }
    setReqs(knex, id) {
        return knex('wm_requisition_orders')
            .select('*')
            .where('requisition_order_id', id);
    }
    setReqsProductDetail(knex, id) {
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
    ip.requisition_order_id = ${id}`;
        return knex.raw(sql);
    }
    setReqsDetail(knex, id) {
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
    ip.requisition_order_id = ${id} `;
        return knex.raw(sql);
    }
    list(knex) {
    }
    getCheckId(knex, requisitionId) {
    }
    removeDetail(knex, requisitionId) {
    }
    removeCheckDetail(knex, checkId) {
    }
    saveDetail(knex, details) {
    }
    saveCheckDetail(knex, checkDetail) {
    }
    saveBorrow(knex, datasb) {
    }
    update(knex, typeId, datas) {
    }
    doCancel(knex, requisitionId) {
    }
    detail(knex, typeId) {
    }
    remove(knex, typeId) {
    }
    search(knex, query, warehouseid) {
    }
    searchall(knex, warehouseid) {
    }
    getRequisitionInfo(knex, requisitionId) {
    }
    getReceiveProducts(knex, requisitionId) {
    }
    saveConfirmSummary(knex, data) {
    }
    getApproveStatus(knex, requisitionId) {
    }
    saveProducts(knex, data) {
    }
    saveApprove(knex, requisitionId, approveStatus, approveDate) {
    }
    updateApprove(knex, requisitionId, approveStatus, approveDate) {
    }
    updateRequisition(knex, requisitionId, requisitionStatus) {
    }
    updateConfirm(knex, requisitionId, approveStatus) {
    }
    checkDuplicatedApprove(knex, requistionId) {
    }
    getAllBorrowProducts(knex) {
    }
    getReceiveProductCheckList(knex) {
    }
    getAllReserveRequisitionQty(knex, productId, srcWarehouseId) {
    }
    getGenericsFromRequisition(db, requisitionId) {
    }
    getProductInWarehousesByGenerics(db, generics, warehouseId) {
    }
    getRequisitionOrderItems(db, requisitionId) {
    }
}
exports.RequisitionModel = RequisitionModel;
//# sourceMappingURL=requisition.js.map