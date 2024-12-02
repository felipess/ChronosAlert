import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const LogoutButton = () => {
    const { keycloak } = useKeycloak();

    const handleLogout = () => {
        keycloak.logout();
    };

    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="add-postit-tooltip">Sair</Tooltip>}
        >
            <i onClick={handleLogout} className="bi bi-box-arrow-right btn-logout"></i>
        </OverlayTrigger>
    )
};

export default LogoutButton;
