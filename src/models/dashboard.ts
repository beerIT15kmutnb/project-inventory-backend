import Knex = require('knex');
import * as moment from 'moment';

export class DashboardModel {
    getTopTenReqGen(knex:Knex){
        let sql =`SELECT * FROM(
        SELECT
	mg.generic_name,
	sum(rci.confirm_qty) as requisition_qty,
	mu.unit_name as small_unit_name,
	COUNT(DISTINCT rci.requisition_order_id) as countReq
FROM
	wm_requisition_confirm_item as rci
	LEFT JOIN wm_products as wp on wp.wm_product_id = rci.wm_product_id
	LEFT JOIN mm_products as mp on mp.product_id = wp.product_id
	left join mm_generics as mg on mg.generic_id = mp.generic_id
	LEFT JOIN mm_units as mu on mu.unit_id = mg.small_unit_id
	GROUP BY 
	mg.generic_id
    
) as q
ORDER BY q.countReq desc limit 10
    `
    return knex.raw(sql)
    }
    getTopTenReqEq(knex:Knex){
        let sql =`SELECT * FROM(
        SELECT
	mg.equipment_name,
	sum(rci.confirm_qty) as requisition_qty,
	mu.unit_name as small_unit_name,
	COUNT(DISTINCT rci.requisition_order_id) as countReq
FROM
	wm_equipment_requisition_confirm_item as rci
	LEFT JOIN wm_equipment_products as wp on wp.wm_product_id = rci.wm_product_id
	LEFT JOIN mm_equipment_products as mp on mp.product_id = wp.product_id
	left join mm_equipments as mg on mg.equipment_id = mp.equipment_id
	LEFT JOIN mm_equipment_units as mu on mu.unit_id = mg.small_unit_id
	GROUP BY 
	mg.equipment_id
    
) as q
ORDER BY q.countReq desc limit 10
    `
    return knex.raw(sql)
    }

    getTopFiveMonthReqGen(knex:Knex,sDate:any,eDate:any){
        let sql =`SELECT * FROM(
            SELECT
            mg.generic_id,
                mg.generic_name,
                sum(rci.confirm_qty) as requisition_qty,
                mu.unit_name as small_unit_name,
                COUNT(DISTINCT rci.requisition_order_id) as countReq
            FROM
                wm_requisition_confirm_item as rci
                LEFT JOIN wm_requisition_orders as ro on ro.requisition_order_id = rci.requisition_order_id
                LEFT JOIN wm_products as wp on wp.wm_product_id = rci.wm_product_id
                LEFT JOIN mm_products as mp on mp.product_id = wp.product_id
                left join mm_generics as mg on mg.generic_id = mp.generic_id
                LEFT JOIN mm_units as mu on mu.unit_id = mg.small_unit_id
                WHERE
                ro.requisition_date BETWEEN '${sDate}' and '${eDate}'
                GROUP BY
                mg.generic_id
                
                ) as q
                ORDER BY q.countReq desc
                limit 5
    `
    return knex.raw(sql)
    }
    getTopFiveMonthReqEq(knex:Knex,sDate:any,eDate:any){
        let sql =`SELECT * FROM(
            SELECT
            mg.equipment_id,
                mg.equipment_name,
                sum(rci.confirm_qty) as requisition_qty,
                mu.unit_name as small_unit_name,
                COUNT(DISTINCT rci.requisition_order_id) as countReq
            FROM
                wm_equipment_requisition_confirm_item as rci
                LEFT JOIN wm_equipment_requisition_orders as ro on ro.requisition_order_id = rci.requisition_order_id
                LEFT JOIN wm_equipment_products as wp on wp.wm_product_id = rci.wm_product_id
                LEFT JOIN mm_equipment_products as mp on mp.product_id = wp.product_id
                left join mm_equipments as mg on mg.equipment_id = mp.equipment_id
                LEFT JOIN mm_equipment_units as mu on mu.unit_id = mg.small_unit_id
                WHERE
                ro.requisition_date BETWEEN '${sDate}' and '${eDate}'
                GROUP BY
                mg.equipment_id
                
                ) as q
                ORDER BY q.countReq desc
                limit 5
    `
    return knex.raw(sql)
    }
}