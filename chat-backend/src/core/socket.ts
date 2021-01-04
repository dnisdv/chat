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
      await DialogModel.findOneAndUpdate(
        { _id: data.dialogId, user: { $ne: data.userId } },
        { notReadedCount:0 });

        io.emit("SERVER:MESSAGES_NOT_READED_COUNT", {
          dialogId:data.dialogId,
        });
    })
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
