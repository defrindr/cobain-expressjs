let userModel = require("app/model/user.model");
let { generateToken } = require("helper/jwt.auth.handler");
const controllerCore = require("../../../../core/controller.core");
const { Log } = require("../../../middleware/Log.middleware");
const { indexResource } = require("../../../resources/user.resource");

class UserPeopleController extends controllerCore {
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
    let paginates = await this.paginate(req);

    return res.success("Mendapatkan Data", paginates);
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
          res.success({
            success: true,
            message: "Login Sukses",
            token: token,
          });
          return;
        }
      }

      res.default(400, "User atau password salah");
      return;
    } catch (err) {
      if (err.errors) {
        err = errorParser(err);
        res.default(400, err);
      } else {
        res.default(500, err.message);
      }
      return;
    }
  }

  async actionStore(req, res, next) {
    let model = new this._model(req.body);

    try {
      await model.save();
      return res.success("User berhasil ditambahkan");
    } catch (err) {
      if (err.errors) {
        err = errorParser(err);
        res.default(400, err);
      } else {
        return res.default(500, err.message);
      }

      return;
    }
  }

  async actionUpdate(req, res, next) {
    try {
      await this._model.findByIdAndUpdate(request.params.id, request.body);
      await this._model.save();
      res.default(food);
    } catch (error) {
      return res.default(400, "Terjadi kesalahan");
    }
  }
}

module.exports = UserPeopleController;
