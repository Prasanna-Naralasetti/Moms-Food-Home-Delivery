const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
   

})

const Contact = mongoose.model('Contact', contactSchema)
module.exports = {
    Contact
}
