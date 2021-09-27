const mongoose = require('mongoose')
const { Schema } = mongoose;

const noteSchema = new Schema({
    userId: {
        type: String
    },
    title: {
        type: String
    },
    text: {
        type: String
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('notes', noteSchema);