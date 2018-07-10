import Knex = require('knex');

export class ReportModel {

    getReportGeneric(knex: Knex, genTypeid: any, addition_id: any) {
        let sql = `
        SELECT
	mg.generic_name,
	mu.unit_name,
	ifnull ( wadt.requisition_qty, 0 ) AS req_qty 
FROM
	mm_generics AS mg
	LEFT JOIN mm_units AS mu ON mu.unit_id = mg.small_unit_id
	LEFT JOIN ( SELECT * FROM wm_addition_details AS wad WHERE wad.addition_id = ${addition_id} ) AS wadt ON wadt.generic_id = mg.generic_id 
WHERE
	mg.generic_type_id = ${genTypeid}
        `
        return knex.raw(sql);
    }

    getGenType(knex: Knex) {
        return knex('mm_generic_types')
    }

    getReportEquipment(knex: Knex, genTypeid: any, addition_id: any) {
        let sql = `
        SELECT
    mg.product_name,
    me.equipment_name,
	mu.unit_name,
	ifnull ( wadt.requisition_qty, 0 ) AS req_qty
FROM
    mm_equipment_products AS mg
    left join mm_equipments as me on me.equipment_id = mg.equipment_id
	LEFT JOIN mm_equipment_units AS mu ON mu.unit_id = me.small_unit_id
	LEFT JOIN ( SELECT * FROM wm_equipment_addition_details AS wadt WHERE wadt.addition_id = ${addition_id} ) AS wadt ON wadt.product_id = mg.product_id 
    where mg.equipment_id = ${genTypeid}
    `
        return knex.raw(sql);
    }

    getEquipType(knex: Knex) {
        return knex('mm_equipments')
    }
    genAllReq(knex: Knex, sDate: any, eDate: any) {
        let sql = `
        SELECT
	count( wr1.requisition_order_id) as qty1
FROM
	mm_generics AS mg
	left join (SELECT mp.generic_id, wro.requisition_order_id FROM wm_requisition_orders as wro 
		left join wm_requisition_confirm_item as wrc on wrc.requisition_order_id = wro.requisition_order_id
		left join wm_products as wp on wp.wm_product_id = wrc.wm_product_id
		left join mm_products as mp on mp.product_id = wp.product_id
		where wro.confirm_date BETWEEN '${sDate}' and '${eDate}'
		) as wr1 on wr1.generic_id = mg.generic_id
	GROUP BY mg.generic_id
    ORDER BY mg.generic_name`
    return knex.raw(sql)
    }
    genAll(knex: Knex) {
        let sql = `
        SELECT
	mg.generic_name,
	mg.generic_id
FROM
	mm_generics AS mg
	GROUP BY mg.generic_id
    ORDER BY mg.generic_name`
    return knex.raw(sql)
    }
}