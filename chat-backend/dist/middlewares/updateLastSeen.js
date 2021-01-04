"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
exports.default = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        yield models_1.UserModel.findOneAndUpdate(
        // @ts-ignore
        { _id: req.user._id }, {
            last_seen: new Date(),
        }, { new: true });
    }
    next();
});
//# sourceMappingURL=updateLastSeen.js.map