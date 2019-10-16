class Action {
    constructor(model) {
        this.model = model
    }

    async list() {
        try {
            let data = await this.model.find({}).exec()

            return data
        } catch(err) {
            throw err
        }
    }

    async create(data) {
        try {
            let result = new this.model(data)
            await result.save()

            return result
        } catch(err) {
            throw err
        }
    }
}

module.exports = Action
