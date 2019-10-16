import { Component, OnInit } from '@angular/core';
import { LearningContents } from './learning-content.data';

@Component({
  selector: 'pf-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  navItems: any[] = [];

  constructor() {
    this.navItems = LearningContents;
  }

  ngOnInit() {
  }

}
