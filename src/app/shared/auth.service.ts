import { Injectable } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails: KeycloakProfile;
  guestUser;

  constructor(private keycloakService: KeycloakService) { }

  async isLoggedIn() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
      this.guestUser = false;
    } else {
      this.guestUser = true;
    }
  }

  async doLogout() {
    await this.keycloakService.logout();
    this.guestUser = true;
  }

  isGuest() {
    return this.guestUser;
  }
}
