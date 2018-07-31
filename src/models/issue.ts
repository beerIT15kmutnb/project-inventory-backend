import Knex = require('knex');
import * as moment from 'moment';

export class IssueModel {
  gettransectionIssues(knex: Knex) {
    return knex('wm_transection_issues')

  }

  saveSummary(knex: Knex, data: any) {
    return knex('wm_issue_summary')
      .insert(data, 'issue_id');
  }
//use
  updateSummary(knex: Knex, issueId: any, data: any) {
    return knex('wm_issues')
      .where('issue_id', issueId)
      .update(data);
  }

  updateSummaryApprove(knex: Knex, issueIds: any, data: any) {
    return knex('wm_issues')
      .where('issue_id', issueIds)
      .update(data);
  }

  getApproveProducts(knex: Knex, issueIds: any) {
    let sqlBalance = knex('wm_products as wp')
      .sum('wp.qty')
      .as('balance')
      .innerJoin('mm_products as mp', 'wp.product_id', 'mp.product_id')
      .whereRaw('mp.generic_id=wd.generic_id and wp.warehouse_id=wd.warehouse_id');

    return knex('wm_issue_detail as wd')
      .select('wd.*', 'mp.generic_id', 'iss.approved', 'iss.issue_code', 'wp.cost', 'iss.transection_issue_id', sqlBalance)
      .innerJoin('mm_generics as mg', 'mg.generic_id', 'wd.generic_id')
      .innerJoin('mm_products as mp', 'mp.generic_id', 'mg.generic_id')
      .joinRaw('inner join wm_products as wp on wp.product_id=mp.product_id')
      .innerJoin('wm_issue_summary as iss', 'iss.issue_id', 'wd.issue_id')
      .groupBy('wd.issue_detail_id')
      .whereIn('wd.issue_id', issueIds);
  }

  removeProducts(knex: Knex, issueId: any) {
    return knex('wm_issue_products')
      .where('issue_id', issueId)
      .del();
  }
//use
  removeProduct(knex: Knex, issueId: any) {
    return knex.raw(`DELETE ip
    FROM wm_issue_products as ip
    WHERE ip.issue_id = ${issueId}`)
  }

  removeIssueSummary(knex: Knex, issueId: any, data: any) {
    return knex('wm_issues')
      .where('issue_id', issueId)
      .update(data)
    // .del();
  }

  saveDetail(knex: Knex, data) {
    return knex('wm_issue_detail')
      .insert(data);
  }
  saveGenerics(knex: Knex, data) {
    return knex('wm_issue_generics')
      .insert(data);
  }
  saveProducts(knex: Knex, data) {
    return knex('wm_issue_products')
      .insert(data);
  }

  getSummaryDetail(knex: Knex, issueId: any) {
    return knex('wm_issue_summary')
      .where('issue_id', issueId);
  }

  
  getSerial(knex: Knex) {
    return knex('wm_issues')
      .count('* as total')
  }
  saveIssueSummary(kenx: Knex, data: any) {
    return kenx('wm_issues')
      .insert(data, 'issue_id')

  }

  saveIssueDetail(kenx: Knex, data: any) {
    return kenx('wm_issue_products')
      .insert(data)
  }

  saveIssueProductDetail(kenx: Knex, data: any) {
    return kenx('wm_issue_product_detail')
      .insert(data)
  }
  setIssueProductDetail(knex: Knex, issuePId: any) {
    let sql = `SELECT
    ipd.*,
    wp.remainQty AS remainQty,
    wp.remainQty - ipd.qty AS remainQtyB,
    wp.expired_date 
    
  FROM
    wm_issue_products AS ip
    LEFT JOIN wm_issue_product_detail AS ipd ON ip.issue_product_id = ipd.issue_product_id
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
    wm_issue_products AS ip
    LEFT JOIN mm_products AS mp ON mp.product_id = ip.product_id
    LEFT JOIN (
  SELECT
    sum( wp.qty ) AS remainQty,
    mp.small_qty,
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
    ip.issue_id = ${issue_id} `
    return knex.raw(sql)
  }
  setIssues(knex: Knex, issue_id: any) {
    return knex('wm_issues')
      .where('issue_id', issue_id)
  }
  getList(knex: Knex, limit: number = 15, offset: number = 0, status: any = '') {

    let subQuery = knex('wm_issue_generics as sd')
      .select(knex.raw('count(*) as total'))
      .whereRaw('sd.issue_id=ss.issue_id')
      .as('total');

    let query = knex('wm_issue_summary as ss')
      .select('ss.*', 'ts.transection_name', subQuery)
      .leftJoin('wm_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
      .orderBy('ss.issue_id', 'desc');

    if (status) {
      query.where('ss.approved', status)
    }

    return query.limit(limit).offset(offset);

  }
  //use
  addType(knex: Knex, items: any) {
    return knex('wm_transection_issues')
        .insert(items)

}

isactive(knex: Knex, items: any, Id: any) {
  return knex('wm_transection_issues')
      .update(items)
      .where('transection_id', Id)
}
editType(knex: Knex, items: any, Id: any) {
    return knex('wm_transection_issues')
        .update(items)
        .where('transection_id', Id)
}
  getType(knex: Knex){
    return knex('wm_transection_issues')
  }
  getListIssuesDetail(knex: Knex, id:any) {

    let subQuery = knex('wm_issue_products as sd')
      .select(knex.raw('count(*) as total'))
      .whereRaw('sd.issue_id=ss.issue_id')
      .as('total');

    let query = knex('wm_issues as ss')
      .select('ss.*', 'ts.transection_name', subQuery)
      .leftJoin('wm_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
      .where('ss.issue_id', id);

    if (status) {
      query.where('ss.is_approve', status)
    }

    return query;

  }
  getListIssues(knex: Knex, limit: number = 15, offset: number = 0, status: any = '') {
    let subQuery = knex('wm_issue_products as sd')
      .select(knex.raw('count(*) as total'))
      .whereRaw('sd.issue_id=ss.issue_id')
      .as('total');

    let query = knex('wm_issues as ss')
      .select('ss.*', 'ts.transection_name', subQuery)
      .leftJoin('wm_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
      .orderBy('ss.issue_id', 'desc');

    if (status) {
      query.where('ss.is_approve', status)
      .andWhere('ss.is_cancel',  'N');

    }

    return query.limit(limit).offset(offset);

  }
  // use
  getListTotal(knex: Knex, status: any = '', ) {
    let query = knex('wm_issues as ss')
      .select(knex.raw('count(*) as total'))
    if (status) {
      query.where('ss.is_approve', status)
    }
    return query;
  }

  getListWarehouseTotal(knex: Knex, warehouseId: any, status: any = '') {
    let query = knex('wm_issue_summary')
      .select(knex.raw('count(*) as total'))
      .where('warehouse_id', warehouseId);

    if (status) {
      query.where('approved', status);
    }

    return query;
  }

  getListWarehouse(knex: Knex, warehouseId: any, limit: number = 15, offset: number = 0, status: any = null) {
    let subQuery = knex('wm_issue_generics as sd')
      .select(knex.raw('count(*)'))
      .whereRaw('sd.issue_id=ss.issue_id')
      .as('total');

    let query = knex('wm_issue_summary as ss')
      .select('ss.*', 'ts.transection_name', subQuery)
      .leftJoin('wm_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
      .where('ss.warehouse_id', warehouseId)
      .limit(limit).offset(offset);

    if (status) {
      query.where('ss.approved', status);
    }

    query.orderBy('ss.issue_id', 'DESC')

    return query;

    
  }

  _getIssues(knex: Knex, id: string) {
    return knex('wm_issue_summary as wis')
   
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
    ( SELECT sum( wp2.qty ) FROM wm_products wp2 WHERE wp2.wm_product_id = sp.wm_product_id ) balance_qty,
    ss.issue_id AS ref_src,
    ts.transection_name 
  FROM
    wm_issues ss
    JOIN wm_issue_products sg ON ss.issue_id = sg.issue_id
    LEFT JOIN wm_issue_product_detail sp ON sg.issue_product_id = sp.issue_product_id
    LEFT JOIN wm_products wp ON sp.wm_product_id = wp.wm_product_id
    LEFT JOIN wm_transection_issues ts ON ss.transection_issue_id = ts.transection_id 
  WHERE
    ss.issue_id = ${id} 
    AND sp.qty != 0`
    return knex.raw(sql);
  }
 

  saveProductStock(knex: Knex, data: any) {
    let sqls = [];

    data.forEach(v => {
      let sql = `
        UPDATE wm_products SET qty=qty-${v.cutQty} WHERE wm_product_id='${v.wm_product_id}'
        `;
      sqls.push(sql);
    });

    let queries = sqls.join(';');

    return knex.raw(queries);

  }

  getProductWarehouseLots(knex: Knex, productId: any, warehouseId: any) {
    return knex('wm_products as wpl')
      .select('wpl.lot_no', 'wpl.expired_date', 'wpl.cost', 'wpl.qty',
        knex.raw('timestampdiff(day, current_date(), wpl.expired_date) as count_expired'))
      .where('wpl.product_id', productId)
      .where('wpl.warehouse_id', warehouseId)
      .groupByRaw('wpl.lot_no, wpl.expired_date')
      .orderBy('wpl.expired_date', 'asc');
  }
  getGenericWarehouseLots(knex: Knex, genericId: any, warehouseId: any) {
    return knex('wm_products as wpl')
      .select('wpl.lot_no', 'wpl.expired_date', 'wpl.cost', 'wpl.qty',
        knex.raw('timestampdiff(day, current_date(), wpl.expired_date) as count_expired'))
      .join('mm_products as mp', 'mp.product_id', 'wpl.product_id')
      .where('mp.generic_id', genericId)
      .where('wpl.warehouse_id', warehouseId)
      .groupByRaw('wpl.lot_no, wpl.expired_date')
      .orderBy('wpl.expired_date', 'asc');
  }
  getGenericQty(knex: Knex, genericId: any, warehouseId: any) {
    return knex('wm_products as wpl').sum('wpl.qty as qty')
      .join('mm_products as mp', 'mp.product_id', 'wpl.product_id')
      .where('mp.generic_id', genericId)
      .where('wpl.warehouse_id', warehouseId)
      .groupBy('wpl.product_id')
  }
  getGenericProductQty(knex: Knex, genericId: any, warehouseId: any) {
    return knex('wm_products as wpl')
      // .sum('wpl.qty as qty')
      .join('mm_products as mp', 'mp.product_id', 'wpl.product_id')
      .where('mp.generic_id', genericId)
      .where('wpl.warehouse_id', warehouseId)
    // .groupBy('wpl.product_id')
  }
  getProductByGenerics(knex: Knex, genericId: any, warehouseId: any) {
    return knex('wm_products as wm')
      .select('wm.warehouse_id', 'wm.product_id', 'mp.generic_id', 'wm.qty', 'wm.wm_product_id', 'wm.expired_date')
      .join('mm_products as mp', 'wm.product_id', 'mp.product_id')
      .where('wm.warehouse_id', warehouseId)
      .where('mp.generic_id', genericId)
      .orderBy('wm.expired_date', 'ASC')
    // .groupBy('wm.product_id')
  }
  getWmProduct(knex: Knex, productId: any, warehouseId: any) {
    return knex('wm_products as wm')
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