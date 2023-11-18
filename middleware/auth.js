const jwt = require("jsonwebtoken");

const SECRET_KEY = "COURSEAPI";

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, SECRET_KEY, (err, admin)=>{
            if(err){
                return res.sendStatus(403)
            }
            req.admin = admin;
            next()
        })
    } else {
        res.status(401).json({ message : "Unauthorized user"})
    }
}


module.exports = authenticateJwt;