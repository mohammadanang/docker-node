class Action {
  constructor(model) {
    this.model = model;
  }

  async list(params) {
    const data = await this.model.find(params).exec();

    return data;
  }

  async create(data) {
    const Model = this.model;
    const result = new Model(data);
    await result.save();

    return result;
  }
}

module.exports = Action;
