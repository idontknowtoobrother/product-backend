const express = require('express')
const router = express.Router()
const User = require('../models/User');

// function
const getUsers = async function(req, res, next){
    try {
        const users = await User.find({}).exec()
        res.status(200).json(users)
    } catch (e) {
        return res.status(500).json({
            code: 500,
            status: `'can't get users' \nerror info: ${e.message}`
        })
    }
}
const addUsers = async function(req, res, next){
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        roles: req.body.roles
    })
    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (e) {
        return res.status(500).json({
            code: 500,
            status: `'can't add user' \nerror info: ${e.message}`
        })
    }
}
const getUserById = async function(req, res, next){
    try {
        const id = req.params.id
        const user = await User.findById(id).exec()
        if(!user){
            return res.status(404).json({
                code: 404,
                status: `user not found \nerror info: ${e.message}`
            })
        }
        res.status(201).json(user)
    } catch (e) {
        return res.status(500).json({
            code: 500,
            status: `'can't get user ${req.params.id}' \nerror info: ${e.message}`
        })
    }
}
const updateUserById = async function(req, res, next){ 
    try {
        const id = req.params.id
        const user = await User.findById(id) 
        if(!user){
            return res.status(404).json({
                code: 404,
                status: `user not found \nerror info: ${e.message}`
            })
        }

        user.username = req.body.username
        user.password = req.body.password
        user.name = req.body.name
        user.roles = req.body.roles
        await user.save()
        return res.status(200).json(user)

    } catch (e) {
        return res.status(404).json({
            code: 404,
            status: `'can't update user ${req.params.id}' \nerror info: ${e.message}`
        })
    }
}
const deleteUserById = async function(req, res, next){
    try {
        const id = req.params.id
        await User.findByIdAndDelete(id)
        return res.status(201).send()
    } catch (e) {
        return res.status(500).json({
            code: 500,
            status: `'can't delete user ${req.params.id}' \nerror info: ${e.message}`
        })
    }
}



// 'get' express
router.get('/', getUsers) // get all user :D
router.get('/:id', getUserById) // get 'user' of 'users' by id

// 'post' express
router.post('/', addUsers) // add user

// 'put' express
router.put('/:id', updateUserById) // update user by id

// 'delete' express
router.delete('/:id', deleteUserById)

module.exports = router