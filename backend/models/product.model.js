const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title field is empty'],
        unique: true
    },
    img: {
        type: String,
        required: [true, 'image field is empty']
    },
    description: {
        type: String,
        required: [true, 'decription field is empty']
    },
    category: {
        type: String,
        required: [true, 'category field is empty']
    },
    price: {
        type: Number,
        required: [true, 'price field is empty']
    },
    discountPrice: {
        type: Number,
        required: [true, 'discount price field is empty']
    },
    brand: {
        type: String,
        required: [true, 'brand field is empty']
    },
    healthConcerns: {
        type: String,
    },
    gender: {
        type: String,
        required: [true, 'gender field is empty']
    },
    tags: {
        type: [String]
    }
},{
    versionKey:false
})

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };