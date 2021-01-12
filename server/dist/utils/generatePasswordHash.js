"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, 10, function (err, hash) {
            if (err)
                return reject(err);
            resolve(hash);
        });
    });
};
//# sourceMappingURL=generatePasswordHash.js.map