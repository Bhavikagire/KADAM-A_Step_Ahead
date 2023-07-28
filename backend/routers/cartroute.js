const express = require("express")
const cartRouter = express.Router()


const {cartModel} = require("../models/cartmodel")

cartRouter.get("/", async (req, res) => {
    let query = req.query
    try {
        let cart = await cartModel.find(query)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

module.exports={cartRouter}