const { Api } = require('api-inti');
const Book = require('../../models/book');

class ListBook extends Api {
  constructor() {
    super(Book);
  }

  async exec(params, populate) {
    const result = await this.list(params, populate);

    return result;
  }
}

module.exports = new ListBook();
