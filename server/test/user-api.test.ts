// mocha
import "mocha";
import { suite, test } from "mocha-typescript";

import { Server } from "../server";

// model
import { IUser } from "../interfaces/user";
import { UserModel, UserModelStatic } from "../models/user";
import { userSchema } from "../schemas/user";

// mongoose
import mongoose = require("mongoose");

let http = require("http");

// require chai and use should assertions
let chai: Chai.ChaiStatic = require("chai");
chai.should();

// configure chai-http
chai.use(require("chai-http"));

@suite class UserTest {
    // variables
    public static baseUri: string = "/api/users";

    // the mongoose connection
    public static connection: mongoose.Connection;

    // user model
    public static User: UserModelStatic;

    // user document
    public static user: UserModel;

    // the http server

    public static server: any;

    /**
     * Before all hook
     */
    public static before() {
        // connect to MongoDB
        const mongoUrl: string = 'mongodb://localhost:27017/test';
        mongoose.connect(mongoUrl);
        UserTest.User = mongoose.model<UserModel, UserModelStatic>("User", userSchema);

        // create http server
        let port = 8001;
        let app = Server.bootstrap().express;
        app.set("port", port);
        UserTest.server = http.createServer(app);
        UserTest.server.listen(port);

        return UserTest.createUser();

    }

    /**
     * After all hook
     */
    public static after() {
        return UserTest.user.remove()
            .then(() => {
                return mongoose.disconnect();
            });
    }


    /**
     * Create a test user
     */
    public static createUser(): any {
        const data: IUser = {
            email: "winGerf0rn1cee@gmail.com",
            password: "winger12"
        };
        return new UserTest.User(data).save().then(user => {
            UserTest.user = user;
            return user;
        })
    }

    @test public list() {
        return chai.request(UserTest.server).get(UserTest.baseUri).then(res => {
            res.should.have.status(200);
            res.body.should.be.an("array");
            res.body.should.have.lengthOf(1);
        });
    }

    @test public post() {
        const data: IUser = {
            email: "wingerfor1@gmail.com",
            password: "testPost"
        };
        return chai.request(UserTest.server).post(UserTest.baseUri)
            .send(data)
            .then(res => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.a.property("_id");
                res.body.should.have.property("email").eql(data.email);
                res.body.should.have.property("password").eql(data.password);
                return UserTest.User.findByIdAndRemove(res.body._ID).exec();
            });
    }


}