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

import index from './routes/index';
import product from './routes/products';
import login from './routes/login';
const app: express.Express = express();

//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({extended: false, limit: '5mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());

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
    debug: process.env.SQL_DEBUG || true,
    acquireConnectionTimeout: 5000
  });

  next();
});

app.use('/login',login)
app.use('/product',product);
app.use('/',index);


//catch 404 and forward to error handler
app.use((req,res,next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

//error handler

//production error handler
// no stacktrace leaked to user
app.use((err: Error,req,res,next) => {
  res.status(err['status'] || 500);
  res.render('error',{
    title: 'error',
    message: err.message,
    error: {}
  });
});

export default app;