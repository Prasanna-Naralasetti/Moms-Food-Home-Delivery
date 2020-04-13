const mongoose = require('mongoose')

const Schema = mongoose.Schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('Contact', categorySchema)
module.exports = {
    Category
}
