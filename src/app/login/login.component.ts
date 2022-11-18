import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  hide = true;

  getErrorMessage() {
    const email = this.loginForm.get('email');
    if (email?.hasError('required')) {
      return 'Email is required.';
    }

    return email?.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {}

  login() {
    this.router.navigate(['dashboard']);
  }
}
