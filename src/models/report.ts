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
	mg.equipment_name,
	mu.unit_name,
	ifnull ( wadt.requisition_qty, 0 ) AS req_qty
FROM
	mm_equipments AS mg
	LEFT JOIN mm_equipment_units AS mu ON mu.unit_id = mg.small_unit_id
	LEFT JOIN ( SELECT * FROM wm_equipment_addition_details AS wad WHERE wad.addition_id = ${addition_id} ) AS wadt ON wadt.equipment_id = mg.equipment_id 
        `
        return knex.raw(sql);
    }

    getEquipType(knex: Knex) {
        return knex('mm_generic_types')
    }

}