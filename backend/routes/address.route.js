const {Router} = require("express");
const {auth} = require("../middleware/auth.middleware");
const {AddressModel}= require("../models/address.model");

const addressRouter = Router();
addressRouter.use(auth);

addressRouter.get("/",async(req,res)=>{
   try {
       let { userID } = req.body;
       let data = await AddressModel.find({ userID });
       res.status(200).send(data);
   } catch (error) {
      res.status(400).send({"msg":error.message});
   }
})

addressRouter.post("/add",async(req,res)=>{
    try {
        let data = new AddressModel(req.body);
        await data.save();
        res.status(200).send({"msg":"data added successfully","data":data});
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

addressRouter.patch("/update/:id",async(req,res)=>{
    let {id} = req.params;
    try {
        let data =await AddressModel.findById(id);
        if(data.userID==req.body.userID){
            await AddressModel.findByIdAndUpdate(id,req.body);
            res.send({"msg":"update successfull"});
        }
        else{
            res.status(400).send({"msg":"you are not authorised for this action"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

addressRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let data = await AddressModel.findById(id);
        if (data.userID == req.body.userID) {
            await AddressModel.findByIdAndDelete(id);
            res.send({ "msg": "delete successfull" });
        }
        else {
            res.status(400).send({ "msg": "you are not authorised for this action" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

module.exports = {addressRouter};