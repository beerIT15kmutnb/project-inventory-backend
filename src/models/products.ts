import Knex = require('knex');
import * as moment from 'moment';
export class ProductModel {

    getList(knex: Knex) {
        return knex('generic_types')
    }

    adminGetAllProducts(knex: Knex, limit: number, offset: number) {
        let query = `SELECT
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
        LEFT JOIN mm_generics AS g ON g.generic_id = mp.generic_id
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
	sum( p.qty ) AS qty,
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

}