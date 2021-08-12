let userModel = require("app/model/user.model");
let {
    indexResource,
    viewResource
} = require("app/resource/user.resource");
let {
    generateToken
} = require('helper/jwt.auth.handler');
const controllerCore = require("../../../core/controller.core");


class User extends controllerCore {
    constructor() {
        super();
        
        this._schema = userModel;
        this._model = this._schema.getModel();
    }

    async index(req, res, next) {
        const { page = 1, limit = 20 } = req.query;

        let paginates = await this.paginate({}, page, limit);

        return res.sendSuccess("Mendapatkan Data", paginates);
    }

    async view(req, res, next) {
        try {
            let user = await this._model.findOne({
                username: req.body.username
            });

            if (user) {
                let isMatch = await user.comparePassword(req.body.password);
                if (isMatch === true) {
                    let token = generateToken({username: user.username});
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
            if(err.errors){
                err=errorParser(err);
                res.sendError(400, err);
            }else{
                res.sendError(500, (process.env.IS_DEBUG.toLowerCase()=='true') ? err.message : "Telah terjadi kesalahan");
            }
            return;
        }
    }

    async store(req, res, next) {
        let model = new this._model(req.body);

        try {
            await model.save();
        } catch (err) {
            if(err.errors){
                err=errorParser(err);
                res.sendError(400, err);
            }else{
                res.sendError(500, (process.env.IS_DEBUG.toLowerCase()=='true') ? err.message : "Telah terjadi kesalahan");
            }

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