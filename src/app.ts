'use strict';
require('dotenv').config();
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fse from 'fs-extra';
import * as _ from 'lodash';

// const protect = require('@risingstack/protect');

import Knex = require('knex');
import { MySqlConnectionConfig } from 'knex';

import { Jwt } from './models/jwt';
const jwt = new Jwt();

import index from './routes/index';
import product from './routes/products';
import login from './routes/login';
import receives from './routes/receives';
import issue from './routes/issue';
import requisition from './routes/requisition';
import generic from './routes/generics';
import people from './routes/people'

import equipmentProduct from './routes/equipment-products';
import equipmentReceives from './routes/equipment-receives';
import equipmentIssue from './routes/equipment-issue';
import equipmentRequisition from './routes/equipment-requisition';
import equipment from './routes/equipments';
import dashboard from './routes/dashboard';
const app: express.Express = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

let checkAuth = (req, res, next) => {
  let token: string = null;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else {
    token = req.body.token;
  }

  jwt.verify(token)
    .then((decoded: any) => {
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
}

let dbConnection: MySqlConnectionConfig = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
}

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

app.use('/login', login)
app.use('/', checkAuth, index);
app.use('/dashboard',checkAuth, dashboard)

app.use('/equipment-products', checkAuth, equipmentProduct);
app.use('/equipment-requisition', checkAuth, equipmentRequisition);
app.use('/equipment-receives', checkAuth, equipmentReceives);
app.use('/equipment-issues', checkAuth, equipmentIssue)
app.use('/equipments', checkAuth, equipment )

app.use('/products', checkAuth, product);
app.use('/requisition', checkAuth, requisition);
app.use('/receives', checkAuth, receives);
app.use('/issues', checkAuth, issue)
app.use('/generics', checkAuth, generic )
app.use('/people',checkAuth,people)



//catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

//error handler

//production error handler
// no stacktrace leaked to user
app.use((err: Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    title: 'error',
    message: err.message,
    error: {}
  });
});

export default app;
