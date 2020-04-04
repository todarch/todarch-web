import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'https://id.todarch.com/auth',
  realm: 'todarch',
  clientId: 'todarch-app'
};

export const environment = {
  production: true,
  apiUrl: 'https://td.todarch.com',
  keycloakConfig
};
