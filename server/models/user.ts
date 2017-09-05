import mongoose = require("mongoose");
import { Document, Model } from "mongoose";
import { IUser } from "../interfaces/user";
import { userSchema } from "../schemas/user";

export interface UserModel extends IUser, Document {
    // Custom methods for your model would be defined  here

}

export interface UserModelStatic extends Model<UserModel> {}

export const User = mongoose.model<UserModel, UserModelStatic>("User", userSchema);