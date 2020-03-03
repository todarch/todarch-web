import { Injectable } from '@angular/core';
import {AbstractService} from '../shared/abstract.service';
import {EMPTY, Observable, of} from 'rxjs';
import {ErrorResponse} from '../shared/error-response';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService {
  resource = '/users';

  constructor(private http: HttpClient) {
    super();
  }

  login(username: string, password: string): Observable<undefined | ErrorResponse> {
    let userId = 1;
    if (username === 'selimssevgi' && password === '123') {
      userId = 1;
    } else {
      userId = 2;
    }

    return this.http.get(`${this.url}/${userId}`)
      .pipe(
        map(() => {
          localStorage.setItem('username', username);
          return undefined;
        }),
        catchError(error => {
          return this.handleError(`AuthService.login(${username} failed`, error);
        })
      );
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
