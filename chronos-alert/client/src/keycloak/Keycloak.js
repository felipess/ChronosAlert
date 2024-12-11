import Keycloak from 'keycloak-js';

const keycloakUrl = process.env.REACT_APP_KEYCLOAK_URL;

const keycloakConfigs = new Keycloak({
    url: keycloakUrl,
    realm: "chronos",
    clientId: "myapp-ChronosAlert",
    "public-client": true,
    "ssl-required": "external"
});

export default keycloakConfigs;