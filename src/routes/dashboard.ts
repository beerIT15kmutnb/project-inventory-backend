'use strict';

import * as express from 'express';
import * as moment from 'moment';
import * as co from 'co-express';
import * as _ from 'lodash';
import { DashboardModel } from './../models/dashboard';


const router = express.Router();
const dashboardModel = new DashboardModel();

router.get('/getTopTenReqGen', co(async (req, res, next) => {
    let db = req.db;
    try {
        let rs = await dashboardModel.getTopTenReqGen(db);
        res.send({ ok: true, rows: rs });
    } catch (error) {
        res.send({ ok: false, error: error.message });
    } finally {
        db.destroy();
    }
}));
router.get('/getTopTenReqEq', co(async (req, res, next) => {
    let db = req.db;
    try {
        let rs = await dashboardModel.getTopTenReqEq(db);
        res.send({ ok: true, rows: rs });
    } catch (error) {
        res.send({ ok: false, error: error.message });
    } finally {
        db.destroy();
    }
}));
router.get('/getTopFiveMonthReqGen', co(async (req, res, next) => {
    let db = req.db;
    try {
        moment.locale('th');
        let Dates: any = []
        let dataDates: any = []
        let count = 0
        let countDates = moment(new Date()).add(-12, 'months')
        let sDate: any
        let eDate: any
        let rs: any
        while (count < 12) {
            sDate = 1 + moment(countDates).format(' MMMM ') + (moment(countDates).get('year') + 1 + 543)
            eDate = moment(countDates).daysInMonth() + moment(countDates).format(' MMMM ') + (moment(countDates).get('year') + 1 + 543)
            Dates.push(moment(countDates).format(' MMMM ') + (moment(countDates).get('year') + 1 + 543))
            sDate = (moment(countDates).get('year') + 1) + '-' + moment(countDates).format('M') + '-' + 1
            eDate = (moment(countDates).get('year') + 1) + '-' + moment(countDates).format('M') + '-' + moment(countDates).daysInMonth()
            rs = await dashboardModel.getTopFiveMonthReqGen(db, sDate, eDate);
            dataDates.push(rs[0])
            countDates = moment(countDates).add(-1, 'months')
            ++count
        }
        let jsonFrom: any = []
        for (let [index, data] of dataDates.entries()) {
            for (let obj of data) {
                if (_.findIndex(jsonFrom, (v: any) => { return v.id == obj.generic_id }) == -1) {
                    jsonFrom.push({
                        id: obj.generic_id,
                        name: obj.generic_name,
                        data: []
                    })
                }

            }
        }

        for (let [index, dataD] of dataDates.entries()) {
            for (let value of dataD) {
                for (let dataF of jsonFrom) {
                    if (value.generic_id == dataF.id) {
                        dataF.data[index] = dataF.data[index] ? +dataF.data[index] + +value.countReq : +value.countReq
                    } else {
                        dataF.data[index] = dataF.data[index] ? +dataF.data[index] : null
                    }
                }
            }
        }

        res.send({ ok: true, rows: { dataDates: dataDates, jsonFrom: jsonFrom, Dates: Dates } });
        // res.send({ dataDates: dataDates, jsonFrom: jsonFrom });
    } catch (error) {
        res.send({ ok: false, error: error.message });
    } finally {
        db.destroy();
    }
}));
router.get('/getTopFiveMonthReqEq', co(async (req, res, next) => {
    let db = req.db;
    try {
        moment.locale('th');
        let Dates: any = []
        let dataDates: any = []
        let count = 0
        let countDates = moment(new Date()).add(-12, 'months')
        let sDate: any
        let eDate: any
        let rs: any
        while (count < 12) {
            sDate = 1 + moment(countDates).format(' MMMM ') + (moment(countDates).get('year') + 1 + 543)
            eDate = moment(countDates).daysInMonth() + moment(countDates).format(' MMMM ') + (moment(countDates).get('year') + 1 + 543)
            Dates.push(moment(countDates).format(' MMMM ') + (moment(countDates).get('year') + 1 + 543))
            sDate = (moment(countDates).get('year') + 1) + '-' + moment(countDates).format('M') + '-' + 1
            eDate = (moment(countDates).get('year') + 1) + '-' + moment(countDates).format('M') + '-' + moment(countDates).daysInMonth()
            rs = await dashboardModel.getTopFiveMonthReqEq(db, sDate, eDate);
            dataDates.push(rs[0])
            countDates = moment(countDates).add(-1, 'months')
            ++count
        }
        let jsonFrom: any = []
        for (let [index, data] of dataDates.entries()) {
            for (let obj of data) {
                if (_.findIndex(jsonFrom, (v: any) => { return v.id == obj.equipment_id }) == -1) {
                    jsonFrom.push({
                        id: obj.equipment_id,
                        name: obj.equipment_name,
                        data: []
                    })
                }

            }
        }

        for (let [index, dataD] of dataDates.entries()) {
            for (let value of dataD) {
                for (let dataF of jsonFrom) {
                    if (value.equipment_id == dataF.id) {
                        dataF.data[index] = dataF.data[index] ? +dataF.data[index] + +value.countReq : +value.countReq
                    } else {
                        dataF.data[index] = dataF.data[index] ? +dataF.data[index] : null
                    }
                }
            }
        }

        res.send({ ok: true, rows: { dataDates: dataDates, jsonFrom: jsonFrom, Dates: Dates } });
        // res.send({ dataDates: dataDates, jsonFrom: jsonFrom });
    } catch (error) {
        res.send({ ok: false, error: error.message });
    } finally {
        db.destroy();
    }
}));


export default router;