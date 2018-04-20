import Knex = require('knex');
import * as moment from 'moment';
export class ProductModel {
    getList(knex: Knex) {
        return knex('generic_types')
    }
}