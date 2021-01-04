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
const socket = require('socket.io');
const models_1 = require("../models");
exports.default = (http) => {
    const io = socket(http, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', function (socket) {
        socket.on('DIALOGS:JOIN', (dialogId) => {
            socket.dialogId = dialogId;
            socket.join(dialogId);
        });
        socket.on("updateNotReadCount", (data) => __awaiter(this, void 0, void 0, function* () {
            yield models_1.DialogModel.findOneAndUpdate({ _id: data.dialogId, user: { $ne: data.userId } }, { notReadedCount: 0 });
            io.emit("SERVER:MESSAGES_NOT_READED_COUNT", {
                dialogId: data.dialogId,
            });
        }));
        socket.on("udateReadStatus", (data) => __awaiter(this, void 0, void 0, function* () {
            const { dialogId, userId } = data;
            try {
                yield models_1.MessageModel.updateMany({ dialog: dialogId, user: { $ne: userId } }, { read: true });
                io.emit("SERVER:MESSAGES_READED", {
                    userId,
                    dialogId,
                });
            }
            catch (e) {
                return ({
                    status: "error",
                    message: e,
                });
            }
        }));
        socket.on('DIALOGS:TYPING', (obj) => {
            socket.broadcast.emit('DIALOGS:TYPING', obj);
        });
        socket.on("disconnect", () => {
        });
    });
    return io;
};
//# sourceMappingURL=socket.js.map