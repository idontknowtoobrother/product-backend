const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Product = require('../models/Product');

// function
const getProducts = async function(req, res, next){
    try {
        const products = await Product.find({}).exec()
        res.status(200).json(products)
    } catch (e) {
        return res.status(500).json({
            code: 500,
            status: `'can't get products' \nerror info: ${e.message}`
        })
    }
}
const addProducts = async function(req, res, next){
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })
    try {
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (e) {
        return res.status(500).json({
            code: 500,
            status: `'can't add product' \nerror info: ${e.message}`
        })
    }
}
const getProductById = async function(req, res, next){
    try {
        const id = req.params.id
        const product = await Product.findById(id).exec()
        if(!product){
            return res.status(404).json({
                code: 404,
                status: `product not found \nerror info: ${e.message}`
            })
        }
        res.status(201).json(product)
    } catch (e) {
        return res.status(500).json({
            code: 500,
            status: `'can't get product ${req.params.id}' \nerror info: ${e.message}`
        })
    }
}
const updateProductById = async function(req, res, next){ 
    try {
        const id = req.params.id
        const product = await Product.findById(id) 
        if(!product){
            return res.status(404).json({
                code: 404,
                status: `product not found \nerror info: ${e.message}`
            })
        }

        product.name = req.body.name
        product.price = parseFloat(req.body.price)
        await product.save()
        return res.status(200).json(product)

    } catch (e) {
        return res.status(404).json({
            code: 404,
            status: `'can't update product ${req.params.id}' \nerror info: ${e.message}`
        })
    }
}
const deleteProductById = async function(req, res, next){
    try {
        const id = req.params.id
        await Product.findByIdAndDelete(id)
        return res.status(201).send()
    } catch (e) {
        return res.status(500).json({
            code: 500,
            status: `'can't delete product ${req.params.id}' \nerror info: ${e.message}`
        })
    }
}



// 'get' express
router.get('/', getProducts) // get all product :D
router.get('/:id', getProductById) // get 'product' of 'products' by id

// 'post' express
router.post('/', addProducts) // add product

// 'put' express
router.put('/:id', updateProductById) // update product by id

// 'delete' express
router.delete('/:id', deleteProductById)

module.exports = router