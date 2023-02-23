const express = require("express")
require("dotenv").config()
const {userRouter} = require("./routers/userrote")
const {authenticate}=require("./middlewear/authentication")
const{productRouter}= require("./routers/productroute")
const cors = require("cors")
const {connection}=require("./db")

const {productModel} = require("./models/productmodel")
const app = express()

app.use(express.json())
app.use(cors())



app.get("/",(req,res)=>{
    res.send("welcome to kadam a step ahead")
})

app.get("/product", async (req, res) => {
    let query = req.query
    try {
        let product = await productModel.find(query)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})


app.post("/create",async(req,res)=>{
    const payload = req.body
   try {
   await productModel.insertMany(payload) 
    res.send({"msg":"new product created"})
    console.log("new product")
   } catch (error) {
    res.send({"msg":error.message})
    console.log("somthing wrong")
   }
})




app.use("/users",userRouter)


app.use(authenticate)

app.use("/product",productRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected with database")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at ${process.env.PORT} port `)
})