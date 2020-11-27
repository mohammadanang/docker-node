const apiCore = require('api-inti');
const User = require('../../models/user.model');

const { Api } = apiCore;

class All extends Api {
  constructor() {
    super(User);
  }

  async exec(params) {
    const result = await this.list(params);

    return result;
  }
}

module.exports = new All();
