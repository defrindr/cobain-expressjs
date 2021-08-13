var express = require("express");
var router = express.Router();
var controller = require("app/controller/api/user.controller");
const { authHandler } = require("../../middleware");

/* GET users listing. */
router.get("/", authHandler, (req, res, next) =>
  controller.index(req, res, next)
);

/* GET users listing. */
router.options("/lorem/ipsum", (req, res, next) =>
  controller.index(req, res, next)
);

router.post("/login", (req, res, next) => controller.view(req, res, next));

router.post("/", (req, res, next) => controller.store(req, res, next));

module.exports = router;
