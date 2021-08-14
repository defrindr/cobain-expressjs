class Controller {
  constructor() {
    this._model = null;
  }

  behaviors() {
    return {};
  }

  async paginate(req, model = null, resource = null) {
    const { page = 1, limit = 20 } = req.query;

    model = model ? model : this._model;
    if (resource) {
      model = model.aggregate(resource);
    } else {
      model = model.find({});
    }

    let data = await model
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await this._model.countDocuments();

    return {
      data: data,
      _meta: {
        perPage: parseInt(limit),
        totalData: parseInt(count),
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
      },
    };
  }
}

module.exports = Controller;
