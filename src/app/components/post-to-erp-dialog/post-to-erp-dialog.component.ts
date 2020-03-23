import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { InvoiceDataService } from 'src/app/services/invoice-data.service';


@Component({
  selector: 'app-post-to-erp-dialog',
  templateUrl: './post-to-erp-dialog.component.html',
  styleUrls: ['./post-to-erp-dialog.component.scss']
})
export class PostToErpDialogComponent implements OnInit {
  invoiceSummaryForm: FormGroup;
  postToErpData:any;

  
  constructor(
    public dialogRef: MatDialogRef<PostToErpDialogComponent>,
    private fb: FormBuilder,
    private commonService: CommonService,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private invoiceDataService: InvoiceDataService

  ) { }

  ngOnInit() {
    this.initialTableLoad();
    this.postToErpData=this.invoiceDataService.getPostErpBtnData();
    this.GetPayTermsForPOandVndr();
  }

  initialTableLoad() {
    this.invoiceSummaryForm = this.fb.group({
      InvoiceDate: new FormControl(''),
      ReceivedDate: new FormControl(''),
      VendorPayTerms: new FormControl(''),
      InvPayTerms: new FormControl(''),
      PostingDate:new FormControl(''),
      BaselineDate:new FormControl(''),
      ItemText:new FormControl(''),
    });
  }


  GetPayTermsForPOandVndr(){
    const dataRequest =  "<invoice_no>"+this.postToErpData.invoiceno+"</invoice_no><internal_doc_id>"+this.postToErpData.batchid+"</internal_doc_id><erp_id>"+this.postToErpData.erpid+"</erp_id>";
    const soapRequest = this.commonService.getSoapBody('GetPayTermsForPOandVndr', 'http://schemas.cordys.com/WINDatabaseMetadata', dataRequest);
    this.simsHttpCoreServices.httpPost(soapRequest).subscribe(PayTermsForPOandVndrResponse => {
      let PayTermsForPOandVndrlist = this.commonService.parseXML(PayTermsForPOandVndrResponse);
      let PayTermsForPOandVndr = PayTermsForPOandVndrlist["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0].GetPayTermsForPOandVndrResponse[0].tuple;
      this.setValueToTheTextField(PayTermsForPOandVndr)
    });
  }
  setValueToTheTextField(PayTermsForPOandVndr){
    this.invoiceSummaryForm.patchValue({
      InvoiceDate: PayTermsForPOandVndr[0].old[0].invoice_header[0].invoice_date[0] instanceof Object ?"": PayTermsForPOandVndr[0].old[0].invoice_header[0].invoice_date[0].substring(0,10),
      ReceivedDate: PayTermsForPOandVndr[0].old[0].invoice_header[0].invoice_recieved_date[0] instanceof Object ?"":PayTermsForPOandVndr[0].old[0].invoice_header[0].invoice_recieved_date[0].substring(0,10),
      VendorPayTerms: PayTermsForPOandVndr[0].old[0].invoice_header[0].pay_terms_value[0] instanceof Object ?"":PayTermsForPOandVndr[0].old[0].invoice_header[0].pay_terms_value[0],
      InvPayTerms: PayTermsForPOandVndr[0].old[0].invoice_header[0].payment_terms[0] instanceof Object ?"":PayTermsForPOandVndr[0].old[0].invoice_header[0].payment_terms[0],
      PostingDate: PayTermsForPOandVndr[0].old[0].invoice_header[0].invoice_date[0] instanceof Object ?"":PayTermsForPOandVndr[0].old[0].invoice_header[0].invoice_date[0],
      BaselineDate: PayTermsForPOandVndr[0].old[0].invoice_header[0].due_date[0] instanceof Object ?"":PayTermsForPOandVndr[0].old[0].invoice_header[0].due_date[0],
      ItemText:this.postToErpData.scanNo
    })
  }


  submitForPosting(){
  this.dialogRef.close();
  }
}
