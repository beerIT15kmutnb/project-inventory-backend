"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericModel {
    getGenericType(knex) {
        return knex('mm_generic_types')
            .orderBy('generic_type_name', 'asc');
    }
    getGeneric(knex, genericId) {
        let sql = `
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
        mg.generic_id = ${genericId}
        GROUP BY
            mg.generic_id 
        ORDER BY
            mg.generic_name ASC
        `;
        return knex.raw(sql);
    }
    addType(knex, items) {
        return knex('mm_generic_types')
            .insert(items);
    }
    editType(knex, items, genericTypeId) {
        return knex('mm_generic_types')
            .update(items)
            .where('generic_type_id', genericTypeId);
    }
    isactive(knex, items, genericTypeId) {
        return knex('mm_generic_types')
            .update(items)
            .where('generic_type_id', genericTypeId);
    }
}
exports.GenericModel = GenericModel;
//# sourceMappingURL=generics.js.map