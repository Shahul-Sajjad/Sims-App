import { Component, OnInit } from '@angular/core';
import * as userQuickLink from 'task-menu.json';

@Component({
  selector: 'app-maw-quicklinknav',
  templateUrl: './maw-quicklinknav.component.html',
  styleUrls: ['./maw-quicklinknav.component.scss']
})
export class MawQuicklinknavComponent implements OnInit {
  quickLinks ;
  constructor() {
  }

  ngOnInit() {
    const wholeArray = Object.keys(userQuickLink.ap_processor).map(key => userQuickLink.ap_processor[key]);
    this.quickLinks = wholeArray;
  }

}
