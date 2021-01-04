"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = [express_validator_1.check('email').isEmail(), express_validator_1.check('password').isLength({ min: 3 })];
//# sourceMappingURL=login.js.map