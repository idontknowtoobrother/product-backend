
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const generateAccessToken = function(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
}

const authMiddleware = function(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, async function(err, user){
        if(err) return res.sendStatus(403)
        const currentUser =  await User.findById(user._id).exec()
        req.user = currentUser
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