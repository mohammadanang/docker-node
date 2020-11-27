const Book = require('../../models/book');

class Create {
  constructor(data) {
    this.data = data;
  }

  async exec() {
    const result = new Book(this.data);
    await result.save();

    return result;
  }
}

module.exports = Create;
