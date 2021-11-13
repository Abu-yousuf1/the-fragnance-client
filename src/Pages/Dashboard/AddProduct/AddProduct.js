import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const AddProduct = () => {
    const [product, setProduct] = useState({})
    const history = useHistory();
    const handleSubmit = e => {
        e.preventDefault();

        fetch('https://sheltered-plateau-57228.herokuapp.com/product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal("Good job!", "Congratulations you successfully submitted!", "success");
                    history.replace('/dashboard')
                }
            })
    }
    const handleBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newProduct = { ...product };
        newProduct[field] = value;
        setProduct(newProduct)
    }

    return (
        <div>
            <h4 className="primary-color text-center">Add a product</h4>

            <div className="w-75 mt-5 mx-auto">

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" name="name" onBlur={handleBlur} placeholder="Enter Product Name" />
                        <Form.Text className="text-muted">
                            Please write your product name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control type="text" onBlur={handleBlur} name="price" placeholder="Enter Product Price" />
                        <Form.Text className="text-muted">
                            Please write your product price.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicImage">
                        <Form.Label>Product Image Url</Form.Label>
                        <Form.Control type="text" name="image" onBlur={handleBlur} placeholder="Enter Product image url" />
                        <Form.Text className="text-muted">
                            Please paste your product image url .
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control type="text" name="description" onBlur={handleBlur} placeholder="Enter Product Description" />
                        <Form.Text className="text-muted">
                            Please write your product Description.
                        </Form.Text>
                    </Form.Group>



                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddProduct;