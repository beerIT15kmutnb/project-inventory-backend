import Knex = require('knex');
import * as moment from 'moment';
export class PeopleModel {
    getPeople(knex: Knex) {
        return knex('um_people as up')
            .select('up.*', 'ut.title_name')
            .leftJoin('um_titles as ut', 'ut.title_id', 'up.title_id')

    }
    getTitles(knex: Knex) {
        return knex('um_titles as up')
    }
    getPeopleTotal(knex: Knex) {
        return knex('um_people')
            .count('* as total')
    }
    getUser(knex: Knex) {
        return knex('um_users as uu')
            .select('uu.*',knex.raw(`concat( ut.title_name ,' ', up.fname,' ',up.lname) as fullName`))
            .leftJoin('um_people_users as upu','upu.user_id','uu.user_id')
            .leftJoin('um_people as up','up.people_id','upu.people_id')
            .leftJoin('um_titles as ut', 'ut.title_id', 'up.title_id')

    }
    getUserTotal(knex: Knex) {
        return knex('um_users')
            .count('* as total')
    }
    savePeople(knex: Knex, items: any) {
        knex('um_people')
          .insert(items)
    }
    editPeople(knex: Knex, items: any, id: any) {
        knex('um_people')
      .update(items)
      .whereIn('people_id', id)
    }

}