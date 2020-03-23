import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InvoiceDataService } from 'src/app/services/invoice-data.service';
import { CommonService } from 'src/app/services/common.service';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';

@Component({
  selector: 'app-invoice-comment-tab',
  templateUrl: './invoice-comment-tab.component.html',
  styleUrls: ['./invoice-comment-tab.component.scss']
})
export class InvoiceCommentTabComponent implements OnInit {

  invoiceCommentForm = new FormGroup({
    comments: new FormControl(''),
    previousComments: new FormControl('')
  });

  docId: string;
  batchId: string;
  commentdataRequest: string;
  soapRequest: string;




  constructor(private invoiceDataService: InvoiceDataService, private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService) { }

  ngOnInit() {
    this.docId = "32233";
    this.batchId = "231"
    this.getInvoicecomment();
  }

  onKey(event: any) {
    this.invoiceDataService.setInvoiceCommentData(this.invoiceCommentForm.value);
    this.invoiceDataService.invoiceDetailHandler.next(false);
  }


  getInvoicecomment() {

    this.commentdataRequest = "<doc_id>" + this.docId + "</doc_id><batch_id>" + this.batchId + "</batch_id>";
    this.soapRequest = this.commonService.getSoapBody("GetCommentsnDocId", "http://schemas.cordys.com/WINDatabaseMetadata", this.commentdataRequest);
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(vendordetails => {
      var lists = this.commonService.parseXML(vendordetails);

      // Response
      var vendorTaskLists = lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetCommentsnDocIdResponse"][0]["tuple"];
      if (lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetCommentsnDocIdResponse"][0]["tuple"] !== undefined) {
        vendorTaskLists.forEach(element => {
          this.setInvoiCommentFormData(element);

        });
      }

    });

  }
  setInvoiCommentFormData(element) {
    let prevComments = element["old"][0]["ap_comments"][0]["comment"][0] instanceof Object ? "" : element["old"][0]["ap_comments"][0]["comment"][0];
    let prevCommentBy = element["old"][0]["ap_comments"][0]["comment_by"][0] instanceof Object ? "" : element["old"][0]["ap_comments"][0]["comment_by"][0];
    let prevCommentDate = element["old"][0]["ap_comments"][0]["comment_date"][0] instanceof Object ? "" : element["old"][0]["ap_comments"][0]["comment_date"][0];
    this.invoiceCommentForm.patchValue({
    previousComments: prevComments + '\n'+ "Comment By:" +prevCommentBy + '\n' +"Comment date:" +prevCommentDate
    })
  }
}
