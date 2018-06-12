'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const Knex = require("knex");
const jwt_1 = require("./models/jwt");
const jwt = new jwt_1.Jwt();
const index_1 = require("./routes/index");
const products_1 = require("./routes/products");
const login_1 = require("./routes/login");
const receives_1 = require("./routes/receives");
const issue_1 = require("./routes/issue");
const requisition_1 = require("./routes/requisition");
const generics_1 = require("./routes/generics");
const people_1 = require("./routes/people");
const equipment_products_1 = require("./routes/equipment-products");
const equipment_receives_1 = require("./routes/equipment-receives");
const equipment_issue_1 = require("./routes/equipment-issue");
const equipment_requisition_1 = require("./routes/equipment-requisition");
const equipments_1 = require("./routes/equipments");
const dashboard_1 = require("./routes/dashboard");
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
let checkAuth = (req, res, next) => {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.query && req.query.token) {
        token = req.query.token;
    }
    else {
        token = req.body.token;
    }
    jwt.verify(token)
        .then((decoded) => {
        req.decoded = decoded;
        next();
    }, err => {
        console.log(err);
        return res.send({
            ok: false,
            error: 'No token provided.',
            code: 403
        });
    });
};
let dbConnection = {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
};
app.use((req, res, next) => {
    req.db = Knex({
        client: 'mysql',
        connection: dbConnection,
        pool: {
            min: 0,
            max: 7,
            afterCreate: (conn, done) => {
                conn.query('SET NAMES utf8', (err) => {
                    done(err, conn);
                });
            }
        },
        debug: true,
        acquireConnectionTimeout: 5000
    });
    next();
});
app.use('/login', login_1.default);
app.use('/', checkAuth, index_1.default);
app.use('/dashboard', checkAuth, dashboard_1.default);
app.use('/equipment-products', checkAuth, equipment_products_1.default);
app.use('/equipment-requisition', checkAuth, equipment_requisition_1.default);
app.use('/equipment-receives', checkAuth, equipment_receives_1.default);
app.use('/equipment-issues', checkAuth, equipment_issue_1.default);
app.use('/equipments', checkAuth, equipments_1.default);
app.use('/products', checkAuth, products_1.default);
app.use('/requisition', checkAuth, requisition_1.default);
app.use('/receives', checkAuth, receives_1.default);
app.use('/issues', checkAuth, issue_1.default);
app.use('/generics', checkAuth, generics_1.default);
app.use('/people', checkAuth, people_1.default);
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
        title: 'error',
        message: err.message,
        error: {}
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map