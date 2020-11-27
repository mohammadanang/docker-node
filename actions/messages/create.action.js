const Message = require('../../models/message.model');

class Create {
  constructor(inputs) {
    this.inputs = inputs;
  }

  async exec() {
    const data = new Message(this.inputs);
    await data.save();

    return data;
  }
}

module.exports = Create;
