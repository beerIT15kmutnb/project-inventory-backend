import Knex = require('knex');
import * as moment from 'moment';

export class EquipmentReceiveModel {

  getTypes(knex: Knex) {
    return knex('wm_equipment_receive_types')
  }

  getStatus(knex: Knex) {
    return knex('wm_equipment_receive_status')
  }






  getReceiveApproveTotal(knex: Knex, warehouseId) {
    let sql = `
      select count(*) as total from wm_equipment_receives r 
      join wm_equipment_receive_approve as ra on r.receive_id = ra.receive_id
      where r.receive_id in ( 
      SELECT
      rod.receive_id
      FROM
      wm_equipment_receive_detail rod
      WHERE
      rod.warehouse_id = ${warehouseId}
      AND rod.receive_id = r.receive_id)`;
    return knex.raw(sql)
  }

  getReceiveNapproveTotal(knex: Knex, warehouseId) {
    let sql = `
      select count(*) as total from wm_equipment_receives r 
      left join wm_equipment_receive_approve as ra on r.receive_id = ra.receive_id
      where r.receive_id in ( 
      SELECT
      rod.receive_id
      FROM
      wm_equipment_receive_detail rod
      WHERE
      rod.warehouse_id = ${warehouseId}
      AND rod.receive_id = r.receive_id)
      and ra.receive_id is null`;
    return knex.raw(sql)
  }

  getProductReceive(knex: Knex) {
    return knex('wm_equipment_receives as r')
  }

  getOtherExpired(knex: Knex, limit, offset) {
    let sql = `
    select rt.*, (select count(*) from wm_equipment_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as total,
    (select sum(rtd.cost * rtd.receive_qty) from wm_equipment_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as cost,
    rtt.receive_type_name, d.donator_name, a.approve_id
    from wm_equipment_receive_other as rt
    left join wm_equipment_receive_types as rtt on rtt.receive_type_id=rt.receive_type_id
    left join wm_equipment_donators as d on d.donator_id=rt.donator_id
    left join wm_equipment_receive_approve as a on a.receive_other_id=rt.receive_other_id
    where rt.is_expired = 'Y'
    order by rt.receive_other_id desc
    limit ${limit}
    offset ${offset}
    `;
    return knex.raw(sql);
  }

  getOtherExpiredTotal(knex: Knex) {
    let sql = `
    select count(*) as total
    from wm_equipment_receive_other as rt
    left join wm_equipment_receive_types as rtt on rtt.receive_type_id=rt.receive_type_id
    left join wm_equipment_donators as d on d.donator_id=rt.donator_id
    left join wm_equipment_receive_approve as a on a.receive_other_id=rt.receive_other_id
    where rt.is_expired = 'Y'
    `;
    return knex.raw(sql);
  }
  getOtherExpiredSearch(knex: Knex, q) {
    let sql = `
    select rt.*, (select count(*) from wm_equipment_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as total,
    (select sum(rtd.cost * rtd.receive_qty) from wm_equipment_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as cost,
    rtt.receive_type_name, d.donator_name, a.approve_id
    from wm_equipment_receive_other as rt
    left join wm_equipment_receive_types as rtt on rtt.receive_type_id=rt.receive_type_id
    left join wm_equipment_donators as d on d.donator_id=rt.donator_id
    left join wm_equipment_receive_approve as a on a.receive_other_id=rt.receive_other_id
    where rt.is_expired = 'Y' and (rt.receive_code like ? or d.donator_name like ?)
    order by rt.receive_other_id desc
    `;
    return knex.raw(sql, [q, q]);
  }
  
  getExpiredTotal(knex: Knex) {
    let sql = `
      SELECT
        count(*) as total
      FROM
        wm_equipment_receives AS r
      LEFT JOIN mm_equipment_labelers AS l ON l.labeler_id = r.vendor_labeler_id
      LEFT JOIN pc_purchasing_order AS pp ON pp.purchase_order_id = r.purchase_order_id
      LEFT JOIN wm_equipment_receive_approve AS ra ON ra.receive_id = r.receive_id
      WHERE
        r.is_expired = 'Y'`;
    return knex.raw(sql);

  }
  
  getReceiveOtherDetail(knex: Knex, receiveOtherId: any) {
    return knex('wm_equipment_receive_other as r')
      .select('r.*', 'd.donator_name')
      .where('r.receive_other_id', receiveOtherId)
      .leftJoin('wm_equipment_donators as d', 'd.donator_id', 'r.donator_id');
  }

  removeReceiveOther(knex: Knex, receiveOtherId: any, peopleUserId: any) {

    return knex('wm_equipment_receive_other')
      .where('receive_other_id', receiveOtherId)
      .update({
        is_cancel: 'Y',
        cancel_people_user_id: peopleUserId
      });

  }

  
  saveApprove(knex: Knex, data: any) {
    let sql =`UPDATE wm_equipment_receives
    SET is_approve = 'Y' 
    WHERE
      receive_id IN ( ${data} )`
    return knex.raw(sql)
  }

  removeOldApprove(knex: Knex, receiveIds: any) {
    return knex('wm_equipment_receive_approve')
      .whereIn('receive_id', receiveIds)
      .del();
  }

  removeOldApproveOther(knex: Knex, receiveIds: any) {
    return knex('wm_equipment_receive_approve')
      .whereIn('receive_other_id', receiveIds)
      .del();
  }
  // use
  saveReceiveDetail(knex: Knex, products: any[]) {
    return knex('wm_equipment_receive_detail')
      .insert(products);
  }

  saveReceiveDetailOther(knex: Knex, products: any[]) {
    return knex('wm_equipment_receive_other_detail')
      .insert(products);
  }

  removeReceiveDetailOther(knex: Knex, receiveOtherId: any) {
    return knex('wm_equipment_receive_other_detail')
      .where('receive_other_id', receiveOtherId)
      .del();
  }

  saveReceiveSummary(knex: Knex, data: any) {
    return knex('wm_equipment_receives')
      .insert(data, 'receive_id');
  }

  saveReceiveSummaryOther(knex: Knex, data: any) {
    return knex('wm_equipment_receive_other')
      .insert(data, 'receive_other_id');
  }

  updateReceiveSummaryOther(knex: Knex, receiveOtherId: any, data: any) {
    return knex('wm_equipment_receive_other')
      .update(data)
      .where('receive_other_id', receiveOtherId)
  }
// use
  updateReceiveSummary(knex: Knex, receiveId: any, data: any) {
    return knex('wm_equipment_receives')
      .where('receive_id', receiveId)
      .update(data);
  }

  checkDuplicatedApprove(knex: Knex, receiveId: any) {
    return knex('wm_equipment_receive_approve')
      .count('* as total')
      .where('receive_id', receiveId);
  }

  getApproveStatus(knex: Knex, receiveId: any) {
    return knex('wm_equipment_receive_approve')
      .where('receive_id', receiveId);
  }
//ใช้
  getReceiveInfo(knex: Knex, receiveId: any) {
    return knex('wm_equipment_receives as r')
      .where('r.receive_id', receiveId);
  }
//ใช้
  getSerial(knex: Knex){
    return knex('wm_equipment_receives')
    .count('* as total')
  }

//ใช้
  getReceiveProducts(knex: Knex, receiveId: any) {
    let sql = `SELECT
	rd.product_id,
	p.product_name,
	rd.lot_no,
	g.equipment_name,
	g.equipment_id,
	rd.receive_qty,
	p.small_qty AS conversion_qty,
	u1.unit_name AS base_unit_name,
	u2.unit_name AS from_unit_name,
	rd.expired_date
FROM
	wm_equipment_receive_detail AS rd
	INNER JOIN mm_equipment_products AS p ON p.product_id = rd.product_id
	LEFT JOIN mm_equipments AS g ON g.equipment_id = p.equipment_id
	LEFT JOIN mm_equipment_units AS u1 ON g.small_unit_id = u1.unit_id  
	LEFT JOIN mm_equipment_units AS u2 ON p.large_unit_id = u2.unit_id  
	INNER JOIN wm_equipment_receives AS r ON r.receive_id = rd.receive_id 
WHERE
	rd.receive_id = ${receiveId}`

    return knex.raw(sql)
  }

  getReceiveProductsImport(knex: Knex, receiveIds: any) {
    let subBalance = knex('wm_equipment_products as wp')
      .sum('wp.qty')
      .as('balance')
      .whereRaw('wp.product_id=rd.product_id and wp.lot_no=rd.lot_no and wp.expired_date=rd.expired_date');

    return knex('wm_equipment_receive_detail as rd')
      .select(
        'rd.receive_detail_id', 'rd.receive_id', 'rd.product_id',
        'rd.lot_no', 'rd.expired_date', knex.raw('sum(rd.receive_qty) as receive_qty'),
         'mp.equipment_id', 'r.receive_code', subBalance)
      .whereIn('rd.receive_id', receiveIds)
      .innerJoin('wm_equipment_receives as r', 'r.receive_id', 'rd.receive_id')
      .leftJoin('mm_equipment_products as mp', 'mp.product_id', 'rd.product_id')
      .groupBy('rd.receive_detail_id');
  }

  getRequisition(knex: Knex, receiveIds: any[]) {
    return knex('wm_equipment_requisition_detail')
      .select('requisition_id')
      .whereIn('receive_id', receiveIds)
  }

  updateRequisitionStatus(knex: Knex, reqIds: any[]) {
    return knex('wm_equipment_requisition')
      .select('requisition_id')
      .update({ doc_type: 'R' })
      .whereIn('requisition_id', reqIds);
  }

  saveCheckSummary(knex: Knex, data: any) {
    return knex('wm_equipment_receive_check')
      .insert(data);
  }

  saveCheckProduct(knex: Knex, data: any) {
    return knex('wm_equipment_receive_check_detail')
      .insert(data);
  }

  saveProducts(knex: Knex, data: any[]) {
    let sqls = [];
    data.forEach(v => {
      let sql = `
        INSERT INTO wm_equipment_products(wm_product_id, warehouse_id, product_id, qty, 
        lot_no, expired_date, people_user_id)
        VALUES('${v.wm_product_id}', '${v.warehouse_id}', '${v.product_id}', ${v.qty},
         '${v.lot_no}', '${v.expired_date}', ${v.people_user_id})
        ON DUPLICATE KEY UPDATE qty=qty+${v.qty}
        `;
      sqls.push(sql);
    });

    let queries = sqls.join(';');
    return knex.raw(queries);
  }

 
  // use
  removeReceive(knex: Knex, receiveId: string, peopleUserId: any) {
    return knex('wm_equipment_receives')
      .where('receive_id', receiveId)
      .update({
        is_cancel: 'Y'
      });
  }
// use
  removeReceiveDetail(knex: Knex, receiveId: string) {
    return knex('wm_equipment_receive_detail')
      .where('receive_id', receiveId)
      .del();
  }

  

  getPurchaseList(knex: Knex, limit: number, offset: number) {

    let sql = `
      select pc.purchase_order_book_number, pc.purchase_order_id, pc.purchase_order_number,
      pc.order_date, 
      (
        select sum(pci.qty*pci.unit_price)
        from pc_purchasing_order_item as pci 
        where pci.purchase_order_id=pc.purchase_order_id
        and pci.giveaway='N'
        and pc.is_cancel = 'N'
      ) as purchase_price, 
      pc.labeler_id as vendor_id, pc.contract_id,
      cmp.name as purchase_method_name, ml.labeler_name,
      (
        select sum(pi.qty)
        from pc_purchasing_order_item as pi
        where pi.purchase_order_id=pc.purchase_order_id
        and pc.is_cancel = 'N'
      ) as purchase_qty,
      (
        select sum(rd.receive_qty) 
        from wm_equipment_receive_detail as rd
        inner join wm_equipment_receives as r on r.receive_id=rd.receive_id
        where r.purchase_order_id=pc.purchase_order_id
        and r.is_cancel ='N'
      ) as receive_qty,
      (
        select sum(rd.receive_qty*rd.cost) 
        from wm_equipment_receive_detail as rd
        inner join wm_equipment_receives as r on r.receive_id=rd.receive_id
        where rd.is_free='N'
        and r.purchase_order_id=pc.purchase_order_id
        and r.is_cancel ='N'
        
      ) as receive_price
      from pc_purchasing_order as pc
      left join mm_equipment_labelers as ml on ml.labeler_id=pc.labeler_id
      left join l_bid_process as cmp on cmp.id=pc.purchase_method_id
      where pc.purchase_order_status='APPROVED'
      and pc.purchase_order_status != 'COMPLETED'
      and pc.is_cancel != 'Y'
      order by pc.purchase_order_number DESC
      limit ${limit}
      offset ${offset}
    `;

    return knex.raw(sql);

  }

  getPurchaseListSearch(knex: Knex, limit: number, offset: number, query) {
    let _query = `%${query}%`;
    let sql = `
      select pc.purchase_order_book_number, pc.purchase_order_id, pc.purchase_order_number,
      pc.order_date, 
      (
        select sum(pci.qty*pci.unit_price)
        from pc_purchasing_order_item as pci 
        where pci.purchase_order_id=pc.purchase_order_id
        and pci.giveaway='N'
        and pc.is_cancel = 'N'
      ) as purchase_price, 
      pc.labeler_id as vendor_id, pc.contract_id,
      cmp.name as purchase_method_name, ml.labeler_name,
      (
        select sum(pi.qty)
        from pc_purchasing_order_item as pi
        where pi.purchase_order_id=pc.purchase_order_id
        and pc.is_cancel = 'N'
      ) as purchase_qty,
      (
        select sum(rd.receive_qty) 
        from wm_equipment_receive_detail as rd
        inner join wm_equipment_receives as r on r.receive_id=rd.receive_id
        where r.purchase_order_id=pc.purchase_order_id
        and r.is_cancel ='N'
      ) as receive_qty,
      (
        select sum(rd.receive_qty*rd.cost) 
        from wm_equipment_receive_detail as rd
        inner join wm_equipment_receives as r on r.receive_id=rd.receive_id
        where rd.is_free='N'
        and r.purchase_order_id=pc.purchase_order_id
        and r.is_cancel ='N'
        
      ) as receive_price
      from pc_purchasing_order as pc
      left join mm_equipment_labelers as ml on ml.labeler_id=pc.labeler_id
      left join l_bid_process as cmp on cmp.id=pc.purchase_method_id
      where pc.purchase_order_status='APPROVED'
      and pc.purchase_order_status != 'COMPLETED'
      and pc.is_cancel != 'Y'
      and (
        pc.purchase_order_book_number LIKE '${_query}'
        OR pc.purchase_order_number LIKE '${_query}'
        OR ml.labeler_name like '${_query}'
        OR pc.purchase_order_id IN (
          SELECT
            poi.purchase_order_id
          FROM
            pc_purchasing_order_item poi
          JOIN mm_equipment_products mp ON mp.product_id = poi.product_id
          JOIN mm_equipments mg ON mp.equipment_id = mg.equipment_id
          WHERE
            mp.product_name LIKE '${_query}'
          OR mg.equipment_name LIKE '${_query}'
          OR mp.working_code = '${query}'
          OR mg.working_code = '${query}'
        )
      )
      order by pc.purchase_order_number DESC
      limit ${limit}
      offset ${offset}
    `;

    return knex.raw(sql);

  }
  getPurchaseListTotal(knex: Knex) {

    let sql = `
      select count(*) as total
      from pc_purchasing_order as pc
      left join mm_equipment_labelers as ml on ml.labeler_id=pc.labeler_id
      left join l_bid_process as cmp on cmp.id=pc.purchase_method_id
      where pc.purchase_order_status='APPROVED'
      and pc.purchase_order_status != 'COMPLETED'
      and pc.is_cancel != 'Y'
    `;

    return knex.raw(sql, []);

  }
  getPurchaseListTotalSearch(knex: Knex, query) {
    let _query = `%${query}%`;
    let sql = `
      select count(*) as total
      from pc_purchasing_order as pc
      left join mm_equipment_labelers as ml on ml.labeler_id=pc.labeler_id
      left join l_bid_process as cmp on cmp.id=pc.purchase_method_id
      where pc.purchase_order_status='APPROVED'
      and pc.purchase_order_status != 'COMPLETED'
      and pc.is_cancel != 'Y'
      and (
        pc.purchase_order_book_number LIKE '${_query}'
        OR pc.purchase_order_number LIKE '${_query}'
        OR ml.labeler_name like '${_query}'
        OR pc.purchase_order_id IN (
          SELECT
            poi.purchase_order_id
          FROM
            pc_purchasing_order_item poi
          JOIN mm_equipment_products mp ON mp.product_id = poi.product_id
          JOIN mm_equipments mg ON mp.equipment_id = mg.equipment_id
          WHERE
            mp.product_name LIKE '${_query}'
          OR mg.equipment_name LIKE '${_query}'
          OR mp.working_code = '${query}'
          OR mg.working_code = '${query}'
        )
      )
    `;

    return knex.raw(sql);

  }
 

  getPurchaseInfo(knex: Knex, purchaseOrderId: any) {
    return knex('pc_purchasing_order as ro')
      .select('ro.*', 'l.labeler_name')
      .innerJoin('mm_equipment_labelers as l', 'l.labeler_id', 'ro.labeler_id')
      .where('ro.purchase_order_id', purchaseOrderId);
  }

  getTotalPricePurchase(knex: Knex, purchaseOrderId: any) {
    return knex('pc_purchasing_order_item as oi')
      .select(knex.raw('sum(oi.qty*oi.unit_price) as total'))
      .where('oi.purchase_order_id', purchaseOrderId)
      .where('giveaway', 'N');
  }

  getTotalPricePurcehaseReceived(knex: Knex, purchaseOrderId: any) {
    return knex('wm_equipment_receives as r')
      .innerJoin('wm_equipment_receive_detail as rd', 'rd.receive_id', 'r.receive_id')
      .select(knex.raw('sum(rd.receive_qty*rd.cost) as total'))
      .where('r.purchase_order_id', purchaseOrderId)
      .where('rd.is_free', 'N')
      .where('r.is_cancel', 'N');
  }

  getTotalPricePurcehaseReceivedWithoutOwner(knex: Knex, purchaseOrderId: any, receiveId: any) {
    return knex('wm_equipment_receives as r')
      .innerJoin('wm_equipment_receive_detail as rd', 'rd.receive_id', 'r.receive_id')
      .select(knex.raw('sum(rd.receive_qty*rd.cost) as total'))
      .where('r.purchase_order_id', purchaseOrderId)
      .where('r.is_cancel', 'N')
      .whereNot('r.receive_id', receiveId);
  }

  // ตรวจสอบรายการสินค้าว่าอยู่ในใบสั่งซื้อ (PO) หรือไม่
  getProductInPurchase(knex: Knex, purchaseOrderId: any) {
    return knex('pc_purchasing_order_item as i')
      .where('i.purchase_order_id', purchaseOrderId);
  }

  savePurchaseStatus(knex: Knex, purchaseOrderIds: any) {
    return knex('pc_purchasing_order')
      .update({
        purchase_order_status: 'SUCCESS'
      })
      .whereIn('purchase_order_id', purchaseOrderIds);
  }

  getReceivePurchaseId(knex: Knex, receiveIds: any) {
    return knex('wm_equipment_receives')
      .whereIn('receive_id', receiveIds);
  }

  getCommittee(knex: Knex) {
    let sql = `select * from pc_committee where committee_status='T'`;
    return knex.raw(sql, []);
  }
  getCommitteePO(knex: Knex, id: any) {
    let sql = `select * from pc_purchasing_order where purchase_order_id=` + id;
    return knex.raw(sql, []);
  }

  updateCommittee(knex: Knex, receiveId: any, committeeId: any) {
    return knex('wm_equipment_receives')
      .where('receive_id', receiveId)
      .update({
        committee_id: committeeId
      });
  }

  getCommitteeList(knex: Knex, committeeId: any) {
    let sql = `
    select cp.committee_id, cp.position_name, po.fname, po.lname, t.title_name
    from pc_committee_people as cp
    left join um_people as po on po.people_id=cp.people_id
    left join um_titles as t on t.title_id=po.title_id
    where cp.committee_id=?
    `;
    return knex.raw(sql, [committeeId]);
  }

  updatePurchaseStatus(knex: Knex, purchaseOrderId: any, completed: any) {
    return knex('pc_purchasing_order')
      .where('purchase_order_id', purchaseOrderId)
      .update({
        complete: completed,
        purchase_order_status: 'SUCCESS'
      });
  }

  updatePurchaseCompletedStatus(knex: Knex, purchaseOrderId: any) {
    return knex('pc_purchasing_order')
      .where('purchase_order_id', purchaseOrderId)
      .update({
        purchase_order_status: 'COMPLETED'
      });
  }

  checkDeliveryCode(knex: Knex, deliveryCode: any, supplierId: any) {
    return knex('wm_equipment_receives')
      .where('delivery_code', deliveryCode)
      .where('vendor_labeler_id', supplierId)
      .where('is_cancel', 'N')
      .count('* as total');
  }

  getRequisitionProductsImport(knex: Knex, requisitionIds: any) {
   

    return knex('wm_equipment_requisition_check_detail as rcd')
      .select('r.wm_withdraw as warehouse_id', 'r.wm_requisition as requisition_warehouse_id', 'rcd.product_id', 'mp.equipment_id',
        'rcd.requisition_qty', 'rcd.cost', 'rcd.expired_date', 'rcd.lot_no', 'r.requisition_id', 'rcd.unit_equipment_id',
        'rcd.conversion_qty', knex.raw('ifnull(wp.qty, 0) as balance_receive'), knex.raw('ifnull(wp2.qty, 0) as balance_withdraw'))
      .innerJoin('wm_equipment_requisition_check as rc', 'rcd.check_id', 'rc.check_id')
      .innerJoin('wm_equipment_requisition as r', 'rc.requisition_id', 'r.requisition_id')
      .innerJoin('mm_equipment_products as mp', 'mp.product_id', 'rcd.product_id')
      .joinRaw('left join wm_equipment_products as wp on wp.product_id=rcd.product_id and wp.lot_no=rcd.lot_no and wp.expired_date=rcd.expired_date and wp.warehouse_id=r.wm_requisition')
      .joinRaw('left join wm_equipment_products as wp2 on wp2.product_id=rcd.product_id and wp2.lot_no=rcd.lot_no and wp2.expired_date=rcd.expired_date and wp2.warehouse_id=r.wm_withdraw')
      .whereIn('rc.requisition_id', requisitionIds)
      .groupBy('rcd.check_detail_id');
    // return knex.raw(sql, [requisitionIds]);
  }

  decreaseQty(knex: Knex, data: any[]) {
    let sql = [];
    data.forEach(v => {
      let _sql = `
      UPDATE wm_equipment_products
      SET qty=qty-${v.qty}
      WHERE lot_no='${v.lot_no}' AND expired_date='${v.expired_date}' 
      AND warehouse_id='${v.warehouse_id}' AND product_id='${v.product_id}'`;
      sql.push(_sql);
    });

    let query = sql.join(';');
    return knex.raw(query);
  }

  getPurchaseCheckHoliday(knex: Knex, date) {
    return knex('sys_holidays').where('date', date);
  }

  getPurchaseCheckExpire(knex: Knex, equipmentId) {
    return knex('wm_equipment_equipment_expired_alert').where('equipment_id', equipmentId);
  }
  
  getProductRemainByReceiveOtherIds(knex: Knex, receiveIds: any, warehouseId: any) {
    let sql = `SELECT
    rd.product_id,
    rd.warehouse_id,
    IFNULL(
      (
        SELECT
          sum(wp.qty)
        FROM
          wm_equipment_products wp
        WHERE
          wp.product_id = rd.product_id
        AND wp.warehouse_id = rd.warehouse_id
        GROUP BY
          wp.product_id
      ),
      0
    ) AS balance,
    (
      SELECT
        sum(wp.qty)
      FROM
        wm_equipment_products wp
      WHERE
        wp.product_id IN (
          SELECT
            mp.product_id
          FROM
            mm_equipment_products mp
          WHERE
            mp.equipment_id IN (
              SELECT
                equipment_id
              FROM
                mm_equipment_products mp
              WHERE
                mp.product_id = rd.product_id
            )
        )
      AND wp.warehouse_id = rd.warehouse_id
      GROUP BY
        wp.warehouse_id
    ) AS balance_equipment
  FROM
    wm_equipment_receive_other_detail rd
  WHERE
    rd.receive_other_id IN (${receiveIds})
  AND rd.warehouse_id = '${warehouseId}'`;
    return knex.raw(sql);
  }

  getProductRemainByReceiveIds(knex: Knex, receiveIds: any, warehouseId: any) {

    let sql = `SELECT
      rd.product_id,
      rd.warehouse_id,
      IFNULL(
        (
          SELECT
            sum(wp.qty)
          FROM
            wm_equipment_products wp
          WHERE
            wp.product_id = rd.product_id
          AND wp.warehouse_id = rd.warehouse_id
          GROUP BY
            wp.product_id
        ),
        0
      ) AS balance,
      (
        SELECT
          sum(wp.qty)
        FROM
          wm_equipment_products wp
        WHERE
          wp.product_id IN (
            SELECT
              mp.product_id
            FROM
              mm_equipment_products mp
            WHERE
              mp.equipment_id IN (
                SELECT
                  equipment_id
                FROM
                  mm_equipment_products mp
                WHERE
                  mp.product_id = rd.product_id
              )
          )
        AND wp.warehouse_id = rd.warehouse_id
        GROUP BY
          wp.warehouse_id
      ) AS balance_equipment
    FROM
      wm_equipment_receive_detail rd
    WHERE
      rd.receive_id IN (${receiveIds})
    AND rd.warehouse_id = '${warehouseId}'`
    return knex.raw(sql);
  }

  getCountApprove(knex: Knex, warehouseId) {
    let sql = `
    SELECT
    count(*) AS count_approve
    FROM
      wm_equipment_receives AS r
    LEFT JOIN wm_equipment_receive_approve AS ra ON ra.receive_id = r.receive_id
    WHERE
      r.receive_id IN (
        SELECT
          rd.receive_id
        FROM
          wm_equipment_receive_detail rd
        WHERE
          rd.warehouse_id = '${warehouseId}'
        AND rd.receive_id = r.receive_id
      )  and ra.receive_id is null`;
    return knex.raw(sql);
  }

  getCountApproveOther(knex: Knex, warehouseId) {
    let sql = `
    select count(*) as count_approve from wm_equipment_receive_other as rt
    left join wm_equipment_receive_approve as ra on ra.receive_other_id=rt.receive_other_id
    where rt.receive_other_id in (
      SELECT
      rod.receive_other_id
    FROM
      wm_equipment_receive_other_detail rod
    WHERE
      rod.warehouse_id = ${warehouseId}
    AND rod.receive_other_id = rt.receive_other_id
    ) and ra.receive_other_id is null`;
    return knex.raw(sql);
  }

  getReceiveOtherStatus(knex: Knex, limit: number, offset: number, warehouseId, status) {
    let sql = `
    select rt.*, rt.is_cancel, (select count(*) from wm_equipment_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as total,
  (select sum(rtd.cost * rtd.receive_qty) from wm_equipment_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as cost,
  rtt.receive_type_name, d.donator_name, ra.approve_id
  from wm_equipment_receive_other as rt
  left join wm_equipment_receive_types as rtt on rtt.receive_type_id=rt.receive_type_id
  left join wm_equipment_donators as d on d.donator_id=rt.donator_id
  left join wm_equipment_receive_approve as ra on ra.receive_other_id=rt.receive_other_id
  WHERE rt.receive_other_id in (
    SELECT
      rod.receive_other_id
    FROM
      wm_equipment_receive_other_detail rod
    WHERE
      rod.warehouse_id = ${warehouseId}
    AND rod.receive_other_id = rt.receive_other_id
  )`;
    if (status == 'approve') {
      sql += ` and ra.receive_other_id is not null`
    } else if (status == 'Napprove') {
      sql += ` and ra.receive_other_id is null`
    }
    sql += ` order by rt.receive_code desc
  limit ${limit} offset ${offset}`;
    return knex.raw(sql);
  }

  getReceiveOtherStatusTotal(knex: Knex, warehouseId, status) {
    let sql = `
    select count(*) as total from wm_equipment_receive_other as rt
    left join wm_equipment_receive_approve as ra on ra.receive_other_id=rt.receive_other_id
    where rt.receive_other_id in (
      SELECT
      rod.receive_other_id
    FROM
      wm_equipment_receive_other_detail rod
    WHERE
      rod.warehouse_id = ${warehouseId}
    AND rod.receive_other_id = rt.receive_other_id
    ) `;
    if (status == 'approve') {
      sql += ` and ra.receive_other_id is not null`
    } else if (status == 'Napprove') {
      sql += ` and ra.receive_other_id is null`
    }
    return knex.raw(sql);
  }

  getReceiveOtherStatusSearch(knex: Knex, limit: number, offset: number, query: string, warehouseId, status) {
    let _query = `%${query}%`;
    let sql = `
    select rt.*, rt.is_cancel, (select count(*) from wm_equipment_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as total,
  (select sum(rtd.cost * rtd.receive_qty) from wm_equipment_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as cost,
  rtt.receive_type_name, d.donator_name, ra.approve_id
  from wm_equipment_receive_other as rt
  left join wm_equipment_receive_types as rtt on rtt.receive_type_id=rt.receive_type_id
  left join wm_equipment_donators as d on d.donator_id=rt.donator_id
  left join wm_equipment_receive_approve as ra on ra.receive_other_id=rt.receive_other_id
  WHERE rt.receive_other_id in (
    SELECT
      rod.receive_other_id
    FROM
      wm_equipment_receive_other_detail rod
    WHERE
      rod.warehouse_id = ${warehouseId}
    AND rod.receive_other_id = rt.receive_other_id
  )
  and  (rt.receive_code like '${_query}' or d.donator_name like '${_query}')`;
    if (status == 'approve') {
      sql += ` and ra.receive_other_id is not null`
    } else if (status == 'Napprove') {
      sql += ` and ra.receive_other_id is null`
    }
    sql += ` order by rt.receive_code desc
  limit ${limit} offset ${offset}`;
    return knex.raw(sql);
  }

  getReceiveOtherStatusTotalSearch(knex: Knex, query: string, warehouseId, status) {
    let _query = `%${query}%`;

    let sql = `
    select count(*) as total from wm_equipment_receive_other as rt
    left join wm_equipment_receive_approve as ra on ra.receive_other_id=rt.receive_other_id
    left join wm_equipment_donators as d on d.donator_id=rt.donator_id
    where rt.receive_other_id in (
      SELECT
      rod.receive_other_id
    FROM
      wm_equipment_receive_other_detail rod
    WHERE
      rod.warehouse_id = ${warehouseId}
    AND rod.receive_other_id = rt.receive_other_id
    ) and  (rt.receive_code like '${_query}' or d.donator_name like '${_query}')`;
    if (status == 'approve') {
      sql += ` and ra.receive_other_id is not null`
    } else if (status == 'Napprove') {
      sql += ` and ra.receive_other_id is null`
    }
    return knex.raw(sql);
  }
  // ใช้
  getReceiveStatus(knex: Knex, limit: number, offset: number,status:any) {
    let sql = `
    SELECT
    r.*,
    (
      SELECT
        count(*)
      FROM
        wm_equipment_receive_detail AS rd
      WHERE
        rd.receive_id = r.receive_id
    ) AS total
  FROM
    wm_equipment_receives AS r
  WHERE
  r.is_approve like '%${status}%'
  and r.receive_id IN (
      SELECT
        rd.receive_id
      FROM
        wm_equipment_receive_detail rd
      WHERE rd.receive_id = r.receive_id
    ) `;
    sql += ` order by r.receive_code desc
  limit ${limit} offset ${offset}`;
    return knex.raw(sql);
  }
  // ใช้
  getReceiveStatusTotal(knex: Knex ,status:any) {
    let sql = `
    SELECT
    count(*) AS total
    FROM
    wm_equipment_receives AS r
  WHERE
  r.is_approve like '%${status}%'
  and r.receive_id IN (
      SELECT
        rd.receive_id
      FROM
        wm_equipment_receive_detail rd
      WHERE rd.receive_id = r.receive_id
    ) `;

    return knex.raw(sql);
  }

  getReceiveStatusSearch(knex: Knex, limit: number, offset: number, warehouseId, status, query) {
    let _query = `%${query}%`;
    let sql = `
      SELECT
      r.*, r.is_cancel,
      (
        SELECT
          count(*)
        FROM
          wm_equipment_receive_detail AS rd
        WHERE
          rd.receive_id = r.receive_id
      ) AS total,
      (
        SELECT
          sum(rd.cost * rd.receive_qty)
        FROM
          wm_equipment_receive_detail AS rd
        WHERE
          rd.receive_id = r.receive_id
      ) AS cost,
      l.labeler_name,
      ra.approve_id,
      pc.purchase_order_id,
      pc.purchase_order_number,
      ra.approve_id,
      ra.approve_date
    FROM
      wm_equipment_receives AS r
    LEFT JOIN mm_equipment_labelers AS l ON l.labeler_id = r.vendor_labeler_id
    LEFT JOIN wm_equipment_receive_approve AS ra ON ra.receive_id = r.receive_id
    left join pc_purchasing_order pc on pc.purchase_order_id = r.purchase_order_id
    WHERE
      r.receive_id IN (
        SELECT
          rd.receive_id
        FROM
          wm_equipment_receive_detail rd
        WHERE
          rd.warehouse_id = '${warehouseId}'
        AND rd.receive_id = r.receive_id
      ) and  (r.receive_code like '${_query}' or l.labeler_name like '${_query}' or pc.purchase_order_number like '${_query}' or pc.purchase_order_book_number like '${_query}')`;
    if (status == 'approve') {
      sql += ` and ra.receive_id is not null`
    } else if (status == 'Napprove') {
      sql += ` and ra.receive_id is null`
    }
    sql += ` order by r.receive_code desc
    limit ${limit} offset ${offset}`;
    return knex.raw(sql);
  }

  getReceiveStatusSearchTotal(knex: Knex, warehouseId, status, query) {
    let _query = `%${query}%`;
    let sql = `
    SELECT
    count(*) AS total
    FROM
      wm_equipment_receives AS r
    LEFT JOIN wm_equipment_receive_approve AS ra ON ra.receive_id = r.receive_id
    LEFT JOIN mm_equipment_labelers AS l ON l.labeler_id = r.vendor_labeler_id
    WHERE
      r.receive_id IN (
        SELECT
          rd.receive_id
        FROM
          wm_equipment_receive_detail rd
        WHERE
          rd.warehouse_id = '${warehouseId}'
        AND rd.receive_id = r.receive_id
      ) and  (r.receive_code like '${_query}' or l.labeler_name like '${_query}')`;
    if (status == 'approve') {
      sql += ` and ra.receive_id is not null`
    } else if (status == 'Napprove') {
      sql += ` and ra.receive_id is null`
    }
    return knex.raw(sql);
  }
}
