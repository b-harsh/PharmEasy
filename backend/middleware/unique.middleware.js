const { UserModel } = require("../models/user.model");


const unique = async (req, res, next) => {
    let { email } = req.body;
    if (req.url == "/register") {
        let user = await UserModel.findOne({ email });
        if (user) {
            res.status(200).send({ "msg": "this email already exist" })
        }
        else {
            next();
        }
    }
    else {
        next();
    }
}

module.exports = { unique }