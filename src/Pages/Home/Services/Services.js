import React, { useState, useEffect } from 'react';
import Zoom from 'react-reveal/Zoom';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Services = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('https://sheltered-plateau-57228.herokuapp.com/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div className="container mt-5 ">
            <div>
                <h1 className="primary-color text-center mb-5">Our Perfume Product</h1>
            </div>

            <Row xs={1} md={3} className="g-5">
                {services.map((service, index) => (
                    <Col key={index} >
                        <Zoom>
                            <Card className="border-0 text-center">
                                <Card.Img variant="top" src={service.image} />
                                <Card.Body>
                                    <Card.Title className="primary-color" >{service.name}</Card.Title>
                                    <Card.Text className="text-warning fs-4 ">Price: ${service.price}</Card.Text>
                                    <Card.Text className="text-muted">
                                        {service.description}
                                    </Card.Text>
                                    <Link to={`/order/${service._id}`}>  <button className="btn btn-success" >Buy Now</button></Link>
                                </Card.Body>
                            </Card>
                        </Zoom>
                    </Col>
                ))}
            </Row>
        </div >
    );
};

export default Services;