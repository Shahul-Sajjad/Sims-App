import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
  signin() {
    //   $.cordys.authentication.sso.authenticate($("#inputName").val(), $("#inputPassword").val()).done(function () {
    //     debugger;
    //     window.opener.location.href = window.opener.location.href + '/index.html';
    //     window.close();

    //   });
    // }
  }
}

