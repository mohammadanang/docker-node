/**
 * Book Schema
 */

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require("mongoose-paginate")

let bookSchema = new Schema({
    title: String,
    description: String,
    price: {
        type: Number,
        default: 0
    },
    author: String,
    shop_id: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

bookSchema.plugin(mongoosePaginate)
let Book = mongoose.model("Book", bookSchema)

module.exports = Book
