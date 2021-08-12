let BaseModel = require("core/model.core");
let bcrypt = require("bcrypt");
let SALT_WORK_FACTOR = 12;
const { email } = require("app/component/validator");

class User extends BaseModel {
  constructor() {
    super();
    this._schema = new this.db.Schema(
      {
        username: {
          type: String,
          trim: true,
          index: true,
          required: true,
          validate: {
            validator: function (v) {
              return this.db
                .model("user")
                .findOne({
                  email: v,
                })
                .then((user) => !user);
            },
            message: this.db.Error.messages.general.unique,
          },
        },
        email: {
          type: String,
          trim: true,
          match: email,
          validate: {
            validator: function (v) {
              return this.db
                .model("user")
                .findOne({
                  email: v,
                })
                .then((user) => !user);
            },
            message: this.db.Error.messages.general.unique,
          },
          index: true,
          required: true,
        },
        password: {
          type: String,
          min: 8,
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );

    this._schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    this._schema.pre("save", function (next) {
      var user = this;

      if (!user.isModified("password")) return next();
      bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
        });
      });
    });

    this._schema.methods.comparePassword = async function (candidatePassword) {
      let isMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(
          candidatePassword,
          this.password,
          function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
          }
        );
      });
      if (isMatch) {
        return true;
      }
      return false;
    };
  }

  getModel() {
    return this.db.model("user", this._schema);
  }
}

module.exports = new User();
