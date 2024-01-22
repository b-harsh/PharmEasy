const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {unique} = require("../middleware/unique.middleware");
const { UserModel } = require("../models/user.model");

let userRouter = Router();
userRouter.use(unique);

userRouter.post("/register", async (req, res) => {
    try {
        let { name, email,  password } = req.body;
        bcrypt.hash(password, 4, async function (err, hash) {
            let user = new UserModel({ name, email, password: hash });
            await user.save();
            res.status(200).send({ "msg": "new user created", "data": user });
        });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})

userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
        let a = bcrypt.compareSync(password,user.password);
        if(a){
            const token = jwt.sign({userID:user._id,user:user.name}, 'pvtkey');
            res.status(200).send({"msg":"login successfull","token":token,"user":user.name});
        }
        else{
            res.status(400).send({"msg":"enter correct password"})
        }
    }
    else{
        res.status(400).send({"msg":"enter correct email"});
    }
})

userRouter.post("/adminlogin",async(req,res)=>{
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
       if(user.isAdmin){
           let a = bcrypt.compareSync(password, user.password);
           if (a) {
               const token = jwt.sign({ userID: user._id, user: user.name }, 'adminkey');
               res.status(200).send({ "msg": "login successfull", "token": token, "user": user.name });
           }
           else {
               res.status(400).send({ "msg": "enter correct password" })
           }
       }
       else{
        res.status(400).send({"msg":"you are not authorised"});
       }
    }
    else {
        res.status(400).send({ "msg": "enter correct email" });
    }
})



module.exports = {userRouter};