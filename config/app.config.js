var apiResponse = require("core/api.response");
const dotenv = require("dotenv");
let loggerConfig = require("./logger.config.js");
const routeConfig = require("./route.config.js");
const { mongooseConfig } = require("./db.config.js");
const getAllRouter = require("core/get.all.router");
const corsConfig = require("./cors.config.js");
const templateConfig = require("./template.config.js");
const assetConfig = require("./asset.config.js");
const bodyParserConfig = require("./body-parser.config.js");

class App {
  constructor(app) {
    this.app = app;

    this.env();
    this.logger();
    this.db();
    this.cors();
    this.asset();
    this.response();
    this.bodyParser();
    this.route();
    console.log(getAllRouter(this.app));
    this.template();
  }

  // init env
  env() {
    dotenv.config();
  }

  cors() {
    corsConfig(this);
  }

  db() {
    // change this to move to another dbms
    return mongooseConfig();
  }

  // view engine setup
  template() {
    templateConfig(this);
  }

  bodyParser() {
    bodyParserConfig(this);
  }

  route() {
    routeConfig(this);
  }

  asset() {
    assetConfig(this);
  }

  logger() {
    loggerConfig(this);
  }

  response() {
    const { app } = this;
    app.use(apiResponse());
  }
}

module.exports = {
  App,
};
