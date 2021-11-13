import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Footer from '../Sheard/Footer/Footer';
import Navigation from '../Sheard/Navigation/Navigation';
import Zoom from 'react-reveal/Zoom';
import { Link } from 'react-router-dom';


const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://sheltered-plateau-57228.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <Navigation />
            <div className="container mt-5 ">
                <div>
                    <h1 className="primary-color text-center mb-5">Our Perfume Product</h1>
                </div>

                <Row xs={1} md={3} className="g-5">
                    {products.map((product, index) => (
                        <Col key={product._id}>
                            <Zoom>
                                <Card className="border-0 text-center">
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title className="primary-color">{product.name}</Card.Title>
                                        <Card.Text className="text-warning fs-4 ">Price: ${product.price}</Card.Text>
                                        <Card.Text className="text-muted">
                                            {product.description}
                                        </Card.Text>
                                        <Link to={`/order/${product._id}`}>  <button className="btn btn-success" >Buy Now</button></Link>
                                    </Card.Body>
                                </Card>
                            </Zoom>
                        </Col>
                    ))}
                </Row>
            </div>

            <Footer />
        </div>
    );
};

export default Products;