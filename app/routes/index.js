'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res, next) => {
    res.send({ ok: true, message: 'Welcome to Inventory API server' });
});
exports.default = router;
//# sourceMappingURL=index.js.map