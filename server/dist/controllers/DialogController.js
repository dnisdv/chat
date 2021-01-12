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
class DialogController {
    constructor(io) {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const dialogs = yield models_1.DialogModel.find()
                    .or([{ author: userId }, { partner: userId }])
                    .populate(['author', 'partner'])
                    .populate({
                    path: 'lastMessage',
                    populate: {
                        path: 'user',
                    },
                });
                res.send(dialogs);
            }
            catch (e) {
                res.status(404).send({
                    message: 'Dialogs not found',
                });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postData = {
                author: req.user._id,
                partner: req.body.partner,
                notReadedCount: 0
            };
            try {
                const isDialog = yield models_1.DialogModel.find()
                    .or([
                    { author: req.user._id, partner: req.body.partner },
                    { author: req.body.partner, partner: req.user._id },
                ]);
                if (isDialog.length > 0) {
                    return res.status(200).send({
                        status: 'error',
                        message: 'Такой диалог уже есть',
                    });
                }
                let dialog = new models_1.DialogModel(postData);
                dialog = yield dialog
                    .populate(['author', 'partner'])
                    .populate({
                    path: 'lastMessage',
                    populate: {
                        path: 'user',
                    },
                }).execPopulate();
                dialog.save();
                const message = new models_1.MessageModel({
                    text: req.body.text,
                    user: req.user._id,
                    dialog: dialog._id,
                    attachments: req.files ? req.files : null,
                });
                message.save().then(() => {
                    dialog.lastMessage = message._id;
                    dialog.save().then(() => {
                        res.json(dialog);
                        this.io.emit('SERVER:DIALOG_CREATED', Object.assign(Object.assign({}, postData), { dialog: dialog }));
                    });
                });
            }
            catch (e) {
                res.status(500).send(e);
            }
        });
        this.createVoiceMessage = (req, res) => {
            const postData = {
                author: req.user._id,
                partner: req.body.partner,
            };
            models_1.DialogModel.findOne({
                author: req.user._id,
                partner: req.body.partner,
            }, (err, dialog) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(500).json({
                        status: 'error',
                        message: err,
                    });
                }
                if (dialog) {
                    return res.status(403).json({
                        status: 'error',
                        message: 'Такой диалог уже есть',
                    });
                }
                else {
                    let dialog = new models_1.DialogModel(postData);
                    dialog = yield dialog
                        .populate(['author', 'partner'])
                        .populate({
                        path: 'lastMessage',
                        populate: {
                            path: 'user',
                        },
                    }).execPopulate();
                    dialog
                        .save()
                        .then((dialogObj) => {
                        const message = new models_1.MessageModel({
                            user: req.user._id,
                            dialog: dialogObj._id,
                            audio: req.file ? req.file : null,
                        });
                        message
                            .save()
                            .then(() => {
                            dialogObj.lastMessage = message._id;
                            dialogObj.save().then(() => {
                                res.json(dialogObj);
                                this.io.emit('SERVER:DIALOG_CREATED', Object.assign(Object.assign({}, postData), { dialog: dialogObj }));
                            });
                        })
                            .catch((reason) => {
                            res.json(reason);
                        });
                    })
                        .catch((err) => {
                        res.json({
                            status: 'error',
                            message: err,
                        });
                    });
                }
            }));
        };
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const dialog = models_1.DialogModel.findOneAndRemove({ _id: id });
                if (dialog) {
                    res.send({
                        message: `Dialog deleted`,
                    });
                }
                else {
                    res.send({
                        message: `Dialog not found`,
                    });
                }
            }
            catch (e) {
                res.status(500).send(e);
            }
        });
        this.io = io;
    }
}
exports.default = DialogController;
//# sourceMappingURL=DialogController.js.map