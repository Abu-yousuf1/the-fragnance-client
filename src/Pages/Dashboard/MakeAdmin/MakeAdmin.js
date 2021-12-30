import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import swal from 'sweetalert';
import { Typography } from '@mui/material';


const MakeAdmin = () => {
    const [admin, setAdmin] = useState({})

    const handleSubmit = e => {
        e.preventDefault();
        const user = { email: admin }

        fetch('https://sheltered-plateau-57228.herokuapp.com/users', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    swal("Good job!", "Congratulations admin made successfully!", "success")
                }
            })
    }
    const handleBlur = e => {
        setAdmin(e.target.value)

    }
    return (
        <div>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }} className="primary-color text-center mb-5">Make Admin</Typography>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 w-75" controlId="formBasicEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onBlur={handleBlur} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Make admin
                </Button>
            </Form>
        </div>
    );
};

export default MakeAdmin;