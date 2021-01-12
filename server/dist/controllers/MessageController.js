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
// import { IDialog } from '../models/Dialog'
class MessageController {
    constructor(io) {
        this.updateReadStatus = (res, userId, dialogId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.MessageModel.updateMany({ dialog: dialogId, user: { $ne: userId } }, { read: true });
                this.io.emit("SERVER:MESSAGES_READED", {
                    userId,
                    dialogId,
                });
            }
            catch (e) {
                res.status(500).json({
                    status: "error",
                    message: e,
                });
            }
        });
        this.updateNotReadCount = (_, userId, dialogId) => __awaiter(this, void 0, void 0, function* () {
            // await DialogModel.findOneAndUpdate(
            //   { _id: dialogId },
            //   { notReadedCount:0 });
            this.io.emit("SERVER:MESSAGES_NOT_READED_COUNT", {
                userId,
                dialogId,
            });
        });
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dialogId = req.query.dialog;
            const userId = req.user._id;
            this.updateReadStatus(res, userId, dialogId);
            // this.updateNotReadCount(res, userId, dialogId)
            try {
                const message = yield models_1.MessageModel.find({ dialog: dialogId })
                    .populate(["dialog", "user", "attachments"]);
                if (message.lenght = 0) {
                    return res.status(404).send({
                        status: "error",
                        message: "Messages not found",
                    });
                }
                res.send(message);
            }
            catch (e) {
                res.status(500).send(e);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            const postData = {
                text: req.body.text,
                dialog: req.body.dialog_id,
                attachments: req.files ? req.files : null,
                user: userId,
            };
            try {
                const message = new models_1.MessageModel(postData);
                // this.updateReadStatus(res, userId, req.body.dialog_id);
                message.save()
                    .then((obj) => {
                    obj.populate("dialog user attachments", (_, message) => __awaiter(this, void 0, void 0, function* () {
                        const unreadCount = yield models_1.MessageModel.countDocuments({ read: false })
                            .or([{ partner: userId }, { user: userId }]);
                        yield models_1.DialogModel.findOneAndUpdate({ _id: postData.dialog }, { lastMessage: message._id, notReadedCount: unreadCount }, { upsert: true });
                        res.send(message);
                        this.io.emit("SERVER:NEW_MESSAGE", message);
                    }));
                });
            }
            catch (e) {
                return res.status(500).send(e);
            }
        });
        this.createVoiceMessage = (req, res) => {
            const userId = req.user._id;
            const postData = {
                dialog: req.body.dialog_id,
                audio: req.file ? req.file : null,
                user: userId,
            };
            const message = new models_1.MessageModel(postData);
            // this.updateReadStatus(res, userId, req.body.dialog_id);
            message
                .save()
                .then((obj) => {
                obj.populate("dialog user", (err, message) => {
                    if (err) {
                        return res.status(500).json({
                            status: "error",
                            message: err,
                        });
                    }
                    models_1.DialogModel.findOneAndUpdate({ _id: postData.dialog }, { lastMessage: message._id }, { upsert: true }, function (err) {
                        if (err) {
                            return res.status(500).json({
                                status: "error",
                                message: err,
                            });
                        }
                    });
                    res.json(message);
                    this.io.emit("SERVER:NEW_MESSAGE", message);
                });
            })
                .catch((reason) => {
                res.json(reason);
            });
        };
        this.delete = (req, res) => {
            const id = req.query.id;
            const userId = req.user._id;
            models_1.MessageModel.findById(id, (err, message) => {
                if (err || !message) {
                    return res.status(404).json({
                        status: "error",
                        message: "Message not found",
                    });
                }
                if (message.user.toString() === userId) {
                    const dialogId = message.dialog;
                    message.remove();
                    models_1.MessageModel.findOne({ dialog: dialogId }, {}, { sort: { created_at: -1 } }, (err, lastMessage) => {
                        if (err) {
                            res.status(500).json({
                                status: "error",
                                message: err,
                            });
                        }
                        models_1.DialogModel.findById(dialogId, (err, dialog) => {
                            if (err) {
                                res.status(500).json({
                                    status: "error",
                                    message: err,
                                });
                            }
                            if (!dialog) {
                                return res.status(404).json({
                                    status: "not found",
                                    message: err,
                                });
                            }
                            dialog.lastMessage = lastMessage ? lastMessage.toString() : "";
                            dialog.save();
                        });
                    });
                    return res.json({
                        status: "success",
                        message: "Message deleted",
                    });
                }
                else {
                    return res.status(403).json({
                        status: "error",
                        message: "Not have permission",
                    });
                }
            });
        };
        this.io = io;
    }
}
exports.default = MessageController;
//# sourceMappingURL=MessageController.js.map