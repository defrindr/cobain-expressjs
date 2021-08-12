class Controller {
  constructor() {
    this._model = null;
  }

  async paginate(query = {}, page = 1, limit = 20) {
    let data = await this._model
      .find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await this._model.countDocuments();

    return {
      data: data,
      _meta: {
        perPage: limit,
        totalData: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
      },
    };
  }
}

module.exports = Controller;
