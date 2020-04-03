import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Keycloak from 'keycloak-js';

if (environment.production) {
  enableProdMode();
}

// keycloak init options
const initOptions = {
  url: environment.authUrl,
  realm: 'todarch',
  clientId: 'todarch-app'
};

const kc = Keycloak(initOptions);

kc.init({ onLoad: 'login-required' }).then((auth) => {

  if (!auth) {
    window.location.reload();
  } else {
    console.log('Authenticated');
  }

  // bootstrap after authentication is successful.
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));


  localStorage.setItem('td-token', kc.token);
  localStorage.setItem('td-refresh-token', kc.refreshToken);

  setTimeout(() => {
    kc.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(kc.tokenParsed.exp + kc.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    });


  }, 60000);

}).catch(() => {
  console.error('Authenticated Failed');
});
