"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductModel {
    adminSearchAllProducts(knex, query) {
        let q_ = `${query}%`;
        let _q_ = `%${query}%`;
        let sql = `
        select DISTINCT * from (
       ( SELECT
	mp.product_name,
	mp.product_id,
	mg.generic_code AS generic_workign_code,
	mg.generic_name,
    mp.generic_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_products AS mp
	LEFT JOIN mm_generics AS mg ON mg.generic_id = mp.generic_id
	left join mm_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${query}' ) 
	AND mp.is_active = 'Y' 
	LIMIT 10 )
        UNION ALL
        SELECT * from (
        SELECT
	mp.product_name,
	mp.product_id,
	mg.generic_code AS generic_workign_code,
	mg.generic_name,
    mp.generic_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_products AS mp
	LEFT JOIN mm_generics AS mg ON mg.generic_id = mp.generic_id
	left join mm_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${q_}' ) 
	AND mp.is_active = 'Y' 
ORDER BY
	mp.product_name ASC 
	LIMIT 10) as a
        UNION ALL
        
        SELECT * from (
        SELECT
	mp.product_name,
	mp.product_id,
	mg.generic_code AS generic_workign_code,
	mg.generic_name,
    mp.generic_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_products AS mp
	LEFT JOIN mm_generics AS mg ON mg.generic_id = mp.generic_id
	left join mm_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${_q_}' ) 
	AND mp.is_active = 'Y' 
ORDER BY
	mp.product_name ASC 
	LIMIT 10) as a) as s`;
        return knex.raw(sql);
    }
    searchProducts(knex, query) {
        let q_ = `${query}%`;
        let _q_ = `%${query}%`;
        let sql = `
        select DISTINCT * from (
       ( SELECT
	mp.product_name,
	mp.product_id,
	mg.generic_code AS generic_workign_code,
	mg.generic_name,
    mp.generic_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_products AS mp
	LEFT JOIN mm_generics AS mg ON mg.generic_id = mp.generic_id
	left join mm_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${query}' ) 
  AND mp.is_active = 'Y' 
  and mp.product_id in (
    select mp.product_id from 
    mm_products as mp
    left join wm_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
  )
	LIMIT 10 )
        UNION ALL
        SELECT * from (
        SELECT
	mp.product_name,
	mp.product_id,
	mg.generic_code AS generic_workign_code,
	mg.generic_name,
    mp.generic_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_products AS mp
	LEFT JOIN mm_generics AS mg ON mg.generic_id = mp.generic_id
	left join mm_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${q_}' ) 
  AND mp.is_active = 'Y' 
  and mp.product_id in (
    select mp.product_id from 
    mm_products as mp
    left join wm_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
  )
ORDER BY
	mp.product_name ASC 
	LIMIT 10) as a
        UNION ALL
        
        SELECT * from (
        SELECT
	mp.product_name,
	mp.product_id,
	mg.generic_code AS generic_workign_code,
	mg.generic_name,
    mp.generic_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_products AS mp
	LEFT JOIN mm_generics AS mg ON mg.generic_id = mp.generic_id
	left join mm_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${_q_}' ) 
  AND mp.is_active = 'Y' 
  and mp.product_id in (
    select mp.product_id from 
    mm_products as mp
    left join wm_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
  )
ORDER BY
	mp.product_name ASC 
	LIMIT 10) as a) as s`;
        return knex.raw(sql);
    }
    getProductPackage(knex, id) {
        let sql = `
    SELECT
	mp.product_name,
	mp.product_id,
	mg.generic_code AS generic_workign_code,
	mg.generic_name,
    mp.generic_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
  mm_products AS mp
	LEFT JOIN wm_products AS wp ON wp.product_id = mp.product_id  
	LEFT JOIN mm_generics AS mg ON mg.generic_id = mp.generic_id
	left join mm_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	 mp.generic_id = ${id}
  AND mp.is_active = 'Y' 
  and mp.product_id in (
    select mp.product_id from 
    mm_products as mp
    left join wm_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
  )
  group by  mp.product_id
    `;
        return knex.raw(sql);
    }
    adminGetAllProductTotal(knex) {
        let query = knex('mm_products as mp')
            .select(knex.raw('count(mp.product_id) as total'));
        return query;
    }
    adminGetSearchProductTotal(knex, query) {
        return knex('mm_products')
            .count('product_id as total')
            .where('is_active', 'Y')
            .andWhere(knex.raw(`product_name like '%${query}%' `));
    }
    getSerial(knex) {
        return knex('wm_additions')
            .count('addition_id as total');
    }
    saveOrder(knex, order) {
        return knex('wm_additions')
            .insert(order);
    }
    saveItems(knex, order) {
        return knex('wm_addition_details')
            .insert(order);
    }
    getAdditionList(knex, limit, offset) {
        return knex('wm_additions');
    }
    setAddDetail(knex, additionId) {
        return knex('wm_addition_details as ad')
            .select('ad.*', 'mg.generic_name', 'u.unit_name as small_unit_name')
            .leftJoin('mm_generics as mg', 'mg.generic_id', 'ad.generic_id')
            .leftJoin('mm_units as u', 'u.unit_id', 'mg.small_unit_id')
            .where('ad.addition_id', additionId);
    }
    gettransectionList(knex, limit, offset) {
        let sql = `
    select * from(
    SELECT
    mg.generic_id,
        mg.generic_code,
        mg.generic_name,
        mp.product_code,
        mp.product_name,
        mg.min_qty,
        mg.max_qty,
        ifnull(sum(p.qty * mp.small_qty),0) as qty,
        uS.unit_name
    FROM
        mm_generics as mg
        LEFT JOIN mm_products AS mp on mp.generic_id = mg.generic_id
        LEFT JOIN wm_products AS p ON mp.product_id = p.product_id
        LEFT JOIN mm_units AS uL ON uL.unit_id = mp.large_unit_id
        LEFT JOIN mm_units AS uS ON uS.unit_id = mg.small_unit_id
    WHERE
        mp.is_active = 'Y'
    GROUP BY
        mg.generic_id 
    ORDER BY
        mg.generic_name ASC 
        LIMIT ${limit}
        offset ${offset} ) as q1
        where q1.qty < q1.min_qty
    `;
        return knex.raw(sql);
    }
    alertExpired(knex, numDays, unitId) {
        return knex('mm_generics')
            .update(numDays)
            .whereIn('generic_id', unitId);
    }
    addUnit(knex, items) {
        return knex('mm_units')
            .insert(items);
    }
    editUnit(knex, items, unitId) {
        return knex('mm_units')
            .update(items)
            .where('unit_id', unitId);
    }
    isActiveProduct(knex, items, Id) {
        return knex('mm_products')
            .update(items)
            .where('product_id', Id);
    }
    isActiveGeneric(knex, items, Id) {
        return knex('mm_generics')
            .update(items)
            .where('generic_id', Id);
    }
    isactive(knex, items, unitId) {
        return knex('mm_units')
            .update(items)
            .where('unit_id', unitId);
    }
    getLot(knex, productId) {
        let sql = `SELECT
    wp.product_id,
      wp.wm_product_id,
      sum( wp.qty ) as remainQty,
      wp.lot_no,
      wp.expired_date
    FROM
      wm_products AS wp 
      WHERE
      wp.product_id = ${productId}
    GROUP BY
      wp.product_id,
      wp.lot_no 
      ORDER BY
      wp.expired_date`;
        return knex.raw(sql);
    }
    getUnit(knex) {
        return knex('mm_units')
            .orderBy('unit_name', 'asc');
    }
    getGenericType(knex) {
        return knex('mm_generic_types')
            .orderBy('generic_type_name');
    }
    saveAddProduct(knex, items) {
        return knex('mm_products')
            .insert(items);
    }
    saveAddGeneric(knex, items) {
        return knex('mm_generics')
            .insert(items);
    }
    productsExpired(knex) {
        return knex('mm_generics');
    }
    getUnsetProducts(knex) {
        return knex('mm_generics')
            .where('num_days', null)
            .orWhere('num_days', 0);
    }
    expired(knex) {
        let sql = `
    SELECT * from(
      SELECT
        mp.*,
        wp.wm_product_id,
        wp.lot_no,
        mg.num_days,
        wp.expired_date,
        DATEDIFF(wp.expired_date, CURDATE()) AS diff
      FROM
        wm_products as wp 
        LEFT JOIN mm_products as mp on mp.product_id = wp.product_id
        left join mm_generics as mg on mg.generic_id = mp.generic_id
        WHERE
        DATEDIFF(wp.expired_date, CURDATE()) < mg.num_days
        ) as q1
        ORDER BY q1.diff asc`;
        return knex.raw(sql);
    }
    saveEditGeneric(knex, generic_id, items) {
        return knex('mm_generics')
            .where('generic_id', generic_id)
            .update(items);
    }
    saveEditProduct(knex, product_id, items) {
        return knex('mm_products')
            .where('product_id', product_id)
            .update(items);
    }
    adminGetSearchGnericTotal(knex, query) {
        return knex('mm_generics')
            .count('generic_id as total')
            .where('is_active', 'Y')
            .andWhere(knex.raw(`generic_name like '%${query}%' `));
    }
    adminGetAllProducts(knex, query, limit, offset) {
        let sql = `
    SELECT
    mp.*,
    mg.generic_name,
    mg.generic_id,
    mg.generic_code,
    ifnull(sum(p.qty),0) as qty,
    uL.unit_name as large_unit,
    uS.unit_name as small_unit,
    uL.unit_id as large_unit_id,
    uS.unit_id as small_unit_id,
    count(p.lot_no) as amLot
FROM
    mm_products AS mp 
    LEFT JOIN wm_products AS p ON mp.product_id = p.product_id
    left join mm_generics as mg on mg.generic_id = mp.generic_id
    LEFT JOIN mm_units AS uL ON uL.unit_id = mp.large_unit_id
    LEFT JOIN mm_units AS uS ON uS.unit_id = mg.small_unit_id
    WHERE
        
        mp.product_name like '%${query}%'
    GROUP BY
        mp.product_id 
    ORDER BY
        mp.product_name ASC 
        LIMIT ${limit}
        offset ${offset}`;
        return knex.raw(sql);
    }
    adminGetAllGeneric(knex, query, limit, offset) {
        let sql = `    SELECT

    mg.*,
    mu.unit_name as small_unit,
    count(mp.product_id) as amLot,
    gt.generic_type_name
FROM
    mm_generics AS mg 
    left join mm_products as mp on mg.generic_id = mp.generic_id
    left join mm_units as mu on mu.unit_id = mg.small_unit_id
    left join mm_generic_types as gt on gt.generic_type_id = mg .generic_type_id
    WHERE
         
        mg.generic_name like '%${query}%'
    GROUP BY
        mg.generic_id 
    ORDER BY
        mg.generic_name ASC 
        LIMIT ${limit}
        offset ${offset}`;
        return knex.raw(sql);
    }
    adminGetAllGenericTotal(knex) {
        let query = knex('mm_generics')
            .select(knex.raw('count(generic_id) as total'));
        return query;
    }
    adminSearchProductsTotal(knex, query) {
        let _query = `%${query}%`;
        let sql = `
          SELECT
          g.generic_code,
          g.generic_name,
          mp.product_code,
          mp.product_name,
          g.min_qty,
          g.max_qty,
          sum( p.qty ) AS qty,
          uL.unit_name 
      FROM
          mm_products AS mp
          LEFT JOIN wm_products AS p ON mp.product_id = p.product_id
          LEFT JOIN mm_generics AS g ON mp.generic_id = g.generic_id
          LEFT JOIN mm_units AS uL ON mp.large_unit_id = uL.unit_id
          LEFT JOIN mm_units AS uS ON mp.small_unit_id = uS.unit_id 
      WHERE
          mp.is_active = 'Y'  and (mp.product_name like ? or mp.product_code=?)
      GROUP BY
          p.product_id 
      ORDER BY
          mp.product_name ASC 
          
        `;
        return knex.raw(sql, [_query, _query]);
    }
    adminSearchProducts(knex, query, limit, offset) {
        let _query = `%${query}%`;
        let sql = `
          SELECT
	g.generic_code,
	g.generic_name,
	mp.product_code,
	mp.product_name,
	g.min_qty,
  g.max_qty,
  ifnull(sum(p.qty),0) as qty,
	uL.unit_name 
FROM
	mm_products AS mp
	LEFT JOIN wm_products AS p ON mp.product_id = p.product_id
	LEFT JOIN mm_generics AS g ON mp.generic_id = g.generic_id
	LEFT JOIN mm_units AS uL ON mp.large_unit_id = uL.unit_id
	LEFT JOIN mm_units AS uS ON mp.small_unit_id = uS.unit_id 
WHERE
	mp.is_active = 'Y'  and (mp.product_name  like ? or mp.product_code=?)
GROUP BY
	p.product_id 
ORDER BY
	mp.product_name ASC 
        limit ? offset ?
        `;
        return knex.raw(sql, [_query, _query, limit, offset]);
    }
    adminSearchAllProductsLabeler(knex, query, labelerId) {
        let q_ = `${query}%`;
        let _q_ = `%${query}%`;
        let sql = `
        select DISTINCT * from (
        SELECT
          concat(
            mp.product_name,
            " (",
            l.labeler_name,
            ")"
          ) AS product_name,
          mp.product_id,
          mp.primary_unit_id,
          mp.working_code,
          mg.working_code AS generic_workign_code,
          mp.is_lot_control,
          mu.unit_name AS primary_unit_name,
          mg.generic_name,
          mp.generic_id,
          ge.num_days AS expire_num_days
        FROM
          mm_products AS mp
        LEFT JOIN mm_generics AS mg ON mg.generic_id = mp.generic_id
        LEFT JOIN mm_units AS mu ON mu.unit_id = mp.primary_unit_id
        LEFT JOIN mm_labelers AS l ON l.labeler_id = mp.v_labeler_id
        LEFT JOIN wm_generic_expired_alert AS ge ON ge.generic_id = mp.generic_id
        WHERE
          (
            mg.working_code = '${query}'
            OR mp.working_code = '${query}'
          )
        AND mp.is_active = 'Y'
        AND mp.mark_deleted = 'N'
        AND l.labeler_id = '${labelerId}'
        UNION ALL
        SELECT * from (
        SELECT
          concat(
            mp.product_name,
            " (",
            l.labeler_name,
            ")"
          ) AS product_name,
          mp.product_id,
          mp.primary_unit_id,
          mp.working_code,
          mg.working_code AS generic_workign_code,
          mp.is_lot_control,
          mu.unit_name AS primary_unit_name,
          mg.generic_name,
          mp.generic_id,
          ge.num_days AS expire_num_days
        FROM
          mm_products AS mp
        LEFT JOIN mm_generics AS mg ON mg.generic_id = mp.generic_id
        LEFT JOIN mm_units AS mu ON mu.unit_id = mp.primary_unit_id
        LEFT JOIN mm_labelers AS l ON l.labeler_id = mp.v_labeler_id
        LEFT JOIN wm_generic_expired_alert AS ge ON ge.generic_id = mp.generic_id
        WHERE
          (
            mp.product_name LIKE '${q_}'
            OR mg.generic_name LIKE '${q_}'
          )
        AND mp.is_active = 'Y'
        AND mp.mark_deleted = 'N'
        AND l.labeler_id = '${labelerId}'
        ORDER BY
          mp.product_name ASC
        LIMIT 5) as a
        UNION ALL
        SELECT * from (
        SELECT
          concat(
            mp.product_name,
            " (",
            l.labeler_name,
            ")"
          ) AS product_name,
          mp.product_id,
          mp.primary_unit_id,
          mp.working_code,
          mg.working_code AS generic_workign_code,
          mp.is_lot_control,
          mu.unit_name AS primary_unit_name,
          mg.generic_name,
          mp.generic_id,
          ge.num_days AS expire_num_days
        FROM
          mm_products AS mp
        LEFT JOIN mm_generics AS mg ON mg.generic_id = mp.generic_id
        LEFT JOIN mm_units AS mu ON mu.unit_id = mp.primary_unit_id
        LEFT JOIN mm_labelers AS l ON l.labeler_id = mp.v_labeler_id
        LEFT JOIN wm_generic_expired_alert AS ge ON ge.generic_id = mp.generic_id
        WHERE
          (
            mp.product_name LIKE '${_q_}'
            OR mg.generic_name LIKE '${_q_}'
        or mp.keywords LIKE '${_q_}'
        or mg.keywords like  '${_q_}'
          )
        AND mp.is_active = 'Y'
        AND mp.mark_deleted = 'N'
        AND l.labeler_id = '${labelerId}'
        ORDER BY
          mp.product_name ASC
        LIMIT 10) as a) as s`;
        return knex.raw(sql);
    }
    adminSearchAllGenerics(knex, query) {
        let q_ = `${query}%`;
        let _q_ = `%${query}%`;
        let sql = `
        select DISTINCT * from (
       ( SELECT
	mg.*
FROM
  mm_generics AS mg 
WHERE
	( mg.generic_name LIKE '${query}' ) 
	AND mg.is_active = 'Y' 
	LIMIT 10 )
        UNION ALL
        SELECT * from (
        SELECT
	mg.*
FROM
	mm_generics AS mg 
WHERE
	( mg.generic_name LIKE '${q_}' ) 
	AND mg.is_active = 'Y' 
ORDER BY
mg.generic_name ASC 
	LIMIT 10) as a
        UNION ALL
        
        SELECT * from (
        SELECT
	mg.*
FROM
  mm_generics AS mg
  WHERE
	( mg.generic_name LIKE '${_q_}' ) 
	AND mg.is_active = 'Y' 
ORDER BY
	mg.generic_name ASC 
	LIMIT 10) as a) as s`;
        return knex.raw(sql);
    }
    adminSearchGenerics(knex, query) {
        let q_ = `${query}%`;
        let _q_ = `%${query}%`;
        let sql = `
        select DISTINCT * from (
       ( SELECT
	mg.*
FROM
  mm_generics AS mg
   
WHERE
	( mg.generic_name LIKE '${query}' ) 
  AND mg.is_active = 'Y' 
  and mg.generic_id in (
    select mp.generic_id from 
    mm_products as mp
    left join wm_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
    group by  mp.generic_id
  )
	LIMIT 10 )
        UNION ALL
        SELECT * from (
        SELECT
	mg.*
FROM
	mm_generics AS mg 
WHERE
	( mg.generic_name LIKE '${q_}' ) 
  AND mg.is_active = 'Y' 
  and mg.generic_id in (
    select mp.generic_id from 
    mm_products as mp
    left join wm_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
    group by  mp.generic_id
  )
ORDER BY
mg.generic_name ASC 
	LIMIT 10) as a
        UNION ALL
        
        SELECT * from (
        SELECT
	mg.*
FROM
  mm_generics AS mg
  WHERE
	( mg.generic_name LIKE '${_q_}' ) 
  AND mg.is_active = 'Y' 
  and mg.generic_id in (
    select mp.generic_id from 
    mm_products as mp
    left join wm_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
    group by  mp.generic_id
  )
ORDER BY
	mg.generic_name ASC 
	LIMIT 10) as a) as s`;
        return knex.raw(sql);
    }
    getProductRemain(knex, product_id) {
        let sql = `SELECT
    IFNULL( q.qty, 0 ) AS qty 
  FROM
    (
  SELECT
    sum( wp.qty ) as qty
  FROM
    mm_products AS mp
    LEFT JOIN wm_products AS wp ON wp.product_id = mp.product_id 
  WHERE
    wp.product_id = ${product_id}
    ) AS q`;
        return knex.raw(sql);
    }
}
exports.ProductModel = ProductModel;
//# sourceMappingURL=products.js.map