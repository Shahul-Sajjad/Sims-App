import { Component, OnInit } from '@angular/core';
import xml2js from 'xml2js';  
import * as cordys from "../assets/cordysjsfile.js";
import { SimsCoreService } from "../app/services/sims-core.service";
import { CommonService } from "../app/services/common.service";
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private simsCoreService: SimsCoreService,
              private commonService: CommonService){

  }
  ngOnInit() {
    // this.simsCoreService.addComments();
    // this.commonService.generateXML();
    
  }
}
