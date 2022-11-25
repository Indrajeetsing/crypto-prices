import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser: firebase.User | null;
  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      this.loggedInUser = user;
      console.log(user);
    });
  }

  isLoggedIn() {
    return !!this.loggedInUser;
  }

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
}
