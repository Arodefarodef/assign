import { Document, Schema, model, models } from "mongoose";
import { iUser } from "../interface";

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

const myUserModel = models.user || model<iUserData>("user", userModel);
export default myUserModel;
