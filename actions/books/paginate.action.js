const { Api } = require('api-inti');
const Book = require('../../models/book');

class PaginateBook extends Api {
  constructor() {
    super(Book);
  }

  async exec(params, populate, options) {
    const result = await this.paginate(params, populate, options);

    return result;
  }
}

module.exports = new PaginateBook();
