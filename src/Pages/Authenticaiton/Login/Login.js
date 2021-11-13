import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Footer from '../../Sheard/Footer/Footer';
import Navigation from '../../Sheard/Navigation/Navigation';
import useAuth from './../../../hooks/useAuth/useAuth';

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

            <div className="w-75 mx-auto">
                <h3 className="my-5 text-center">Please Login</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" onBlur={handleBlur} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onBlur={handleBlur} placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <h5 className="mt-3">Don't have an account?Please <Link to="/register">sign up</Link>.</h5>

            </div>

            {/* </div> */}

            <Footer />
        </div>
    );
};

export default Login;