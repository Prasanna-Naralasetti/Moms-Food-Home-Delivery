const mongoose = require("mongoose");
const Schema  = mongoose.Schema
const fooditemSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 3
	},
	description: {
		type: String,
		required: true,
		minlength: 5
	},
	price: {
		type: Number,
		minlength: 1,
		required: true
	},
	available: {
		type: Number,
		minlengthl: 0,
		required: true
	},
	isCod: {
		type: Boolean,
		default: true,
		required: true
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: true
	},
	imageUrl: {
		type: String
    }
});
const FoodItem = mongoose.model("FoodItem", fooditemSchema);
module.exports = {
	FoodItem
};