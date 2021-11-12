import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Footer from '../../Sheard/Footer/Footer';
import Navigation from '../../Sheard/Navigation/Navigation';
import useAuth from './../../../hooks/useAuth/useAuth';


const Registration = () => {
    const { isLoading, user } = useAuth();
    const [registerData, setRegisterData] = useState({})
    const { registration } = useAuth();
    const location = useLocation()
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();

        registration(registerData.email, registerData.password, registerData.name, history)
    }
    console.log(registerData.email);
    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newUser = { ...registerData }
        newUser[field] = value
        setRegisterData(newUser)
    }
    return (
        <div>
            <Navigation />
            {/* <div className=""> */}
            <div className="w-75 mx-auto">
                <h3 className="my-5 text-center">Please registration</h3>

                {!isLoading && <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" name="name" onBlur={handleOnBlur} placeholder="Enter your Name" />
                        <Form.Text className="text-muted">
                            Please write your user name.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" onBlur={handleOnBlur} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onBlur={handleOnBlur} placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>}
                {
                    isLoading && <CircularProgress />
                }



                <h5 className="mt-3">Already have an account?Please <Link to="/register">sign in</Link>.</h5>
            </div>

            <Footer />
        </div>
    );
};

export default Registration;