const mongoose = require("mongoose")
const Event = require("../models/Events")

// connect Mongo
mongoose.connect('mongodb://localhost:27017/example')

// clear product
async function clearEvent(){
    await Event.deleteMany({})
}

// main
async function main(){
    await clearEvent()
    await Event.insertMany([
        {
            title: 'Title 1',
            content: 'Content 1',
            startDate: new Date('2022-03-31 08:00'),
            endDate: new Date('2022-03-31 12:00'),
            class: 'tanny'
        },
        {
            title: 'Title 2',
            content: 'Content 2',
            startDate: new Date('2022-03-31 12:00'),
            endDate: new Date('2022-03-31 16:00'),
            class: 'tanny'
        },
        {
            title: 'Title 3',
            content: 'Content 3',
            startDate: new Date('2022-03-31 16:00'),
            endDate: new Date('2022-03-31 20:00'),
            class: 'tanny'
        },
        {
            title: 'Title 4',
            content: 'Content 4',
            startDate: new Date('2022-03-31 20:00'),
            endDate: new Date('2022-03-31 23:00'),
            class: 'tanny'
        }
    ])
    Event.find({
        
    })
}

main().then(()=>{
    console.log('\'event\' done.');
})