"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class Jwt {
    constructor() {
        this.secretKey = process.env.SECRET_KEY;
    }
    sign(playload) {
        console.log(this.secretKey);
        let token = jwt.sign(playload, this.secretKey, {
            expiresIn: '1d'
        });
        return token;
    }
    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.Jwt = Jwt;
//# sourceMappingURL=jwt.js.map