import { Document } from "mongoose";
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {
    // Custom methods for your model would be defined  here
}