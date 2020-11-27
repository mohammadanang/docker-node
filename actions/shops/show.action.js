const Shop = require('../../models/shop.model');

class ShowShop {
  constructor(id) {
    this.id = id;
  }

  async exec() {
    const query = await Shop.findOne({
      _id: this.id,
    }).exec();

    if (query === null) {
      throw new Error('Shop not found');
    }

    return query;
  }
}

module.exports = ShowShop;
