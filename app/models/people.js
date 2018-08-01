"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PeopleModel {
    getPeople(knex) {
        return knex('um_people as up')
            .select('up.*', 'ut.title_name')
            .leftJoin('um_titles as ut', 'ut.title_id', 'up.title_id');
    }
    getTitles(knex) {
        return knex('um_titles as up');
    }
    getPeopleTotal(knex) {
        return knex('um_people')
            .count('* as total');
    }
    getUser(knex) {
        return knex('um_users as uu')
            .select('uu.*', knex.raw(`concat( ut.title_name ,' ', up.fname,' ',up.lname) as fullName`))
            .leftJoin('um_people_users as upu', 'upu.user_id', 'uu.user_id')
            .leftJoin('um_people as up', 'up.people_id', 'upu.people_id')
            .leftJoin('um_titles as ut', 'ut.title_id', 'up.title_id');
    }
    getUserTotal(knex) {
        return knex('um_users')
            .count('* as total');
    }
    savePeople(knex, items) {
        return knex('um_people')
            .insert(items);
    }
    saveUser(knex, items) {
        return knex('um_users')
            .insert(items);
    }
    savePeoUser(knex, items) {
        return knex('um_people_users')
            .insert(items);
    }
    editUser(knex, items, id) {
        return knex('um_users')
            .update(items)
            .where('user_id', id);
    }
    editPeople(knex, items, id) {
        return knex('um_people')
            .update(items)
            .where('people_id', id);
    }
}
exports.PeopleModel = PeopleModel;
//# sourceMappingURL=people.js.map