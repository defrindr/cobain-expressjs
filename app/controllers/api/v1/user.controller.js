let userModel = require("app/model/user.model");
let { generateToken } = require("helper/jwt.auth.handler");
const controllerCore = require("../../../../core/controller.core");
const { Log } = require("../../../middleware/Log.middleware");
const { indexResource } = require("../../../resources/user.resource");

class UserController extends controllerCore {
  constructor() {
    super();

    this._schema = userModel;
    this._model = this._schema.getModel();
  }

  behaviors() {
    return {
      links: {
        index: "",
      },
      methods: {
        post: ["store"],
      },
      middlewares: [
        {
          class: [Log],
        },
      ],
    };
  }

  async actionIndex(req, res, next) {
    let paginates = await this.paginate(req, null, indexResource);

    return res.sendSuccess("Mendapatkan Data", paginates);
  }

  async actionLogin(req, res, next) {
    try {
      let user = await this._model.findOne({
        username: req.body.username,
      });

      if (user) {
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch === true) {
          let token = generateToken({ username: user.username });
          res.sendSuccess({
            success: true,
            message: "Login Sukses",
            token: token,
          });
          return;
        }
      }

      res.sendError(400, "User atau password salah");
      return;
    } catch (err) {
      if (err.errors) {
        err = errorParser(err);
        res.sendError(400, err);
      } else {
        res.sendError(500, err.message);
      }
      return;
    }
  }

  async actionStore(req, res, next) {
    let model = new this._model(req.body);

    try {
      await model.save();
      return res.sendSuccess("User berhasil ditambahkan");
    } catch (err) {
      if (err.errors) {
        err = errorParser(err);
        res.sendError(400, err);
      } else {
        return res.sendError(500, err.message);
      }

      return;
    }
  }

  async actionUpdate(req, res, next) {
    try {
      await this._model.findByIdAndUpdate(request.params.id, request.body);
      await this._model.save();
      res.send(food);
    } catch (error) {
      return res.sendError(400, "Terjadi kesalahan");
    }
  }
}

module.exports = UserController;
