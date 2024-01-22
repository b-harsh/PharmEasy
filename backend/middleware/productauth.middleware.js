const jwt = require("jsonwebtoken");

const productAuth = (req, res, next) => {
    if(req.url != "/"){
        let check = req.headers.authorization;
        if (check) {
            let token = check.split(" ")[1];
            if (token) {
                const decoded = jwt.verify(token, 'adminkey');
                if (decoded) {
                    req.body.userID = decoded.userID;
                    next();
                }
                else {
                    res.status(400).send({ "msg": "please login" });
                }
            } else {
                res.status(400).send({ "msg": "please login" });
            }
        } else {
            res.status(400).send({ "msg": "please login" });
        }
    }else{
        next();
    }
}

module.exports = {productAuth }