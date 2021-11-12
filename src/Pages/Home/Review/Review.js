import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Rating from 'react-rating';
import Bounce from 'react-reveal/Bounce';
import Banner from '../../../Images/banner2.jpg'
import { useEffect } from 'react';

const Review = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className="container mt-5 ">
            <div>
                <h1 className="primary-color text-center my-5">Customer Review</h1>
            </div>

            <Row xs={1} md={3} className="g-5">
                {reviews.map((review, index) => (
                    <Col key={index}>
                        <Bounce bottom>
                            <Card className="border-0 text-start">
                                {/* <Card.Img variant="top" style={{
                                    borderRadius: '50%', width: '100px', height: '100px'
                                }} className="footerImage" src={review?.image} /> */}
                                <Card.Body >
                                    <Card.Title className="primary-color text-start">{review.displayName}</Card.Title>

                                    <p className="text-muted">{review.email}</p>
                                    <Card.Title className=" fw-3 text-start mt-3 ">{review.title.slice(0, 20)}</Card.Title>
                                    <Card.Text className="text-muted">
                                        {review.review.slice(0, 130)}
                                    </Card.Text>

                                </Card.Body>
                                <Card.Footer className="text-warning border-0 text-start "><Rating
                                    initialRating={review.rating}
                                    readonly
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    fractions={2}
                                /></Card.Footer>
                            </Card>
                        </Bounce>
                    </Col>
                ))}
            </Row>
        </div >
    );
};

export default Review;