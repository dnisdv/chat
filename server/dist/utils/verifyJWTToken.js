"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (token) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "", (err, decodedData) => {
        if (err || !decodedData) {
            return reject(err);
        }
        resolve(decodedData);
    });
});
//# sourceMappingURL=verifyJWTToken.js.map