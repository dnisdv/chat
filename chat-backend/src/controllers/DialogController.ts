import express from 'express';
import socket from 'socket.io';


import { DialogModel, MessageModel } from '../models';
import { IDialog } from '../models/Dialog';


class DialogController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (req: any, res: express.Response): Promise<void> => {
    try{
      const userId = req.user._id;

    const dialogs = await DialogModel.find()
      .or([{ author: userId }, { partner: userId }])
      .populate(['author', 'partner'])
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'user',
        },
      });
    res.send(dialogs);

    }catch(e){
      res.status(404).send({
        message: 'Dialogs not found',
      });
    }
  };

  create = async (req: any, res: express.Response) => {
    const postData = {
      author: req.user._id,
      partner: req.body.partner,
      notReadedCount:0
    };

    try {
      const isDialog = await DialogModel.find()
      .or([
        { author: req.user._id, partner:  req.body.partner },
        { author:  req.body.partner, partner: req.user._id },
      ])
      if(isDialog.length > 0){
        return res.status(200).send({
          status: 'error',
          message: 'Такой диалог уже есть',
        });
      }

      let dialog = new DialogModel(postData);
          
      dialog = await dialog      
      .populate(['author', 'partner'])
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'user',
        },
      }).execPopulate()
      dialog.save()

      const message = new MessageModel({
        text: req.body.text,
        user: req.user._id,
        dialog: dialog._id,
        attachments: req.files ? req.files : null,
      });

      message.save().then(() => {
        dialog.lastMessage = message._id;
        dialog.save().then(() => {
          res.json(dialog);
          this.io.emit('SERVER:DIALOG_CREATED', {
            ...postData,
            dialog: dialog,
          });
        });
      })
    } catch(e){
      res.status(500).send(e)
    }
  };

  createVoiceMessage = (req: any, res: express.Response) => {
    const postData = {
      author: req.user._id,
      partner: req.body.partner,
    };

    DialogModel.findOne(
      {
        author: req.user._id,
        partner: req.body.partner,
      },
      async (err:any, dialog:IDialog) => {
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
        } else {
          let dialog = new DialogModel(postData);
          
          dialog = await dialog      
          .populate(['author', 'partner'])
          .populate({
            path: 'lastMessage',
            populate: {
              path: 'user',
            },
          }).execPopulate()
          dialog
            .save()
            .then((dialogObj:any) => {
              const message = new MessageModel({
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
                    this.io.emit('SERVER:DIALOG_CREATED', {
                      ...postData,
                      dialog: dialogObj,
                    });
                  });
                })
                .catch((reason) => {
                  res.json(reason);
                });
            })
            .catch((err:any) => {
              res.json({
                status: 'error',
                message: err,
              });
            });
        }
      },
    );
  }

  delete = async (req: any, res: express.Response): Promise<void> => {
    try{
      const id: string = req.params.id;
      const dialog = DialogModel.findOneAndRemove({ _id: id })

      if(dialog){
        res.send({
          message: `Dialog deleted`,
        });
      }else{
        res.send({
          message: `Dialog not found`,
        });
      }
    }catch(e){
      res.status(500).send(e);
    }
  };
}

export default DialogController;
