import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { SimsCoreService } from 'src/app/services/sims-core.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-update-invoice-type-details',
  templateUrl: './update-invoice-type-details.component.html',
  styleUrls: ['./update-invoice-type-details.component.scss']
})
export class UpdateInvoiceTypeDetailsComponent implements OnInit {
  currentIndex = null;
  invoiceForm: FormGroup;
  constructor(public invoiceDialogRef: MatDialogRef<UpdateInvoiceTypeDetailsComponent>,
    private invoiceUpdateFormBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private simsCoreService: SimsCoreService,
    private commonService : CommonService) { }

  ngOnInit() {
    this.currentIndex = this.data.index; 
    this.invoiceForm = this.invoiceUpdateFormBuilder.group({
      slNo : new FormControl(this.data.row.slNo),
      invoiceType : new FormControl(this.data.row.invoiceType)
    });
  }

  updateInvoiceTypeDetails(){
    let serviceName = "UpdateMtr_ap_invoice_type";
    let nameSpace = "http://schemas.cordys.com/WINDatabaseMetadata";
    var dataRequest = "<tuple><old><mtr_ap_invoice_type qConstraint=\"0\"><slno>"+ this.invoiceForm.value.slNo +"</slno></mtr_ap_invoice_type></old><new><mtr_ap_invoice_type qAccess=\"0\" qConstraint=\"0\" qInit=\"0\" qValues=\"\"><slno>"+ this.invoiceForm.value.slNo+"</slno><invoice_type>"+ this.invoiceForm.value.invoiceType +"</invoice_type></mtr_ap_invoice_type></new></tuple>"
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
      var invoiceTypeList = this.commonService.parseXML(response);
    });
  }

  updateInvoice(){
    this.updateInvoiceTypeDetails();
    this.invoiceDialogRef.close({updatedInvoiceData: this.invoiceForm, action: 'saved', index: this.currentIndex});
  }
}
