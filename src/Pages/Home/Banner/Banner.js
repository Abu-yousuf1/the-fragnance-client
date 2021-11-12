import React from 'react';
import { Carousel, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import banner1 from '../../../Images/banner1.jpg'
import banner2 from '../../../Images/banner2.jpg'
import banner3 from '../../../Images/banner3.jpg'

const Banner = () => {
    return (
        <Carousel variant="dark">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={banner1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h1 className="primary-color mb-lg3"> Be The Attention With Our Best Fragrant</h1>
                    <p className="text-muted">The sign of a sophisticated fragrance is that it has a complex ‘accord’ of ingredients rather than just a few strong fruity ingredients.</p>

                    <Nav.Link as={Link} to='/products'> <button className="btn btn-success mb-lg-5" >Explore</button></Nav.Link>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={banner2}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h1 className="primary-color mb-lg-3"> Be The Attention With Our Best Fragrant</h1>
                    <p className="text-muted">The sign of a sophisticated fragrance is that it has a complex ‘accord’ of ingredients rather than just a few strong fruity ingredients.</p>

                    <Nav.Link as={Link} to='/products'> <button className="btn btn-success mb-lg-5" >Explore</button></Nav.Link>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={banner3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h1 className="primary-color mb-lg-3"> Be The Attention With Our Best Fragrant</h1>
                    <p className="text-muted">The sign of a sophisticated fragrance is that it has a complex ‘accord’ of ingredients rather than just a few strong fruity ingredients.</p>

                    <Nav.Link as={Link} to='/products'> <button className="btn btn-success mb-lg-5" >Explore</button></Nav.Link>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;