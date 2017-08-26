import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import mongoose = require("mongoose");

// Creates and configures an ExpressJS web server.
class App {

	// ref to Express instance

	public express: express.Application;

	// Run configuration methods  on the Express instance.
	constructor() {
		this.express = express();
		this.config();
		this.routes();
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
		const connection: mongoose.Connection = mongoose.createConnection(mongoUrl);
		connection.on('error', (err: any) => {
			console.log(err);
		});
	}

	// Configure API endpoints
	private routes(): void {
		/* This is just to get up and running, and to make sure what we've got is
		 * working so far. This function will change when we start to add more
		 * API endpoints */
		let router = express.Router();
		// placeholder route handler
		router.get('/', (req, res, next) => {
			res.json({
				message: 'hello world-test!'
			});
		});
		this.express.use('/', router);
	}
}

export default new App().express;