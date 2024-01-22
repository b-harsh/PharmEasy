const jwt = require("jsonwebtoken");

const commentAuth = (req, res, next) => {
    if(req.url!="/"){
        let check = req.headers.authorization;
        if (check) {
            let token = check.split(" ")[1];
            if (token) {
                const decoded = jwt.verify(token, 'pvtkey');
                if (decoded) {
                    req.body.userID = decoded.userID;
                    req.body.user = decoded.user
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

module.exports = { commentAuth }