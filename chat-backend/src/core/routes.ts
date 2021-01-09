import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";
import { checkAuth } from "../middlewares";
import { loginValidation, registerValidation } from "../utils/validations";
const path = require("path");
import updateLastSeen from '../middlewares/updateLastSeen'
import { uploadImageMiddleware, uploadRecord, uploadAvatar } from '../utils/multer'
import {
  UserCtrl,
  DialogCtrl,
  MessageCtrl,
} from "../controllers";


const createRoutes = (app: express.Express, io: socket.Server) => {
  const UserController = new UserCtrl(io);
  const DialogController = new DialogCtrl(io);
  const MessageController = new MessageCtrl(io);
  
  app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
  app.use("/record", express.static(path.join(__dirname, "../../record")));
  app.use("/avatar", express.static(path.join(__dirname, "../../avatar")));


  app.use(bodyParser.json());
  app.use(checkAuth);
  app.use(updateLastSeen);

  app.get("/", (_: any, res: express.Response) => {
    res.send("Hello, World!");
  });

  app.get("/user/me", UserController.getMe);
  app.post("/user/signup", registerValidation, UserController.create);
  app.post("/user/signin", loginValidation, UserController.login);
  app.get("/user/find", UserController.findUsers);
  app.get("/user/:id", UserController.show);
  app.delete("/user/:id", UserController.delete); 
  app.put("/user/update", uploadAvatar, UserController.update)


  app.get("/dialogs",  DialogController.index);
  app.delete("/dialogs/:id", DialogController.delete);
  app.post("/dialogs", uploadImageMiddleware, DialogController.create);
  app.post("/dialogs/voice", uploadRecord, DialogController.createVoiceMessage)

  app.get("/messages", MessageController.index);
  app.post("/messages", uploadImageMiddleware ,  MessageController.create);
  app.delete("/messages",  MessageController.delete);
  app.post("/messagevoice", uploadRecord, MessageController.createVoiceMessage)
  app.delete("/messages/clearhistory", MessageController.clearHistory)

};

export default createRoutes;
