"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductModel {
    getList(knex) {
        return knex('generic_types');
    }
}
exports.ProductModel = ProductModel;
//# sourceMappingURL=products.js.map