const socket = require('socket.io');
import http from 'http';
import {DialogModel, MessageModel} from '../models'

export default (http: http.Server) => {
  const io = socket(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }}
  );

  io.on('connection', function(socket: any) {
      socket.on('DIALOGS:JOIN', (dialogId: string) => {
      socket.dialogId = dialogId;
      socket.join(dialogId);
    });
    socket.on("updateNotReadCount", async (data:any) =>{
      const unreadCount = await MessageModel.countDocuments({read: false, dialog:data.dialogId})
  
      await DialogModel.updateMany(
        { _id: data.dialogId },
        { notReadedCount:unreadCount },
        { upsert: true });

        io.emit("SERVER:MESSAGES_NOT_READED_COUNT", {
          dialogId:data.dialogId,
          count:unreadCount
        });
    });
    socket.on("udateReadStatus", async (data:any) => {
      const {dialogId, userId} = data
      try{
        await MessageModel.updateMany(
          { dialog: dialogId, user: { $ne: userId }},
          { read: true  });
    
          io.emit("SERVER:MESSAGES_READED", {
            userId,
            dialogId,
          });
          const unreadCount = await MessageModel.countDocuments({read: false, dialog:dialogId})
          await DialogModel.updateMany(
            { _id: dialogId },
            { notReadedCount:unreadCount },
            { upsert: true });
    
            io.emit("SERVER:MESSAGES_NOT_READED_COUNT", {
              dialogId:data.dialogId,
              count:unreadCount

            });
    
        }catch(e){
          return ({
          status: "error",
          message: e,
        });
        }
    })
    socket.on('DIALOGS:TYPING', (obj: any) => {
      socket.broadcast.emit('DIALOGS:TYPING', obj);
    });
    socket.on("disconnect", () => {
    })
  });

  return io;
};
