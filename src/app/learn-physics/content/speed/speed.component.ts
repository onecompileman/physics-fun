import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pf-speed',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.scss']
})
export class SpeedComponent implements OnInit {

  currentSlide = 1;

  constructor() { }

  ngOnInit() {
  }

  next() {
    this.currentSlide++;
  }

  back() {
    this.currentSlide--;
  }

}
