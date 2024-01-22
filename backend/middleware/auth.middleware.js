const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let check = req.headers.authorization;
    if (check) {
        let token = check.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, 'pvtkey');
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
}

module.exports = { auth }