const mongoose = require('mongoose')

const Schema = mongoose.Schema
const cartSchema = new Schema({
    fooditem: {
        type: Schema.Types.ObjectId,
        ref: "FoodItem"
    },
    quantity: {
        type: Number,
        min: 1,
        max: 15
    }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = {
    Cart
}
