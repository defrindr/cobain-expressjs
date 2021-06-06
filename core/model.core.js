const mongoose = require("mongoose");
var mongoose_custom_message = require('helper/error.mongoose.validation');

class Model {
    constructor() {
        this.db = mongoose;
        mongoose_custom_message(this.db);
        this.connection = this.db.connection;
        // this._db = this;
    }

    getFields() {
        let models = this.connection.models;
        let keys = Object.keys(models);
        
        return Object.keys(this.connection.models[keys[0]].schema.tree);
    }

    getValueForNextSequence(sequenceOfName) {
        var sequenceDoc = db.sample.findAndModify({
            query: {
                _id: sequenceOfName
            },
            update: {
                $inc: {
                    sequence_value: 1
                }
            },
            new: true
        });

        return sequenceDoc.sequence_value;
    }
}

module.exports = Model;