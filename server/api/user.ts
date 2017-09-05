import { NextFunction , Response, Request, Router } from "express";
import { User, UserModel } from "../models/user";
import passport = require('passport');
import local = require('passport-local');
import jwt = require('jwt-simple');

export class UserApi {

    /**
     * Create the api
     */
    public static create(router: Router) {

        // Delete User by id
        router.delete("/users/:id([0-9a-f]{24})", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().delete(req, res, next);
        });

        // Get all Users
        router.get("/users", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().list(req, res, next);
        });

        // Get User by id
        router.get("/users/:id([0-9a-f]{24})", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().get(req, res, next);
        });

        //  Create User
        router.post("/users", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().create(req, res, next);
        });

        //  Create User
        router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().signup(req, res, next);
        });

        // Update User
        router.put("/users:id([0-9a-f]{24})", (req: Request, res: Response, next: NextFunction) => {
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
        router.post('/login', (req: Request, res: Response, next: NextFunction) => 
            {
                new UserApi().signIn(req, res, next);
            }, 
            
            
             passport.authenticate('local', { failureRedirect: '/login' }
        ));

        // Logout user
        router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
            new UserApi().logout(req, res, next);
        });

        // Profile user
        router.get('/profile', (req: Request, res: Response, next: NextFunction) => {
            new UserApi().profile(req, res, next);
        })

        // authenticate user
        router.post('/authenticate', (req: Request, res: Response, next: NextFunction) => {
            new UserApi().authenticate(req, res, next);
        })

        // member info
        router.get('/memberinfo',
            (req: Request, res: Response, next: NextFunction) => {
                new UserApi().memberinfo(req, res, next);
        },passport.authenticate('jwt', { session: false }
        ));


    }

    public authenticate(req: Request, res: Response, next: NextFunction) {
        User.findOne({email: req.body.email}).then(user => {
            if (!user) {
                res.send({success: false, msg: 'Authentication failed. User not found'})
            } else {
                let token = jwt.encode(user, "mySecret");
                res.json({success: true, token: 'JWT ' + token})
            }
        }).catch(next);
    }

    public memberinfo(req: Request, res: Response, next: NextFunction) {
        let token = new UserApi().getToken(req.headers);
        if (token) {
            let decoded = jwt.decode(token, 'mySecret');
            User.findOne({email: decoded.email}).then((user) => {
                if (!user) {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found'});
                } else {
                    return res.json({success: true, msg: 'Welcome in the member area' + user.email});
                }
            }).catch(next)
        } else {
            return res.status(403).send({success: false, msg:'No token provided'});
        }
    }


    public getToken(headers) {
        if (headers && headers.authorization) {
            let ported = headers.authorization.split(' ');
            if (ported.length === 2) {
                return ported[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public signup(req: Request, res: Response, next: NextFunction) {
        if ( !req.body.email || !req.body.password) {
            res.json({success: false, msg: 'Please input email and passowrd'});
        } else {
        // create User
        const user  = new User(req.body);
        user.save().then(user => {
            res.json({ success: true, msg: 'Succesful created new user.'});
            next();
        }).catch(next);
        }
    }

    public create(req: Request, res: Response, next: NextFunction) {
        // create User
        const user  = new User(req.body);
        user.save().then(user => {
            res.json(user.toObject());
            next();
        }).catch(next);
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        // verify the id parameter exists
        const paramId: string = "id";
        if (req.params[paramId] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }
        // get id
        const id: string = req.params[paramId];

        // get User
        User.findById(id).then(user => {
            // verify User exists
            if (user === null) {
                res.sendStatus(404);
                next();
                return;
            }
            user.remove().then(() => {
                res.sendStatus(200);
                next();
            }).catch(next);
        }).catch(next);
    }

    public get(req: Request, res: Response, next: NextFunction) {
        // verify the id parameter exists
        const paramId: string = "id";
        if (req.params[paramId] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }

        // get id
        const id: string = req.params[paramId];

        // get User
        User.findById(id).then(user => {
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
    }

    public list(req: Request, res: Response, next: NextFunction) {
        // get users
        User.find().then(users => {
            res.json(users.map(user => user.toObject()));
            next();
        }).catch(next);
    }

    public update(req: Request, res: Response, next: NextFunction) {
        const paramId: string = "id";
        // verify the if parameter exists
        if (req.params[paramId] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }
        // get id
        const id: string = req.params[paramId];
        // get user
        User.findById(id).then(user => {
            // verify user was found
            if (user === null) {
                res.sendStatus(404);
                next();
                return;
            }
            // save user
            Object.assign(user, req.body).save().then((user: UserModel) => {
                res.json(user.toObject());
                next();
            }).catch(next);
        }).catch(next);
    }

    public signIn(req: Request, res: Response, next: NextFunction) {
        User.find().then(users => {
                for (let i = 0; i < users.length; i ++) {
                    let myUser = users[i];
                    if (( myUser.email == req.body.email) && (myUser.password == req.body.password) ) {
                        return res.json({
                            authorization : true
                        })
                    } else {
                        return res.json({
                            authorization: false
                        })
                    }
                }
            });
        // res.json( { auth: 'Authorization'});
        // res.redirect('/');
    }

    public logout(req: Request, res: Response, next: NextFunction) {
        req.logout();
        res.redirect('/');
    }

    public profile(req: Request, res: Response, next: NextFunction) {
        res.json({
            user: req.user
        });
    }

    public findByEmail(email: any, cb: any) {
        process.nextTick(() => {
            User.find().then(users => {
                for (let i = 0; i < users.length; i ++) {
                    let myUser = users[i];
                    if ( myUser.email === email) {
                        return cb(null, myUser);
                    } else {
                        return cb(null, null);
                    }
                }
            });
        });
    }

}