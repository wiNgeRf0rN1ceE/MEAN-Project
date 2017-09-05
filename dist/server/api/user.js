"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var passport = require("passport");
var jwt = require("jwt-simple");
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
        //  Create User
        router.post("/signup", function (req, res, next) {
            new UserApi().signup(req, res, next);
        });
        // Update User
        router.put("/users:id([0-9a-f]{24})", function (req, res, next) {
            new UserApi().update(req, res, next);
        });
        // passport
        // passport.use( new local.Strategy(
        //     (email, password, cb) => {
        //         new UserApi().findByEmail(email, (err, user) => {
        //             if (err) { return cb(err); }
        //             if (!user) { return cb(null, false); }
        //             if (user.password != password) { return cb(null, false); }
        //             return cb(null, user);
        //         });
        //     }
        // ));
        // passport.serializeUser(function(user, cb) {
        //     cb(null, user.id)
        // });
        // passport.deserializeUser(function(id, cb) {
        // })
        // SignIn user
        router.post('/login', function (req, res, next) {
            new UserApi().signIn(req, res, next);
        }, passport.authenticate('local', { failureRedirect: '/login' }));
        // Logout user
        router.get('/logout', function (req, res, next) {
            new UserApi().logout(req, res, next);
        });
        // Profile user
        router.get('/profile', function (req, res, next) {
            new UserApi().profile(req, res, next);
        });
        // authenticate user
        router.post('/authenticate', function (req, res, next) {
            new UserApi().authenticate(req, res, next);
        });
        // member info
        router.get('/memberinfo', function (req, res, next) {
            new UserApi().memberinfo(req, res, next);
        }, passport.authenticate('jwt', { session: false }));
    };
    UserApi.prototype.authenticate = function (req, res, next) {
        user_1.User.findOne({ email: req.body.email }).then(function (user) {
            if (!user) {
                res.send({ success: false, msg: 'Authentication failed. User not found' });
            }
            else {
                var token = jwt.encode(user, "mySecret");
                res.json({ success: true, token: 'JWT ' + token });
            }
        }).catch(next);
    };
    UserApi.prototype.memberinfo = function (req, res, next) {
        var token = new UserApi().getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, 'mySecret');
            user_1.User.findOne({ email: decoded.email }).then(function (user) {
                if (!user) {
                    return res.status(403).send({ success: false, msg: 'Authentication failed. User not found' });
                }
                else {
                    return res.json({ success: true, msg: 'Welcome in the member area' + user.email });
                }
            }).catch(next);
        }
        else {
            return res.status(403).send({ success: false, msg: 'No token provided' });
        }
    };
    UserApi.prototype.getToken = function (headers) {
        if (headers && headers.authorization) {
            var ported = headers.authorization.split(' ');
            if (ported.length === 2) {
                return ported[1];
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    UserApi.prototype.signup = function (req, res, next) {
        if (!req.body.email || !req.body.password) {
            res.json({ success: false, msg: 'Please input email and passowrd' });
        }
        else {
            // create User
            var user = new user_1.User(req.body);
            user.save().then(function (user) {
                res.json({ success: true, msg: 'Succesful created new user.' });
                next();
            }).catch(next);
        }
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
    UserApi.prototype.signIn = function (req, res, next) {
        user_1.User.find().then(function (users) {
            for (var i = 0; i < users.length; i++) {
                var myUser = users[i];
                if ((myUser.email == req.body.email) && (myUser.password == req.body.password)) {
                    return res.json({
                        authorization: true
                    });
                }
                else {
                    return res.json({
                        authorization: false
                    });
                }
            }
        });
        // res.json( { auth: 'Authorization'});
        // res.redirect('/');
    };
    UserApi.prototype.logout = function (req, res, next) {
        req.logout();
        res.redirect('/');
    };
    UserApi.prototype.profile = function (req, res, next) {
        res.json({
            user: req.user
        });
    };
    UserApi.prototype.findByEmail = function (email, cb) {
        process.nextTick(function () {
            user_1.User.find().then(function (users) {
                for (var i = 0; i < users.length; i++) {
                    var myUser = users[i];
                    if (myUser.email === email) {
                        return cb(null, myUser);
                    }
                    else {
                        return cb(null, null);
                    }
                }
            });
        });
    };
    return UserApi;
}());
exports.UserApi = UserApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hcGkvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUFpRDtBQUNqRCxtQ0FBc0M7QUFFdEMsZ0NBQW1DO0FBRW5DO0lBQUE7SUE4UkEsQ0FBQztJQTVSRzs7T0FFRztJQUNXLGNBQU0sR0FBcEIsVUFBcUIsTUFBYztRQUUvQixvQkFBb0I7UUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDdEYsSUFBSSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVILGdCQUFnQjtRQUNoQixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDakUsSUFBSSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVILGlCQUFpQjtRQUNqQixNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtZQUNuRixJQUFJLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtZQUNsRSxJQUFJLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FB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