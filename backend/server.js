const express = require('express');
const products= require('./data/product')
const app = express();

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

app.listen(5000, ()=>{
 console.log( "Server listening on Port 5000")  
})