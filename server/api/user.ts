import { NextFunction , Response, Request, Router } from "express";

import { User, UserModel } from "../models/user";

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

        // Update User
        router.put("/users:id([0-9a-f]{24})", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().update(req, res, next);
        });

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
}