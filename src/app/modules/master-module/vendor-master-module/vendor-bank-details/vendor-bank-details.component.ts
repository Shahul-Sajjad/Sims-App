import { CommonService } from './../../../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SimsHttpCoreServices } from '../../../../services/sims-http-core.service';

@Component({
  selector: 'app-vendor-bank-details',
  templateUrl: './vendor-bank-details.component.html',
  styleUrls: ['./vendor-bank-details.component.scss']
})
export class VendorBankDetailsComponent implements OnInit {
  vendorBankdata: any;
  dataSource: MatTableDataSource<any>;
  loadInboxSpinner: boolean = true;
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(public dialogRef: MatDialogRef<VendorBankDetailsComponent>,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService) { }


  displayvendorColumns: string[] = ['bankName', 'accountNumber', 'beneficary'];
  

  ngOnInit() {
    this.loadInboxSpinner = true;
    this.getvendormasterbankdetails();
  }

  onNoClickb(): void {
    this.dialogRef.close();
  }




  //   GetBankDetailsForVendor


  getvendormasterbankdetails() {
    this.loadInboxSpinner = true;
    let ELEMENT_DATA = []

    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    // // const code = +this.vendorSearchInputform.value.code;
    let serviceName = "GetBankDetailsForVendor";
    let nameSpace = "http://schemas.cordys.com/WINDatabaseMetadata";
    var dataRequest = "<vendor_id>1000000</vendor_id>";
    var soapRequest = "<SOAP:Envelope xmlns:SOAP=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
      "<SOAP:Body>" +
      "<" + serviceName + " xmlns=\"" + nameSpace + "\" preserveSpace=\"no\" qAccess=\"0\" qValues=\"\">" +
      dataRequest +
      "</" + serviceName + ">" +
      "</SOAP:Body>" +
      "</SOAP:Envelope>";
    var parser = new DOMParser();
    parser.parseFromString(soapRequest, "text/xml");
    this.simsHttpCoreServices.httpPost(soapRequest).subscribe(vendorbankdetails => {
      var lists = this.commonService.parseXML(vendorbankdetails);

      //  Response
      var vendorbankTaskLists = lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetBankDetailsForVendorResponse"][0]["tuple"];
      if (lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetBankDetailsForVendorResponse"][0]["tuple"] !== undefined) {
        vendorbankTaskLists.forEach(element => {
          let mtr_vendor_bank_details = {
            bankName: element["old"][0]["mtr_vendor_bank_details"][0]["account_no"][0],
            accountNumber: element["old"][0]["mtr_vendor_bank_details"][0]["bank_name"][0],
            beneficary: element["old"][0]["mtr_vendor_bank_details"][0]["beneficary"][0]["$"] === undefined?element["old"][0]["mtr_vendor_bank_details"][0]["beneficary"][0]:""

          };
          ELEMENT_DATA.push(mtr_vendor_bank_details);
          this.loadInboxSpinner= false;

        });
      } else {

      }

      this.vendorBankdata = new MatTableDataSource(ELEMENT_DATA);
    })
  }
}

