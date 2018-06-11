import Knex = require('knex');
import * as moment from 'moment';
export class EquipmentProductModel {
  ///////////////////////////////////////
  
  adminSearchAllProducts(knex: Knex, query: any) {
    let q_ = `${query}%`;
    let _q_ = `%${query}%`;
    let sql = `
        select DISTINCT * from (
       ( SELECT
	mp.product_name,
	mp.product_id,
	mg.equipment_code AS equipment_workign_code,
	mg.equipment_name,
    mp.equipment_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_equipment_products AS mp
	LEFT JOIN mm_equipments AS mg ON mg.equipment_id = mp.equipment_id
	left join mm_equipment_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_equipment_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${query}' ) 
	AND mp.is_active = 'Y' 
	LIMIT 10 )
        UNION ALL
        SELECT * from (
        SELECT
	mp.product_name,
	mp.product_id,
	mg.equipment_code AS equipment_workign_code,
	mg.equipment_name,
    mp.equipment_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_equipment_products AS mp
	LEFT JOIN mm_equipments AS mg ON mg.equipment_id = mp.equipment_id
	left join mm_equipment_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_equipment_units as u2 on mp.large_unit_id = u2.unit_id
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
	mg.equipment_code AS equipment_workign_code,
	mg.equipment_name,
    mp.equipment_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_equipment_products AS mp
	LEFT JOIN mm_equipments AS mg ON mg.equipment_id = mp.equipment_id
	left join mm_equipment_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_equipment_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${_q_}' ) 
	AND mp.is_active = 'Y' 
ORDER BY
	mp.product_name ASC 
	LIMIT 10) as a) as s`;
    return knex.raw(sql);
  }
  searchProducts(knex: Knex, query: any) {
    let q_ = `${query}%`;
    let _q_ = `%${query}%`;
    let sql = `
        select DISTINCT * from (
       ( SELECT
	mp.product_name,
	mp.product_id,
	mg.equipment_code AS equipment_workign_code,
	mg.equipment_name,
    mp.equipment_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_equipment_products AS mp
	LEFT JOIN mm_equipments AS mg ON mg.equipment_id = mp.equipment_id
	left join mm_equipment_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_equipment_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${query}' ) 
  AND mp.is_active = 'Y' 
  and mp.product_id in (
    select mp.product_id from 
    mm_equipment_products as mp
    left join wm_equipment_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
  )
	LIMIT 10 )
        UNION ALL
        SELECT * from (
        SELECT
	mp.product_name,
	mp.product_id,
	mg.equipment_code AS equipment_workign_code,
	mg.equipment_name,
    mp.equipment_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_equipment_products AS mp
	LEFT JOIN mm_equipments AS mg ON mg.equipment_id = mp.equipment_id
	left join mm_equipment_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_equipment_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${q_}' ) 
  AND mp.is_active = 'Y' 
  and mp.product_id in (
    select mp.product_id from 
    mm_equipment_products as mp
    left join wm_equipment_products as wp on wp.product_id = mp.product_id
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
	mg.equipment_code AS equipment_workign_code,
	mg.equipment_name,
    mp.equipment_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
	mm_equipment_products AS mp
	LEFT JOIN mm_equipments AS mg ON mg.equipment_id = mp.equipment_id
	left join mm_equipment_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_equipment_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	( mp.product_name LIKE '${_q_}' ) 
  AND mp.is_active = 'Y' 
  and mp.product_id in (
    select mp.product_id from 
    mm_equipment_products as mp
    left join wm_equipment_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
  )
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
	mg.equipment_code AS equipment_workign_code,
	mg.equipment_name,
    mp.equipment_id,
    mp.small_qty,
	u1.unit_name as small_unit_name,
	u2.unit_name as large_unit_name
FROM
  mm_equipment_products AS mp
	LEFT JOIN wm_equipment_products AS wp ON wp.product_id = mp.product_id  
	LEFT JOIN mm_equipments AS mg ON mg.equipment_id = mp.equipment_id
	left join mm_equipment_units as u1 on mg.small_unit_id = u1.unit_id
	left join mm_equipment_units as u2 on mp.large_unit_id = u2.unit_id
WHERE
	 mp.equipment_id = ${id}
  AND mp.is_active = 'Y' 
  and mp.product_id in (
    select mp.product_id from 
    mm_equipment_products as mp
    left join wm_equipment_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
  )
  group by  mp.product_id
    `
    return knex.raw(sql)

  }

  adminGetAllProductTotal(knex: Knex) {
    let query = knex('mm_equipment_products as mp')
      .select(knex.raw('count(mp.product_id) as total'))
    // .innerJoin('mm_equipment_products as mp', 'mp.product_id', 'p.product_id')
    // .innerJoin('mm_equipments as mg', 'mp.equipment_id', 'mg.equipment_id')
    return query;
  }

  adminGetSearchProductTotal(knex: Knex, query: any) {
    return knex('mm_equipment_products')
      .count('product_id as total')
      .where('is_active', 'Y')
      .andWhere(knex.raw(`product_name like '%${query}%' `));
  }
  getSerial(knex:Knex){
    return knex('wm_equipment_additions')
      .count('addition_id as total')
  }
  saveOrder(knex:Knex,order:any){
    return knex('wm_equipment_additions')
    .insert(order)
  }
  saveItems(knex:Knex,order:any){
    return knex('wm_equipment_addition_details')
    .insert(order)
  }
  ///////////////////////////////////////
  getAdditionList(knex:Knex,limit: number, offset: number){
    return knex('wm_equipment_additions')
  }
  setAddDetail(knex:Knex,additionId:any){
    return knex('wm_equipment_addition_details as ad')
    .select('ad.*','mg.equipment_name','u.unit_name as small_unit_name')
    .leftJoin('mm_equipments as mg','mg.equipment_id','ad.equipment_id')
    .leftJoin('mm_equipment_units as u','u.unit_id','mg.small_unit_id')
    .where('ad.addition_id',additionId)
  }
  gettransectionList(knex: Knex, limit: number, offset: number) {
    let sql = `
    select * from(
    SELECT
    mg.equipment_id,
        mg.equipment_code,
        mg.equipment_name,
        mp.product_code,
        mp.product_name,
        mg.min_qty,
        mg.max_qty,
        ifnull(sum(p.qty * mp.small_qty),0) as qty,
        uS.unit_name
    FROM
        mm_equipments as mg
        LEFT JOIN mm_equipment_products AS mp on mp.equipment_id = mg.equipment_id
        LEFT JOIN wm_equipment_products AS p ON mp.product_id = p.product_id
        LEFT JOIN mm_equipment_units AS uL ON uL.unit_id = mp.large_unit_id
        LEFT JOIN mm_equipment_units AS uS ON uS.unit_id = mg.small_unit_id
    WHERE
        mp.is_active = 'Y'
    GROUP BY
        mg.equipment_id 
    ORDER BY
        mg.equipment_name ASC 
        LIMIT ${limit}
        offset ${offset} ) as q1
        where q1.qty < q1.min_qty
    `;
    return knex.raw(sql);
  }

  // getList(knex: Knex) {
  //   return knex('mm_equipment_types')
  //   .orderBy('equipment_type_name','asc')
  // }
  alertExpired(knex: Knex, numDays: any, unitId: any) {
    return knex('mm_equipments')
      .update(numDays)
      .whereIn('equipment_id', unitId)
  }
  addUnit(knex: Knex, items: any) {
    return knex('mm_equipment_units')
      .insert(items)

  }
  editUnit(knex: Knex, items: any, unitId: any) {
    return knex('mm_equipment_units')
      .update(items)
      .where('unit_id', unitId)
  } 
  isActiveProduct(knex: Knex, items: any, Id: any) {
    return knex('mm_equipment_products')
      .update(items)
      .where('product_id', Id)
  }
  isActiveEquipment(knex: Knex, items: any, Id: any) {
    return knex('mm_equipments')
      .update(items)
      .where('equipment_id', Id)
  }
  isactive(knex: Knex, items: any, unitId: any) {
    return knex('mm_equipment_units')
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
      wm_equipment_products AS wp 
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
    return knex('mm_equipment_units')
      .orderBy('unit_name', 'asc')
  }
  // getEquipmentType(knex: Knex) {
  //   return knex('mm_equipment_types')
  //     .orderBy('equipment_type_name')
  // }
  saveAddProduct(knex: Knex, items: any) {
    return knex('mm_equipment_products')
      .insert(items)
  }
  saveAddEquipment(knex: Knex, items: any) {
    return knex('mm_equipments')
      .insert(items)
  }
  productsExpired(knex: Knex) {
    return knex('mm_equipments')
  }
  getUnsetProducts(knex: Knex) {
    return knex('mm_equipments')
    .where('num_days',null)
    .orWhere('num_days',0)
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
        wm_equipment_products as wp 
        LEFT JOIN mm_equipment_products as mp on mp.product_id = wp.product_id
        left join mm_equipments as mg on mg.equipment_id = mp.equipment_id
        WHERE
        DATEDIFF(wp.expired_date, CURDATE()) < mg.num_days
        ) as q1
        ORDER BY q1.diff asc`
    return knex.raw(sql)
  }
  saveEditEquipment(knex: Knex, equipment_id: any, items: any) {
    return knex('mm_equipments')
      .whereIn('equipment_id', equipment_id)
      .update(items)
  }
  saveEditProduct(knex: Knex, product_id: any, items: any) {
    return knex('mm_equipment_products')
      .whereIn('product_id', product_id)
      .update(items)
  }
  adminGetSearchGnericTotal(knex: Knex, query: any) {
    return knex('mm_equipments')
      .count('equipment_id as total')
      .where('is_active', 'Y')
      .andWhere(knex.raw(`equipment_name like '%${query}%' `));
  }
  
  adminGetAllProducts(knex: Knex, query: any, limit: number, offset: number) {
    let sql = `
    SELECT
    mp.*,
    mg.equipment_name,
    mg.equipment_id,
    mg.equipment_code,
    ifnull(sum(p.qty),0) as qty,
    uL.unit_name as large_unit,
    uS.unit_name as small_unit,
    uL.unit_id as large_unit_id,
    uS.unit_id as small_unit_id,
    count(p.lot_no) as amLot
FROM
    mm_equipment_products AS mp 
    LEFT JOIN wm_equipment_products AS p ON mp.product_id = p.product_id
    left join mm_equipments as mg on mg.equipment_id = mp.equipment_id
    LEFT JOIN mm_equipment_units AS uL ON uL.unit_id = mp.large_unit_id
    LEFT JOIN mm_equipment_units AS uS ON uS.unit_id = mg.small_unit_id
    WHERE
        
        mp.product_name like '%${query}%'
    GROUP BY
        mp.product_id 
    ORDER BY
        mp.product_name ASC 
        LIMIT ${limit}
        offset ${offset}`

    return knex.raw(sql);
  }
  adminGetAllEquipment(knex: Knex, query: any, limit: number, offset: number) {
//     let sql = `    SELECT

//     mg.*,
//     mu.unit_name as small_unit,
//     count(mp.product_id) as amLot,
//     gt.equipment_type_name
// FROM
//     mm_equipments AS mg 
//     left join mm_equipment_products as mp on mg.equipment_id = mp.equipment_id
//     left join mm_equipment_units as mu on mu.unit_id = mg.small_unit_id
//     left join mm_equipment_types as gt on gt.equipment_type_id = mg .equipment_type_id
//     WHERE
         
//         mg.equipment_name like '%${query}%'
//     GROUP BY
//         mg.equipment_id 
//     ORDER BY
//         mg.equipment_name ASC 
//         LIMIT ${limit}
//         offset ${offset}`
        let sql = `    SELECT

        mg.*,
        mu.unit_name as small_unit,
        count(mp.product_id) as amLot
    FROM
        mm_equipments AS mg 
        left join mm_equipment_products as mp on mg.equipment_id = mp.equipment_id
        left join mm_equipment_units as mu on mu.unit_id = mg.small_unit_id
        WHERE
             
            mg.equipment_name like '%${query}%'
        GROUP BY
            mg.equipment_id 
        ORDER BY
            mg.equipment_name ASC 
            LIMIT ${limit}
            offset ${offset}`
    return knex.raw(sql);
  }

  adminGetAllEquipmentTotal(knex: Knex) {
    let query = knex('mm_equipments')
      .select(knex.raw('count(equipment_id) as total'))
    // .innerJoin('mm_equipment_products as mp', 'mp.product_id', 'p.product_id')
    // .innerJoin('mm_equipments as mg', 'mp.equipment_id', 'mg.equipment_id')
    return query;
  }


  adminSearchProductsTotal(knex: Knex, query: any) {
    let _query = `%${query}%`;
    let sql = `
          SELECT
          g.equipment_code,
          g.equipment_name,
          mp.product_code,
          mp.product_name,
          g.min_qty,
          g.max_qty,
          sum( p.qty ) AS qty,
          uL.unit_name 
      FROM
          mm_equipment_products AS mp
          LEFT JOIN wm_equipment_products AS p ON mp.product_id = p.product_id
          LEFT JOIN mm_equipments AS g ON mp.equipment_id = g.equipment_id
          LEFT JOIN mm_equipment_units AS uL ON mp.large_unit_id = uL.unit_id
          LEFT JOIN mm_equipment_units AS uS ON mp.small_unit_id = uS.unit_id 
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
	g.equipment_code,
	g.equipment_name,
	mp.product_code,
	mp.product_name,
	g.min_qty,
  g.max_qty,
  ifnull(sum(p.qty),0) as qty,
	uL.unit_name 
FROM
	mm_equipment_products AS mp
	LEFT JOIN wm_equipment_products AS p ON mp.product_id = p.product_id
	LEFT JOIN mm_equipments AS g ON mp.equipment_id = g.equipment_id
	LEFT JOIN mm_equipment_units AS uL ON mp.large_unit_id = uL.unit_id
	LEFT JOIN mm_equipment_units AS uS ON mp.small_unit_id = uS.unit_id 
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
          mg.working_code AS equipment_workign_code,
          mp.is_lot_control,
          mu.unit_name AS primary_unit_name,
          mg.equipment_name,
          mp.equipment_id,
          ge.num_days AS expire_num_days
        FROM
          mm_equipment_products AS mp
        LEFT JOIN mm_equipments AS mg ON mg.equipment_id = mp.equipment_id
        LEFT JOIN mm_equipment_units AS mu ON mu.unit_id = mp.primary_unit_id
        LEFT JOIN mm_equipment_labelers AS l ON l.labeler_id = mp.v_labeler_id
        LEFT JOIN wm_equipment_equipment_expired_alert AS ge ON ge.equipment_id = mp.equipment_id
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
          mg.working_code AS equipment_workign_code,
          mp.is_lot_control,
          mu.unit_name AS primary_unit_name,
          mg.equipment_name,
          mp.equipment_id,
          ge.num_days AS expire_num_days
        FROM
          mm_equipment_products AS mp
        LEFT JOIN mm_equipments AS mg ON mg.equipment_id = mp.equipment_id
        LEFT JOIN mm_equipment_units AS mu ON mu.unit_id = mp.primary_unit_id
        LEFT JOIN mm_equipment_labelers AS l ON l.labeler_id = mp.v_labeler_id
        LEFT JOIN wm_equipment_equipment_expired_alert AS ge ON ge.equipment_id = mp.equipment_id
        WHERE
          (
            mp.product_name LIKE '${q_}'
            OR mg.equipment_name LIKE '${q_}'
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
          mg.working_code AS equipment_workign_code,
          mp.is_lot_control,
          mu.unit_name AS primary_unit_name,
          mg.equipment_name,
          mp.equipment_id,
          ge.num_days AS expire_num_days
        FROM
          mm_equipment_products AS mp
        LEFT JOIN mm_equipments AS mg ON mg.equipment_id = mp.equipment_id
        LEFT JOIN mm_equipment_units AS mu ON mu.unit_id = mp.primary_unit_id
        LEFT JOIN mm_equipment_labelers AS l ON l.labeler_id = mp.v_labeler_id
        LEFT JOIN wm_equipment_equipment_expired_alert AS ge ON ge.equipment_id = mp.equipment_id
        WHERE
          (
            mp.product_name LIKE '${_q_}'
            OR mg.equipment_name LIKE '${_q_}'
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
  adminSearchAllEquipments(knex: Knex, query: any) {
    let q_ = `${query}%`;
    let _q_ = `%${query}%`;
    let sql = `
        select DISTINCT * from (
       ( SELECT
	mg.*
FROM
  mm_equipments AS mg 
WHERE
	( mg.equipment_name LIKE '${query}' ) 
	AND mg.is_active = 'Y' 
	LIMIT 10 )
        UNION ALL
        SELECT * from (
        SELECT
	mg.*
FROM
	mm_equipments AS mg 
WHERE
	( mg.equipment_name LIKE '${q_}' ) 
	AND mg.is_active = 'Y' 
ORDER BY
mg.equipment_name ASC 
	LIMIT 10) as a
        UNION ALL
        
        SELECT * from (
        SELECT
	mg.*
FROM
  mm_equipments AS mg
  WHERE
	( mg.equipment_name LIKE '${_q_}' ) 
	AND mg.is_active = 'Y' 
ORDER BY
	mg.equipment_name ASC 
	LIMIT 10) as a) as s`;
    return knex.raw(sql);
  }
  adminSearchEquipments(knex: Knex, query: any) {
    let q_ = `${query}%`;
    let _q_ = `%${query}%`;
    let sql = `
        select DISTINCT * from (
       ( SELECT
	mg.*
FROM
  mm_equipments AS mg
   
WHERE
	( mg.equipment_name LIKE '${query}' ) 
  AND mg.is_active = 'Y' 
  and mg.equipment_id in (
    select mp.equipment_id from 
    mm_equipment_products as mp
    left join wm_equipment_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
    group by  mp.equipment_id
  )
	LIMIT 10 )
        UNION ALL
        SELECT * from (
        SELECT
	mg.*
FROM
	mm_equipments AS mg 
WHERE
	( mg.equipment_name LIKE '${q_}' ) 
  AND mg.is_active = 'Y' 
  and mg.equipment_id in (
    select mp.equipment_id from 
    mm_equipment_products as mp
    left join wm_equipment_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
    group by  mp.equipment_id
  )
ORDER BY
mg.equipment_name ASC 
	LIMIT 10) as a
        UNION ALL
        
        SELECT * from (
        SELECT
	mg.*
FROM
  mm_equipments AS mg
  WHERE
	( mg.equipment_name LIKE '${_q_}' ) 
  AND mg.is_active = 'Y' 
  and mg.equipment_id in (
    select mp.equipment_id from 
    mm_equipment_products as mp
    left join wm_equipment_products as wp on wp.product_id = mp.product_id
    where wp.qty > 0
    group by  mp.equipment_id
  )
ORDER BY
	mg.equipment_name ASC 
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
    mm_equipment_products AS mp
    LEFT JOIN wm_equipment_products AS wp ON wp.product_id = mp.product_id 
  WHERE
    wp.product_id = ${product_id}
    ) AS q`
    return knex.raw(sql)
  }

}