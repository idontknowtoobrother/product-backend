
const jwt = require('jsonwebtoken');
const generateAccessToken = function(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
}

const authMiddleware = function(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, user){
        console.log(err)
        if(err) return res.sendStatus(403)
        console.log(user)
        req.user = user
    })
    next()
}

const authorizeMiddleware = function(roles) {
    return function(req, res, next){
        if(req.user == null) return res.sendStatus(401);
        var isAccess = false
        req.user.roles.forEach(role => {
            if(roles.indexOf(role) > -1){
                isAccess = true
                return
            }
        })
        if(isAccess)return next()
        return res.sendStatus(401)
    }
}

module.exports = {
    generateAccessToken,
    authMiddleware,
    authorizeMiddleware
}