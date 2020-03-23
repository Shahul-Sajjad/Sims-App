/*!
 * @license
 * Copyright 2017 Muraai Information Technologies, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CommonService } from './common.service';
@Injectable()
export class SimsHttpCoreServices {
  auth = 'localhost';
  url = '';
  constructor(private http: HttpClient,
              private commonService: CommonService) {
                this.getCookies();
              }
  //Function to get SAMLArt from cookies
  public getCookies() {
    let samlArt = '';
    let cookieVals = document.cookie.split(';');
    for(var i=0;i<cookieVals.length;i++)
    {
      if(cookieVals[i].indexOf('SAMLart')>-1)
      {
        samlArt = cookieVals[i].substring(cookieVals[i].indexOf('SAMLart')+8);
      }
    }
    // Getting URL from app.config.json
    this.commonService.getAppConfigJSON('url').subscribe(getURL => {
      this.url = getURL + samlArt;
    })    
  }
  
  
  
  //Function to trigger a Webservice
 
  public httpPost(data, header = {'Content-Type' : 'application/xml' }) {
    return this.http.post( this.url, data, { responseType: 'text' });
  } 
}
