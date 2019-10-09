const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require("mongoose-paginate")

let shopSchema = new Schema({
    name: String,
    description: String,
    owner: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

shopSchema.plugin(mongoosePaginate)
shopSchema.virtual('user', {
    localField: 'author',
    foreignField: '_id',
    justOnce: false
})
let Shop = mongoose.model("Shop", shopSchema)

module.exports = Shop
