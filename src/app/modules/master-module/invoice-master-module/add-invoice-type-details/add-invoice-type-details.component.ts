import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { SimsCoreService } from 'src/app/services/sims-core.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-invoice-type-details',
  templateUrl: './add-invoice-type-details.component.html',
  styleUrls: ['./add-invoice-type-details.component.scss']
})
export class AddInvoiceTypeDetailsComponent implements OnInit {
  invoiceForm : FormGroup;

  constructor(public userDialogRef: MatDialogRef<AddInvoiceTypeDetailsComponent>,
    private invoiceFormBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private simsCoreService: SimsCoreService,
    private commonService : CommonService) { }

  ngOnInit() {
    this.invoiceForm = this.invoiceFormBuilder.group({
      slNo : new FormControl(''),
      invoiceType : new FormControl('')
    })
  }


  addInvoiceTypeDetails(){
    let serviceName = "UpdateMtr_ap_invoice_type";
    let nameSpace = "http://schemas.cordys.com/WINDatabaseMetadata";
    var dataRequest = "<tuple><new><mtr_ap_invoice_type qAccess=\"0\" qConstraint=\"0\" qInit=\"0\" qValues=\"\"><slno>"+ this.invoiceForm.value.slNo +"</slno><invoice_type>"+ this.invoiceForm.value.invoiceType +"</invoice_type></mtr_ap_invoice_type></new></tuple>"
      var soapRequest = "<SOAP:Envelope xmlns:SOAP=\"http://schemas.xmlsoap.org/soap/envelope/\">"+
          "<SOAP:Body>" +
            "<" + serviceName + " xmlns=\"" + nameSpace + "\"  reply=\"yes\" commandUpdate=\"no\" preserveSpace=\"no\" batchUpdate=\"no\" >" +
        
               dataRequest + 
            "</" + serviceName + ">"+
          "</SOAP:Body>"+
        "</SOAP:Envelope>";
      
      var parser = new DOMParser();
      parser.parseFromString(soapRequest,"text/xml");
      this.simsHttpCoreServices.httpPost(soapRequest).subscribe(response => {
        var addInvoiceTypeList = this.commonService.parseXML(response);
        console.log("addInvoiceTypeList :"+addInvoiceTypeList);
      });
    }

  addInvoiceDetails(){
    this.addInvoiceTypeDetails();
    this.userDialogRef.close({invoiceUpdatedData: this.invoiceForm});
  }
}
