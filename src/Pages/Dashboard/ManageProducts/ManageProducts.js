
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Zoom from 'react-reveal/Zoom';
import swal from 'sweetalert';


const ManageProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://sheltered-plateau-57228.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    const handleDelete = (id) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    fetch(` https://sheltered-plateau-57228.herokuapp.com/products/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                const remainingProducts = products.filter(pd => pd._id !== id)
                                setProducts(remainingProducts)
                            }
                        })

                } else {
                    swal("Your imaginary file is safe!");
                }
            });


    }


    return (
        <div>
            <div className="container mt-5 ">
                <div>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }} className="primary-color text-center mb-5">Manage all Product</Typography>
                </div>

                <Row xs={1} md={3} className="g-5">
                    {products.map((product, index) => (
                        <Col key={product._id}>
                            <Zoom>
                                <Card className="border-0 text-center" style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title className="primary-color">{product.name}</Card.Title>
                                        <Card.Text className="text-warning fs-4 ">Price: ${product.price}</Card.Text>
                                        <Card.Text className="text-muted">
                                            {product.description}
                                        </Card.Text>
                                        <button className="btn btn-warning" onClick={() => handleDelete(product._id)}>Delete</button>

                                    </Card.Body>
                                </Card>
                            </Zoom>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ManageProducts;