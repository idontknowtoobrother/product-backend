const express = require('express')
const router = express.Router()
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { 
    generateAccessToken
} = require('../helper/auth');



// function
const login = async function(req, res, next){
    const username = req.body.username
    const password = req.body.password
    try {

        const user = await User.findOne({
            username: username
        }).exec()

        const verifyResult = bcryptjs.compare(password, user.password)

        verifyResult.then(function(access){
            if(!access){
                return res.status(404).json({
                    message: 'User not found !'
                })
            }
                
            const token = generateAccessToken({
                _id: user._id,
                username: user.username
            })
            
            res.status(200).json({
                user: {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    roles: user.roles
                },
                token: token
            })

        })
        next()

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