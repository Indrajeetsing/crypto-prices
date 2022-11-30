import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.passwordMatchValidator(),
    ]),
  });

  @Output() loadForm = new EventEmitter<string>();

  getEmailErrorMessage() {
    const email = this.signUpForm.get('email');
    if (email?.hasError('required')) {
      return 'Email is required.';
    }

    return email?.hasError('email') ? 'Not a valid email' : '';
  }

  getConfirmPassErrorMessage() {
    const confirmpass = this.signUpForm.get('confirmPassword');
    if (confirmpass?.hasError('required')) {
      return 'Confirm password is required.';
    }

    return confirmpass?.hasError('notSame') ? "Password Doesn't macth." : '';
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const confirmpass = control.value;
      const pass = this.signUpForm?.get('password')?.value;
      return pass !== confirmpass ? { notSame: true } : null;
    };
  }

  ngOnInit(): void {}

  signUp() {
    const { email, password, name } = this.signUpForm.value;
    if (email && password && name) {
      this.auth
        .signUp(email, password)
        .then((res) => {
          if (res.user) {
            const userObj: User = {
              email,
              name,
              last_updated: new Date(),
              id: res.user.uid,
            };
            this.auth
              .addUser(userObj)
              .then(() => this.router.navigate(['dashboard']))
              .catch((err) => console.log);
          }
        })
        .catch((err) => console.log);
    }
  }

  loadLogin() {
    this.loadForm.emit('login');
  }
}
