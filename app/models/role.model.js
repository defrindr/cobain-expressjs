let BaseModel = require('core/model.core');

class Role extends BaseModel {
  constructor() {
    super();
    
    this._schema = new this.db.Schema({
      name: {
        type: String,
        trim: true,
        required: true
      },
    }, {
      timestamps: true
    })


    this._schema.method("toJSON", function () {
      const {
        __v,
        _id,
        ...object
      } = this.toObject();
      object.id = _id;
      return object;
    });
  }

  getModel() {
    return this.db.model('role', this._schema);
  }
}

module.exports = new Role();