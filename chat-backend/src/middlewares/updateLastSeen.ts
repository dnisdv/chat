import express from 'express';
import { UserModel } from '../models';

export default async (req: express.Request, _: express.Response, next: express.NextFunction) => {
  if (req.user) {
    await UserModel.findOneAndUpdate(
      // @ts-ignore
      { _id: req.user._id },
      {
        last_seen: new Date(),
      },
      { new: true },
    );
  }
  next();
};
