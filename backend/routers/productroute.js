const express = require("express")
const productRouter = express.Router()


const {productModel} = require("../models/productmodel")

productRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id

    try {
        await productModel.findByIdAndDelete({ _id: ID })
        res.send("product deleted")

    } catch (error) {
        res.send(error)
    }
})

productRouter.patch("/update/:id", async (req, res) => {
    const ID = req.params.id
    const payload = req.body
    try {
        await productModel.findByIdAndUpdate({ _id: ID }, payload)
        res.send("product updated")

    } catch (error) {
        res.send(error)
    }
})

module.exports={productRouter}