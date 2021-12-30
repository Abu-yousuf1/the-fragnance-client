import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth/useAuth';
import './Navigation.css'

const Navigation = () => {
    const { user, logout } = useAuth()
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" className='py-3' variant="light">
            <Container>

                <Navbar.Brand as={Link} to='/home' className="fs-5 fw-bold logo" style={{ color: '#A05F43' }} >The Fragrance Family</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto fw-bold">
                        <Nav.Link as={Link} to='/home'>HOME</Nav.Link>
                        <Nav.Link as={Link} to='/products'>PRODUCTS</Nav.Link>

                        {user?.email && <Nav.Link as={Link} to='/dashboard'>DASHBOARD</Nav.Link>}
                        {
                            user?.email ? <Nav.Link className="btn fw-bold " onClick={logout}>LOG OUT</Nav.Link>
                                :
                                <Nav.Link as={Link} to='/login'>LOGIN</Nav.Link>

                        }

                    </Nav>
                    <Nav className="fw-bold">
                        {
                            user.email && <Nav.Link style={{ color: '#A05F43' }} > {user.displayName.toUpperCase()}</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;