const jwt = require("jsonwebtoken");

const ordertAuth = (req, res, next) => {
    if(req.url=="/"){
        let check = req.headers.authorization;
        if (check) {
            let token = check.split(" ")[1];
            if (token) {
                const decoded = jwt.verify(token, 'pvtkey') || jwt.verify(token, 'adminkey') ;
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
    else if (req.url != "/" && req.url != "/add") {
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
    } else {
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
}

module.exports = { ordertAuth }