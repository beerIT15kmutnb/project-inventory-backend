import Knex = require('knex');
import * as moment from 'moment';
export class ProductModel {
  ///////////////////////////////////////
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
  getProductPackage(knex:Knex,id:any){
    let sql =`
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
	 mp.generic_id = ${id}
	AND mp.is_active = 'Y'     
    `
    return knex.raw(sql)

  }

  adminGetAllProductTotal(knex: Knex) {
    let query = knex('mm_products as mp')
      .select(knex.raw('count(mp.product_id) as total'))
    // .innerJoin('mm_products as mp', 'mp.product_id', 'p.product_id')
    // .innerJoin('mm_generics as mg', 'mp.generic_id', 'mg.generic_id')
    return query;
  }

  adminGetSearchProductTotal(knex: Knex, query: any) {
    return knex('mm_products')
      .count('product_id as total')
      .where('is_active', 'Y')
      .andWhere(knex.raw(`product_name like '%${query}%' `));
  }
  ///////////////////////////////////////

  getTransactionList(knex: Knex, limit: number, offset: number) {
    let sql = `
    select * from(
    SELECT
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

  // getList(knex: Knex) {
  //   return knex('mm_generic_types')
  //   .orderBy('generic_type_name','asc')
  // }
  addUnit(knex: Knex, items: any) {
    return knex('mm_units')
      .insert(items)

  }
  editUnit(knex: Knex, items: any, unitId: any) {
    return knex('mm_units')
      .update(items)
      .where('unit_id', unitId)
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
  getUnit(knex: Knex) {
    return knex('mm_units')
      .orderBy('unit_name', 'asc')
  }
  getGenericType(knex: Knex) {
    return knex('mm_generic_types')
      .orderBy('generic_type_name')
  }
  saveAddProduct(knex: Knex, items: any) {
    return knex('mm_products')
      .insert(items)
  }
  saveAddGeneric(knex: Knex, items: any) {
    return knex('mm_generics')
      .insert(items)
  }
  productsExpired(knex: Knex) {
    return knex('mm_generics')
  }
  expired(knex: Knex) {
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
        ORDER BY q1.diff asc`
    return knex.raw(sql)
  }
  saveEditGeneric(knex: Knex, generic_id: any, items: any) {
    return knex('mm_generics')
      .whereIn('generic_id', generic_id)
      .update(items)
  }
  saveEditProduct(knex: Knex, product_id: any, items: any) {
    return knex('mm_products')
      .whereIn('product_id', product_id)
      .update(items)
  }
  adminGetSearchGnericTotal(knex: Knex, query: any) {
    return knex('mm_generics')
      .count('generic_id as total')
      .where('is_active', 'Y')
      .andWhere(knex.raw(`generic_name like '%${query}%' `));
  }
  
  adminGetAllProducts(knex: Knex, query: any, limit: number, offset: number) {
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
        mp.is_active = 'Y' 
        and 
        mp.product_name like '%${query}%'
    GROUP BY
        mp.product_id 
    ORDER BY
        mp.product_name ASC 
        LIMIT ${limit}
        offset ${offset}`

    return knex.raw(sql);
  }
  adminGetAllGeneric(knex: Knex, query: any, limit: number, offset: number) {
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
        mg.is_active = 'Y' 
        and 
        mg.generic_name like '%${query}%'
    GROUP BY
        mg.generic_id 
    ORDER BY
        mg.generic_name ASC 
        LIMIT ${limit}
        offset ${offset}`

    return knex.raw(sql);
  }

  adminGetAllGenericTotal(knex: Knex) {
    let query = knex('mm_generics')
      .select(knex.raw('count(generic_id) as total'))
    // .innerJoin('mm_products as mp', 'mp.product_id', 'p.product_id')
    // .innerJoin('mm_generics as mg', 'mp.generic_id', 'mg.generic_id')
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
          mp.is_active = 'Y'  and (mp.product_name like ? or mp.product_code=?)
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
	mp.is_active = 'Y'  and (mp.product_name  like ? or mp.product_code=?)
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
  adminSearchAllGenerics(knex: Knex, query: any) {
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