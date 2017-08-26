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
var mocha_typescript_1 = require("mocha-typescript");
var user_1 = require("../schemas/user");
var mongoose = require("mongoose");
var UserTest = (function () {
    function UserTest() {
        this.data = {
            email: 'anakonda@mail.com',
            password: '11111a'
        };
    }
    UserTest_1 = UserTest;
    UserTest.before = function () {
        // use q promises
        global.Promise = require("q").Promise;
        // use q library for mongoose promises
        mongoose.Promise = global.Promise;
        // connect to mongoose and create model
        var mongoUrl = 'mongodb://localhost:27017/test';
        var connection = mongoose.createConnection(mongoUrl);
        UserTest_1.User = connection.model("User", user_1.userSchema);
        // require chai and use should() assertions
        var chai = require('chai');
        chai.should();
    };
    UserTest.prototype.create = function () {
        var _this = this;
        // create user and return promise
        return new UserTest_1.User(this.data)
            .save()
            .then(function (result) {
            // verify _id property exists
            result._id.should.exist;
            // verify email
            result.email.should.equal(_this.data.email);
            // verify password
            result.password.should.equal(_this.data.password);
        });
    };
    __decorate([
        mocha_typescript_1.test("should create a new user"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserTest.prototype, "create", null);
    UserTest = UserTest_1 = __decorate([
        mocha_typescript_1.suite,
        __metadata("design:paramtypes", [])
    ], UserTest);
    return UserTest;
    var UserTest_1;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL3Rlc3QvdXNlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscURBQStDO0FBRy9DLHdDQUE2QztBQUM3QyxtQ0FBc0M7QUFHdEM7SUEwQkk7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1IsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixRQUFRLEVBQUUsUUFBUTtTQUNyQixDQUFDO0lBQ04sQ0FBQztpQkEvQkMsUUFBUTtJQVFJLGVBQU0sR0FBcEI7UUFDSSxpQkFBaUI7UUFDakIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRXRDLHNDQUFzQztRQUN0QyxRQUFRLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFbEMsdUNBQXVDO1FBRXZDLElBQU0sUUFBUSxHQUFXLGdDQUFnQyxDQUFDO1FBQzFELElBQUksVUFBVSxHQUF3QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUUsVUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFhLE1BQU0sRUFBRSxpQkFBVSxDQUFDLENBQUM7UUFFakUsMkNBQTJDO1FBQzNDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQVVNLHlCQUFNLEdBQWI7UUFEQSxpQkFhQztRQVhHLGlDQUFpQztRQUNqQyxNQUFNLENBQUMsSUFBSSxVQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDOUIsSUFBSSxFQUFFO2FBQ04sSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLDZCQUE2QjtZQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDeEIsZUFBZTtZQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNDLGtCQUFrQjtZQUNsQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFaRDtRQURDLHVCQUFJLENBQUMsMEJBQTBCLENBQUM7Ozs7MENBYWhDO0lBOUNDLFFBQVE7UUFEYix3QkFBSzs7T0FDQSxRQUFRLENBK0NiO0lBQUQsZUFBQzs7Q0FBQSxBQS9DRCxJQStDQyJ9