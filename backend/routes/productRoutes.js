import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import {notFound, errorHandler} from '../middleware/errorMiddleware.js'

//fetch all products
//@route get('/api/products)
//@acess public route
router.get('/', asyncHandler(async(req,res)=>{
    const products =await Product.find({})
    res.json(products)
    }))
    

//fetch a product by id
//@route get('/api/products/:id)
// @access public route
router.get('/:id',asyncHandler(async (req,res)=>{
      const product =await Product.findById(req.params.id)
       
        if(product){
        res.json(product)
        }else{
            res.status(404)
            throw new Error('Product not found')
        }
        }))





export default router
