const express = require('express')
const router = express.Router()
const User = require('../models/User');

// function
const login = async function(req, res, next){
    const username = req.body.username
    const password = req.body.password
    try {

        const users = await User.findOne({
            username: username,
            password: password
        }, '-password').exec()

        if(users === null)return res.status(404).json({
            message: 'User not found !'
        })
        
        res.status(200).json(users)

    } catch (e) {

        return res.status(500).json({
            code: 500,
            status: `'can't get users' \nerror info: ${e.message}`
        })

    }
}

// 'post' login
router.post('/', login) // add user

module.exports = router