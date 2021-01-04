import mongoose, { Schema, Document } from "mongoose";
const { isEmail } = require("validator");
import { generatePasswordHash } from "../utils";
import {differenceInMinutes, parseISO} from "date-fns";

export interface IUser extends Document {
  _id:string,
  username:string,
  email: string,
  firstname: string,
  lastname:string,
  password: string,
  confirmed: boolean,
  avatar: string,
  confirm_hash: string,
  last_seen: Date,
  data?: IUser,
}

const UserSchema: Schema = new Schema(
  {
    username:{
      type: String,
      require: "Username is required",
      unique: true,
    },
    email: {
      type: String,
      require: "Email address is required",
      validate: [isEmail, "Invalid email"],
      unique: true,
    },
    firstname: {
      type: String,
      required: "Firstname is required",
    },
    lastname: {
      type: String,
      required: "Lastname is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },

    avatar: String,
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("isOnline").get(function (this: any) {
  return differenceInMinutes(new Date(), parseISO(this.last_seen)) < 5;
});

UserSchema.set("toJSON", {
  virtuals: true,
});

UserSchema.pre<IUser>("save", async function (next:any) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await generatePasswordHash(user.password);
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
