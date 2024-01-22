const express= require("express");
const cors = require("cors");
require("dotenv").config();
const {connection} = require("./db");
const {userRouter} = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const { orderRouter } = require("./routes/order.route");
const { commentRouter } = require("./routes/comment.route");
const { cartRouter } = require("./routes/cart.route");
const { addressRouter } = require("./routes/address.route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/order",orderRouter);
app.use("/comment",commentRouter);
app.use("/cart",cartRouter);
app.use("/address",addressRouter);

app.listen(process.env.port,async()=>{
    await connection
    console.log(`connected to ${process.env.port}`);
})