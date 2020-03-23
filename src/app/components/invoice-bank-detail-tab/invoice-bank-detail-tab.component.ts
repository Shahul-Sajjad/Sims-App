import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { CommonService } from 'src/app/services/common.service';
import { BankDetails } from 'src/app/models/invoice-item.model';
import { InvoiceDataService } from 'src/app/services/invoice-data.service';


@Component({
  selector: 'app-invoice-bank-detail-tab',
  templateUrl: './invoice-bank-detail-tab.component.html',
  styleUrls: ['./invoice-bank-detail-tab.component.scss']
})
export class InvoiceBankDetailTabComponent implements OnInit {
  @Input() invoiceNum;
  @Input() internalDocId;
  vendordataRequest: string;
  soapRequest: string;
  BankDetails_ELEMENT_DATA: BankDetails[] = [];
  displayedColumns: string[] = ['invoice', 'internal_doc_id', 'bank', 'beneficiary', 'account_no', 'swift', 'iban', 'currency_type'];
  dataSource = new MatTableDataSource<BankDetails>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  columnHeaderName = [
    {
      lineNo: 0,
      headerId: "invoice"
    },
    {
      lineNo: 1,
      headerId: "internal_doc_id"
    },
    {
      lineNo: 2,
      headerId: "bank"
    },
    {
      lineNo: 3,
      headerId: "beneficiary"
    },
    {
      lineNo: 4,
      headerId: "account_no"
    },
    {
      lineNo: 5,
      headerId: "swift"
    },
    {
      lineNo: 6,
      headerId: "iban"
    },
    {
      lineNo: 7,
      headerId: "currency_type"
    }]


  constructor(
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService,
    private invoiceDataService: InvoiceDataService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getBankDetails(this.invoiceNum, this.internalDocId);
  }



  getBankDetails(InvoiceNumber: string, InternalDocId: string) {
    this.vendordataRequest = "<internal_doc_id>" + InternalDocId + "</internal_doc_id><invoice_no>" + InvoiceNumber + "</invoice_no>";
    this.soapRequest = this.commonService.getSoapBody("GetInvoiceBankDetails", "http://schemas.cordys.com/WINDatabaseMetadata", this.vendordataRequest);
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(BankDetailResult => {
      let bankDetaillist = this.commonService.parseXML(BankDetailResult);
      let bankDetail = bankDetaillist["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0].GetInvoiceBankDetailsResponse[0].tuple;
      bankDetail.map((x, index) => {
        let bankDetailModel = {
          invoice: x.old[0].ap_invoice_bank_details[0].invoice_no[0] instanceof Object ? "undefined" : x.old[0].ap_invoice_bank_details[0].invoice_no[0],
          internal_doc_id: x.old[0].ap_invoice_bank_details[0].internal_doc_id[0] instanceof Object ? "undefined" : x.old[0].ap_invoice_bank_details[0].internal_doc_id[0],
          beneficiary: x.old[0].ap_invoice_bank_details[0].beneficary[0] instanceof Object ? "undefined" : x.old[0].ap_invoice_bank_details[0].beneficary[0],
          bank_name: x.old[0].ap_invoice_bank_details[0].bank_name[0] instanceof Object ? "undefined" : x.old[0].ap_invoice_bank_details[0].bank_name[0],
          account_no: x.old[0].ap_invoice_bank_details[0].account_no[0] instanceof Object ? "undefined" : x.old[0].ap_invoice_bank_details[0].account_no[0],
          swift: x.old[0].ap_invoice_bank_details[0].swift[0] instanceof Object ? "undefined" : x.old[0].ap_invoice_bank_details[0].swift[0],
          iban: x.old[0].ap_invoice_bank_details[0].iban[0] instanceof Object ? "undefined" : x.old[0].ap_invoice_bank_details[0].iban[0],
          currency_type: x.old[0].ap_invoice_bank_details[0].curr_type[0] instanceof Object ? "undefined" : x.old[0].ap_invoice_bank_details[0].curr_type[0],
        }
        this.BankDetails_ELEMENT_DATA.push(bankDetailModel);
        if (bankDetail.length - 1 == index)
          this.dataSource = new MatTableDataSource<BankDetails>(this.BankDetails_ELEMENT_DATA);
      });
    });
  }

}
