"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginModel {
    doLogin(knex, username, password) {
        return knex('um_users as u')
            .select('u.user_id', 'u.username', 'u.access_right', 'u.is_active', 'u.warehouse_id', 'w.warehouse_name', 'pu.start_date', 'pu.end_date', 'pu.people_user_id', 'p.people_id', knex.raw('concat(t.title_name, p.fname, " ", p.lname) as fullname'))
            .innerJoin('um_people_users as pu', 'pu.user_id', 'u.user_id')
            .innerJoin('um_people as p', 'p.people_id', 'pu.people_id')
            .leftJoin('um_titles as t', 't.title_id', 'p.title_id')
            .leftJoin('wm_warehouses as w', 'w.warehouse_id', 'u.warehouse_id')
            .where('pu.is_active', 1)
            .where('u.is_active', 1)
            .where({
            username: username,
            password: password
        })
            .limit(1);
    }
}
exports.LoginModel = LoginModel;
//# sourceMappingURL=login.js.map