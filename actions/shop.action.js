const ShopModel = require('../models/shop.model');

class Shop {
  static async create(req) {
    const { name, description, owner } = req.body;
    const data = new ShopModel({
      name,
      description,
      owner,
    });

    await data.save();

    return data;
  }

  static async all() {
    const data = await ShopModel.find({}).exec();

    return data;
  }

  static hello() {
    return 'Hello Shop!';
  }
}

module.exports = Shop;
