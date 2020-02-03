/**
 * Message Schema
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

let messageSchema = new Schema({
    user_id: String,
    content: String,
    is_read: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: null
    }
})

let Message = mongoose.model("Message", messageSchema)

module.exports = Message
