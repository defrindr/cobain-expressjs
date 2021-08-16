let BaseModel = require("core/model.core");

class Role extends BaseModel {
  constructor() {
    super();
    this.tableName = "role";
    this._schema = new this.db.Schema(
      {
        name: {
          type: String,
          trim: true,
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );
  }
}

module.exports = new Role();
