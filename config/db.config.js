const mongoose = require("mongoose");
exports.mongooseConfig = function (config) {
  const collectionName = process.env.MONGODB_COLLECTION || "collection";
  const mongoHost = process.env.MONGODB_HOST || "localhost";
  const mongoPort = process.env.MONGODB_PORT || "27017";

  const mongooseConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  const mongoUrl = `mongodb://${mongoHost}:${mongoPort}/${collectionName}`;
  if (mongoose.connect(mongoUrl, mongooseConnectOptions)) {
    console.log("Connected to DB");
  } else {
    console.log("fail to connect DB");
  }
};
