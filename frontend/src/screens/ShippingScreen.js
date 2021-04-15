import React,{useState} from 'react'
import { Form,FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer';
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = ({history}) => {
	const cart = useSelector(state=> state.cart)
	const {shippingAddress} = cart
    const[address, setAddress] = useState(shippingAddress.address)
    const[city,setCity] = useState(shippingAddress.city)
    const[postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const[country, setCountry] = useState(shippingAddress.country)
    
	
	const dispatch = useDispatch()
	const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))   
		history.push('/payment')
    }
    
    return (
       
        <FormContainer>
			<CheckoutSteps step1 step2/>
        <h1>
            Shipping
        </h1>
        <Form onSubmit ={submitHandler}>
        <FormGroup controlId='address'>
					<FormLabel>Address</FormLabel>
					<FormControl
						type='text'
						placeholder='enter a name'
						value={address}
						onChange={e =>setAddress(e.target.value)}
                        required
					/>
				</FormGroup>
                <FormGroup controlId='city'>
					<FormLabel>City</FormLabel>
					<FormControl
						type='text'
						placeholder='enter a city'
						value={city}
						onChange={e =>setCity(e.target.value)}
                        required
					/>
				</FormGroup>
                <FormGroup controlId='postalCode'>
					<FormLabel>PostalCode</FormLabel>
					<FormControl
						type='text'
						placeholder='enter a postalCode'
						value={postalCode}
						onChange={e =>setPostalCode(e.target.value)}
                        required
					/>
				</FormGroup>
                <FormGroup controlId='country'>
					<FormLabel>Country</FormLabel>
					<FormControl
						type='text'
						placeholder='enter a country'
						value={country}
						onChange={e =>setCountry(e.target.value)}
                        required
					/>
				</FormGroup>
                <Button type= "submit" variant= "primary">Continue</Button>
                
        </Form>
        </FormContainer>
    )
}

export default ShippingScreen
