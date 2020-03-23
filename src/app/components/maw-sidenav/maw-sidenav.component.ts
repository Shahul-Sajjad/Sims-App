import { Component, OnInit, ViewChild } from '@angular/core';
import { SimsHttpCoreServices } from '../../services/sims-http-core.service';
import { CommonService } from '../../services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InvoiceDataService } from 'src/app/services/invoice-data.service';
@Component({
  selector: 'maw-sidenav',
  templateUrl: './maw-sidenav.component.html',
  styleUrls: ['./maw-sidenav.component.scss']
})

export class MawSidenavComponent implements OnInit {
  title = 'Muraai-APP-Work';
  events: string[] = [];
  opened: boolean;
  userDetails:any;
  menuList = [];
  dataRequest = '';
  soapRequest = '';

  constructor(
    private commonService: CommonService,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private invoiceDataService: InvoiceDataService
  ) {

  }

  ngOnInit() {
    // Check if user is logged in
    let loginRequest = "<dn></dn>";
    let request1 = this.commonService.getSoapBody("GetUserDetails", "http://schemas.cordys.com/1.0/ldap", loginRequest);
    this.simsHttpCoreServices.httpPost(request1).subscribe((response) => {
      let res = this.commonService.parseXML(response);
      let resVal = res["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetUserDetailsResponse"][0]["tuple"][0]["old"][0]["user"][0]["authuserdn"][0].split(",")[0].split("=")[1];
      if (resVal == 'anonymous') {
        let myWindow = window.open('http://192.168.0.172:96/home/Muraai//com/opentext/login/web/signin.html', 'popup', 'width=200,height=200,')
      } else {
        // Get User details of logged in user
        this.dataRequest = '<ud_userid>' + resVal + '</ud_userid>'
        this.soapRequest = this.commonService.getSoapBody("GetUserDetails", "http://schemas.cordys.com/WINDatabaseMetadata", this.dataRequest);
        this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(response => {
          //Get Menu by Role from response of Get User Details
          let result = this.commonService.parseXML(response);
          //userdetail storage///
          this.userDetails=result["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetUserDetailsResponse"][0].tuple[0].old[0].win_user_details[0]
          ////////////////
          let roleID = result["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetUserDetailsResponse"][0]["tuple"][0]["old"][0]["win_user_details"][0]["ud_role"][0];
          this.invoiceDataService.setUserInfo(result["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetUserDetailsResponse"][0]["tuple"][0]["old"][0]["win_user_details"][0]);
          this.dataRequest = "<roleid>" + roleID + "</roleid>"
          this.soapRequest = this.commonService.getSoapBody("GetMenuByRole", "http://schemas.cordys.com/WINDatabaseMetadata", this.dataRequest);
          this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(response => {
            //Framing the JSON Object to be mapped to the menu and sub menus
            let result = this.commonService.parseXML(response);
            let repMenus = result["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetMenuByRoleResponse"][0]["tuple"][0]["old"][0]["getMenuByRole"][0]["getMenuByRole"][0]["Menu"][0]["Header"];
            for (var i = 0; i < repMenus.length; i++) {
              let groupItems = [];
              let repItems = result["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetMenuByRoleResponse"][0]["tuple"][0]["old"][0]["getMenuByRole"][0]["getMenuByRole"][0]["Menu"][0]["Header"][i]["Item"];
              for (var j = 0; j < repItems.length; j++) {
                let eachItem = {
                  "FormName": repItems[j]["FormName"][0],
                  "FormURL": repItems[j]["FormURL"][0],
                  "ScreenId": repItems[j]["ScreenId"][0]
                };
                groupItems.push(eachItem);
              }
              let eachMenu = { "MenuName": result["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetMenuByRoleResponse"][0]["tuple"][0]["old"][0]["getMenuByRole"][0]["getMenuByRole"][0]["Menu"][0]["Header"][i]["HeadingName"][0], "SubMenus": groupItems };
              this.menuList.push(eachMenu);
            }
          });
        });
      }
    },
      (error) => {
        this.handleError(error);
      });
  }

  handleError(error: HttpErrorResponse) {
    let myWindow = window.open('http://192.168.0.172:96/home/Muraai//com/opentext/login/web/signin.html', 'popup', 'width=200,height=200,')
    myWindow.onclose = () => {
      debugger;
      window.location.reload();
    };
  }
}
