const mongoose = require("mongoose")
const Product = require("../models/Product")

// connect Mongo
mongoose.connect('mongodb://localhost:27017/example')


// clear product
async function clearProduct(){
    await Product.deleteMany({})
}

// main
async function main(){
    await clearProduct()
    for(var i=0; i < 12; i++){
        const product = new Product({
            name: `Product # ${i}`,
            price: i*1000
        }).save()
        product.save()
    }
}

main().then(()=>{
    console.log('\'main\' done.');
})