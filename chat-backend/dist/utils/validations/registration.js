"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = [
    express_validator_1.check("email").isEmail(),
    express_validator_1.check("firstname").isLength({ min: 3 }),
    express_validator_1.check("lastname").isLength({ min: 3 }),
    express_validator_1.check("password").isLength({ min: 3 })
];
//# sourceMappingURL=registration.js.map