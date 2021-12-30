import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Rating from 'react-rating';
import Bounce from 'react-reveal/Bounce';
import { useEffect } from 'react';

const Review = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('https://sheltered-plateau-57228.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className="container mt-5 ">
            <div style={{ margin: '160px 0 100px 0' }}>
                <h3 className="primary-color text-center my-5" >CUSTOMER REVIEW</h3>
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