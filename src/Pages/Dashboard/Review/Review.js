import React from 'react';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import Rating from 'react-rating';
import swal from 'sweetalert';
import useAuth from './../../../hooks/useAuth/useAuth';

const Review = () => {
    const [rating, setRating] = useState('')
    const [review, setReview] = useState({})
    const { user } = useAuth();

    const handleSubmit = e => {
        console.log(user);
        const displayName = user.displayName;
        const email = user.email;
        const image = user.photoURL;
        e.preventDefault();
        const userReview = {
            displayName,
            email,
            image,
            ...review,
            rating
        }
        console.log(userReview);

        fetch('http://localhost:5000/review', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userReview)
        })
            .then(res => res.json())
            .then(data => {
                console.log("customer", data.insertedId, data);
                if (data.insertedId) {
                    swal("Good job!", "Successfully review submitted!", "success");
                }
            })

    }
    console.log(review);
    const handleBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newReview = { ...review };
        newReview[field] = value;
        setReview(newReview)
    }


    console.log(rating);
    return (
        <div>
            <h4 className="mb-5">Write a Review</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Review title</Form.Label>
                    <Form.Control type="text" name="title" onBlur={handleBlur} placeholder="Review title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>review</Form.Label>
                    <Form.Control as="textarea" name="review" onBlur={handleBlur} rows={3} />
                </Form.Group>

                <Rating
                    initialRating={2}
                    className="text-warning my-3"
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    fractions={2}
                    onChange={(rate) => setRating(rate)}
                /> <br />
                <button type="submit" className="btn btn-success mt-3">Submit</button>

            </Form>



        </div>
    );
};

export default Review;