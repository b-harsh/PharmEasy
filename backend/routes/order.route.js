const { Router } = require("express");
const { OrderModel } = require("../models/order.model");
const { ordertAuth } = require("../middleware/orderauth.middleware");

const orderRouter = Router();
orderRouter.use(ordertAuth);

orderRouter.get("/", async (req, res) => {
    let { userID } = req.body;
    let data = await OrderModel.find({ userID });
    res.status(200).send(data);
})

orderRouter.post("/add", async (req, res) => {
    try {
        let order = new OrderModel(req.body);
        await order.save();
        res.status(200).send({ "msg": "data updated successfully", "data": order });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})

orderRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let data = await OrderModel.findById(id);
        if (data.userID == req.body.userID) {
            await OrderModel.findByIdAndUpdate(id, req.body);
            res.send({ "msg": "update successfull" });
        }
        else {
            res.status(400).send({ "msg": "you are not authorised for this action" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

orderRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let data = await OrderModel.findById(id);
        if (data.userID == req.body.userID) {
            await OrderModel.findByIdAndDelete(id);
            res.send({ "msg": "delete successfull" });
        }
        else {
            res.status(400).send({ "msg": "you are not authorised for this action" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

module.exports = {orderRouter};