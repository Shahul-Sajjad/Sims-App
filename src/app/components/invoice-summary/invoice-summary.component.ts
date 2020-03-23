import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatSelect, MatSnackBar } from '@angular/material';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { Router } from '@angular/router';
import { ArrayDataSource } from '@angular/cdk/collections';
import { element } from 'protractor';


export interface InvoiceSummary {
  stage: string;
  PDF: string;
  UrgentFlag: string;
  EntityName: string;
  VendorName: string;
  VendorCode: string;
  Invoice: string;
  PendingWith: string;
  Type: string;
  Classification: string;
  WorkItem: string;
  InvoiceDate: string;
  Currency: string;
  Mode: string;
  RecievedDate: string;
  Status: string;
  PO: string;
  BuyerApprover: string;
  ERPdueDate: string;
  PostingDocNum: string;
  PostingDate: string;
  ProcessedBy: string;
  GrossInvAmt: string;
  OCCId: string;
  PaymentNo: string;
  PaymentDate: string;
  PaymentStatus: string;
}
export interface SelectMenu {
  value: string,
  key: string
}
let ELEMENT_DATA: InvoiceSummary[] = [];

export interface VendorCodeList {
  vendorCode: string;
  vendorName: string;

}
export interface StatusElement {
  invoiceStatus: string;
}
export interface InvoiceStatusClassification {
  invoiceClassification: string;

}
export interface PaginationItems {
  value: string;
}


@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.scss'],
  providers: [DatePipe]
})


export class InvoiceSummaryComponent implements OnInit {

  preselectedValues = ['stage', 'EntityName', 'VendorName', 'VendorCode', 'Invoice', 'PDF', 'PendingWith', 'UrgentFlag', 'Type', 'Classification', 'WorkItem', 'InvoiceDate', 'Currency', 'Mode'];
  collapsed = true;
  invoiceSummaryForm: FormGroup;
  products = [];
  title = 'sims-app';
  dataRequest = '';
  soapRequest = '';
  position: number = 0;
  numberOfRows: number = 5;
  pageIndex: number = 0;
  var = this.preselectedValues.length;
  tableMenuLen: number = this.var;
  loadSummarySpinner: boolean = true;
  fromInvoiceDateformat: string;
  toInvoiceDateformat: string;
  displayedColumns: string[] = ['stage', 'EntityName', 'VendorName', 'VendorCode', 'Invoice', 'PDF', 'PendingWith', 'UrgentFlag', 'Type', 'Classification', 'WorkItem', 'InvoiceDate', 'Currency', 'Mode', 'RecievedDate', 'Status', 'PO', 'BuyerApprover', 'ERPdueDate', 'PostingDocNum', 'PostingDate', 'ProcessedBy', 'GrossInvAmt', 'OCCId', 'PaymentNo', 'PaymentDate', 'PaymentStatus'];
  invoicesummaryDataSource = new MatTableDataSource(ELEMENT_DATA);
  statusElement: StatusElement[] = [];
  vendorCodeList: VendorCodeList[] = [];
  invoiceStatusClassification: InvoiceStatusClassification[] = [{ "invoiceClassification": "Invoice Classification" }];
  selected = '5';
  openAdvanceSearch: boolean;
  icon: string;


  paginationItems: PaginationItems[] = [
    { value: '5' },
    { value: '10' },
    { value: '20' },
    { value: '30' },
    { value: '50' }
  ];

  constructor(
    private fb: FormBuilder,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService,
    private router: Router,
    private _snackBar: MatSnackBar,

  ) {
    this.openAdvanceSearch = false;
    this.icon = 'keyboard_arrow_down';
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  @Input() multiple: boolean = true;
  ngOnInit() {
    this.loadSummarySpinner = true;
    this.invoicesummaryDataSource.sort = this.sort;
    this.getVendorCodeList();
    this.getAllInvoiceStatus();
    this.getInvoiceClassification();
    this.initialTableLoad();
  }

  invoiceDetails(row, index): void {
    this.router.navigate(['/invoice-details'], { queryParams: { invoiceNumber: row, internalId: index, taskId: '', mode: '', isButtonEnable: false } });
  }

  initialTableLoad() {
    this.invoiceSummaryForm = this.fb.group({
      PO: new FormControl(''),
      Invoice: new FormControl(''),
      VendorCode: new FormControl(''),
      VendorName: new FormControl(''),
      InvoiceStatusCode: new FormControl(''),
      InvoiceClassification: new FormControl(''),
      FromInvoiceDate: new FormControl(''),
      ToInvoiceDate: new FormControl(''),
      EntityName: new FormControl(''),
      FromReceivedDate: new FormControl(''),
      ToReceivedDate: new FormControl(''),
      Type: new FormControl(''),
      DocumentNo: new FormControl(''),
      PendingWith: new FormControl('')
    });
    this.getSummaryTable();
  }

  resetForm() {
    this.invoiceSummaryForm.reset();
    this.initialTableLoad();
  }

  modifyCollapse(event: any) {
    this.collapsed = !this.collapsed;
  }

  getSummaryTable() {
    ELEMENT_DATA = [];
    this.invoicesummaryDataSource = new MatTableDataSource(ELEMENT_DATA);
    this.loadSummarySpinner = true;
    let fromDate = this.invoiceSummaryForm.value.FromInvoiceDate ? moment(this.invoiceSummaryForm.value.FromInvoiceDate).format('YYYY-MM-(DD') : "";
    let toDate = this.invoiceSummaryForm.value.ToInvoiceDate ? moment(this.invoiceSummaryForm.value.ToInvoiceDate).format('YYYY-MM-DD') : "";
    this.dataRequest = "<cursor id='0' position='" + this.position + "' numRows='" + this.numberOfRows + "' maxRows='99999' sameConnection='false' /><InvoiceNumber>" + this.invoiceSummaryForm.value.Invoice + "</InvoiceNumber><PO>" + this.invoiceSummaryForm.value.PO + "</PO><Vendor>" + this.invoiceSummaryForm.value.VendorCode + "</Vendor><Status>" + this.invoiceSummaryForm.value.InvoiceStatusCode + "</Status><FromDate>" + fromDate + "</FromDate><ToDate>" + toDate + "</ToDate><invoice_category>" + this.invoiceSummaryForm.value.Type + "</invoice_category><entitycode>" + this.invoiceSummaryForm.value.EntityName + "</entitycode><invoice_category>" + this.invoiceSummaryForm.value.InvoiceClassification + "</invoice_category><pendingWith>" + this.invoiceSummaryForm.value.PendingWith + "</pendingWith><docNo>" + this.invoiceSummaryForm.value.DocumentNo + "</docNo>";
    this.soapRequest = this.commonService.getSoapBody("GetInvoiceSummary", "http://schemas.cordys.com/WINDatabaseMetadata", this.dataRequest);
    var parser = new DOMParser();
    parser.parseFromString(this.soapRequest, "text/xml");
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(response => {
      var summarytable = this.commonService.parseXML(response);
      var summaryTableArr = summarytable["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetInvoiceSummaryResponse"][0]["tuple"];
      summaryTableArr.forEach(element => {
        let summaryTableData = {

          stage: element["old"][0]["TABLE"][0]["stage"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["stage"][0],
          internalID: element["old"][0]["TABLE"][0]["internal_doc_id"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["internal_doc_id"][0],
          PDF: element["old"][0]["TABLE"][0]["invoice_pdf"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["invoice_pdf"][0],
          UrgentFlag: element["old"][0]["TABLE"][0]["isUrgent"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["isUrgent"][0],
          EntityName: element["old"][0]["TABLE"][0]["name"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["name"][0],
          VendorName: element["old"][0]["TABLE"][0]["vendor_name"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["vendor_name"][0],
          VendorCode: element["old"][0]["TABLE"][0]["vendor"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["vendor"][0],
          Invoice: element["old"][0]["TABLE"][0]["invoice_no"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["invoice_no"][0],
          PendingWith: element["old"][0]["TABLE"][0]["pending_with"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["pending_with"][0],
          Type: element["old"][0]["TABLE"][0]["invoice_category"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["invoice_category"][0],
          Classification: element["old"][0]["TABLE"][0]["classf"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["classf"][0],
          WorkItem: element["old"][0]["TABLE"][0]["work_item"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["work_item"][0],
          InvoiceDate: element["old"][0]["TABLE"][0]["invoice_date"][0] instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["invoice_date"][0]).format('YYYY-MM-DD'),
          Currency: element["old"][0]["TABLE"][0]["currency"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["currency"][0],
          Mode: element["old"][0]["TABLE"][0]["invoice_src"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["invoice_src"][0],
          RecievedDate: element["old"][0]["TABLE"][0]["invoice_recieved_date"][0] instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["invoice_recieved_date"][0]).format('YYYY-MM-DD'),
          Status: element["old"][0]["TABLE"][0]["InvoiceStatus"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["InvoiceStatus"][0],
          PO: element["old"][0]["TABLE"][0]["PO"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["PO"][0],
          BuyerApprover: element["old"][0]["TABLE"][0]["approved_by"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["approved_by"][0],
          ERPdueDate: element["old"][0]["TABLE"][0]["erp_due_date"][0] instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["erp_due_date"][0]).format('YYYY-MM-DD'),
          PostingDocNum: element["old"][0]["TABLE"][0]["posting_doc_no"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["posting_doc_no"][0],
          PostingDate: element["old"][0]["TABLE"][0]["posted_date"][0] instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["posted_date"][0]).format('YYYY-MM-DD'),
          ProcessedBy: element["old"][0]["TABLE"][0]["processed_by"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["processed_by"][0],
          GrossInvAmt: element["old"][0]["TABLE"][0]["sub_total"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["sub_total"][0],
          OCCId: element["old"][0]["TABLE"][0]["occ_docid"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["occ_docid"][0],
          PaymentNo: element["old"][0]["TABLE"][0]["payment_no"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["payment_no"][0],
          PaymentDate: element["old"][0]["TABLE"][0]["payment_date"][0] instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["payment_date"][0]).format('YYYY-MM-DD'),
          PaymentStatus: element["old"][0]["TABLE"][0]["payment_status"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["payment_status"][0],
        };
        ELEMENT_DATA.push(summaryTableData);
      });
      this.invoicesummaryDataSource.paginator = this.paginator;
      this.invoicesummaryDataSource.sort = this.sort;
      this.loadSummarySpinner = false;
      this.displayedColumns = this.preselectedValues;
      this.menuList = this.preselectedValues;
    });
  }

  //Get all invoice status
  getAllInvoiceStatus() {
    this.dataRequest = "";
    this.soapRequest = this.commonService.getSoapBody("GetAllInvoiceStatus", "http://schemas.cordys.com/WINDatabaseMetadata", this.dataRequest);
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(response => {
      var invoiceItems = this.commonService.parseXML(response);
      var dropDownItems = invoiceItems["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetAllInvoiceStatusResponse"][0]["tuple"];
      dropDownItems.forEach(element => {
        let statusList = {
          invoiceStatus: element["old"][0]["mtr_invoice_status"][0]["invoice_status"][0],
          invoiceStatusCode: element["old"][0]["mtr_invoice_status"][0]["id"][0],
        };
        this.statusElement.push(statusList);
      });
    });
  }

  getVendorCodeList() {
    this.dataRequest = "<vendor_code></vendor_code><vendor_name></vendor_name>";
    this.soapRequest = this.commonService.getSoapBody("GetDistinctVendorList", "http://schemas.cordys.com/WINDatabaseMetadata", this.dataRequest);
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(response => {
      var vendorCodeList = this.commonService.parseXML(response);
      var dropDownItems = vendorCodeList["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetDistinctVendorListResponse"][0]["tuple"];
      dropDownItems.forEach(element => {
        let vendorList = {
          vendorCode: element.old[0].invoice_header[0].vendor_code[0] instanceof Object ? "" : element.old[0].invoice_header[0].vendor_code[0],
          vendorName: element.old[0].invoice_header[0].vendor_name[0] instanceof Object ? "" : element.old[0].invoice_header[0].vendor_name[0],
        };
        this.vendorCodeList.push(vendorList);
      });
    });
  }


  //Get all invoice classification
  getInvoiceClassification() {
    this.dataRequest = "<cursor id='0' position='0' numRows='30' maxRows='99999' sameConnection='false' /><fromSlno>1</fromSlno><toSlno>30</toSlno>";
    this.soapRequest = this.commonService.getSoapBody("GetMtr_ap_invoice_typeObjects", "http://schemas.cordys.com/WINDatabaseMetadata", this.dataRequest);
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(response => {
      var classificationItems = this.commonService.parseXML(response);
      var dropdownClassList = classificationItems["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetMtr_ap_invoice_typeObjectsResponse"][0]["tuple"];
      dropdownClassList.forEach(element => {
        let statusClassList = {
          invoiceClassification: element["old"][0]["mtr_ap_invoice_type"][0]["invoice_type"][0]
        };
        this.invoiceStatusClassification.push(statusClassList);
      });

    });
  }
  //to set vendor name on select of vendor code
  vendorNameSet(vendorList) {
    const vendorCode = this.vendorCodeList.filter(el => el.vendorCode === vendorList.vendorCode)
    this.invoiceSummaryForm.controls.VendorName.setValue(vendorList.vendorName);
  }

  //for drop_down select menu
  menuItems: SelectMenu[] = [
    { key: "All", value: 'all' },
    { key: "Stage", value: 'stage' },
    { key: "Entity name", value: 'EntityName' },
    { key: "Vendor name", value: 'VendorName' },
    { key: "Vendor code", value: 'VendorCode' },
    { key: "Invoice", value: 'Invoice' },
    { key: "PDF", value: 'PDF' },
    { key: "Pending with", value: 'PendingWith' },
    { key: "Urgent flag", value: 'UrgentFlag' },
    { key: "Type", value: 'Type' },
    { key: "Classification", value: 'Classification' },
    { key: "Work item", value: 'WorkItem' },
    { key: "Invoice date", value: 'InvoiceDate' },
    { key: "Currency", value: 'Currency' },
    { key: "Mode", value: 'Mode' },
    { key: "Recieved date", value: 'RecievedDate' },
    { key: "Status", value: 'Status' },
    { key: "PO", value: 'PO' },
    { key: "Buyer approver", value: 'BuyerApprover' },
    { key: "ERP due date", value: 'ERPdueDate' },
    { key: "Posting doc dum", value: 'PostingDocNum' },
    { key: "Posting date", value: 'PostingDate' },
    { key: "Processed by", value: 'ProcessedBy' },
    { key: "Gross inv amt", value: 'GrossInvAmt' },
    { key: "OCC id", value: 'OCCId' },
    { key: "Payment no", value: 'PaymentNo' },
    { key: "Payment date", value: 'PaymentDate' },
    { key: "Payment status", value: 'PaymentStatus' },
  ];

  menuList = [];

  onSelectMenus(event: any) {
    const modificationArray = ['all', 'RecievedDate', 'Status', 'PO', 'BuyerApprover', 'ERPdueDate', 'PostingDocNum', 'PostingDate', 'ProcessedBy', 'GrossInvAmt', 'OCCId', 'PaymentNo', 'PaymentDate', 'PaymentStatus'];
    if (event.value.includes('all')) {
      this.preselectedValues = ['stage', 'EntityName', 'VendorName', 'VendorCode', 'Invoice', 'PDF', 'PendingWith', 'UrgentFlag', 'Type', 'Classification', 'WorkItem', 'InvoiceDate', 'Currency', 'Mode'];
      this.preselectedValues = this.preselectedValues.concat(modificationArray);
      this.displayedColumns = ['stage', 'EntityName', 'VendorName', 'VendorCode', 'Invoice', 'PDF', 'PendingWith', 'UrgentFlag', 'Type', 'Classification', 'WorkItem', 'InvoiceDate', 'Currency', 'Mode', 'RecievedDate', 'Status', 'PO', 'BuyerApprover', 'ERPdueDate', 'PostingDocNum', 'PostingDate', 'ProcessedBy', 'GrossInvAmt', 'OCCId', 'PaymentNo', 'PaymentDate', 'PaymentStatus'];
      this.preselectedValues.push('all');
    } else {
      this.menuList = event.value;
      this.displayedColumns = this.menuList;
      this.tableMenuLen = this.displayedColumns.length;
    }

    if (this.tableMenuLen <= 1) {
      this.openSnackBar('Select atleast one item!!', '');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['snackBarColor']
    });
  }

  firstPage() {
    this.position = 0;
    this.nextPreviousPage(this.numberOfRows, this.position);

  }

  prviousPage() {
    if (this.position > 0) {
      this.position = this.position - this.numberOfRows;
    }
    else if (this.position = 0) {
      this.position = 0;
    }
    this.nextPreviousPage(this.numberOfRows, this.position);
  }

  nextPage() {
    this.position = this.position + this.numberOfRows;
    this.nextPreviousPage(this.numberOfRows, this.position);
  }

  lastPage() {
  }
  onSelectPaginationItems(event: any) {
    this.numberOfRows = +event.value;
    this.position = 0;
    this.nextPreviousPage(this.numberOfRows, this.position);
  }


  nextPreviousPage(numberOfRows, position) {
    ELEMENT_DATA = [];
    this.invoicesummaryDataSource = new MatTableDataSource(ELEMENT_DATA);
    this.loadSummarySpinner = true;
    let fromDate = this.invoiceSummaryForm.value.FromInvoiceDate ? moment(this.invoiceSummaryForm.value.FromInvoiceDate).format('YYYY-MM-(DD') : "";
    let toDate = this.invoiceSummaryForm.value.ToInvoiceDate ? moment(this.invoiceSummaryForm.value.ToInvoiceDate).format('YYYY-MM-DD') : "";
    this.dataRequest = "<cursor id='0' position='" + position + "' numRows='" + numberOfRows + "' maxRows='99999' sameConnection='false' /><InvoiceNumber>" + this.invoiceSummaryForm.value.Invoice + "</InvoiceNumber><PO>" + this.invoiceSummaryForm.value.PO + "</PO><Vendor>" + this.invoiceSummaryForm.value.VendorCode + "</Vendor><Status>" + this.invoiceSummaryForm.value.InvoiceStatusCode + "</Status><FromDate>" + fromDate + "</FromDate><ToDate>" + toDate + "</ToDate><invoice_category>" + this.invoiceSummaryForm.value.Type + "</invoice_category><entitycode>" + this.invoiceSummaryForm.value.EntityName + "</entitycode><invoice_category>" + this.invoiceSummaryForm.value.InvoiceClassification + "</invoice_category><pendingWith>" + this.invoiceSummaryForm.value.PendingWith + "</pendingWith><docNo>" + this.invoiceSummaryForm.value.DocumentNo + "</docNo>";
    this.soapRequest = this.commonService.getSoapBody("GetInvoiceSummary", "http://schemas.cordys.com/WINDatabaseMetadata", this.dataRequest);
    var parser = new DOMParser();
    parser.parseFromString(this.soapRequest, "text/xml");
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(response => {
      var summarytable = this.commonService.parseXML(response);
      var summaryTableArr = summarytable["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetInvoiceSummaryResponse"][0]["tuple"];
      summaryTableArr.forEach(element => {
        let summaryTableData = {

          stage: element["old"][0]["TABLE"][0]["stage"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["stage"][0],
          internalID: element["old"][0]["TABLE"][0]["internal_doc_id"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["internal_doc_id"][0],
          PDF: element["old"][0]["TABLE"][0]["invoice_pdf"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["invoice_pdf"][0],
          UrgentFlag: element["old"][0]["TABLE"][0]["isUrgent"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["isUrgent"][0],
          EntityName: element["old"][0]["TABLE"][0]["name"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["name"][0],
          VendorName: element["old"][0]["TABLE"][0]["vendor_name"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["vendor_name"][0],
          VendorCode: element["old"][0]["TABLE"][0]["vendor"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["vendor"][0],
          Invoice: element["old"][0]["TABLE"][0]["invoice_no"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["invoice_no"][0],
          PendingWith: element["old"][0]["TABLE"][0]["pending_with"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["pending_with"][0],
          Type: element["old"][0]["TABLE"][0]["invoice_category"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["invoice_category"][0],
          Classification: element["old"][0]["TABLE"][0]["classf"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["classf"][0],
          WorkItem: element["old"][0]["TABLE"][0]["work_item"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["work_item"][0],
          InvoiceDate: element["old"][0]["TABLE"][0]["invoice_date"][0] instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["invoice_date"][0]).format('YYYY-MM-DD'),
          Currency: element["old"][0]["TABLE"][0]["currency"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["currency"][0],
          Mode: element["old"][0]["TABLE"][0]["invoice_src"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["invoice_src"][0],
          RecievedDate: element["old"][0]["TABLE"][0]["invoice_recieved_date"][0] instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["invoice_recieved_date"][0]).format('YYYY-MM-DD'),
          Status: element["old"][0]["TABLE"][0]["InvoiceStatus"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["InvoiceStatus"][0],
          PO: element["old"][0]["TABLE"][0]["PO"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["PO"][0],
          BuyerApprover: element["old"][0]["TABLE"][0]["approved_by"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["approved_by"][0],
          ERPdueDate: element["old"][0]["TABLE"][0]["erp_due_date"][0] instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["erp_due_date"][0]).format('YYYY-MM-DD'),
          PostingDocNum: element["old"][0]["TABLE"][0]["posting_doc_no"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["posting_doc_no"][0],
          PostingDate: element["old"][0]["TABLE"][0]["posted_date"][0] instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["posted_date"][0]).format('YYYY-MM-DD'),
          ProcessedBy: element["old"][0]["TABLE"][0]["processed_by"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["processed_by"][0],
          GrossInvAmt: element["old"][0]["TABLE"][0]["sub_total"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["sub_total"][0],
          OCCId: element["old"][0]["TABLE"][0]["occ_docid"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["occ_docid"][0],
          PaymentNo: element["old"][0]["TABLE"][0]["payment_no"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["payment_no"][0],
          PaymentDate: element["old"][0]["TABLE"][0]["payment_date"][0] instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["payment_date"][0]).format('YYYY-MM-DD'),
          PaymentStatus: element["old"][0]["TABLE"][0]["payment_status"][0] instanceof Object ? "" : element["old"][0]["TABLE"][0]["payment_status"][0],
        };
        ELEMENT_DATA.push(summaryTableData);
      });
      this.invoicesummaryDataSource.paginator = this.paginator;
      this.invoicesummaryDataSource.sort = this.sort;
      this.loadSummarySpinner = false;
      if (this.preselectedValues.includes('all')) {
        this.preselectedValues = ['stage', 'EntityName', 'VendorName', 'VendorCode', 'Invoice', 'PDF', 'PendingWith', 'UrgentFlag', 'Type', 'Classification', 'WorkItem', 'InvoiceDate', 'Currency', 'Mode', 'RecievedDate', 'Status', 'PO', 'BuyerApprover', 'ERPdueDate', 'PostingDocNum', 'PostingDate', 'ProcessedBy', 'GrossInvAmt', 'OCCId', 'PaymentNo', 'PaymentDate', 'PaymentStatus'];
      }
      this.displayedColumns = this.preselectedValues;
      this.menuList = this.preselectedValues;

    });
  }


  public toggleSearch(): void {

    this.openAdvanceSearch = !this.openAdvanceSearch;
    if (this.openAdvanceSearch === false) {
      this.icon = 'keyboard_arrow_down';
    }
    else {
      this.icon = 'keyboard_arrow_up';
    }
  }

  isSearchAvailable(): boolean {
    return true;
  }

}