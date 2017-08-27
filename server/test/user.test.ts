// import { suite, test } from 'mocha-typescript';
// import { IUser } from '../interfaces/user';
// import { IUserModel } from '../models/user';
// import { userSchema } from '../schemas/user';
// import mongoose = require('mongoose');

// @suite
// class UserTest {

//     // store test data
//     private data: IUser;

//     // the User model
//     public static User: mongoose.Model<IUserModel>;

//     public static before() {
//         // use q promises
//         global.Promise = require("q").Promise;

//         // use q library for mongoose promises
//         mongoose.Promise = global.Promise;

//         // connect to mongoose and create model

//         const mongoUrl: string = 'mongodb://localhost:27017/test';
//         let connection: mongoose.Connection = mongoose.createConnection(mongoUrl);
//         UserTest.User = connection.model<IUserModel>("User", userSchema);

//         // require chai and use should() assertions
//         let chai = require('chai');
//         chai.should();
//     }

//     constructor() {
//         this.data = {
//             email: 'anakonda@mail.com',
//             password: '11111a'
//         };
//     }

//     @test("should create a new user")
//     public create() {
//         // create user and return promise
//         return new UserTest.User(this.data)
//             .save()
//             .then(result => {
//                 // verify _id property exists
//                 result._id.should.exist;
//                 // verify email
//                 result.email.should.equal(this.data.email);
//                 // verify password
//                 result.password.should.equal(this.data.password);
//         });
//     }
// }
