import React ,{useState, useEffect}from 'react'
import {Link} from 'react-router-dom'
import{Row, Col, Image, ListGroup,Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'


//match is coming from props.match property which checks the matching params in route
const ProductScreen = ({match}) => {
    const [product,setProduct] = useState({})
    
    useEffect(()=>{
      const fetchProduct = async()=>{
 const {data} = axios.get(`/api/products/${match.params.id}`)
    setProduct(data)
      }
       fetchProduct()
    },[match.params.id])
 
    return (
        <>
         <Link className="btn btn-light my-3" to = '/'>Go Back</Link>
         <Row>
        <Col md= {6}>
            <Image src= {product.image} alt= {product.name} fluid/>
        </Col>
        <Col md= {3}>
            <ListGroup variant= "flush">
            <ListGroupItem>
            <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
                <Rating value = {product.rating} text = {`${product.numReviews} reviews`}/>
            </ListGroupItem>
            <ListGroupItem>
                Price: {product.price}
            </ListGroupItem>
            <ListGroupItem>
                Description: {product.description}
            </ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroupItem>
                    <Row>
                        <Col>
                        Price:
                        </Col>
                        <Col>
                      <strong> {product.price}</strong>
                        </Col>
                    </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                    <Row>
                        <Col>
                        Status:
                        </Col>
                        <Col>
                     {product.countInStock>0 ? 'In stock': 'Out of Stock'}
                        </Col>
                    </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                   <Button type="button" className="btn  btn-block" disabled = {product.countInStock ===0}>Add To Cart</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col >
        </Row>  
        </>
    )
}

export default ProductScreen