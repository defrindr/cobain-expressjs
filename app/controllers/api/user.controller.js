let userModel = require("app/model/user.model");
let {
    indexResource,
    viewResource
} = require("app/resource/user.resource");

class User {
    constructor() {
        this._schema = userModel;
        this._model = this._schema.getModel();
    }

    async index(req, res, next) {
        let users = await this._model.find({}, viewResource);

        return res.success("Mendapatkan Data", users);
    }

    async view(req, res, next) {
        try {
            let user = await this._model.findOne({
                username: req.body.username
            });
            let isMatch = await user.comparePassword(req.body.password);

            if (isMatch) {
                return res.sendSuccess({
                    success: true,
                    message: "Login Sukses",
                    token: "token"
                });
            }
            res.sendError(400, "User / Password Invalid");
        } catch (err) {
            res.sendError(400, errorParser(err));
            return;
        }
    }

    async store(req, res, next) {
        let model = new this._model(req.body);

        try {
            await model.save();
        } catch (err) {
            res.sendError(400, errorParser(err));
            return;
        }

        return res.sendSuccess({
            success: true,
            message: "Data berhasil disimpan"
        });
    }

    async update(req, res, next) {
        try {
            await this._model.findByIdAndUpdate(request.params.id, request.body);
            await this._model.save();
            res.send(food);
        } catch (error) {
            return res.sendError(400, "Terjadi kesalahan");
        }
    }
}

module.exports = new User;