import { Component, OnInit, AfterViewInit } from '@angular/core';
import { mainSketch } from '../core/sketches/main/main';

declare const p5;

@Component({
  selector: 'pf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  p5: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.p5 = new p5(mainSketch);
  }

}
