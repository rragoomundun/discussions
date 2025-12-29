import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
})
export class Home implements OnInit {
  constructor() {
    console.log('IN CONSTRUCTOR');
  }

  ngOnInit(): void {
    console.log('IN NGONINIT');
  }
}
