const Message = require("../../models/message.model")

class Create {
    constructor(inputs) {
        this.inputs = inputs
    }

    async exec() {
        try {
            let data = new Message(this.inputs)
            await data.save()

            return data
        } catch(err) {
            throw err
        }
    }
}

module.exports = Create
