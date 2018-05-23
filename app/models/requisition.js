"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequisitionModel {
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
    ) as total_remain 

    from wm_requisition_orders as ro 
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
    saveItems(knex, datas) {
        return knex('wm_requisition_order_items')
            .insert(datas);
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