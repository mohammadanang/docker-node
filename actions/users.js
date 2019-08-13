const User = require("../models/user")

const create = async (req) => {
    let { name, email, phone } = req.body
    phone = parseInt(phone)
    var insert_data = {
        name,
        email,
        phone
    }

    let data = new User(insert_data)

    try {
        await data.save()

        return data
    } catch(err) {
        throw err
    }
}

const getAll = async () => {
    try {
        let query = await User.find({}).exec()
        let data = query.map((v, i) => {
            return {
                name: v.name,
                email: v.email,
                phone: v.phone
            }
        })

        return data
    } catch(err) {
        throw err
    }
}

const getDetail = async (id) => {
    try {
        let query = await User.findOne({
            _id: id
        }).exec()

        return query
    } catch(err) {
        throw err
    }
}

module.exports = {
    create,
    getAll,
    getDetail
}
