import Knex = require('knex');
import * as moment from 'moment';
export class ProductModel {

  getTransactionList(knex: Knex, limit: number, offset: number){
    let sql = `
    select * from(
    SELECT
        mp.product_code,
        mp.product_name,
        mp.min_qty,
        mp.max_qty,
        ifnull(sum(p.qty),0) as qty,
        uL.unit_name
    FROM
        mm_products AS mp 
        LEFT JOIN wm_products AS p ON mp.product_id = p.product_id
        LEFT JOIN mm_units AS uL ON uL.unit_id = mp.large_unit_id
        LEFT JOIN mm_units AS uS ON uS.unit_id = mp.small_unit_id
    WHERE
        mp.is_active = 1 
    GROUP BY
        mp.product_id 
    ORDER BY
        mp.product_name ASC 
        LIMIT ${limit}
        offset ${offset} ) as q1
        where q1.qty < q1.min_qty
    `;
    return knex.raw(sql);
  } 

  getList(knex: Knex) {
    return knex('generic_types')
  }

  getLot(knex: Knex, productId: any) {
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
      wp.expired_date`
      return knex.raw(sql);
  }

  adminGetAllProducts(knex: Knex, limit: number, offset: number) {
    let query = `SELECT
        mp.product_code,
        mp.product_name,
        mp.min_qty,
        mp.max_qty,
        ifnull(sum(p.qty),0) as qty,
        uL.unit_name
    FROM
        mm_products AS mp 
        LEFT JOIN wm_products AS p ON mp.product_id = p.product_id
        LEFT JOIN mm_units AS uL ON uL.unit_id = mp.large_unit_id
        LEFT JOIN mm_units AS uS ON uS.unit_id = mp.small_unit_id
    WHERE
        mp.is_active = 1 
    GROUP BY
        mp.product_id 
    ORDER BY
        mp.product_name ASC 
        LIMIT ${limit}
        offset ${offset}`

    return knex.raw(query);
  }

  adminGetAllProductTotal(knex: Knex) {
    let query = knex('wm_products as p')
      .select(knex.raw('count(distinct p.product_id) as total'))
      .innerJoin('mm_products as mp', 'mp.product_id', 'p.product_id')
      .innerJoin('mm_generics as mg', 'mp.generic_id', 'mg.generic_id')
    return query;
  }

  adminSearchProductsTotal(knex: Knex, query: any) {
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
          mp.is_active = 1  and (mp.product_name like ? or mp.product_code=?)
      GROUP BY
          p.product_id 
      ORDER BY
          mp.product_name ASC 
          
        `;
    return knex.raw(sql, [_query, _query]);
  }
  // use
  adminSearchProducts(knex: Knex, query: any, limit: number, offset: number) {
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
	mp.is_active = 1  and (mp.product_name  like ? or mp.product_code=?)
GROUP BY
	p.product_id 
ORDER BY
	mp.product_name ASC 
        limit ? offset ?
        `;
    return knex.raw(sql, [_query, _query, limit, offset]);

  }

  adminSearchAllProductsLabeler(knex: Knex, query: any, labelerId: any) {
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

  adminSearchAllProducts(knex: Knex, query: any) {
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
	left join mm_units as u1 on mp.small_unit_id = u1.unit_id
	left join mm_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${query}' ) 
	AND mp.is_active = 1 
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
	left join mm_units as u1 on mp.small_unit_id = u1.unit_id
	left join mm_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${q_}' ) 
	AND mp.is_active = 1 
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
	left join mm_units as u1 on mp.small_unit_id = u1.unit_id
	left join mm_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${_q_}' ) 
	AND mp.is_active = 1 
ORDER BY
	mp.product_name ASC 
	LIMIT 10) as a) as s`;
    return knex.raw(sql);
  }

  getProductRemain(knex: Knex, product_id: any) {
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
    ) AS q`
    return knex.raw(sql)
  }

}