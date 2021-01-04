"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageMiddleware = exports.uploadRecord = exports.imageStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const fs = require("fs");
exports.imageStorage = multer_1.default.diskStorage({
    destination: function (req, _, callback) {
        const topdir = "./uploads";
        var dir = `./uploads/${req.ui}`;
        try {
            if (!fs.existsSync(topdir)) {
                fs.mkdirSync(topdir);
            }
        }
        catch (err) {
            console.error(err);
        }
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
        }
        catch (err) {
        }
        callback(null, dir);
    },
    filename: function (_, file, callback) {
        let name = file.originalname + "." + "jpg";
        if (file.mimetype === "image/jpeg") {
            name = file.originalname + "." + "jpg";
        }
        else if (file.mimetype === "image/png") {
            name = file.originalname + "." + "png";
        }
        callback(null, name);
    },
});
const Recordstorage = multer_1.default.diskStorage({
    destination: function (_2, _, callback) {
        const topdir = "./record";
        var dir = `./record`;
        try {
            if (!fs.existsSync(topdir)) {
                fs.mkdirSync(topdir);
            }
        }
        catch (err) {
            console.error(err);
        }
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
        }
        catch (err) {
            console.error(err);
        }
        callback(null, dir);
    },
    filename: function (_, file, callback) {
        let name = file.originalname + Date.now() + "." + "mp3";
        callback(null, name);
    },
});
var uploadImage = multer_1.default({ dest: "./uploads", storage: exports.imageStorage }).array("photos", 12);
exports.uploadRecord = multer_1.default({ dest: "./record", storage: Recordstorage }).single('record');
const uploadImageMiddleware = (req, res, next) => {
    req.ui = Date.now();
    uploadImage(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        next();
    });
};
exports.uploadImageMiddleware = uploadImageMiddleware;
//# sourceMappingURL=multer.js.map