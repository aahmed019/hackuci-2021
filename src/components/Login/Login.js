import React, {useRef, useState}from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Container } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import classes from './Login.module.css'

export default function Login(){
        const emailRef = useRef();
        const passwordRef = useRef();
        const { login } = useAuth();
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const history = useHistory();
        
        async function handleSubmit(e){
            e.preventDefault()

            try {
                setError('')
                setLoading(true)
                await login(emailRef.current.value, passwordRef.current.value)
                history.push('/User')
            } catch{
                setError('Failed to sign in. Please try again!')
            }
            setLoading(false)
        }
    return(
        <div className = {classes.backgroundBoi} >
        <Container >
            <div >
                <Card>
                    <Card.Body > 
                        <h2 >Log In</h2>
                            {error && <Alert variant ="danger">{error}</Alert>}
                        <Form onSubmit ={handleSubmit}>
                            <Form.Group id = "email ">
                                <Form.Label ><strong>Email</strong></Form.Label>
                                <Form.Control type = "email" ref={emailRef} required/>                 
                            </Form.Group>
                            <Form.Group id = "password">
                                <Form.Label ><strong>Password</strong></Form.Label>
                                <Form.Control type = "password" ref={passwordRef} required/>                 
                            </Form.Group>
                            {/* <Form.Group id = "name-confirm">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type = "text" ref={nameRef} required/>                 
                            </Form.Group> */}
                            
                                <Button  type = "submit" disabled={loading}>
                                    <strong>Log in</strong>
                                </Button>
                            
                        </Form>
                        {/* <div className = "w-100 text-center mt-3 navItems">
                            <Link className ="navItems" to ='/forgot-password'>
                            Forgot Password?
                            </Link>
                        </div> */}
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <strong>Need an Account?</strong> <Link className = "navItems"to ="/SignUp"><strong>Click Here!</strong></Link>
                </div>
            </div>
        </Container>
        </div>

    );
}