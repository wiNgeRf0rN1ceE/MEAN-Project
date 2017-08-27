"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// mocha
require("mocha");
var mocha_typescript_1 = require("mocha-typescript");
var server_1 = require("../server");
var user_1 = require("../schemas/user");
// mongoose
var mongoose = require("mongoose");
var http = require("http");
// require chai and use should assertions
var chai = require("chai");
chai.should();
// configure chai-http
chai.use(require("chai-http"));
var UserTest = (function () {
    function UserTest() {
    }
    UserTest_1 = UserTest;
    /**
     * Before all hook
     */
    UserTest.before = function () {
        // connect to MongoDB
        var mongoUrl = 'mongodb://localhost:27017/test';
        mongoose.connect(mongoUrl);
        UserTest_1.User = mongoose.model("User", user_1.userSchema);
        // create http server
        var port = 8001;
        var app = server_1.Server.bootstrap().express;
        app.set("port", port);
        UserTest_1.server = http.createServer(app);
        UserTest_1.server.listen(port);
        return UserTest_1.createUser();
    };
    /**
     * After all hook
     */
    UserTest.after = function () {
        return UserTest_1.user.remove()
            .then(function () {
            return mongoose.disconnect();
        });
    };
    /**
     * Create a test user
     */
    UserTest.createUser = function () {
        var data = {
            email: "winGerf0rn1cee@gmail.com",
            password: "winger12"
        };
        return new UserTest_1.User(data).save().then(function (user) {
            UserTest_1.user = user;
            return user;
        });
    };
    UserTest.prototype.list = function () {
        return chai.request(UserTest_1.server).get(UserTest_1.baseUri).then(function (res) {
            res.should.have.status(200);
            res.body.should.be.an("array");
            res.body.should.have.lengthOf(1);
        });
    };
    UserTest.prototype.post = function () {
        var data = {
            email: "wingerfor1@gmail.com",
            password: "testPost"
        };
        return chai.request(UserTest_1.server).post(UserTest_1.baseUri)
            .send(data)
            .then(function (res) {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.a.property("_id");
            res.body.should.have.property("email").eql(data.email);
            res.body.should.have.property("password").eql(data.password);
            return UserTest_1.User.findByIdAndRemove(res.body._ID).exec();
        });
    };
    // variables
    UserTest.baseUri = "/api/users";
    __decorate([
        mocha_typescript_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserTest.prototype, "list", null);
    __decorate([
        mocha_typescript_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserTest.prototype, "post", null);
    UserTest = UserTest_1 = __decorate([
        mocha_typescript_1.suite
    ], UserTest);
    return UserTest;
    var UserTest_1;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hcGkudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci90ZXN0L3VzZXItYXBpLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxRQUFRO0FBQ1IsaUJBQWU7QUFDZixxREFBK0M7QUFFL0Msb0NBQW1DO0FBS25DLHdDQUE2QztBQUU3QyxXQUFXO0FBQ1gsbUNBQXNDO0FBRXRDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUzQix5Q0FBeUM7QUFDekMsSUFBSSxJQUFJLEdBQW9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFZCxzQkFBc0I7QUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUV4QjtJQUFBO0lBd0ZQLENBQUM7aUJBeEZZLFFBQVE7SUFpQmpCOztPQUVHO0lBQ1csZUFBTSxHQUFwQjtRQUNJLHFCQUFxQjtRQUNyQixJQUFNLFFBQVEsR0FBVyxnQ0FBZ0MsQ0FBQztRQUMxRCxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLFVBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBNkIsTUFBTSxFQUFFLGlCQUFVLENBQUMsQ0FBQztRQUUvRSxxQkFBcUI7UUFDckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksR0FBRyxHQUFHLGVBQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEIsVUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLFVBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElB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