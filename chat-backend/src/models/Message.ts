import mongoose, { Schema, Document } from "mongoose";
import { IDialog } from "./Dialog";
import { IUser } from "./User";

export interface IMessage extends Document {
  text: string;
  dialog: IDialog | string;
  read: boolean;
  user: IUser | string,
  audio:{
    path:{
      type:string,
    },
    filename:{
      type: string
    }
  }
}

const MessageSchema = new Schema(
  {
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: "Dialog", required:true },
    user: { type: Schema.Types.ObjectId, ref: "User", required:true},
    read: {
      type: Boolean,
      default: false,
    },
    attachments: [{ 
      path:{
        type:String
      },
      filename:{
        type:String
      }
    }
  ],
  audio:{
    path:{
      type:String,
    },
    filename:{
      type: String
    }
  }
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
