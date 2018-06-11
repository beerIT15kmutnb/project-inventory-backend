import Knex = require('knex');
import * as moment from 'moment';

export class EquipmentIssueModel {
  gettransectionIssues(knex: Knex) {
    return knex('wm_equipment_transection_issues')

  }

  saveSummary(knex: Knex, data: any) {
    return knex('wm_equipment_issue_summary')
      .insert(data, 'issue_id');
  }
//use
  updateSummary(knex: Knex, issueId: any, data: any) {
    return knex('wm_equipment_issues')
      .where('issue_id', issueId)
      .update(data);
  }

  updateSummaryApprove(knex: Knex, issueIds: any, data: any) {
    return knex('wm_equipment_issues')
      .whereIn('issue_id', issueIds)
      .update(data);
  }

  getApproveProducts(knex: Knex, issueIds: any) {
    let sqlBalance = knex('wm_equipment_products as wp')
      .sum('wp.qty')
      .as('balance')
      .innerJoin('mm_equipment_products as mp', 'wp.product_id', 'mp.product_id')
      .whereRaw('mp.equipment_id=wd.equipment_id and wp.warehouse_id=wd.warehouse_id');

    return knex('wm_equipment_issue_detail as wd')
      .select('wd.*', 'mp.equipment_id', 'iss.approved', 'iss.issue_code', 'wp.cost', 'iss.transection_issue_id', sqlBalance)
      .innerJoin('mm_equipments as mg', 'mg.equipment_id', 'wd.equipment_id')
      .innerJoin('mm_equipment_products as mp', 'mp.equipment_id', 'mg.equipment_id')
      .joinRaw('inner join wm_equipment_products as wp on wp.product_id=mp.product_id')
      .innerJoin('wm_equipment_issue_summary as iss', 'iss.issue_id', 'wd.issue_id')
      .groupBy('wd.issue_detail_id')
      .whereIn('wd.issue_id', issueIds);
  }

  removeProducts(knex: Knex, issueId: any) {
    return knex('wm_equipment_issue_products')
      .where('issue_id', issueId)
      .del();
  }
//use
  removeProduct(knex: Knex, issueId: any) {
    return knex.raw(`DELETE ip
    FROM wm_equipment_issue_products as ip
    WHERE ip.issue_id = ${issueId}`)
  }

  removeIssueSummary(knex: Knex, issueId: any, data: any) {
    return knex('wm_equipment_issues')
      .where('issue_id', issueId)
      .update(data)
    // .del();
  }

  saveDetail(knex: Knex, data) {
    return knex('wm_equipment_issue_detail')
      .insert(data);
  }
  saveEquipments(knex: Knex, data) {
    return knex('wm_equipment_issue_equipments')
      .insert(data);
  }
  saveProducts(knex: Knex, data) {
    return knex('wm_equipment_issue_products')
      .insert(data);
  }

  getSummaryDetail(knex: Knex, issueId: any) {
    return knex('wm_equipment_issue_summary')
      .where('issue_id', issueId);
  }

  
  getSerial(knex: Knex) {
    return knex('wm_equipment_issues')
      .count('* as total')
  }
  saveIssueSummary(kenx: Knex, data: any) {
    return kenx('wm_equipment_issues')
      .insert(data, 'issue_id')

  }

  saveIssueDetail(kenx: Knex, data: any) {
    return kenx('wm_equipment_issue_products')
      .insert(data)
  }

  saveIssueProductDetail(kenx: Knex, data: any) {
    return kenx('wm_equipment_issue_product_detail')
      .insert(data)
  }
  setIssueProductDetail(knex: Knex, issuePId: any) {
    let sql = `SELECT
    ipd.*,
    wp.remainQty AS remainQty,
    wp.remainQty - ipd.qty AS remainQtyB,
    wp.expired_date 
    
  FROM
    wm_equipment_issue_products AS ip
    LEFT JOIN wm_equipment_issue_product_detail AS ipd ON ip.issue_product_id = ipd.issue_product_id
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
    ip.issue_product_id = ${issuePId}`
      return knex.raw(sql);
  }
  setIssueDetail(knex: Knex, issue_id: any) {
    let sql = `SELECT
    ip.*,
    mp.product_name,
    IFNULL( q.remainQty, 0 ) AS remainQty,
    q.small_qty,
    q.sm,
    q.lm 
  FROM
    wm_equipment_issue_products AS ip
    LEFT JOIN mm_equipment_products AS mp ON mp.product_id = ip.product_id
    LEFT JOIN (
  SELECT
    sum( wp.qty ) AS remainQty,
    mp.small_qty,
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
    ip.issue_id = ${issue_id} `
    return knex.raw(sql)
  }
  setIssues(knex: Knex, issue_id: any) {
    return knex('wm_equipment_issues')
      .where('issue_id', issue_id)
  }
  getList(knex: Knex, limit: number = 15, offset: number = 0, status: any = '') {

    let subQuery = knex('wm_equipment_issue_equipments as sd')
      .select(knex.raw('count(*) as total'))
      .whereRaw('sd.issue_id=ss.issue_id')
      .as('total');

    let query = knex('wm_equipment_issue_summary as ss')
      .select('ss.*', 'ts.transection_name', subQuery)
      .leftJoin('wm_equipment_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
      .orderBy('ss.issue_id', 'desc');

    if (status) {
      query.where('ss.approved', status)
    }

    return query.limit(limit).offset(offset);

  }
  //use
  addType(knex: Knex, items: any) {
    return knex('wm_equipment_transection_issues')
        .insert(items)

}

isactive(knex: Knex, items: any, Id: any) {
  return knex('wm_equipment_transection_issues')
      .update(items)
      .where('transection_id', Id)
}
editType(knex: Knex, items: any, Id: any) {
    return knex('wm_equipment_transection_issues')
        .update(items)
        .where('transection_id', Id)
}
  getType(knex: Knex){
    return knex('wm_equipment_transection_issues')
  }
  getListIssuesDetail(knex: Knex, id:any) {

    let subQuery = knex('wm_equipment_issue_products as sd')
      .select(knex.raw('count(*) as total'))
      .whereRaw('sd.issue_id=ss.issue_id')
      .as('total');

    let query = knex('wm_equipment_issues as ss')
      .select('ss.*', 'ts.transection_name', subQuery)
      .leftJoin('wm_equipment_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
      .where('ss.issue_id', id);

    if (status) {
      query.where('ss.is_approve', status)
    }

    return query;

  }
  getListIssues(knex: Knex, limit: number = 15, offset: number = 0, status: any = '') {

    let subQuery = knex('wm_equipment_issue_products as sd')
      .select(knex.raw('count(*) as total'))
      .whereRaw('sd.issue_id=ss.issue_id')
      .as('total');

    let query = knex('wm_equipment_issues as ss')
      .select('ss.*', 'ts.transection_name', subQuery)
      .leftJoin('wm_equipment_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
      .orderBy('ss.issue_id', 'desc');

    if (status) {
      query.where('ss.is_approve', status)
    }

    return query.limit(limit).offset(offset);

  }
  // use
  getListTotal(knex: Knex, status: any = '', ) {
    let query = knex('wm_equipment_issues as ss')
      .select(knex.raw('count(*) as total'))
    if (status) {
      query.where('ss.is_approve', status);
    }
    return query;
  }

  getListWarehouseTotal(knex: Knex, warehouseId: any, status: any = '') {
    let query = knex('wm_equipment_issue_summary')
      .select(knex.raw('count(*) as total'))
      .where('warehouse_id', warehouseId);

    if (status) {
      query.where('approved', status);
    }

    return query;
  }

  getListWarehouse(knex: Knex, warehouseId: any, limit: number = 15, offset: number = 0, status: any = null) {
    let subQuery = knex('wm_equipment_issue_equipments as sd')
      .select(knex.raw('count(*)'))
      .whereRaw('sd.issue_id=ss.issue_id')
      .as('total');

    let query = knex('wm_equipment_issue_summary as ss')
      .select('ss.*', 'ts.transection_name', subQuery)
      .leftJoin('wm_equipment_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
      .where('ss.warehouse_id', warehouseId)
      .limit(limit).offset(offset);

    if (status) {
      query.where('ss.approved', status);
    }

    query.orderBy('ss.issue_id', 'DESC')

    return query;

    
  }

  _getIssues(knex: Knex, id: string) {
    return knex('wm_equipment_issue_summary as wis')
   
  }
  
  getIssueApprove(knex: Knex, id: any, warehouseId: any) {
    let sql = `SELECT
    sp.product_id,
    ss.issue_code,
    ss.issue_id,
    sp.qty AS out_qty,
    sp.wm_product_id,
    wp.lot_no,
    wp.expired_date,
    ( SELECT sum( wp2.qty ) FROM wm_equipment_products wp2 WHERE wp2.wm_product_id = sp.wm_product_id ) balance_qty,
    ss.issue_id AS ref_src,
    ts.transection_name 
  FROM
    wm_equipment_issues ss
    JOIN wm_equipment_issue_products sg ON ss.issue_id = sg.issue_id
    LEFT JOIN wm_equipment_issue_product_detail sp ON sg.issue_product_id = sp.issue_product_id
    LEFT JOIN wm_equipment_products wp ON sp.wm_product_id = wp.wm_product_id
    LEFT JOIN wm_equipment_transection_issues ts ON ss.transection_issue_id = ts.transection_id 
  WHERE
    ss.issue_id = ${id} 
    AND sp.qty != 0`
    return knex.raw(sql);
  }
 

  saveProductStock(knex: Knex, data: any) {
    let sqls = [];

    data.forEach(v => {
      let sql = `
        UPDATE wm_equipment_products SET qty=qty-${v.cutQty} WHERE wm_product_id='${v.wm_product_id}'
        `;
      sqls.push(sql);
    });

    let queries = sqls.join(';');

    return knex.raw(queries);

  }

  getProductWarehouseLots(knex: Knex, productId: any, warehouseId: any) {
    return knex('wm_equipment_products as wpl')
      .select('wpl.lot_no', 'wpl.expired_date', 'wpl.cost', 'wpl.qty',
        knex.raw('timestampdiff(day, current_date(), wpl.expired_date) as count_expired'))
      .where('wpl.product_id', productId)
      .where('wpl.warehouse_id', warehouseId)
      .groupByRaw('wpl.lot_no, wpl.expired_date')
      .orderBy('wpl.expired_date', 'asc');
  }
  getEquipmentWarehouseLots(knex: Knex, equipmentId: any, warehouseId: any) {
    return knex('wm_equipment_products as wpl')
      .select('wpl.lot_no', 'wpl.expired_date', 'wpl.cost', 'wpl.qty',
        knex.raw('timestampdiff(day, current_date(), wpl.expired_date) as count_expired'))
      .join('mm_equipment_products as mp', 'mp.product_id', 'wpl.product_id')
      .where('mp.equipment_id', equipmentId)
      .where('wpl.warehouse_id', warehouseId)
      .groupByRaw('wpl.lot_no, wpl.expired_date')
      .orderBy('wpl.expired_date', 'asc');
  }
  getEquipmentQty(knex: Knex, equipmentId: any, warehouseId: any) {
    return knex('wm_equipment_products as wpl').sum('wpl.qty as qty')
      .join('mm_equipment_products as mp', 'mp.product_id', 'wpl.product_id')
      .where('mp.equipment_id', equipmentId)
      .where('wpl.warehouse_id', warehouseId)
      .groupBy('wpl.product_id')
  }
  getEquipmentProductQty(knex: Knex, equipmentId: any, warehouseId: any) {
    return knex('wm_equipment_products as wpl')
      // .sum('wpl.qty as qty')
      .join('mm_equipment_products as mp', 'mp.product_id', 'wpl.product_id')
      .where('mp.equipment_id', equipmentId)
      .where('wpl.warehouse_id', warehouseId)
    // .groupBy('wpl.product_id')
  }
  getProductByEquipments(knex: Knex, equipmentId: any, warehouseId: any) {
    return knex('wm_equipment_products as wm')
      .select('wm.warehouse_id', 'wm.product_id', 'mp.equipment_id', 'wm.qty', 'wm.wm_product_id', 'wm.expired_date')
      .join('mm_equipment_products as mp', 'wm.product_id', 'mp.product_id')
      .where('wm.warehouse_id', warehouseId)
      .where('mp.equipment_id', equipmentId)
      .orderBy('wm.expired_date', 'ASC')
    // .groupBy('wm.product_id')
  }
  getWmProduct(knex: Knex, productId: any, warehouseId: any) {
    return knex('wm_equipment_products as wm')
      .select('wm.warehouse_id', 'wm.product_id', 'wm.qty')
      .where('wm.warehouse_id', warehouseId)
      .where('wm.product_id', productId)
  }

  checkApprove(knex: Knex, username: any, password: any, action: any) {
    return knex('sys_approve as sa')
      .leftJoin('um_users as uu', 'uu.user_id', 'sa.user_id')
      .where('sa.action_name', action)
      .andWhere('uu.username', username)
      .andWhere('sa.password', password)
  }

}