import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Footer from '../../Sheard/Footer/Footer';
import Navigation from '../../Sheard/Navigation/Navigation';
import useAuth from './../../../hooks/useAuth/useAuth';
import image from '../../../Images/login.jpg'

const Login = () => {
    const { signIn } = useAuth();
    const [loginData, setLoginData] = useState({})
    const history = useHistory();
    const location = useLocation();
    const handleSubmit = e => {
        e.preventDefault();
        signIn(loginData.email, loginData.password, location, history)
    }

    const handleBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newData = { ...loginData };
        newData[field] = value;
        setLoginData(newData)
    }
    return (
        <div>
            <Navigation />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }} className="primary-color text-center mb-5">Please Login</Typography>
            <div className="row">
                <div className="col-lg-6 d-none d-lg-block">
                    <img className="img-fluid" style={{ height: '80%' }} src={image} alt="" />
                </div>

                <div className='col-lg-6'>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onBlur={handleBlur} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onBlur={handleBlur} placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <h6 className="mt-5">Don't have an account?Please <Link to="/register">sign up</Link>.</h6>
                </div>

            </div>

            {/* </div> */}

            <Footer />
        </div>
    );
};

export default Login;