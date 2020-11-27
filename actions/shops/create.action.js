const Shop = require('../../models/shop.model');

class CreateShop {
  constructor(req) {
    this.name = req.body.name;
    this.description = req.body.description;
    this.owner = req.body.owner;
  }

  async exec() {
    const query = new Shop({
      name: this.name,
      description: this.description,
      owner: this.owner,
    });
    await query.save();

    return query;
  }
}

module.exports = CreateShop;
