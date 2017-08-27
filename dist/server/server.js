"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var errorHandler = require("errorhandler");
var mongoose = require("mongoose");
// API
var user_1 = require("./api/user");
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
        this.express.use(cookieParser("giveMeBrain"));
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
        user_1.UserApi.create(router);
        this.express.use("/api", router);
        // enable CORS pre-flight
        router.options("*", cors(corsOptions));
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJCQUE2QjtBQUM3QixpQ0FBbUM7QUFDbkMsK0JBQWlDO0FBQ2pDLHdDQUEwQztBQUMxQyw0Q0FBOEM7QUFDOUMsMkNBQThDO0FBQzlDLG1DQUFzQztBQUV0QyxNQUFNO0FBQ04sbUNBQXFDO0FBRXJDLGtEQUFrRDtBQUNsRDtJQWFDLHNEQUFzRDtJQUN0RDtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQVpEOztPQUVHO0lBQ1csZ0JBQVMsR0FBdkI7UUFDQyxNQUFNLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBU0QsK0JBQStCO0lBQ3ZCLHVCQUFNLEdBQWQ7UUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFNLFFBQVEsR0FBRyxnQ0FBZ0MsQ0FBQztRQUM1QyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDdEMsUUFBUSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3hDLCtFQUErRTtRQUMvRSx5Q0FBeUM7UUFDekMscUJBQXFCO1FBQ3JCLE1BQU07UUFDTixRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQVE7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUVILHlDQUF5QztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQVEsRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7WUFDMUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFFSCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUVsQyxDQUFDO0lBRUQsMEJBQTBCO0lBQ2xCLG9CQUFHLEdBQVg7UUFFQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFOUIsaUJBQWlCO1FBQ2pCLElBQU0sV0FBVyxHQUFxQjtZQUNyQyxjQUFjLEVBQUUsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQztZQUMxRixXQUFXLEVBQUUsSUFBSTtZQUNqQixPQUFPLEVBQUUsd0NBQXdDO1lBQ2pELE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsaUJBQWlCLEVBQUUsS0FBSztTQUN4QixDQUFDO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM5QixlQUFlO1FBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7WUFDdkYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxDQUFDLENBQUM7WUFDbEQsSUFBSSxFQUFFLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztRQUNILG9CQUFvQjtRQUNwQixjQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqQyx5QkFBeUI7UUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBMUVELElBMEVDO0FBMUVZLHdCQUFNIn0=