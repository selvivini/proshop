const express = require('express');
const products= require('./data/product')
const app = express()
const dotEnv = require('dotenv')

dotEnv.config()
console.log(process.env.PORT)

const PORT = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.send("Api is running...")
})

app.get('/api/products', (req,res)=>{
res.json(products)
})

app.get('/api/products/:id', (req,res)=>{
  const product = products.find(product=> product._id === req.params.id)
    res.json(product)
    })

app.listen(PORT, ()=>{
 console.log( `Server listening in ${process.env.NODE_ENV} mode on Port ${PORT}`)  
})