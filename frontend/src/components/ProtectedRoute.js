import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, token, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                token ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default ProtectedRoute;
