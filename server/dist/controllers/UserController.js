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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const utils_1 = require("../utils");
class UserController {
    constructor(io) {
        this.show = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield models_1.UserModel.findById(id);
                if (!user || user.length === 0) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                res.send(user);
            }
            catch (e) {
                res.status(500).send(e);
            }
        });
        this.getMe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user && req.user._id;
                const user = yield models_1.UserModel.findById(id);
                if (!user || user.length === 0) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                res.json(user);
            }
            catch (e) {
                res.status(500).send(e);
            }
        });
        this.findUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const dialogs = yield models_1.DialogModel.find()
                    .or([{ author: userId }, { partner: userId }]);
                const query = req.query.query;
                const users = yield models_1.UserModel.find()
                    .or([{ username: new RegExp(query, "i"), _id: { $ne: userId } }]);
                let usersWithoutDialogs = users;
                if (dialogs.length > 0) {
                    usersWithoutDialogs = [];
                    for (let i = 0; i < users.length; i++) {
                        const userIdd = users[i]._id.toString();
                        const myId = req.user._id.toString();
                        const isDialog = yield models_1.DialogModel.find()
                            .or([
                            { author: myId, partner: userIdd },
                            { author: userIdd, partner: myId },
                        ]);
                        if (isDialog.length > 0) {
                        }
                        else {
                            usersWithoutDialogs.push(users[i]);
                        }
                    }
                }
                res.send(usersWithoutDialogs);
            }
            catch (e) {
                res.status(500).send(e);
            }
        });
        this.delete = (req, res) => {
            try {
                const id = req.params.id;
                const user = models_1.UserModel.findOneAndRemove({ _id: id });
                if (!user || user.lenght === 0) {
                    res.status(404).send({
                        status: "error",
                    });
                }
                res.send({
                    message: `User ${user.firstname} ${user.lastname} deleted`,
                });
            }
            catch (e) {
                res.status(500).send(e);
            }
        };
        this.create = (req, res) => {
            try {
                const postData = {
                    username: req.body.username,
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: req.body.password,
                };
                const errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(422).json({ errors: errors.array() });
                }
                else {
                    const user = new models_1.UserModel(postData);
                    user.save();
                    res.send(user);
                }
            }
            catch (e) {
                res.status(500).send(e);
            }
        };
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postData = {
                email: req.body.email,
                password: req.body.password,
            };
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
            }
            else {
                yield models_1.UserModel.findOne({ email: postData.email }, (err, user) => {
                    if (err || !user) {
                        return res.status(404).json({
                            message: "User not found",
                        });
                    }
                    if (bcrypt_1.default.compareSync(postData.password, user.password)) {
                        const token = utils_1.createJWToken(user);
                        res.json({
                            status: "success",
                            token,
                        });
                    }
                    else {
                        res.status(403).json({
                            status: "error",
                            message: "Incorrect password or email",
                        });
                    }
                });
            }
        });
        this.io = io;
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map