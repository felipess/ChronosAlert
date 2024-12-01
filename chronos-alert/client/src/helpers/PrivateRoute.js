import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    return keycloak.authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
