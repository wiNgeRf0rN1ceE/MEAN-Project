"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var errorHandler = require("errorhandler");
var mongoose = require("mongoose");
var passport = require("passport");
var jwtStrategy = require("passport-jwt");
var user_1 = require("./models/user");
// API
var user_2 = require("./api/user");
// Creates and configures an ExpressJS web server.
var Server = (function () {
    // Run configuration methods  on the Express instance.
    function Server() {
        this.express = express();
        this.config();
        this.api();
    }
    /**
     * Bootstrap the Application
     */
    Server.bootstrap = function () {
        return new Server();
    };
    // Configure Express middleware
    Server.prototype.config = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser("mySecret"));
        this.express.use(session({
            secret: 'mySecret',
            resave: false,
            saveUninitialized: true
        }));
        var mongoUrl = 'mongodb://localhost:27017/test';
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
        // const connection: mongoose.Connection = mongoose.createConnection(mongoUrl);
        // connection.on('error', (err: any) => {
        // 	console.log(err);
        // });
        mongoose.connect(mongoUrl);
        mongoose.connection.on('error', function (err) {
            console.log(err);
        });
        // let opts: any = {
        // 	jwtFromRequest: "mySecret"
        // };
        var opts = {
            "secretOrKey": "mySecret",
            "jwtFromRequest": "jwt"
        };
        var ExtractJwt = jwtStrategy.ExtractJwt;
        passport.use(new jwtStrategy.Strategy(opts, function (jwt_payload, done) {
            user_1.User.findOne({ id: jwt_payload.id }, function (err, user) {
                if (err)
                    return done(err, false);
                if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            });
        }));
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
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        // catch 404 and forward to error handler
        this.express.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        // error handling
        this.express.use(errorHandler());
    };
    // Configure API endpoints
    Server.prototype.api = function () {
        var router = express.Router();
        // configure CORS
        var corsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "http://localhost:8080",
            preflightContinue: false
        };
        router.use(cors(corsOptions));
        // root request
        router.get("/", function (req, res, next) {
            res.json({ announcement: "Welcome to our API!" });
            next();
        });
        // create API routes
        user_2.UserApi.create(router);
        this.express.use("/api", router);
        // enable CORS pre-flight
        router.options("*", cors(corsOptions));
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJCQUE2QjtBQUM3QixpQ0FBbUM7QUFDbkMsK0JBQWlDO0FBQ2pDLHdDQUEwQztBQUMxQyw0Q0FBOEM7QUFDOUMseUNBQTRDO0FBQzVDLDJDQUE4QztBQUM5QyxtQ0FBc0M7QUFDdEMsbUNBQXNDO0FBQ3RDLDBDQUE2QztBQUU3QyxzQ0FBZ0Q7QUFFaEQsTUFBTTtBQUNOLG1DQUFxQztBQUVyQyxrREFBa0Q7QUFDbEQ7SUFhQyxzREFBc0Q7SUFDdEQ7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFaRDs7T0FFRztJQUNXLGdCQUFTLEdBQXZCO1FBQ0MsTUFBTSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQVNELCtCQUErQjtJQUN2Qix1QkFBTSxHQUFkO1FBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLE1BQU0sRUFB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