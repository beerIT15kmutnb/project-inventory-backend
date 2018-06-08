"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IssueModel {
    gettransectionIssues(knex) {
        return knex('wm_transection_issues');
    }
    saveSummary(knex, data) {
        return knex('wm_issue_summary')
            .insert(data, 'issue_id');
    }
    updateSummary(knex, issueId, data) {
        return knex('wm_issues')
            .where('issue_id', issueId)
            .update(data);
    }
    updateSummaryApprove(knex, issueIds, data) {
        return knex('wm_issues')
            .whereIn('issue_id', issueIds)
            .update(data);
    }
    getApproveProducts(knex, issueIds) {
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
    removeProducts(knex, issueId) {
        return knex('wm_issue_products')
            .where('issue_id', issueId)
            .del();
    }
    removeProduct(knex, issueId) {
        return knex.raw(`DELETE ip
    FROM wm_issue_products as ip
    WHERE ip.issue_id = ${issueId}`);
    }
    removeIssueSummary(knex, issueId, data) {
        return knex('wm_issue_summary')
            .where('issue_id', issueId)
            .update(data);
    }
    saveDetail(knex, data) {
        return knex('wm_issue_detail')
            .insert(data);
    }
    saveGenerics(knex, data) {
        return knex('wm_issue_generics')
            .insert(data);
    }
    saveProducts(knex, data) {
        return knex('wm_issue_products')
            .insert(data);
    }
    getSummaryDetail(knex, issueId) {
        return knex('wm_issue_summary')
            .where('issue_id', issueId);
    }
    getProductDetail(knex, issueId) {
        let sql = `
    SELECT
      sg.generic_id,
      sp.product_id,
      sp.wm_product_id,
      sp.qty AS product_qty,
      mp.product_name,
      mug.qty AS product_conversion,
      wp.qty AS product_remain_qty,
      mu.unit_name AS from_unit_name,
      mu2.unit_name AS to_unit_name
    FROM
      wm_issue_generics sg
    JOIN wm_issue_summary ss ON ss.issue_id = sg.issue_id
    JOIN wm_issue_products sp ON sg.issue_generic_id = sp.issue_generic_id
    JOIN wm_products wp ON wp.wm_product_id = sp.wm_product_id
    JOIN mm_unit_generics mug ON mug.unit_generic_id = wp.unit_generic_id
    JOIN mm_products mp ON mp.product_id = sp.product_id
    JOIN mm_units mu ON mug.from_unit_id = mu.unit_id
    JOIN mm_units mu2 ON mug.to_unit_id = mu2.unit_id
    WHERE
    sg.issue_id = '${issueId}'`;
        return knex.raw(sql);
    }
    getGenericsDetail(knex, issueId) {
        let sql = `SELECT
    mg.working_code,
    sg.generic_id,
    sg.qty / mug.qty AS generic_qty,
    mug.qty AS generic_conversion,
    sg.unit_generic_id,
    mg.generic_name,
  	(
      SELECT
        sum(wm.qty) AS qty
      FROM
        wm_products wm
      JOIN mm_products mp2 ON wm.product_id = mp2.product_id
      WHERE
        mp2.generic_id = sg.generic_id
      AND wm.warehouse_id = ss.warehouse_id
      GROUP BY
        mp2.generic_id
    ) AS generic_remain_qty
    FROM
      wm_issue_generics sg
    JOIN wm_issue_summary ss ON ss.issue_id = sg.issue_id
    JOIN mm_unit_generics mug ON mug.unit_generic_id = sg.unit_generic_id
    JOIN mm_generics mg ON sg.generic_id = mg.generic_id
    WHERE
    sg.issue_id = '${issueId}'`;
        return knex.raw(sql);
    }
    getSerial(knex) {
        return knex('wm_issues')
            .count('* as total');
    }
    saveIssueSummary(kenx, data) {
        return kenx('wm_issues')
            .insert(data, 'issue_id');
    }
    saveIssueDetail(kenx, data) {
        return kenx('wm_issue_products')
            .insert(data);
    }
    saveIssueProductDetail(kenx, data) {
        return kenx('wm_issue_product_detail')
            .insert(data);
    }
    setIssueProductDetail(knex, issuePId) {
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
    ip.issue_product_id = ${issuePId}`;
        return knex.raw(sql);
    }
    setIssueDetail(knex, issue_id) {
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
    ip.issue_id = ${issue_id} `;
        return knex.raw(sql);
    }
    setIssues(knex, issue_id) {
        return knex('wm_issues')
            .where('issue_id', issue_id);
    }
    getList(knex, limit = 15, offset = 0, status = '') {
        let subQuery = knex('wm_issue_generics as sd')
            .select(knex.raw('count(*) as total'))
            .whereRaw('sd.issue_id=ss.issue_id')
            .as('total');
        let query = knex('wm_issue_summary as ss')
            .select('ss.*', 'ts.transection_name', subQuery)
            .leftJoin('wm_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
            .orderBy('ss.issue_id', 'desc');
        if (status) {
            query.where('ss.approved', status);
        }
        return query.limit(limit).offset(offset);
    }
    addType(knex, items) {
        return knex('wm_transection_issues')
            .insert(items);
    }
    isactive(knex, items, Id) {
        return knex('wm_transection_issues')
            .update(items)
            .where('transection_id', Id);
    }
    editType(knex, items, Id) {
        return knex('wm_transection_issues')
            .update(items)
            .where('transection_id', Id);
    }
    getType(knex) {
        return knex('wm_transection_issues');
    }
    getListIssuesDetail(knex, id) {
        let subQuery = knex('wm_issue_products as sd')
            .select(knex.raw('count(*) as total'))
            .whereRaw('sd.issue_id=ss.issue_id')
            .as('total');
        let query = knex('wm_issues as ss')
            .select('ss.*', 'ts.transection_name', subQuery)
            .leftJoin('wm_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
            .where('ss.issue_id', id);
        if (status) {
            query.where('ss.is_approve', status);
        }
        return query;
    }
    getListIssues(knex, limit = 15, offset = 0, status = '') {
        let subQuery = knex('wm_issue_products as sd')
            .select(knex.raw('count(*) as total'))
            .whereRaw('sd.issue_id=ss.issue_id')
            .as('total');
        let query = knex('wm_issues as ss')
            .select('ss.*', 'ts.transection_name', subQuery)
            .leftJoin('wm_transection_issues as ts', 'ts.transection_id', 'ss.transection_issue_id')
            .orderBy('ss.issue_id', 'desc');
        if (status) {
            query.where('ss.is_approve', status);
        }
        return query.limit(limit).offset(offset);
    }
    getListTotal(knex, status = '') {
        let query = knex('wm_issues as ss')
            .select(knex.raw('count(*) as total'));
        if (status) {
            query.where('ss.is_approve', status);
        }
        return query;
    }
    getListWarehouseTotal(knex, warehouseId, status = '') {
        let query = knex('wm_issue_summary')
            .select(knex.raw('count(*) as total'))
            .where('warehouse_id', warehouseId);
        if (status) {
            query.where('approved', status);
        }
        return query;
    }
    getListWarehouse(knex, warehouseId, limit = 15, offset = 0, status = null) {
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
        query.orderBy('ss.issue_id', 'DESC');
        return query;
    }
    _getIssues(knex, id) {
        return knex('wm_issue_summary as wis');
    }
    getIssues(knex, id) {
        let sql = `SELECT
    wis.issue_code,
    wis.issue_date,
    wid.lot_no,
    mp.product_id,
    mp.product_name,
    wis.warehouse_id
    FROM
    wm_issue_summary wis
    LEFT JOIN wm_issue_detail wid ON wis.issue_id = wid.issue_id
    LEFT JOIN mm_products mp ON mp.product_id = wid.product_id
    LEFT JOIN mm_unit_generics mug ON mug.unit_generic_id = wid.unit_generic_id
    LEFT JOIN mm_units mu ON mu.unit_id = mug.to_unit_id
    WHERE wis.issue_id = ?`;
        return knex.raw(sql, [id]);
    }
    getIssueApprove(knex, id, warehouseId) {
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
    AND sp.qty != 0`;
        return knex.raw(sql);
    }
    getProductIssues(knex, id) {
        let sql = `SELECT
    wid.qty,
    mp.product_id,
    mg.generic_id,
    mp.product_name,
    wp.qty as remain_qty,
    wid.conversion_qty,
    mg.primary_unit_id,
    mu.unit_name,
    wid.lot_no,
    wid.expired_date,
    mug.unit_generic_id,
    wid.warehouse_id
    FROM
    wm_issue_summary wis
    LEFT JOIN wm_issue_detail wid ON wis.issue_id = wid.issue_id
    LEFT JOIN mm_products mp ON mp.product_id = wid.product_id
    LEFT JOIN wm_products wp ON wp.product_id = wid.product_id
		LEFT JOIN mm_generics mg ON mg.generic_id = mp.generic_id
    LEFT JOIN mm_unit_generics mug ON mug.unit_generic_id = wid.unit_generic_id
    LEFT JOIN mm_units mu ON mu.unit_id = mg.primary_unit_id
    WHERE wis.issue_id = ?
    GROUP BY mg.generic_id`;
        return knex.raw(sql, [id]);
    }
    getProductList(knex, issueId) {
        let sql = `
      SELECT
      sd.*, w.warehouse_name,
      g.generic_name,
      mp.product_name,
      uf.unit_name AS from_unit_name,
      ut.unit_name AS to_unit_name,
      ug.qty AS conversion_qty
      FROM
      wm_issue_summary as s
      join wm_issue_generics AS sd on s.issue_id = sd.issue_id
      JOIN wm_issue_products sp on sd.issue_generic_id = sp.issue_generic_id
      LEFT JOIN wm_products AS wp ON wp.wm_product_id = sp.wm_product_id
      LEFT JOIN wm_warehouses AS w ON w.warehouse_id = s.warehouse_id
      LEFT JOIN mm_products AS mp ON mp.product_id = wp.product_id
      LEFT JOIN mm_generics AS g ON g.generic_id = mp.generic_id
      LEFT JOIN mm_unit_generics AS ug ON ug.unit_generic_id = sd.unit_generic_id
      LEFT JOIN mm_units AS uf ON uf.unit_id = ug.from_unit_id
      LEFT JOIN mm_units AS ut ON ut.unit_id = ug.to_unit_id
      WHERE
      sd.issue_id =?`;
        return knex.raw(sql, [issueId]);
    }
    getGenericList(knex, issueId) {
        let sql = `
    SELECT
	sd.*, w.warehouse_name,
	g.generic_name,
	uf.unit_name AS from_unit_name,
	ut.unit_name AS to_unit_name,
  ug.qty AS conversion_qty,
  (
		SELECT
			sum(sp.qty)
		FROM
			wm_issue_products sp
		join wm_issue_generics sg on sg.issue_generic_id = sp.issue_generic_id
		WHERE
			sp.issue_generic_id = sd.issue_generic_id and sg.generic_id = sd.generic_id
	) AS qty_real
FROM
wm_issue_summary as ss join wm_issue_generics AS sd on ss.issue_id = sd.issue_id
LEFT JOIN wm_warehouses AS w ON w.warehouse_id = ss.warehouse_id
LEFT JOIN mm_generics AS g ON g.generic_id = sd.generic_id
LEFT JOIN mm_unit_generics AS ug ON ug.unit_generic_id = sd.unit_generic_id
LEFT JOIN mm_units AS uf ON uf.unit_id = ug.from_unit_id
LEFT JOIN mm_units AS ut ON ut.unit_id = ug.to_unit_id
WHERE
	sd.issue_id = ?
    `;
        return knex.raw(sql, [issueId]);
    }
    saveProductStock(knex, data) {
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
    getProductWarehouseLots(knex, productId, warehouseId) {
        return knex('wm_products as wpl')
            .select('wpl.lot_no', 'wpl.expired_date', 'wpl.cost', 'wpl.qty', knex.raw('timestampdiff(day, current_date(), wpl.expired_date) as count_expired'))
            .where('wpl.product_id', productId)
            .where('wpl.warehouse_id', warehouseId)
            .groupByRaw('wpl.lot_no, wpl.expired_date')
            .orderBy('wpl.expired_date', 'asc');
    }
    getGenericWarehouseLots(knex, genericId, warehouseId) {
        return knex('wm_products as wpl')
            .select('wpl.lot_no', 'wpl.expired_date', 'wpl.cost', 'wpl.qty', knex.raw('timestampdiff(day, current_date(), wpl.expired_date) as count_expired'))
            .join('mm_products as mp', 'mp.product_id', 'wpl.product_id')
            .where('mp.generic_id', genericId)
            .where('wpl.warehouse_id', warehouseId)
            .groupByRaw('wpl.lot_no, wpl.expired_date')
            .orderBy('wpl.expired_date', 'asc');
    }
    getGenericQty(knex, genericId, warehouseId) {
        return knex('wm_products as wpl').sum('wpl.qty as qty')
            .join('mm_products as mp', 'mp.product_id', 'wpl.product_id')
            .where('mp.generic_id', genericId)
            .where('wpl.warehouse_id', warehouseId)
            .groupBy('wpl.product_id');
    }
    getGenericProductQty(knex, genericId, warehouseId) {
        return knex('wm_products as wpl')
            .join('mm_products as mp', 'mp.product_id', 'wpl.product_id')
            .where('mp.generic_id', genericId)
            .where('wpl.warehouse_id', warehouseId);
    }
    getProductByGenerics(knex, genericId, warehouseId) {
        return knex('wm_products as wm')
            .select('wm.warehouse_id', 'wm.product_id', 'mp.generic_id', 'wm.qty', 'wm.wm_product_id', 'wm.expired_date')
            .join('mm_products as mp', 'wm.product_id', 'mp.product_id')
            .where('wm.warehouse_id', warehouseId)
            .where('mp.generic_id', genericId)
            .orderBy('wm.expired_date', 'ASC');
    }
    getWmProduct(knex, productId, warehouseId) {
        return knex('wm_products as wm')
            .select('wm.warehouse_id', 'wm.product_id', 'wm.qty')
            .where('wm.warehouse_id', warehouseId)
            .where('wm.product_id', productId);
    }
    checkApprove(knex, username, password, action) {
        return knex('sys_approve as sa')
            .leftJoin('um_users as uu', 'uu.user_id', 'sa.user_id')
            .where('sa.action_name', action)
            .andWhere('uu.username', username)
            .andWhere('sa.password', password);
    }
}
exports.IssueModel = IssueModel;
//# sourceMappingURL=issue.js.map