const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Product = require('../models/Product');

// variables
const products = [{
        id: 1,
        name: 'IPad gen1 64G Wifi',
        price: 11000.0
    },
    {
        id: 2,
        name: 'IPad gen2 64G Wifi',
        price: 12000.0
    },
    {
        id: 3,
        name: 'IPad gen3 64G Wifi',
        price: 13000.0
    },
    {
        id: 4,
        name: 'IPad gen4 64G Wifi',
        price: 14000.0
    },
    {
        id: 5,
        name: 'IPad gen5 64G Wifi',
        price: 15000.0
    },
    {
        id: 6,
        name: 'IPad gen6 64G Wifi',
        price: 16000.0
    },
    {
        id: 7,
        name: 'IPad gen7 64G Wifi',
        price: 17000.0
    },
    {
        id: 8,
        name: 'IPad gen8 64G Wifi',
        price: 18000.0
    },
    {
        id: 9,
        name: 'IPad gen9 64G Wifi',
        price: 19000.0
    },
    {
        id: 10,
        name: 'IPad gen10 64G Wifi',
        price: 20000.0
    }
]


// function
const getProducts = async function(req, res, next){
    try {
        const products = await Product.find({}).exec()
        console.log('object');
        res.status(200).json(products)
    } catch (e) {
        return res.status(500).json({
            code: 500,
            status: `error info: ${e}`
        })
    }
}
const addProducts = (req, res, next) => {
    const reuestAddProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(reuestAddProduct)
    res.status(201).json(reuestAddProduct)
}
const getProductById = (req, res, next) => {
    const i = products.findIndex(item => {
        return item.id == req.params.id
    })
    if (i < 0) {
        res.status(404).json({
            description: `not found product at ${req.params.id}`
        })
        return
    }

    res.status(201).json(products[i])
}
const updateProductById = (req, res, next) => { 
    const i = products.findIndex(product => product.id == req.body.id)
    if (i<0) {
        res.status(404).json({
            code: 404,
            status: `not found product id ${req.body.id}`
        })
        return 
    }

    products[i] = {
        id: products[i].id,
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json(products[i])
}
const deleteProductById = (req, res, next) => {
    const i = products.findIndex(product => product.id == req.params.id)
    if (i < 0) {
        res.status(404).json({
            code: 404,
            status: `not found product id ${req.params.id}`
        })
        return
    }
    products.splice(i, 1)
    res.status(204).json({
        code: 204,
        status: `product id:${i} already deleted :D`
    })
}



// 'get' express
router.get('/', getProducts) // get all product :D
router.get('/:id', getProductById) // get 'product' of 'products' by id

// 'post' express
router.post('/', addProducts) // add product

// 'put' express
router.put('/', updateProductById) // update product by id

// 'delete' express
router.delete('/:id', deleteProductById)

module.exports = router