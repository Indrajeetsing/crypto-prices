import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  hide = true;
  @Output() loadForm = new EventEmitter<string>();

  getEmailErrorMessage() {
    const email = this.loginForm.get('email');
    if (email?.hasError('required')) {
      return 'Email is required.';
    }

    return email?.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
    console.log(this.auth.isLoggedIn());
  }

  login() {
    this.router.navigate(['dashboard']);
  }

  loadSignUp() {
    this.loadForm.emit('signUp');
  }
}
