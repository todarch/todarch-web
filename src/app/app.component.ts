import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todarch-web';

  constructor(private authService: AuthService,
              private router: Router) {}

  logOut(): void {
    // log out the user
    this.authService.logout();
    this.router.navigateByUrl('/welcome'); // absolute navigate
  }
}
