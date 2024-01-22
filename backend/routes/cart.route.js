const { Router } = require("express");
const { CartModel } = require("../models/cart.model");
const { auth } = require("../middleware/auth.middleware");
const {uniquecart} = require("../middleware/uniqueproduct")
const cartRouter = Router();
cartRouter.use(uniquecart);
cartRouter.use(auth);

cartRouter.get("/", async (req, res) => {
    let {userID} = req.body;
    let data = await CartModel.find({ userID });
    res.status(200).send(data);
})

cartRouter.post("/add", async (req, res) => {
    
    try {
        console.log(req.body.userID)
        let cart = new CartModel(req.body);
        await cart.save();
        res.status(200).send({"msg":"item added successfully","data":cart});
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

cartRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let data = await CartModel.findById(id);
        if (data.userID == req.body.userID) {
            await CartModel.findByIdAndUpdate(id, req.body);
            res.send({ "msg": "update successfull" });
        }
        else {
            res.status(400).send({ "msg": "you are not authorised for this action" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

cartRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let data = await CartModel.findById(id);
        if (data.userID == req.body.userID) {
            await CartModel.findByIdAndDelete(id);
            res.send({ "msg": "delete successfull" });
        }
        else {
            res.status(400).send({ "msg": "you are not authorised for this action" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

module.exports = {cartRouter}