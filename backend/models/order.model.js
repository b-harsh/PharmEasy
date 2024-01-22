const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    items: [{
        productId: {
            type: String,
        },
        productTitle:{
            type:String,
            required:true
        },
        productImg:{
            type:String,
            required:true
        },
        productPrice:{
            type:Number,
            required:true
        },
        productDiscountPrice:{
            type:Number,
            required:true
        },
        productBrand:{
            type:String,
            required:true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        }
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    },
    status:{
        type:String,
        default:"pending",
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

const OrderModel = mongoose.model("order", orderSchema);
module.exports = { OrderModel }