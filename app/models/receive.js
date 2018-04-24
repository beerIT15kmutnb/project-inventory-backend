"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReceiveModel {
    getTypes(knex) {
        return knex('wm_receive_types');
    }
    getStatus(knex) {
        return knex('wm_receive_status');
    }
    getAllProducts(knex) {
        return knex('mm_products as p')
            .select('p.product_id', 'p.product_name', 'gp.generic_id', 'v.generic_name', 'v.generic_type', ' l.labeler_name')
            .innerJoin('mm_generic_product as gp', 'gp.product_id', 'p.product_id')
            .innerJoin('wm_all_products_view as v', 'v.generic_id', 'gp.generic_id')
            .innerJoin('mm_product_labeler as pl', 'pl.product_id', 'p.product_id')
            .innerJoin('mm_labelers as l', 'l.labeler_id', 'pl.labeler_id ')
            .where('pl.type_id', "M");
    }
    getReceiveNapprove(knex, limit, offset) {
    }
    getReceiveApprove(knex, limit, offset, warehouseId) {
    }
    getReceiveApproveTotal(knex, warehouseId) {
        let sql = `
      select count(*) as total from wm_receives r 
      join wm_receive_approve as ra on r.receive_id = ra.receive_id
      where r.receive_id in ( 
      SELECT
      rod.receive_id
      FROM
      wm_receive_detail rod
      WHERE
      rod.warehouse_id = ${warehouseId}
      AND rod.receive_id = r.receive_id)`;
        return knex.raw(sql);
    }
    getReceiveNapproveTotal(knex, warehouseId) {
        let sql = `
      select count(*) as total from wm_receives r 
      left join wm_receive_approve as ra on r.receive_id = ra.receive_id
      where r.receive_id in ( 
      SELECT
      rod.receive_id
      FROM
      wm_receive_detail rod
      WHERE
      rod.warehouse_id = ${warehouseId}
      AND rod.receive_id = r.receive_id)
      and ra.receive_id is null`;
        return knex.raw(sql);
    }
    getProductReceive(knex) {
        return knex('wm_receives as r');
    }
    getOtherExpired(knex, limit, offset) {
        let sql = `
    select rt.*, (select count(*) from wm_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as total,
    (select sum(rtd.cost * rtd.receive_qty) from wm_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as cost,
    rtt.receive_type_name, d.donator_name, a.approve_id
    from wm_receive_other as rt
    left join wm_receive_types as rtt on rtt.receive_type_id=rt.receive_type_id
    left join wm_donators as d on d.donator_id=rt.donator_id
    left join wm_receive_approve as a on a.receive_other_id=rt.receive_other_id
    where rt.is_expired = 'Y'
    order by rt.receive_other_id desc
    limit ${limit}
    offset ${offset}
    `;
        return knex.raw(sql);
    }
    getOtherExpiredTotal(knex) {
        let sql = `
    select count(*) as total
    from wm_receive_other as rt
    left join wm_receive_types as rtt on rtt.receive_type_id=rt.receive_type_id
    left join wm_donators as d on d.donator_id=rt.donator_id
    left join wm_receive_approve as a on a.receive_other_id=rt.receive_other_id
    where rt.is_expired = 'Y'
    `;
        return knex.raw(sql);
    }
    getOtherExpiredSearch(knex, q) {
        let sql = `
    select rt.*, (select count(*) from wm_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as total,
    (select sum(rtd.cost * rtd.receive_qty) from wm_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as cost,
    rtt.receive_type_name, d.donator_name, a.approve_id
    from wm_receive_other as rt
    left join wm_receive_types as rtt on rtt.receive_type_id=rt.receive_type_id
    left join wm_donators as d on d.donator_id=rt.donator_id
    left join wm_receive_approve as a on a.receive_other_id=rt.receive_other_id
    where rt.is_expired = 'Y' and (rt.receive_code like ? or d.donator_name like ?)
    order by rt.receive_other_id desc
    `;
        return knex.raw(sql, [q, q]);
    }
    getExpired(knex, limit, offset) {
        let sql = `
      SELECT
      r.receive_id,
      r.receive_date,
      r.receive_code,
      r.receive_type_id,
      r.comment,
      r.receive_status_id,
      r.delivery_code,
      l.labeler_name,
      ra.approve_date,
      ra.approve_id,
      pp.purchase_order_number,
      (
        SELECT
          sum(
            rd.cost * rd.receive_qty
          )
        FROM
          wm_receive_detail AS rd
        join mm_unit_generics mug on rd.unit_generic_id = mug.unit_generic_id
        WHERE
          rd.receive_id = r.receive_id
      ) AS cost
      FROM
        wm_receives AS r
      LEFT JOIN mm_labelers AS l ON l.labeler_id = r.vendor_labeler_id
      LEFT JOIN pc_purchasing_order AS pp ON pp.purchase_order_id = r.purchase_order_id
      LEFT JOIN wm_receive_approve AS ra ON ra.receive_id = r.receive_id
      WHERE
        r.is_expired = 'Y'
      ORDER BY
      r.receive_date DESC
      limit ${limit}
      offset ${offset}
      `;
        return knex.raw(sql);
    }
    getExpiredTotal(knex) {
        let sql = `
      SELECT
        count(*) as total
      FROM
        wm_receives AS r
      LEFT JOIN mm_labelers AS l ON l.labeler_id = r.vendor_labeler_id
      LEFT JOIN pc_purchasing_order AS pp ON pp.purchase_order_id = r.purchase_order_id
      LEFT JOIN wm_receive_approve AS ra ON ra.receive_id = r.receive_id
      WHERE
        r.is_expired = 'Y'`;
        return knex.raw(sql);
    }
    getExpiredSearch(knex, q) {
        let sql = `
      SELECT
      r.receive_id,
      r.receive_date,
      r.receive_code,
      r.receive_type_id,
      r.comment,
      r.receive_status_id,
      r.delivery_code,
      l.labeler_name,
      ra.approve_date,
      ra.approve_id,
      pp.purchase_order_number,
      (
        SELECT
          sum(
            rd.cost * rd.receive_qty
          )
        FROM
          wm_receive_detail AS rd
        join mm_unit_generics mug on rd.unit_generic_id = mug.unit_generic_id
        WHERE
          rd.receive_id = r.receive_id
      ) AS cost
      FROM
        wm_receives AS r
      LEFT JOIN mm_labelers AS l ON l.labeler_id = r.vendor_labeler_id
      LEFT JOIN pc_purchasing_order AS pp ON pp.purchase_order_id = r.purchase_order_id
      LEFT JOIN wm_receive_approve AS ra ON ra.receive_id = r.receive_id
      WHERE
        r.is_expired = 'Y' and (r.receive_code like ? or pp.purchase_order_number like ?)
      ORDER BY
      r.receive_date DESC
      `;
        return knex.raw(sql, [q, q]);
    }
    getReceiveOtherDetail(knex, receiveOtherId) {
        return knex('wm_receive_other as r')
            .select('r.*', 'd.donator_name')
            .where('r.receive_other_id', receiveOtherId)
            .leftJoin('wm_donators as d', 'd.donator_id', 'r.donator_id');
    }
    removeReceiveOther(knex, receiveOtherId, peopleUserId) {
        return knex('wm_receive_other')
            .where('receive_other_id', receiveOtherId)
            .update({
            is_cancel: 'Y',
            cancel_people_user_id: peopleUserId
        });
    }
    getReceiveOtherProductList(knex, receiveOtherId) {
        let sql = `
    select rotd.*, up.qty as conversion_qty, p.product_name, g.generic_name, rotd.lot_no, rotd.expired_date, w.warehouse_name, 
    lc.location_name, lc.location_desc, u1.unit_name as from_unit_name, u2.unit_name as to_unit_name
    from wm_receive_other_detail as rotd
    inner join mm_products as p on p.product_id=rotd.product_id
    left join mm_generics as g on g.generic_id=p.generic_id
    left join wm_warehouses as w on w.warehouse_id=rotd.warehouse_id
    left join wm_locations as lc on lc.location_id=rotd.location_id
    left join mm_unit_generics as up on up.unit_generic_id=rotd.unit_generic_id
    left join mm_units as u1 on u1.unit_id=up.from_unit_id
    left join mm_units as u2 on u2.unit_id=up.to_unit_id
    where rotd.receive_other_id=?
    `;
        return knex.raw(sql, [receiveOtherId]);
    }
    getReceiveOtherEditProductList(knex, receiveOtherId) {
        let sql = `
      SELECT
      rd.cost,
      rd.product_id,
      rd.receive_qty,
      rd.lot_no,
      rd.expired_date,
      rd.receive_other_id,
      rd.warehouse_id,
      pd.product_name,
      mg.generic_id,
      mg.generic_name,
      mu.unit_name AS primary_unit_name,
      pd.primary_unit_id,
      ge.num_days AS expire_num_days,
      mug.qty AS conversion_qty,
      l.donator_name,
      l.donator_id,
      rd.unit_generic_id,
      r.delivery_code,
      r.receive_code,
      r.receive_date
      FROM
        wm_receive_other_detail AS rd
      JOIN wm_receive_other AS r ON rd.receive_other_id = r.receive_other_id
      JOIN mm_products AS pd ON pd.product_id = rd.product_id
      JOIN mm_generics AS mg ON mg.generic_id = pd.generic_id
      JOIN mm_unit_generics AS mug ON rd.unit_generic_id = mug.unit_generic_id
      LEFT JOIN mm_units AS mu ON mu.unit_id = pd.primary_unit_id
      LEFT JOIN wm_donators AS l ON l.donator_id = r.donator_id
      LEFT JOIN wm_generic_expired_alert AS ge ON ge.generic_id = pd.generic_id
      WHERE
      rd.receive_other_id =?
    `;
        return knex.raw(sql, [receiveOtherId]);
    }
    saveApprove(knex, data) {
        let sql = `UPDATE wm_receives
    SET is_approve = 'Y' 
    WHERE
      receive_id IN ( ${data} )`;
        return knex.raw(sql);
    }
    removeOldApprove(knex, receiveIds) {
        return knex('wm_receive_approve')
            .whereIn('receive_id', receiveIds)
            .del();
    }
    removeOldApproveOther(knex, receiveIds) {
        return knex('wm_receive_approve')
            .whereIn('receive_other_id', receiveIds)
            .del();
    }
    saveReceiveDetail(knex, products) {
        return knex('wm_receive_detail')
            .insert(products);
    }
    saveReceiveDetailOther(knex, products) {
        return knex('wm_receive_other_detail')
            .insert(products);
    }
    removeReceiveDetailOther(knex, receiveOtherId) {
        return knex('wm_receive_other_detail')
            .where('receive_other_id', receiveOtherId)
            .del();
    }
    saveReceiveSummary(knex, data) {
        return knex('wm_receives')
            .insert(data, 'receive_id');
    }
    saveReceiveSummaryOther(knex, data) {
        return knex('wm_receive_other')
            .insert(data, 'receive_other_id');
    }
    updateReceiveSummaryOther(knex, receiveOtherId, data) {
        return knex('wm_receive_other')
            .update(data)
            .where('receive_other_id', receiveOtherId);
    }
    updateReceiveSummary(knex, receiveId, data) {
        return knex('wm_receives')
            .where('receive_id', receiveId)
            .update(data);
    }
    checkDuplicatedApprove(knex, receiveId) {
        return knex('wm_receive_approve')
            .count('* as total')
            .where('receive_id', receiveId);
    }
    getApproveStatus(knex, receiveId) {
        return knex('wm_receive_approve')
            .where('receive_id', receiveId);
    }
    getReceiveInfo(knex, receiveId) {
        return knex('wm_receives as r')
            .where('r.receive_id', receiveId);
    }
    getSerial(knex) {
        return knex('wm_receives')
            .count('* as total');
    }
    getReceiveProducts(knex, receiveId) {
        let sql = `SELECT
	rd.product_id,
	p.product_name,
	rd.lot_no,
	g.generic_name,
	g.generic_id,
	rd.receive_qty,
	p.small_qty AS conversion_qty,
	u1.unit_name AS base_unit_name,
	u2.unit_name AS from_unit_name,
	rd.expired_date
FROM
	wm_receive_detail AS rd
	INNER JOIN mm_products AS p ON p.product_id = rd.product_id
	LEFT JOIN mm_generics AS g ON g.generic_id = p.generic_id
	LEFT JOIN mm_units AS u1 ON p.small_unit_id = u1.unit_id  
	LEFT JOIN mm_units AS u2 ON p.large_unit_id = u2.unit_id  
	INNER JOIN wm_receives AS r ON r.receive_id = rd.receive_id 
WHERE
	rd.receive_id = ${receiveId}`;
        return knex.raw(sql);
    }
    getReceiveProductsImport(knex, receiveIds) {
        let subBalance = knex('wm_products as wp')
            .sum('wp.qty')
            .as('balance')
            .whereRaw('wp.product_id=rd.product_id and wp.lot_no=rd.lot_no and wp.expired_date=rd.expired_date');
        return knex('wm_receive_detail as rd')
            .select('rd.receive_detail_id', 'rd.receive_id', 'rd.product_id', 'rd.lot_no', 'rd.expired_date', knex.raw('sum(rd.receive_qty) as receive_qty'), 'mp.generic_id', 'r.receive_code', subBalance)
            .whereIn('rd.receive_id', receiveIds)
            .innerJoin('wm_receives as r', 'r.receive_id', 'rd.receive_id')
            .leftJoin('mm_products as mp', 'mp.product_id', 'rd.product_id')
            .groupBy('rd.receive_detail_id');
    }
    getRequisition(knex, receiveIds) {
        return knex('wm_requisition_detail')
            .select('requisition_id')
            .whereIn('receive_id', receiveIds);
    }
    updateRequisitionStatus(knex, reqIds) {
        return knex('wm_requisition')
            .select('requisition_id')
            .update({ doc_type: 'R' })
            .whereIn('requisition_id', reqIds);
    }
    getReceiveOtherProductsImport(knex, receiveIds) {
        let subBalance = knex('wm_products as wp')
            .sum('wp.qty')
            .as('balance')
            .whereRaw('wp.product_id=rd.product_id and wp.lot_no=rd.lot_no and wp.expired_date=rd.expired_date');
        return knex('wm_receive_other_detail as rd')
            .select('rd.receive_detail_id', 'rd.receive_other_id', 'rd.product_id', 'rd.lot_no', 'rd.expired_date', knex.raw('sum(rd.receive_qty) as receive_qty'), 'rd.manufacturer_labeler_id', 'rd.cost', 'rd.unit_generic_id', 'rd.warehouse_id', 'rd.location_id', 'ug.qty as conversion_qty', 'mp.generic_id', 'rt.receive_code', 'rt.donator_id', subBalance)
            .whereIn('rd.receive_other_id', receiveIds)
            .innerJoin('wm_receive_other as rt', 'rt.receive_other_id', 'rd.receive_other_id')
            .innerJoin('mm_products as mp', 'mp.product_id', 'rd.product_id')
            .innerJoin('mm_unit_generics as ug', 'ug.unit_generic_id', 'rd.unit_generic_id')
            .groupByRaw('rd.product_id, rd.lot_no');
    }
    saveCheckSummary(knex, data) {
        return knex('wm_receive_check')
            .insert(data);
    }
    saveCheckProduct(knex, data) {
        return knex('wm_receive_check_detail')
            .insert(data);
    }
    saveProducts(knex, data) {
        let sqls = [];
        data.forEach(v => {
            let sql = `
        INSERT INTO wm_products(wm_product_id, warehouse_id, product_id, qty, 
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
    adjustCost(knex, data) {
        let sqls = [];
        data.forEach(v => {
            let sql = `
          UPDATE mm_unit_generics set cost = ${v.cost} where unit_generic_id = ${v.unit_generic_id}`;
            sqls.push(sql);
        });
        let queries = sqls.join(';');
        return knex.raw(queries);
    }
    removeReceive(knex, receiveId, peopleUserId) {
        return knex('wm_receives')
            .where('receive_id', receiveId)
            .update({
            is_cancel: 'Y',
            cancel_people_user_id: peopleUserId
        });
    }
    removeReceiveDetail(knex, receiveId) {
        return knex('wm_receive_detail')
            .where('receive_id', receiveId)
            .del();
    }
    getPurchaseList(knex, limit, offset) {
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
        from wm_receive_detail as rd
        inner join wm_receives as r on r.receive_id=rd.receive_id
        where r.purchase_order_id=pc.purchase_order_id
        and r.is_cancel ='N'
      ) as receive_qty,
      (
        select sum(rd.receive_qty*rd.cost) 
        from wm_receive_detail as rd
        inner join wm_receives as r on r.receive_id=rd.receive_id
        where rd.is_free='N'
        and r.purchase_order_id=pc.purchase_order_id
        and r.is_cancel ='N'
        
      ) as receive_price
      from pc_purchasing_order as pc
      left join mm_labelers as ml on ml.labeler_id=pc.labeler_id
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
    getPurchaseListSearch(knex, limit, offset, query) {
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
        from wm_receive_detail as rd
        inner join wm_receives as r on r.receive_id=rd.receive_id
        where r.purchase_order_id=pc.purchase_order_id
        and r.is_cancel ='N'
      ) as receive_qty,
      (
        select sum(rd.receive_qty*rd.cost) 
        from wm_receive_detail as rd
        inner join wm_receives as r on r.receive_id=rd.receive_id
        where rd.is_free='N'
        and r.purchase_order_id=pc.purchase_order_id
        and r.is_cancel ='N'
        
      ) as receive_price
      from pc_purchasing_order as pc
      left join mm_labelers as ml on ml.labeler_id=pc.labeler_id
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
          JOIN mm_products mp ON mp.product_id = poi.product_id
          JOIN mm_generics mg ON mp.generic_id = mg.generic_id
          WHERE
            mp.product_name LIKE '${_query}'
          OR mg.generic_name LIKE '${_query}'
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
    getPurchaseListTotal(knex) {
        let sql = `
      select count(*) as total
      from pc_purchasing_order as pc
      left join mm_labelers as ml on ml.labeler_id=pc.labeler_id
      left join l_bid_process as cmp on cmp.id=pc.purchase_method_id
      where pc.purchase_order_status='APPROVED'
      and pc.purchase_order_status != 'COMPLETED'
      and pc.is_cancel != 'Y'
    `;
        return knex.raw(sql, []);
    }
    getPurchaseListTotalSearch(knex, query) {
        let _query = `%${query}%`;
        let sql = `
      select count(*) as total
      from pc_purchasing_order as pc
      left join mm_labelers as ml on ml.labeler_id=pc.labeler_id
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
          JOIN mm_products mp ON mp.product_id = poi.product_id
          JOIN mm_generics mg ON mp.generic_id = mg.generic_id
          WHERE
            mp.product_name LIKE '${_query}'
          OR mg.generic_name LIKE '${_query}'
          OR mp.working_code = '${query}'
          OR mg.working_code = '${query}'
        )
      )
    `;
        return knex.raw(sql);
    }
    getPurchaseProductList(knex, purchaseOrderId) {
        let sql = `
    select pi.product_id, p.product_name, pi.unit_generic_id,
      p.m_labeler_id, p.v_labeler_id, g.generic_name, g.generic_id, g.working_code as generic_working_code,
      pi.qty as purchase_qty, pi.unit_price as cost, lm.labeler_name as m_labeler_name, 
      lv.labeler_name as v_labeler_name, p.working_code,
      mu.from_unit_id, mu.to_unit_id as base_unit_id, mu.qty as conversion_qty,
      u1.unit_name as to_unit_name, u2.unit_name as from_unit_name, pi.giveaway, 
      (
      	select ifnull(sum(rdx.receive_qty), 0)
      	from wm_receive_detail as rdx
      	inner join wm_receives as r on r.receive_id=rdx.receive_id
      	where rdx.product_id=pi.product_id
        and rdx.receive_id and r.purchase_order_id=pi.purchase_order_id
        and r.is_cancel='N'
      ) as total_received_qty
    from pc_purchasing_order_item as pi
    inner join mm_products as p on p.product_id=pi.product_id
    left join mm_generics as g on g.generic_id=p.generic_id
    left join mm_unit_generics as mu on mu.unit_generic_id=pi.unit_generic_id
    left join mm_units as u1 on u1.unit_id=mu.to_unit_id
    left join mm_units as u2 on u2.unit_id=mu.from_unit_id
    left join mm_labelers as lm on lm.labeler_id=p.m_labeler_id
    left join mm_labelers as lv on lv.labeler_id=p.v_labeler_id
    -- left join wm_receives as r on r.purchase_order_id=pi.purchase_order_id
    where pi.purchase_order_id=?
    group by pi.product_id, pi.giveaway
    `;
        return knex.raw(sql, [purchaseOrderId]);
    }
    getPurchaseInfo(knex, purchaseOrderId) {
        return knex('pc_purchasing_order as ro')
            .select('ro.*', 'l.labeler_name')
            .innerJoin('mm_labelers as l', 'l.labeler_id', 'ro.labeler_id')
            .where('ro.purchase_order_id', purchaseOrderId);
    }
    getTotalPricePurchase(knex, purchaseOrderId) {
        return knex('pc_purchasing_order_item as oi')
            .select(knex.raw('sum(oi.qty*oi.unit_price) as total'))
            .where('oi.purchase_order_id', purchaseOrderId)
            .where('giveaway', 'N');
    }
    getTotalPricePurcehaseReceived(knex, purchaseOrderId) {
        return knex('wm_receives as r')
            .innerJoin('wm_receive_detail as rd', 'rd.receive_id', 'r.receive_id')
            .select(knex.raw('sum(rd.receive_qty*rd.cost) as total'))
            .where('r.purchase_order_id', purchaseOrderId)
            .where('rd.is_free', 'N')
            .where('r.is_cancel', 'N');
    }
    getTotalPricePurcehaseReceivedWithoutOwner(knex, purchaseOrderId, receiveId) {
        return knex('wm_receives as r')
            .innerJoin('wm_receive_detail as rd', 'rd.receive_id', 'r.receive_id')
            .select(knex.raw('sum(rd.receive_qty*rd.cost) as total'))
            .where('r.purchase_order_id', purchaseOrderId)
            .where('r.is_cancel', 'N')
            .whereNot('r.receive_id', receiveId);
    }
    getProductInPurchase(knex, purchaseOrderId) {
        return knex('pc_purchasing_order_item as i')
            .where('i.purchase_order_id', purchaseOrderId);
    }
    savePurchaseStatus(knex, purchaseOrderIds) {
        return knex('pc_purchasing_order')
            .update({
            purchase_order_status: 'SUCCESS'
        })
            .whereIn('purchase_order_id', purchaseOrderIds);
    }
    getReceivePurchaseId(knex, receiveIds) {
        return knex('wm_receives')
            .whereIn('receive_id', receiveIds);
    }
    getCommittee(knex) {
        let sql = `select * from pc_committee where committee_status='T'`;
        return knex.raw(sql, []);
    }
    getCommitteePO(knex, id) {
        let sql = `select * from pc_purchasing_order where purchase_order_id=` + id;
        return knex.raw(sql, []);
    }
    updateCommittee(knex, receiveId, committeeId) {
        return knex('wm_receives')
            .where('receive_id', receiveId)
            .update({
            committee_id: committeeId
        });
    }
    getCommitteeList(knex, committeeId) {
        let sql = `
    select cp.committee_id, cp.position_name, po.fname, po.lname, t.title_name
    from pc_committee_people as cp
    left join um_people as po on po.people_id=cp.people_id
    left join um_titles as t on t.title_id=po.title_id
    where cp.committee_id=?
    `;
        return knex.raw(sql, [committeeId]);
    }
    updatePurchaseStatus(knex, purchaseOrderId, completed) {
        return knex('pc_purchasing_order')
            .where('purchase_order_id', purchaseOrderId)
            .update({
            complete: completed,
            purchase_order_status: 'SUCCESS'
        });
    }
    updatePurchaseCompletedStatus(knex, purchaseOrderId) {
        return knex('pc_purchasing_order')
            .where('purchase_order_id', purchaseOrderId)
            .update({
            purchase_order_status: 'COMPLETED'
        });
    }
    checkDeliveryCode(knex, deliveryCode, supplierId) {
        return knex('wm_receives')
            .where('delivery_code', deliveryCode)
            .where('vendor_labeler_id', supplierId)
            .where('is_cancel', 'N')
            .count('* as total');
    }
    getRequisitionProductsImport(knex, requisitionIds) {
        return knex('wm_requisition_check_detail as rcd')
            .select('r.wm_withdraw as warehouse_id', 'r.wm_requisition as requisition_warehouse_id', 'rcd.product_id', 'mp.generic_id', 'rcd.requisition_qty', 'rcd.cost', 'rcd.expired_date', 'rcd.lot_no', 'r.requisition_id', 'rcd.unit_generic_id', 'rcd.conversion_qty', knex.raw('ifnull(wp.qty, 0) as balance_receive'), knex.raw('ifnull(wp2.qty, 0) as balance_withdraw'))
            .innerJoin('wm_requisition_check as rc', 'rcd.check_id', 'rc.check_id')
            .innerJoin('wm_requisition as r', 'rc.requisition_id', 'r.requisition_id')
            .innerJoin('mm_products as mp', 'mp.product_id', 'rcd.product_id')
            .joinRaw('left join wm_products as wp on wp.product_id=rcd.product_id and wp.lot_no=rcd.lot_no and wp.expired_date=rcd.expired_date and wp.warehouse_id=r.wm_requisition')
            .joinRaw('left join wm_products as wp2 on wp2.product_id=rcd.product_id and wp2.lot_no=rcd.lot_no and wp2.expired_date=rcd.expired_date and wp2.warehouse_id=r.wm_withdraw')
            .whereIn('rc.requisition_id', requisitionIds)
            .groupBy('rcd.check_detail_id');
    }
    decreaseQty(knex, data) {
        let sql = [];
        data.forEach(v => {
            let _sql = `
      UPDATE wm_products
      SET qty=qty-${v.qty}
      WHERE lot_no='${v.lot_no}' AND expired_date='${v.expired_date}' 
      AND warehouse_id='${v.warehouse_id}' AND product_id='${v.product_id}'`;
            sql.push(_sql);
        });
        let query = sql.join(';');
        return knex.raw(query);
    }
    getPurchaseCheckHoliday(knex, date) {
        return knex('sys_holidays').where('date', date);
    }
    getPurchaseCheckExpire(knex, genericId) {
        return knex('wm_generic_expired_alert').where('generic_id', genericId);
    }
    updateCost(knex, productsData) {
        let sql = [];
        productsData.forEach(v => {
            let _sql = `
      UPDATE mm_unit_generics
      SET cost=${v.cost}
      WHERE unit_generic_id='${v.unit_generic_id}' `;
            sql.push(_sql);
        });
        let query = sql.join(';');
        return knex.raw(query);
    }
    getProductRemainByReceiveOtherIds(knex, receiveIds, warehouseId) {
        let sql = `SELECT
    rd.product_id,
    rd.warehouse_id,
    IFNULL(
      (
        SELECT
          sum(wp.qty)
        FROM
          wm_products wp
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
        wm_products wp
      WHERE
        wp.product_id IN (
          SELECT
            mp.product_id
          FROM
            mm_products mp
          WHERE
            mp.generic_id IN (
              SELECT
                generic_id
              FROM
                mm_products mp
              WHERE
                mp.product_id = rd.product_id
            )
        )
      AND wp.warehouse_id = rd.warehouse_id
      GROUP BY
        wp.warehouse_id
    ) AS balance_generic
  FROM
    wm_receive_other_detail rd
  WHERE
    rd.receive_other_id IN (${receiveIds})
  AND rd.warehouse_id = '${warehouseId}'`;
        return knex.raw(sql);
    }
    getProductRemainByReceiveIds(knex, receiveIds, warehouseId) {
        let sql = `SELECT
      rd.product_id,
      rd.warehouse_id,
      IFNULL(
        (
          SELECT
            sum(wp.qty)
          FROM
            wm_products wp
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
          wm_products wp
        WHERE
          wp.product_id IN (
            SELECT
              mp.product_id
            FROM
              mm_products mp
            WHERE
              mp.generic_id IN (
                SELECT
                  generic_id
                FROM
                  mm_products mp
                WHERE
                  mp.product_id = rd.product_id
              )
          )
        AND wp.warehouse_id = rd.warehouse_id
        GROUP BY
          wp.warehouse_id
      ) AS balance_generic
    FROM
      wm_receive_detail rd
    WHERE
      rd.receive_id IN (${receiveIds})
    AND rd.warehouse_id = '${warehouseId}'`;
        return knex.raw(sql);
    }
    getCountApprove(knex, warehouseId) {
        let sql = `
    SELECT
    count(*) AS count_approve
    FROM
      wm_receives AS r
    LEFT JOIN wm_receive_approve AS ra ON ra.receive_id = r.receive_id
    WHERE
      r.receive_id IN (
        SELECT
          rd.receive_id
        FROM
          wm_receive_detail rd
        WHERE
          rd.warehouse_id = '${warehouseId}'
        AND rd.receive_id = r.receive_id
      )  and ra.receive_id is null`;
        return knex.raw(sql);
    }
    getCountApproveOther(knex, warehouseId) {
        let sql = `
    select count(*) as count_approve from wm_receive_other as rt
    left join wm_receive_approve as ra on ra.receive_other_id=rt.receive_other_id
    where rt.receive_other_id in (
      SELECT
      rod.receive_other_id
    FROM
      wm_receive_other_detail rod
    WHERE
      rod.warehouse_id = ${warehouseId}
    AND rod.receive_other_id = rt.receive_other_id
    ) and ra.receive_other_id is null`;
        return knex.raw(sql);
    }
    getReceiveOtherStatus(knex, limit, offset, warehouseId, status) {
        let sql = `
    select rt.*, rt.is_cancel, (select count(*) from wm_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as total,
  (select sum(rtd.cost * rtd.receive_qty) from wm_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as cost,
  rtt.receive_type_name, d.donator_name, ra.approve_id
  from wm_receive_other as rt
  left join wm_receive_types as rtt on rtt.receive_type_id=rt.receive_type_id
  left join wm_donators as d on d.donator_id=rt.donator_id
  left join wm_receive_approve as ra on ra.receive_other_id=rt.receive_other_id
  WHERE rt.receive_other_id in (
    SELECT
      rod.receive_other_id
    FROM
      wm_receive_other_detail rod
    WHERE
      rod.warehouse_id = ${warehouseId}
    AND rod.receive_other_id = rt.receive_other_id
  )`;
        if (status == 'approve') {
            sql += ` and ra.receive_other_id is not null`;
        }
        else if (status == 'Napprove') {
            sql += ` and ra.receive_other_id is null`;
        }
        sql += ` order by rt.receive_code desc
  limit ${limit} offset ${offset}`;
        return knex.raw(sql);
    }
    getReceiveOtherStatusTotal(knex, warehouseId, status) {
        let sql = `
    select count(*) as total from wm_receive_other as rt
    left join wm_receive_approve as ra on ra.receive_other_id=rt.receive_other_id
    where rt.receive_other_id in (
      SELECT
      rod.receive_other_id
    FROM
      wm_receive_other_detail rod
    WHERE
      rod.warehouse_id = ${warehouseId}
    AND rod.receive_other_id = rt.receive_other_id
    ) `;
        if (status == 'approve') {
            sql += ` and ra.receive_other_id is not null`;
        }
        else if (status == 'Napprove') {
            sql += ` and ra.receive_other_id is null`;
        }
        return knex.raw(sql);
    }
    getReceiveOtherStatusSearch(knex, limit, offset, query, warehouseId, status) {
        let _query = `%${query}%`;
        let sql = `
    select rt.*, rt.is_cancel, (select count(*) from wm_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as total,
  (select sum(rtd.cost * rtd.receive_qty) from wm_receive_other_detail as rtd where rtd.receive_other_id=rt.receive_other_id) as cost,
  rtt.receive_type_name, d.donator_name, ra.approve_id
  from wm_receive_other as rt
  left join wm_receive_types as rtt on rtt.receive_type_id=rt.receive_type_id
  left join wm_donators as d on d.donator_id=rt.donator_id
  left join wm_receive_approve as ra on ra.receive_other_id=rt.receive_other_id
  WHERE rt.receive_other_id in (
    SELECT
      rod.receive_other_id
    FROM
      wm_receive_other_detail rod
    WHERE
      rod.warehouse_id = ${warehouseId}
    AND rod.receive_other_id = rt.receive_other_id
  )
  and  (rt.receive_code like '${_query}' or d.donator_name like '${_query}')`;
        if (status == 'approve') {
            sql += ` and ra.receive_other_id is not null`;
        }
        else if (status == 'Napprove') {
            sql += ` and ra.receive_other_id is null`;
        }
        sql += ` order by rt.receive_code desc
  limit ${limit} offset ${offset}`;
        return knex.raw(sql);
    }
    getReceiveOtherStatusTotalSearch(knex, query, warehouseId, status) {
        let _query = `%${query}%`;
        let sql = `
    select count(*) as total from wm_receive_other as rt
    left join wm_receive_approve as ra on ra.receive_other_id=rt.receive_other_id
    left join wm_donators as d on d.donator_id=rt.donator_id
    where rt.receive_other_id in (
      SELECT
      rod.receive_other_id
    FROM
      wm_receive_other_detail rod
    WHERE
      rod.warehouse_id = ${warehouseId}
    AND rod.receive_other_id = rt.receive_other_id
    ) and  (rt.receive_code like '${_query}' or d.donator_name like '${_query}')`;
        if (status == 'approve') {
            sql += ` and ra.receive_other_id is not null`;
        }
        else if (status == 'Napprove') {
            sql += ` and ra.receive_other_id is null`;
        }
        return knex.raw(sql);
    }
    getReceiveStatus(knex, limit, offset) {
        let sql = `
    SELECT
    r.*,
    (
      SELECT
        count(*)
      FROM
        wm_receive_detail AS rd
      WHERE
        rd.receive_id = r.receive_id
    ) AS total
  FROM
    wm_receives AS r
  WHERE
    r.receive_id IN (
      SELECT
        rd.receive_id
      FROM
        wm_receive_detail rd
      WHERE rd.receive_id = r.receive_id
    ) `;
        sql += ` order by r.receive_code desc
  limit ${limit} offset ${offset}`;
        return knex.raw(sql);
    }
    getReceiveStatusTotal(knex) {
        let sql = `
    SELECT
    count(*) AS total
    FROM
    wm_receives AS r
  WHERE
    r.receive_id IN (
      SELECT
        rd.receive_id
      FROM
        wm_receive_detail rd
      WHERE rd.receive_id = r.receive_id
    ) `;
        return knex.raw(sql);
    }
    getReceiveStatusSearch(knex, limit, offset, warehouseId, status, query) {
        let _query = `%${query}%`;
        let sql = `
      SELECT
      r.*, r.is_cancel,
      (
        SELECT
          count(*)
        FROM
          wm_receive_detail AS rd
        WHERE
          rd.receive_id = r.receive_id
      ) AS total,
      (
        SELECT
          sum(rd.cost * rd.receive_qty)
        FROM
          wm_receive_detail AS rd
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
      wm_receives AS r
    LEFT JOIN mm_labelers AS l ON l.labeler_id = r.vendor_labeler_id
    LEFT JOIN wm_receive_approve AS ra ON ra.receive_id = r.receive_id
    left join pc_purchasing_order pc on pc.purchase_order_id = r.purchase_order_id
    WHERE
      r.receive_id IN (
        SELECT
          rd.receive_id
        FROM
          wm_receive_detail rd
        WHERE
          rd.warehouse_id = '${warehouseId}'
        AND rd.receive_id = r.receive_id
      ) and  (r.receive_code like '${_query}' or l.labeler_name like '${_query}' or pc.purchase_order_number like '${_query}' or pc.purchase_order_book_number like '${_query}')`;
        if (status == 'approve') {
            sql += ` and ra.receive_id is not null`;
        }
        else if (status == 'Napprove') {
            sql += ` and ra.receive_id is null`;
        }
        sql += ` order by r.receive_code desc
    limit ${limit} offset ${offset}`;
        return knex.raw(sql);
    }
    getReceiveStatusSearchTotal(knex, warehouseId, status, query) {
        let _query = `%${query}%`;
        let sql = `
    SELECT
    count(*) AS total
    FROM
      wm_receives AS r
    LEFT JOIN wm_receive_approve AS ra ON ra.receive_id = r.receive_id
    LEFT JOIN mm_labelers AS l ON l.labeler_id = r.vendor_labeler_id
    WHERE
      r.receive_id IN (
        SELECT
          rd.receive_id
        FROM
          wm_receive_detail rd
        WHERE
          rd.warehouse_id = '${warehouseId}'
        AND rd.receive_id = r.receive_id
      ) and  (r.receive_code like '${_query}' or l.labeler_name like '${_query}')`;
        if (status == 'approve') {
            sql += ` and ra.receive_id is not null`;
        }
        else if (status == 'Napprove') {
            sql += ` and ra.receive_id is null`;
        }
        return knex.raw(sql);
    }
}
exports.ReceiveModel = ReceiveModel;
//# sourceMappingURL=receive.js.map