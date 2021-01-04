"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const validations_1 = require("../utils/validations");
const path = require("path");
const updateLastSeen_1 = __importDefault(require("../middlewares/updateLastSeen"));
const multer_1 = require("../utils/multer");
const controllers_1 = require("../controllers");
const createRoutes = (app, io) => {
    const UserController = new controllers_1.UserCtrl(io);
    const DialogController = new controllers_1.DialogCtrl(io);
    const MessageController = new controllers_1.MessageCtrl(io);
    app.use("/uploads", express_1.default.static(path.join(__dirname, "../../uploads")));
    app.use("/record", express_1.default.static(path.join(__dirname, "../../record")));
    app.use(body_parser_1.default.json());
    app.use(middlewares_1.checkAuth);
    app.use(updateLastSeen_1.default);
    app.get("/", (_, res) => {
        res.send("Hello, World!");
    });
    app.get("/user/me", UserController.getMe);
    app.post("/user/signup", validations_1.registerValidation, UserController.create);
    app.post("/user/signin", validations_1.loginValidation, UserController.login);
    app.get("/user/find", UserController.findUsers);
    app.get("/user/:id", UserController.show);
    app.delete("/user/:id", UserController.delete);
    app.get("/dialogs", DialogController.index);
    app.delete("/dialogs/:id", DialogController.delete);
    app.post("/dialogs", multer_1.uploadImageMiddleware, DialogController.create);
    app.post("/dialogs/voice", multer_1.uploadRecord, DialogController.createVoiceMessage);
    app.get("/messages", MessageController.index);
    app.post("/messages", multer_1.uploadImageMiddleware, MessageController.create);
    app.delete("/messages", MessageController.delete);
    app.post("/messagevoice", multer_1.uploadRecord, MessageController.createVoiceMessage);
};
exports.default = createRoutes;
//# sourceMappingURL=routes.js.map