import Keycloak from 'keycloak-js';

const keycloakConfigs = new Keycloak({
    url: "http://localhost:8080",
    realm: "chronos",
    clientId: "myapp-ChronosAlert",
});

export default keycloakConfigs;