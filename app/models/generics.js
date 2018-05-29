"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericModel {
    getGenericType(knex) {
        return knex('mm_generic_types')
            .orderBy('generic_type_name', 'asc');
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
}
exports.GenericModel = GenericModel;
//# sourceMappingURL=generics.js.map