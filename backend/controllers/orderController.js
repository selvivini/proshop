import asynHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//create new order
//route POST /api/orders
// Public

export const addOrderItems = asynHandler(async(req, res)=>{
const{orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
if(orderItems && orderItems ===0){
    res.send(400)
    throw new Error('No order Items')
} else {
    const order = new Order({
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })
const createdOrder =await order.save()
res.status(200).json(createdOrder)
}


})

//get order by id
//route GET /api/orders/:id
// Private

export const getOrderById = asynHandler(async(req, res)=>{
    
   const order = await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.status(200).json(order)
    }else{
        res.status(404);
        throw new Error('Order not found')
    }
    
    })
