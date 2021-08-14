const mongoose = require("mongoose");
var mongoose_custom_message = require("helper/error.mongoose.validation");

class Model {
  constructor() {
    this.db = mongoose;
    mongoose_custom_message(this.db);
    this.connection = this.db.connection;
  }

  /**
   * Simplify Unique method moongose
   * @param {String} model Model Name
   * @param {String} Obj Find Query
   * @returns
   */
  unique(model, field_name) {
    return {
      validator: async function (v) {
        let Obj = {};
        Obj[field_name] = v;
        let result = await this.db
          .model(model)
          .findOne(Obj)
          .then((data) => !data);
        return result;
      },
      message: this.db.Error.messages.general.unique,
    };
  }

  getFields() {
    let models = this.connection.models;
    let keys = Object.keys(models);

    return Object.keys(this.connection.models[keys[0]].schema.tree);
  }

  getValueForNextSequence(sequenceOfName) {
    var sequenceDoc = db.sample.findAndModify({
      query: {
        _id: sequenceOfName,
      },
      update: {
        $inc: {
          sequence_value: 1,
        },
      },
      new: true,
    });

    return sequenceDoc.sequence_value;
  }
}

module.exports = Model;
