const { Controller } = require('api-inti');
const ListUser = require('../actions/users/all.action');

class UserController extends Controller {
  async index(req, res) {
    try {
      const params = {};
      const data = await ListUser.exec(params);

      return res.send(
        this.success({
          message: 'Get list user',
          data,
        })
      );
    } catch (err) {
      return res.send(
        this.error({
          message: err.message,
        })
      );
    }
  }
}

module.exports = new UserController();
