var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var middleware = require('app/middleware/index');
var router = require('routes/index');
var apiResponse = require('core/api.response');
const dotenv = require('dotenv');
const corsDefault = require("cors");
var path = require('path');
const multer = require("multer");
let form_data = multer();

class App {
    constructor(app) {
        this.app = app
    }

    cors() {
        const {
            app
        } = this;

        var corsOptions = {
            "origin": process.env.CORS_ORIGIN || "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 200,
        };

        app.use(corsDefault(corsOptions));
    }

    mongoose() {
        // const mongoUserName = process.env.MONGODB_USERNAME || 'gayatri';
        // const mongoUserPwd = process.env.MONGODB_PASSWORD || 'secret';
        const collectionName = process.env.MONGODB_COLLECTION || 'gayatri';
        const mongoHost = process.env.MONGODB_HOST || 'localhost';
        const mongoPort = process.env.MONGODB_PORT || '27017';

        const mongooseConnectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        };

        const mongoUrl = `mongodb://${mongoHost}:${mongoPort}/${collectionName}`;
        if (mongoose.connect(mongoUrl, mongooseConnectOptions)) {
            console.log("Connected to DB");
        } else {
            console.log("fail to connect DB");
        }
    }

    // init env
    env() {
        dotenv.config();
    }

    // view engine setup
    template() {
        const {
            app
        } = this;

        app.set('views', path.resolve(process.cwd(), 'app/views'));
        app.set('view engine', 'hbs');
    }

    bodyParser() {
        const {
            app
        } = this;

        app.use(express.json());
        app.use(express.urlencoded({
            extended: false
        }));
        app.use(cookieParser());
        app.use(form_data.array());
    }

    route() {
        const {
            app
        } = this;

        // register routes
        app.use('/', router);
        // catch 404 and forward to error handler
        app.use(middleware.notFoundHandler);

        // error handler
        app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }

    asset() {
        const {
            app
        } = this;
        app.use(express.static(path.resolve(process.cwd(), 'public')));
    }

    logger() {
        const {
            app
        } = this;

        app.use(logger('dev'));
    }

    response() {
        const {
            app
        } = this;

        app.use(apiResponse());
    }

}

module.exports = {
    App
}