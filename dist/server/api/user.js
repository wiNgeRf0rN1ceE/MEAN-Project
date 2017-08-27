"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var UserApi = (function () {
    function UserApi() {
    }
    /**
     * Create the api
     */
    UserApi.create = function (router) {
        // Delete User by id
        router.delete("/users/:id([0-9a-f]{24})", function (req, res, next) {
            new UserApi().delete(req, res, next);
        });
        // Get all Users
        router.get("/users", function (req, res, next) {
            new UserApi().list(req, res, next);
        });
        // Get User by id
        router.get("/users/:id([0-9a-f]{24})", function (req, res, next) {
            new UserApi().get(req, res, next);
        });
        //  Create User
        router.post("/users", function (req, res, next) {
            new UserApi().create(req, res, next);
        });
        // Update User
        router.put("/users:id([0-9a-f]{24})", function (req, res, next) {
            new UserApi().update(req, res, next);
        });
    };
    UserApi.prototype.create = function (req, res, next) {
        // create User
        var user = new user_1.User(req.body);
        user.save().then(function (user) {
            res.json(user.toObject());
            next();
        }).catch(next);
    };
    UserApi.prototype.delete = function (req, res, next) {
        // verify the id parameter exists
        var paramId = "id";
        if (req.params[paramId] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }
        // get id
        var id = req.params[paramId];
        // get User
        user_1.User.findById(id).then(function (user) {
            // verify User exists
            if (user === null) {
                res.sendStatus(404);
                next();
                return;
            }
            user.remove().then(function () {
                res.sendStatus(200);
                next();
            }).catch(next);
        }).catch(next);
    };
    UserApi.prototype.get = function (req, res, next) {
        // verify the id parameter exists
        var paramId = "id";
        if (req.params[paramId] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }
        // get id
        var id = req.params[paramId];
        // get User
        user_1.User.findById(id).then(function (user) {
            // verify user was found
            if (user === null) {
                res.sendStatus(404);
                next();
                return;
            }
            // send json of user object
            res.json(user.toObject());
            next();
        }).catch(next);
    };
    UserApi.prototype.list = function (req, res, next) {
        // get users
        user_1.User.find().then(function (users) {
            res.json(users.map(function (user) { return user.toObject(); }));
            next();
        }).catch(next);
    };
    UserApi.prototype.update = function (req, res, next) {
        var paramId = "id";
        // verify the if parameter exists
        if (req.params[paramId] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }
        // get id
        var id = req.params[paramId];
        // get user
        user_1.User.findById(id).then(function (user) {
            // verify user was found
            if (user === null) {
                res.sendStatus(404);
                next();
                return;
            }
            // save user
            Object.assign(user, req.body).save().then(function (user) {
                res.json(user.toObject());
                next();
            }).catch(next);
        }).catch(next);
    };
    return UserApi;
}());
exports.UserApi = UserApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hcGkvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVDQUFpRDtBQUVqRDtJQUFBO0lBZ0lBLENBQUM7SUE5SEc7O09BRUc7SUFDVyxjQUFNLEdBQXBCLFVBQXFCLE1BQWM7UUFFL0Isb0JBQW9CO1FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsMEJBQTBCLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1lBQ3RGLElBQUksT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQkFBZ0I7UUFDaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1lBQ2pFLElBQUksT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxpQkFBaUI7UUFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDbkYsSUFBSSxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUVILGVBQWU7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDbEUsSUFBSSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVILGNBQWM7UUFDZCxNQUFNLENBQUMsR0FB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