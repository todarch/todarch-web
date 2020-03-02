import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  return = '';
  hide = true;

  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.return = params['return'] || '/dashboard';
        if (!this.authService.isGuest()) {
          this.go();
        }
      });
  }

  private go() {
    this.router.navigateByUrl(this.return);
  }
  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username, password);
    this.go();
  }
}
