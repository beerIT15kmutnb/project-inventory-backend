import Knex = require('knex');
import * as moment from 'moment';

export class EquipmentModel {
    // getEquipmentType(knex: Knex) {
    //     return knex('mm_equipment_types')
    //     .orderBy('equipment_type_name','asc')
    // }
    getEquipment(knex: Knex,equipmentId:any) {
        let sql = `
        SELECT
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
        mg.equipment_id = ${equipmentId}
        GROUP BY
            mg.equipment_id 
        ORDER BY
            mg.equipment_name ASC
        `;
        return knex.raw(sql);
    }
    // addType(knex: Knex, items: any) {
    //     return knex('mm_equipment_types')
    //         .insert(items)

    // }
    // editType(knex: Knex, items: any, equipmentTypeId: any) {
    //     return knex('mm_equipment_types')
    //         .update(items)
    //         .where('equipment_type_id', equipmentTypeId)
    // }
    // isactive(knex: Knex, items: any, equipmentTypeId: any) {
    //     return knex('mm_equipment_types')
    //         .update(items)
    //         .where('equipment_type_id', equipmentTypeId)
    // }
}