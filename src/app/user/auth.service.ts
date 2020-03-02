import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string) {
    if (username === 'selimssevgi' && password === '123') {
      localStorage.setItem('username', username);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    console.log('user is logged out');
    localStorage.setItem('username', '');
  }

  isGuest() {
    if (localStorage.getItem('username')) {
      return false;
    } else {
      return true;
    }
  }
}
