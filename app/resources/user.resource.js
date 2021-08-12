let indexResource = {
    password:0,
    birthDate: {
        $dateToString: {
          format: "%d/%m/%Y",
          date: "$createdAt"
        }
      }
};

let viewResource = {};

exports.indexResource = indexResource;
exports.viewResource = viewResource;