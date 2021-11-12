import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth/useAuth';

const Navigation = () => {
    const { user, logout } = useAuth()
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand as={Link} to='/home' className="fw-bold" style={{ color: ' #A05F43' }}>The Fragrance Family</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to='/home'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/products'>Products</Nav.Link>

                        <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
                        {
                            user?.email ? <button className="btn" onClick={logout}>Log out</button>
                                :
                                <Nav.Link as={Link} to='/login'>Login</Nav.Link>

                        }

                    </Nav>
                    <Nav>
                        {
                            user.email && <Nav.Link > {user.displayName}</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;