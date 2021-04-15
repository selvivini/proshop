import React,{useState} from 'react'
import{Button, Row, Col,ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {
    const cart = useSelector(state=>state.cart)
   //calculate the prices
   cart.itemsPrice= cart.cartItems.reduce((acc,item)=>acc+ item.qty *item.price,0)
   cart.shippingPrice = cart.itemsPrice>100? 0: 20
   cart.taxPrice =Number(cart.itemsPrice * 0.10).toFixed(2) 
  cart.totalPrice=Number( cart.itemsPrice) + Number(cart.shippingPrice)+Number(cart.taxPrice)
   const placeOrderHandler = (e)=>{
  e.preventDefault()
  console.log('clicked')
   }

    return (
        <>
         <CheckoutSteps step3 step4/>   
         <Row >
          <Col md={8}>
              <ListGroup variant='flush'>
                  <ListGroupItem>
                      <h2>Shipping</h2>
                      <p>
                          <strong>Address:</strong>
                          {cart.shippingAddress.address},
                          {cart.shippingAddress.city},
                          {cart.shippingAddress.postalCode},
                          {cart.shippingAddress.country}

                      </p>

                  </ListGroupItem>
                
                  <ListGroupItem>
                      <h2>Payment Method</h2>
                      <p>
                          <strong>Method:</strong>
                          {cart.paymentMethod}

                      </p>

                  </ListGroupItem>

                  <ListGroupItem>
                      <h2>Order Items</h2>
                      {cart.cartItems.length ===0 ? <Message>Your cart is empty</Message>:
                      <ListGroup variant='flush'>
                          {cart.cartItems.map((item, index )=> (
                              <ListGroupItem key= {index}>
                                  <Row>
                                      <Col md={1}>
                                          <Image src= {item.image} alt = {item.name} fluid rounded/>
                                      </Col>
                                      
                                      <Col>
                                          <Link to ={`/product/${item.product}`}>
                                          {item.name}
                                          </Link>
                                       
                                      </Col>
                                      <Col md={4}>
                                          {item.qty}x ${item.price} = ${item.qty * item.price}
                                      </Col>
                                  </Row>
                              </ListGroupItem>
                          )
                           
                          )}
                      </ListGroup>
                      }

                  </ListGroupItem>
              </ListGroup>
              </Col> 
              <Col md={4}>
                  <Card>
                      <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Order summary</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button type= 'button' className='btn-block' disabled={cart.cartItems ===0}
                            onClick={placeOrderHandler}
                            > Place Order</Button>
                        </ListGroupItem>
                      </ListGroup>
                  </Card>
              </Col>
         </Row>
     
        </>
    )
}

export default PlaceOrderScreen
