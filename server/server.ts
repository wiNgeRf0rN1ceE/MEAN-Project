import * as path from 'path';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import errorHandler = require("errorhandler");
import mongoose = require("mongoose");

// API
import { UserApi } from './api/user';

// Creates and configures an ExpressJS web server.
export class Server {

	// ref to Express instance

	public express: express.Application;

	/**
	 * Bootstrap the Application
	 */
	public static bootstrap(): Server {
		return new Server();
	}

	// Run configuration methods  on the Express instance.
	constructor() {
		this.express = express();
		this.config();
		this.api();
	}

	// Configure Express middleware
	private config(): void {
		this.express.use(logger('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.express.use(cookieParser("giveMeBrain"));
		const mongoUrl = 'mongodb://localhost:27017/test';
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
		// const connection: mongoose.Connection = mongoose.createConnection(mongoUrl);
		// connection.on('error', (err: any) => {
		// 	console.log(err);
		// });
		mongoose.connect(mongoUrl);
		mongoose.connection.on('error', (err: any) => {
			console.log(err);
		});

		// catch 404 and forward to error handler
		this.express.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
			err.status = 404;
			next(err);
		});

		// error handling
		this.express.use(errorHandler());

	}

	// Configure API endpoints
	private api(): void {

		let router = express.Router();

		// configure CORS
		const corsOptions: cors.CorsOptions = {
			allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
			credentials: true,
			methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
			origin: "http://localhost:8080",
			preflightContinue: false
		};
		router.use(cors(corsOptions));
		// root request
		router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
			res.json({ announcement: "Welcome to our API!" });
			next();
		});
		// create API routes
		UserApi.create(router);
		this.express.use("/api", router);
		// enable CORS pre-flight
		router.options("*", cors(corsOptions));
	}
}
