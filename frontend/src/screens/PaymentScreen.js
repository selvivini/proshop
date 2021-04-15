import React, { useState } from 'react';
import { Form, FormGroup, FormLabel, Button, Col, FormCheck } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!shippingAddress) {
		history.push('/shipping');
	}
	const [ paymentMethod, setPaymentMethod ] = useState('PayPal');

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup>
					<FormLabel as='legend'>Select Method</FormLabel>
					<Col>
						<FormCheck
							type='radio'
							label='PayPal or CreditCard'
							value='Paypal'
							id='PayPal'
							name='PayamentMethod'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
					</Col>
				</FormGroup>

				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
