const { Router } = require("express");
const { commentAuth } = require("../middleware/commentauth.middleware");
const { CommentModel } = require("../models/comment.model");

const commentRouter = Router();
commentRouter.use(commentAuth);

commentRouter.get("/", async (req, res) => {
    let { productID } = req.body;
    let data = await CommentModel.find({ productID });
    res.send(data)
})

commentRouter.post("/add", async (req, res) => {
    try {
        let comment = new CommentModel(req.body);
        await comment.save();
        res.status(200).send({ "msg": "new comment added" })
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})

commentRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let data = await CommentModel.findById(id);
        if (data.userID == req.body.userID) {
            await CommentModel.findByIdAndUpdate(id, req.body);
            res.send({ "msg": "update successfull" });
        }
        else {
            res.status(400).send({ "msg": "you are not authorised for this action" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

commentRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let data = await CommentModel.findById(id);
        if (data.userID == req.body.userID) {
            await CommentModel.findByIdAndDelete(id);
            res.send({ "msg": "delete successfull" });
        }
        else {
            res.status(400).send({ "msg": "you are not authorised for this action" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


module.exports = { commentRouter };