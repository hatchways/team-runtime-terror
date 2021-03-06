const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const requestSchema = new mongoose.Schema({
    owner_id: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
        required: true,
    },
    sitter_id: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
})

module.exports = Request = mongoose.model("request", requestSchema);