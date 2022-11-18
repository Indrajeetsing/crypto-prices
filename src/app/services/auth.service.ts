import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser = {
    email: 'john@mail.com',
    first_name: 'John',
    last_name: 'Doe',
    id: '1238sdhksf3',
  };
  constructor() {}

  isLoggedIn() {
    return !!this.loggedInUser;
  }
}
