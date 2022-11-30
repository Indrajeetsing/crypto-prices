import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  loggedIn = false;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.authState().subscribe((user) => (this.loggedIn = !!user));
  }

  logout() {
    this.auth
      .logout()
      .then(() => this.router.navigate(['']))
      .catch((err) => console.log);
  }
}
