import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from './common.service';
import { SimsHttpCoreServices } from './sims-http-core.service';
declare var $: any;

@Injectable()
export class SimsCoreService {
  getvendormasterdetails() {
    throw new Error("Method not implemented.");
  }
  headers: any;
  public xmlItems: any;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private commonService: CommonService,
    private simsHttpCoreServices: SimsHttpCoreServices
    ) {
    }
    getDefaultinst_SAMLart() {
      return this.cookieService.get('defaultinst_SAMLart');
    }

    canActivate(): void{
      if ($.cordys.getCookieObject('cordys_SAMLart').value === '') {
        console.log('no data')
      }
    }

  getData() {  
    this.http.get('/home/system/com.eibus.sso.web.authentication.PreLoginInfo.wcp',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml'), 
          responseType: 'text'  
      })  
      .subscribe((data) => {  
        this.commonService.parseXML(data)  
          .then((data) => {  
            this.xmlItems = data;  
            console.log(this.xmlItems);
            
          });  
      });  
  }
  
  // Sample function with example of invoking a webservice
  addComments() {
    let serviceName = "UpdateAp_comments";
    let nameSpace = "http://schemas.cordys.com/WINDatabaseMetadata";
    var dataRequest = "<tuple><new><ap_comments><slno /><document_id></document_id><batch_id>123</batch_id><comment>t4est</comment><comment_by>sameer</comment_by></ap_comments></new></tuple>"
    var soapRequest = "<SOAP:Envelope xmlns:SOAP=\"http://schemas.xmlsoap.org/soap/envelope/\">"+
        "<SOAP:Body>" +
          "<" + serviceName + " xmlns=\"" + nameSpace + "\" reply=\"yes\" commandUpdate=\"no\" preserveSpace=\"no\" batchUpdate=\"no\">" +
      
             dataRequest + 
          "</" + serviceName + ">"+
        "</SOAP:Body>"+
      "</SOAP:Envelope>";
    var parser = new DOMParser();
    parser.parseFromString(soapRequest,"text/xml");
    this.simsHttpCoreServices.httpPost(soapRequest).subscribe(response => {
    });
  }
}


