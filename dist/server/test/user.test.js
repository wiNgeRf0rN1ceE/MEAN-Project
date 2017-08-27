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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL3Rlc3QvdXNlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtEQUFrRDtBQUNsRCw4Q0FBOEM7QUFDOUMsK0NBQStDO0FBQy9DLGdEQUFnRDtBQUNoRCx5Q0FBeUM7QUFFekMsU0FBUztBQUNULG1CQUFtQjtBQUVuQix5QkFBeUI7QUFDekIsMkJBQTJCO0FBRTNCLHdCQUF3QjtBQUN4QixzREFBc0Q7QUFFdEQsK0JBQStCO0FBQy9CLDRCQUE0QjtBQUM1QixpREFBaUQ7QUFFakQsaURBQWlEO0FBQ2pELDZDQUE2QztBQUU3QyxrREFBa0Q7QUFFbEQscUVBQXFFO0FBQ3JFLHFGQUFxRjtBQUNyRiw0RUFBNEU7QUFFNUUsc0RBQXNEO0FBQ3RELHNDQUFzQztBQUN0Qyx5QkFBeUI7QUFDekIsUUFBUTtBQUVSLHNCQUFzQjtBQUN0Qix3QkFBd0I7QUFDeEIsMENBQTBDO0FBQzFDLGlDQUFpQztBQUNqQyxhQUFhO0FBQ2IsUUFBUTtBQUVSLHdDQUF3QztBQUN4Qyx3QkFBd0I7QUFDeEIsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5QyxzQkFBc0I7QUFDdEIsZ0NBQWdDO0FBQ2hDLGdEQUFnRDtBQUNoRCwyQ0FBMkM7QUFDM0Msa0NBQWtDO0FBQ2xDLDhEQUE4RDtBQUM5RCxxQ0FBcUM7QUFDckMsb0VBQW9FO0FBQ3BFLGNBQWM7QUFDZCxRQUFRO0FBQ1IsSUFBSSJ9