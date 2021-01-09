import express from "express";
import socket from "socket.io";

import { MessageModel, DialogModel } from "../models";
import { IDialog } from "../models/Dialog";
// @ts-ignore
import { IMessage } from "../models/Message";
// import { IDialog } from '../models/Dialog'

class MessageController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  updateReadStatus = async (
    res: express.Response,
    userId: string,
    dialogId: string,
  ) => {
    try{      
      await MessageModel.updateMany(
        { dialog: dialogId, user: { $ne: userId }},
        { read: true });


        this.io.emit("SERVER:MESSAGES_READED", {
          userId,
          dialogId,
        });
        // this.updateNotReadCount(dialogId)

    }catch(e){
      res.status(500).json({
      status: "error",
      message: e,
    });
    }
  };

  updateNotReadCount = async (
    dialogId: string,
  ) => {
    const unreadCount = await MessageModel.countDocuments({read: false, dialog:dialogId})
  
    await DialogModel.findOneAndUpdate(
      { _id: dialogId },
      { notReadedCount:unreadCount },
      { upsert: true });

      this.io.emit("SERVER:MESSAGES_NOT_READED_COUNT", {
        dialogId:dialogId,
        count:unreadCount
      });

  }


  index = async (req: any, res: express.Response): Promise<any> => {

    const dialogId: string = req.query.dialog;
    const userId: string = req.user._id;

    this.updateReadStatus(res, userId, dialogId);
    try{
      const message = await MessageModel.find({ dialog: dialogId })
      .populate(["dialog", "user", "attachments"])

      if(message.lenght = 0){
        return res.status(404).send({
          status: "error",
          message: "Messages not found",
        });
      }
      this.updateNotReadCount(dialogId)
      res.send(message);
    }catch(e){
      res.status(500).send(e);
    }
  };

  create = async (req: any, res: express.Response): Promise<any> => {
    const userId: string = req.user._id;

    const postData = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      attachments: req.files ? req.files : null,
      user: userId,
    };
    try{
      const message = new MessageModel(postData);
      message.save()
      .then((obj: IMessage) => {
        obj.populate(
          "dialog user attachments",
          async (_, message: IMessage) => {
            const unreadCount = await MessageModel.countDocuments({read: false})
                    .or([{ partner: userId }, { user: userId }])
  
            await DialogModel.findOneAndUpdate(
              { _id: postData.dialog },
              { lastMessage: message._id, notReadedCount:unreadCount },
              { upsert: true });
              
            res.send(message);
            this.io.emit("SERVER:NEW_MESSAGE", message);
            // this.updateNotReadCount(postData.dialog);
          }
        )})
    }catch(e){
      return res.status(500).send(e)
    }
  };

  createVoiceMessage = (req:any, res:express.Response) => {
    const userId: string = req.user._id;

    const postData = {
      dialog: req.body.dialog_id,
      audio: req.file ? req.file : null,
      user: userId,
    };
    
    const message = new MessageModel(postData);

    // this.updateReadStatus(res, userId, req.body.dialog_id);

    message
      .save()
      .then((obj: IMessage) => {
        obj.populate(
          "dialog user",
          (err: any, message: IMessage) => {
            if (err) {
              return res.status(500).json({
                status: "error",
                message: err,
              });
            }

            DialogModel.findOneAndUpdate(
              { _id: postData.dialog },
              { lastMessage: message._id },
              { upsert: true },
              function (err) {
                if (err) {
                  return res.status(500).json({
                    status: "error",
                    message: err,
                  });
                }
              }
            );
            res.json(message);

            this.io.emit("SERVER:NEW_MESSAGE", message);
          }
        );
      })
      .catch((reason) => {
        res.json(reason);
      });
  };

  clearHistory = async (req :any, res:express.Response) => {
    try{
      await MessageModel.deleteMany({dialog: req.body.dialogId})
      res.status(200).send();
    }catch(e){
      res.status(500).send(e)
    }
  }

  delete = (req: any, res: express.Response): void => {
    const id: string = req.query.id;
    const userId: string = req.user._id;

    MessageModel.findById(id, (err :any, message: any) => {
      if (err || !message) {
        return res.status(404).json({
          status: "error",
          message: "Message not found",
        });
      }

      if (message.user.toString() === userId) {
        const dialogId = message.dialog;
        message.remove();

        MessageModel.findOne(
          { dialog: dialogId },
          {},
          { sort: { created_at: -1 } },
          (err, lastMessage) => {
            if (err) {
              res.status(500).json({
                status: "error",
                message: err,
              });
            }

            DialogModel.findById(dialogId, (err:any, dialog:IDialog) => {
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
          }
        );

        return res.json({
          status: "success",
          message: "Message deleted",
        });
      } else {
        return res.status(403).json({
          status: "error",
          message: "Not have permission",
        });
      }
    });
  };
}

export default MessageController;
