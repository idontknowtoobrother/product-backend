const express = require('express')
const router = express.Router()
const Event = require('../models/Events');

// function
const getEvents = async function(req, res, next){
    try {
        console.log(req.query);
        const startDate = req.query.startDate
        const endDate = req.query.endDate

        const events = await Event.find({
            $or:[{ startDate: {$gte: startDate, $lt: endDate}},
            { endDate: { $gte: startDate, $lt: endDate} }]
        }).exec()
        res.status(200).json(events)
    } catch (e) {
        return res.status(500).send({
            message: e.message
        })
    }
}


// 'get' express
router.get('/', getEvents) // get all product :D
module.exports = router
