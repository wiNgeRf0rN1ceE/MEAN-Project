import { Schema } from "mongoose";
import bcrypt = require('bcrypt');

export const userSchema: Schema = new Schema({
    email: String,
    password: String
});

userSchema.pre('save', (next) => {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err)
                return next(err);
            bcrypt.hash(user.password, salt, (err,hash) => {
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword =  (pass, cb) => {
    bcrypt.compare(pass, this.password, (err, isMatch) => {
        if (err) 
            return cb(err);
        cb(null, isMatch);
    });
};