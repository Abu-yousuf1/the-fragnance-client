import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import swal from 'sweetalert';


const MakeAdmin = () => {
    const [admin, setAdmin] = useState({})

    console.log(admin);
    const handleSubmit = e => {
        e.preventDefault();
        const user = { email: admin }
        console.log(user);
        fetch('http://localhost:5000/users', {
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
            <h1>Make admin</h1>

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