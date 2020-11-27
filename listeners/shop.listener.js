/* eslint no-underscore-dangle: 0 */
const UpdateShop = require('../actions/shops/update.action');
const ShowShop = require('../actions/shops/show.action');

const shop = {
  add_qty: async (data) => {
    const _id = data.shop_id;
    const new_shop = await new ShowShop(_id).exec();
    const book_qty = parseInt(new_shop.book_qty, 10) + 1;
    await new UpdateShop({ _id }, { book_qty }).exec();
  },
  test: async (data) => {
    try {
      console.log(`Listener test: ${JSON.stringify(data)}`);
    } catch (e) {
      console.log(`Listener test error: ${JSON.stringify(e)}`);
    }
  },
};

module.exports = (eventEmitter) => {
  eventEmitter.on('shop.add-qty', shop.add_qty);
  eventEmitter.once('shop.test', shop.test);
};
