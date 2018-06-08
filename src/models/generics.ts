import Knex = require('knex');
import * as moment from 'moment';

export class GenericModel {
    getGenericType(knex: Knex) {
        return knex('mm_generic_types')
        .orderBy('generic_type_name','asc')
    }
    addType(knex: Knex, items: any) {
        return knex('mm_generic_types')
            .insert(items)

    }
    editType(knex: Knex, items: any, genericTypeId: any) {
        return knex('mm_generic_types')
            .update(items)
            .where('generic_type_id', genericTypeId)
    }
    isactive(knex: Knex, items: any, genericTypeId: any) {
        return knex('mm_generic_types')
            .update(items)
            .where('generic_type_id', genericTypeId)
    }
}