const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    address: { type: String, required: [true, 'add your address'] },
    pincode: { type: Number, required: [true, 'add pincode'] },
    type: String,
    userID: { type: String, required: true }
})

const AddressModel = mongoose.model("address",addressSchema);

module.exports={AddressModel};