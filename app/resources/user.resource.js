let indexResource = [
  {
    $project: {
      username: 1,
      createdAt: {
        $dateToString: {
          format: "%d/%m/%Y",
          date: "$createdAt",
        },
      },
    },
  },
];

let viewResource = {};

exports.indexResource = indexResource;
exports.viewResource = viewResource;
