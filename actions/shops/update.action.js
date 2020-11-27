const Shop = require('../../models/shop.model');

class Update {
  constructor(params, updated) {
    this.params = params;
    this.updated = updated;
  }

  async exec() {
    const update = await Shop.findOneAndUpdate(this.params, this.updated, {
      new: true,
    }).exec();

    return update;
  }
}

module.exports = Update;
