import React, { useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../Sheard/Footer/Footer';
import Navigation from '../Sheard/Navigation/Navigation';
import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import useAuth from './../../hooks/useAuth/useAuth';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const PlaceOrder = () => {
    const { user } = useAuth()
    const { id } = useParams();
    const initialUser = { name: user.displayName, email: user.email, phone: '' }
    const [service, setService] = useState({})
    const [userData, setUserData] = useState(initialUser)

    const history = useHistory();
    useEffect(() => {
        fetch(`http://localhost:5000/service/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [])
    console.log(service);
    const status = "pending"
    const handleSubmit = (e) => {
        e.preventDefault();
        const getOrder = {
            ...userData,
            order: service,
            status
        }




        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(getOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal("Good job!", "Congratulations you successfully submitted!", "success");
                }
                history.replace('/')
            })

    }

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newUser = { ...userData }
        newUser[field] = value
        setUserData(newUser)
    }
    return (
        <div>
            <Navigation />
            <div>
                <div className="w-75 mx-auto">
                    <h3 className="my-5 text-center">Place Order</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>User name</Form.Label>
                            <Form.Control type="text" name="name" defaultValue={user.displayName} onBlur={handleOnBlur} placeholder="Enter your Name" />
                            <Form.Text className="text-muted">
                                Please write your user name.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" defaultValue={user.email} onBlur={handleOnBlur} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>address</Form.Label>
                            <Form.Control type="text" name="address" onBlur={handleOnBlur} placeholder="Enter address" />
                            <Form.Text className="text-muted">
                                Please write your present address.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" name="phone" onBlur={handleOnBlur} placeholder="Phone" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </div>

            </div>
            <Footer />
        </div>
    );
};

export default PlaceOrder;