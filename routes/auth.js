const express = require('express')
const router = express.Router()
const User = require('../models/User');
const dotenv = require('dotenv');
// get config vars
dotenv.config();

const jwt = require('jsonwebtoken');
function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
}

// function
const login = async function(req, res, next){
    const username = req.body.username
    const password = req.body.password
    try {

        const user = await User.findOne({
            username: username,
            password: password
        }, '-password').exec()

        if(user === null)return res.status(404).json({
            message: 'User not found !'
        })

        const token = generateAccessToken({
            username: user.username,
            password: user.password
        })
        res.status(200).json({
            user: user,
            token: token
        })

    } catch (e) {

        return res.status(500).json({
            code: 500,
            status: `'can't get users' \nerror info: ${e.message}`
        })

    }
}

// 'post' login
router.post('/login', login) // add user

module.exports = router