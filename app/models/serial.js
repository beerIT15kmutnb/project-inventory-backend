"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class SerialModel {
    getSerialInfo(knex, srType) {
        return knex('sys_serials as sr')
            .where('sr.sr_type', srType)
            .select('sr.sr_no', 'sr.is_year_prefix', 'sr.sr_prefix', 'sr.digit_length', 'sf.serial_code')
            .leftJoin('sys_serial_format as sf', 'sf.serial_format_id', 'sr.serial_format_id')
            .limit(1);
    }
    getSerial(knex, srType) {
        return __awaiter(this, void 0, void 0, function* () {
            let serialInfo = yield this.getSerialInfo(knex, srType);
            if (serialInfo.length) {
                let currentNo = serialInfo[0].sr_no;
                let serialCode = serialInfo[0].serial_code;
                let serialLength = serialInfo[0].digit_length;
                let serialPrefix = serialInfo[0].sr_prefix;
                let serialYear = moment().get('year') + 543;
                let _serialYear = serialYear.toString().substring(2);
                let newSerialNo = this.paddingNumber(currentNo, serialLength);
                let sr = null;
                if (serialInfo[0].is_year_prefix === 'Y') {
                    sr = serialCode.replace('PREFIX', serialPrefix).replace('YY', _serialYear).replace('##', newSerialNo);
                }
                else {
                    sr = serialCode.replace('PREFIX', serialPrefix).replace('##', newSerialNo);
                }
                yield this.updateSerial(knex, srType);
                return sr;
            }
            else {
                return '000000';
            }
        });
    }
    paddingNumber(n, p) {
        var pad_char = '0';
        var pad = new Array(1 + p).join(pad_char);
        return (pad + n).slice(-pad.length);
    }
    updateSerial(knex, srType) {
        return __awaiter(this, void 0, void 0, function* () {
            return knex('sys_serials')
                .increment('sr_no', 1)
                .where('sr_type', srType);
        });
    }
}
exports.SerialModel = SerialModel;
//# sourceMappingURL=serial.js.map