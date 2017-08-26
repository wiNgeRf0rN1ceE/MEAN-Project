import { Schema } from "mongoose";

export const userSchema: Schema = new Schema({
    email: String,
    password: String
});