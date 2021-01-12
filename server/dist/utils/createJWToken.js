"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
exports.default = (user) => {
    const token = jsonwebtoken_1.default.sign({
        data: lodash_1.reduce(user, (result, value, key) => {
            if (key !== "password") {
                result[key] = value;
            }
            return result;
        }, {}),
    }, process.env.JWT_SECRET || "UpFJfpWKYteH5rMHSxst", {
        expiresIn: process.env.JWT_MAX_AGE || "7d",
        algorithm: "HS256",
    });
    return token;
};
// {
//   "compilerOptions": {
//     "module": "commonjs",
//     "esModuleInterop": true,
//     "target": "es6",
//     "moduleResolution": "node",
//     "sourceMap": true,
//     "outDir": "dist"
//   },
//   "lib": ["es2015"]
// }
//# sourceMappingURL=createJWToken.js.map