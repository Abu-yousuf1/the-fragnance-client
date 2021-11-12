import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Redirect, Route } from 'react-router';
import useAuth from './../../../hooks/useAuth/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { user, isLoading, isAdmin } = useAuth();
    if (isLoading) {
        return <Spinner animation="border" variant="dark" />
    }
    return (
        <Route
            {...rest}
            render={({ location }) => user.email && isAdmin ? children :
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: location }
                    }}
                />
            }
        />
    );
};

export default AdminRoute;