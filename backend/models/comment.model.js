const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    rating: {type:Number,max:[5,"rating can't be more than 5"],min:[0,"rating can't be less than 0"]},
    comment: String,
    userID: { type: String, required: true },
    productID: { type: String, required: true }
})

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = { CommentModel };