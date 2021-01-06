import express from "express";
import bcrypt from "bcrypt";
import socket from "socket.io";
import { validationResult, Result, ValidationError } from "express-validator";

import { UserModel, DialogModel } from "../models";
import { createJWToken } from "../utils";
import { IUser } from "../models/User";

class UserController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  show = async (req: any, res: express.Response): Promise<any> => {
    try{
      const id: string = req.params.id;

      const user = await UserModel.findById(id)
      if(!user || user.length === 0){
        return res.status(404).json({
          message: "User not found",
        }); 
      }
    res.send(user);
    }catch(e){
      res.status(500).send(e)
    }
  };

  getMe = async (req: any, res: express.Response): Promise<any> => {
    try{
      const id: string = req.user && req.user._id;

      const user = await UserModel.findById(id)
        if (!user || user.length ===0 ) {
          return res.status(404).json({
            message: "User not found",
          });
        }
        res.json(user);
    }catch(e){
      res.status(500).send(e)
    }
  };

  findUsers = async (req: any, res: express.Response): Promise<void> => {
    try{
      const userId = req.user._id;

      const dialogs = await DialogModel.find()
        .or([{ author: userId }, { partner: userId }])

      const query: string = req.query.query;

      const users = await UserModel.find()
      .or([{ username: new RegExp(query, "i"), _id: { $ne: userId } }])

      let usersWithoutDialogs = users
      if(dialogs.length > 0){
        usersWithoutDialogs = []  
        
        for(let i = 0 ; i < users.length ; i++ ){
          const userIdd = users[i]._id.toString()
          const myId = req.user._id.toString()

          const isDialog = await DialogModel.find()
          .or([
            { author: myId, partner: userIdd },
            { author: userIdd, partner: myId },
          ])
          if(isDialog.length > 0){
          }else{
            usersWithoutDialogs.push(users[i])
          }
        }
      }
      res.send(usersWithoutDialogs)
    }catch(e){
      res.status(500).send(e)
    }
    
  };

  delete = (req: any, res: express.Response): void => {
    try{
      const id: string = req.params.id;
  
      const user = UserModel.findOneAndRemove({ _id: id })
      if(!user || user.lenght === 0){
        res.status(404).send({
          status: "error",
        });
      }
      res.send({
        message: `User ${user.firstname} ${user.lastname} deleted`,
      });
    }catch(e){
      res.status(500).send(e)
    }
  };
  update = async (req: any,
    res: express.Response): Promise<void> => {
    try{
      const userId = req.user._id
      const user = await UserModel.findOneAndUpdate({_id: userId}, {
        ...req.body,
        ...req.file && {avatar: req.file}  
      },{
        new: true
      })
      user.save()
      res.send(user);
    }catch(e){
      res.status(500).send(e)
    }
  };

  create = (req: any, res: express.Response): void => {
    try{
      const postData: { 
        firstname:string,
        lastname:string
        username:string,
        email: string,
        password: string
       } = {
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
      };
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
      } else {
        const user = new UserModel(postData);
        user.save()
        res.send(user)
      }
    }catch(e){
      res.status(500).send(e)
    }
  };

  login = async (req: any, res: express.Response): Promise<any> => {
    const postData: { email: string; password: string } = {
      email: req.body.email,
      password: req.body.password,
    };

    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      await UserModel.findOne({ email: postData.email }, (err:any, user: IUser) => {
        if (err || !user) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        if (bcrypt.compareSync(postData.password, user.password)) {
          const token = createJWToken(user);
          res.json({
            status: "success",
            token,
          });
        } else {
          res.status(403).json({
            status: "error",
            message: "Incorrect password or email",
          });
        }
      });
    }
  };
}


export default UserController;
