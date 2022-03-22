const mongoose = require("mongoose")
const { ROLES } = require('../constant')
const User = require("../models/User")


// connect Mongo
mongoose.connect('mongodb://localhost:27017/example')

// clear product
async function clearUsers(){
    await User.deleteMany({})
}

// main
async function main(){
    await clearUsers()
    for(var i=0; i < 3; i++){
        const user = new User({
            username: `user${i+1}`,
            password: `user${i+1}`,
            name: `User # ${i+1}`,
            roles: [ROLES.USER]
        })
        user.save()
    }
    const adminUser = new User({
        username: `admin`,
        password: `root`,
        name: `ADMIN # 1`,
        roles: [ROLES.ADMIN, ROLES.USER]
    })
    adminUser.save()
}

main().then(()=>{
    console.log('\'users\' done.');
})