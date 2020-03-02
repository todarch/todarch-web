import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from '../user/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      // map(result => result.matches),
      map(result => true),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public authService: AuthService,
              private router: Router) {}

  logOut(): void {
    // log out the user
    this.authService.logout();
    this.router.navigateByUrl('/welcome'); // absolute navigate
  }
}
