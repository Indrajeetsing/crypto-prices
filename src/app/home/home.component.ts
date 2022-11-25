import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  renderForm: string = 'login';
  constructor() {}

  ngOnInit(): void {}

  loadForm(value: string) {
    this.renderForm = value;
  }
}
