const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userID: {
        type: String,
        required:true
    },
    productId: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    productImg: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDiscountPrice: {
        type: Number,
        required: true
    },
    productBrand: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.'],
        default: 1
    }
})

const CartModel = mongoose.model("cart",cartSchema);
module.exports = {CartModel}