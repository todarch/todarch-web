import {BrowserModule} from '@angular/platform-browser';
import {DoBootstrap, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TodoModule} from './todo/todo.module';
import {UserModule} from './user/user.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {NavComponent} from './nav/nav.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {HttpClientModule} from '@angular/common/http';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {environment} from '../environments/environment';
import {FooterComponent} from './footer/footer.component';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
    NavComponent,
    WelcomeComponent,
    FooterComponent,
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    UserModule,
    TodoModule,
    AppRoutingModule, // keep it at the bottom for route matching
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  // we need this change because of manually bootstrapping angular app
  // https://stackoverflow.com/a/58100581
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  async ngDoBootstrap(app) {
    const { keycloakConfig } = environment;

    try {
      await keycloakService.init({
        config: keycloakConfig,
        initOptions: {
          onLoad: 'check-sso', // do not require logged in, but check if logged in
          checkLoginIframe: true
        }
      });
      app.bootstrap(AppComponent);
    } catch (error) {
      console.error('Keycloak init failed', error);
    }
  }
}
