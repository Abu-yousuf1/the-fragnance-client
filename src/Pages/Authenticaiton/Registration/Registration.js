import { CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../Sheard/Footer/Footer';
import Navigation from '../../Sheard/Navigation/Navigation';
import useAuth from './../../../hooks/useAuth/useAuth';
import image from '../../../Images/login.jpg'


const Registration = () => {
    const { isLoading } = useAuth();
    const [registerData, setRegisterData] = useState({})
    const { registration } = useAuth();
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();

        registration(registerData.email, registerData.password, registerData.name, history)
    }
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
            <Typography variant="h5" sx={{ fontWeight: 'bold' }} className="primary-color text-center mb-5">Please registration</Typography>
            <div className="row ">

                <div className="col-lg-6 d-none d-lg-block">
                    <img className="img-fluid" style={{ height: '80%' }} src={image} alt="" />
                </div>

                <div className='col-lg-6'>
                    {!isLoading && <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>User name</Form.Label>
                            <Form.Control type="text" name="name" onBlur={handleOnBlur} placeholder="Enter your Name" />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onBlur={handleOnBlur} placeholder="Enter email" />

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
                        isLoading && <CircularProgress sx={{ justifyContent: 'center' }} />
                    }

                    <h6 className="mt-5">Already have an account?Please <Link to="/login">sign in</Link>.</h6>

                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Registration;