import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth/useAuth';

const Footer = () => {
    const { user, logout } = useAuth();
    return (
        <div className="primary-bg-color ps-lg-4 mt-5 px-3 text-light row">
            <div className="col-lg-3 m-lg-5 m-2">
                <h1><span className="fw-bold text-warning">The Fragrance Family</span></h1>
                <p className=" mt-4 fw-bold">A wide range of perfumes, predominantly based on synthetic ingredients, are used in household products. For example, perfumes are used in air fresheners to provide a desired pleasing smell to our homes, work or public spaces.
                </p>
                <h6 className="fw-bold mt-5">SUBSCRIBE</h6>
            </div>

            <div className="col-lg-2 mt-5 pt-5  ">
                <h5 className="fw-bold text-warning ">USEFUL LINKS</h5>
                <Nav.Link className="text-light" as={Link} to='/home'>Home</Nav.Link>
                <Nav.Link className="text-light" as={Link} to='/products'>Products</Nav.Link>

                <Nav.Link as={Link} className="text-light" to='/dashboard'>Dashboard</Nav.Link>
                {
                    user?.email ? <button className="btn text-light" onClick={logout}>Log out</button>
                        :
                        <Nav.Link className="text-light" as={Link} to='/login'>Login</Nav.Link>

                }
            </div>

            <div className="col-lg-6  d-flex  align-items-center justify-content-center">

                <div>
                    <img src="https://web.programming-hero.com/static/media/ssl-commerce.1d268dce.png" alt="" /><br />
                    <div className="text-center mt-5">
                        <i className="fab fa-facebook text-muted fs-3 "></i>
                        <i className="fab fa-twitter text-muted ps-3 fs-3 "></i>
                        <i className="fab fa-instagram-square text-muted ps-3 fs-3 "></i>
                        <i className="fab fa-vimeo-v text-muted ps-3 fs-3 "></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;