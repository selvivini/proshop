import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({location, history}) => {
	const [name,setName] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const[confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)
	const dispatch = useDispatch()
	
	const userRegister = useSelector(state=> state.userRegister)
	const {loading,error, userInfo} = userRegister

	const redirect = location.search? location.search.split('=')[1]: '/'
	useEffect(()=>{
		if(userInfo){
		history.push(redirect)
		}
	},[history, userInfo, redirect])
	const submitHandler = (e)=>{
		e.preventDefault()
		if(password !==confirmPassword){
		 setMessage('passwords do not match')
		}else {
			dispatch(register(name,email,password))
		}
		
	}
	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant= 'danger'>{message}</Message>}
			{error && <Message variant= 'danger'>{error}</Message>}
			{loading && <Loader/>}
			<Form onSubmit={submitHandler}>
			<FormGroup controlId='name'>
					<FormLabel>Name</FormLabel>
					<FormControl
						type='text'
						placeholder='enter a name'
						value={name}
						onChange={e =>setName(e.target.value)}
					/>
				</FormGroup>
				<FormGroup controlId='email'>
					<FormLabel>Email address</FormLabel>
					<FormControl
						type='email'
						placeholder='enter an email'
						value={email}
						onChange={e =>setEmail(e.target.value)}
					/>
				</FormGroup>

                <FormGroup controlId='password'>
					<FormLabel>Password</FormLabel>
					<FormControl
						type='password'
						placeholder='enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormGroup>
				<FormGroup controlId='confirmPassword'>
					<FormLabel>Confirm Password</FormLabel>
					<FormControl
						type='password'
						placeholder='confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</FormGroup>
                <Button type= "submit" variant='primary' >
                  Register
                </Button>
                <Row className= 'py-3'>
                    <Col>
                    Have an account? {' '}
                    <Link to = {redirect ? `/login? redirect ${redirect}`: '/login'}>Login</Link>
                    </Col>
                </Row>
			</Form>
		</FormContainer>
	);
};

export default RegisterScreen;
