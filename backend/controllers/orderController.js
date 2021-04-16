import asynHandler from 'express-async-handler'
import Order from '../models/orderModel'

//create new order
//route POST /api/orders
// Public

export const addOrderItems = asynHandler(async(req, res)=>{
const{orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice } = req.body
if(orderItems && orderItems ===0){
    res.send(400);
    throw new Error('No order Items')
    return
} else {
    const order = new Order({
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice
    })
}
const createdOrder = Order.save()
res.status(200).json(createdOrder)

})
