import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { VendorBankDetailsComponent } from '../vendor-bank-details/vendor-bank-details.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { VendorDetailDialogComponent } from '../vendor-detail-dialog/vendor-detail-dialog.component';
import { SimsHttpCoreServices } from '../../../../services/sims-http-core.service';
import { CommonService } from '../../../../services/common.service';

export interface vendorPeriodicElement {
  code: string;
  name: string;
  erpId: string;
  erpName: string;
  houseNo: string;
  location: string;
  postalCode: string;
  telephone: string;
  tds: string;
  // regionalManager:string;
  glCode: string;
  status: string;
  emailId: string;
}
let ELEMENT_DATA: vendorPeriodicElement[] = [];
@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.scss']
})

export class VendorMasterComponent implements OnInit {
  collapsed: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  vendorSearchInputform: any;
  clearData: any;
  row: any;
  displayedColumns: string[] = ['bank', 'code', 'erpId', 'erpName', 'name', 'houseNo', 'streetName', 'location', 'postalCode', 'telephone', 'tds', 'status', 'glCode', 'emailId'];
  vendorDataSource = new MatTableDataSource(ELEMENT_DATA);
  vendordataRequest: string;
  soapRequest: string;
  loadVendorSpinner: boolean = true;

  ngOnInit() {
    this.vendorSearchInputform = this.fb.group({
      code: new FormControl(''),
      name: new FormControl(''),
      location: new FormControl('Schaffhausen'),
      status: new FormControl('')
    });
    this.loadVendorSpinner = true;
    this.getvendormasterdetails();

  }

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService,
    private changeDetectionRef: ChangeDetectorRef) {

  }

  // Method  for fetching   soap (Request)  Crodys-Service 
  getvendormasterdetails() {
    this.loadVendorSpinner = true;
    ELEMENT_DATA = []
    this.vendordataRequest = "<vendor_code>" + +this.vendorSearchInputform.value.code + "</vendor_code><vendor_name>" + this.vendorSearchInputform.value.name + "</vendor_name><vendor_location>" + this.vendorSearchInputform.value.location + "</vendor_location><vendor_status>" + this.vendorSearchInputform.value.status + "</vendor_status><company_code></company_code><erp_id></erp_id>";
    this.soapRequest = this.commonService.getSoapBody("GetVendorMasterService", "http://schemas.cordys.com/WINDatabaseMetadata", this.vendordataRequest);
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(vendordetails => {
      var lists = this.commonService.parseXML(vendordetails);

      //  Response
      var vendorTaskLists = lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetVendorMasterServiceResponse"][0]["tuple"];
      if (lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetVendorMasterServiceResponse"][0]["tuple"] !== undefined) {
        vendorTaskLists.forEach(element => {
          let win_vendor_master = {
            code: element["old"][0]["win_vendor_master"][0]["vendor_code"][0]instanceof Object ? "" : element["old"][0]["win_vendor_master"][0]["vendor_code"][0],
            erpName: element["old"][0]["win_vendor_master"][0]["erp_name"][0]instanceof Object ? "" :element["old"][0]["win_vendor_master"][0]["erp_name"][0],
            erpId: element["old"][0]["win_vendor_master"][0]["erp_id"][0]instanceof Object ? "" : element["old"][0]["win_vendor_master"][0]["erp_id"][0],
            name: element["old"][0]["win_vendor_master"][0]["vendor_name"][0]instanceof Object ? "" :element["old"][0]["win_vendor_master"][0]["vendor_name"][0],
            houseNo: element["old"][0]["win_vendor_master"][0]["addr_house_number"][0]instanceof Object ? "" :element["old"][0]["win_vendor_master"][0]["addr_house_number"][0],
            streetName: element["old"][0]["win_vendor_master"][0]["addr_street_name"][0]instanceof Object ? "" :element["old"][0]["win_vendor_master"][0]["addr_street_name"][0],
            location: element["old"][0]["win_vendor_master"][0]["vendor_location"][0]instanceof Object ? "" :element["old"][0]["win_vendor_master"][0]["vendor_location"][0],
            postalCode: element["old"][0]["win_vendor_master"][0]["postal_code"][0]instanceof Object ? "" :element["old"][0]["win_vendor_master"][0]["postal_code"][0],
            telephone: element["old"][0]["win_vendor_master"][0]["telephone"][0]instanceof Object ? "" :element["old"][0]["win_vendor_master"][0]["telephone"][0],
            tds: element["old"][0]["win_vendor_master"][0]["vendor_tds"][0]["$"] === undefined ? element["old"][0]["win_vendor_master"][0]["vendor_tds"][0] : "",
            status: element["old"][0]["win_vendor_master"][0]["vendor_status"][0] instanceof Object ? "" :element["old"][0]["win_vendor_master"][0]["vendor_status"][0],
            glCode: element["old"][0]["win_vendor_master"][0]["gl_code"][0]instanceof Object ? "" :element["old"][0]["win_vendor_master"][0]["gl_code"][0],
            emailId: element["old"][0]["win_vendor_master"][0]["email1"][0]instanceof Object ? "" :element["old"][0]["win_vendor_master"][0]["email1"][0]
          };
          ELEMENT_DATA.push(win_vendor_master);

        });
        this.vendorDataSource = new MatTableDataSource(ELEMENT_DATA);
        this.vendorDataSource.paginator = this.paginator;
        this.vendorDataSource.sort = this.sort;
        this.loadVendorSpinner = false;
      }
      else {

      }

      // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    })
  }

  // Opening The  VendorBankDetailsComponent MatDialog

  openDialog(): void {
    const dialogRef = this.dialog.open(VendorBankDetailsComponent, {
      width: '50%',
    });
  }

  // Opening The  VendorDetailsdialogComponent MatDialog

  vendorDetailDialog(row, index): void {
    console.log('mara row', row, index);
    const vendorDialogRef = this.dialog.open(VendorDetailDialogComponent, {
      width: '80%',
      data: { row, index }
    });
    vendorDialogRef.afterClosed().subscribe(data => {
      // console.log('Updated data in parent: ', data);
      // console.log(this.vendorDataSource);
      // console.log(data)
      ELEMENT_DATA[data.index] = data.updatedData.value;
      this.vendorDataSource = new MatTableDataSource(ELEMENT_DATA);
      this.vendorDataSource.paginator = this.paginator;
      this.vendorDataSource.sort = this.sort;
      this.changeDetectionRef.detectChanges();
      // 
      // this.vendorDataSource.filteredData[updatedData.index] = updatedData.value;

    });
  }

  // modifyCollapse(event: any) {
  //   this.collapsed = !this.collapsed;
  // }

  // method for Search Filter

  // search(filters: any): void {
  //   this.loadInboxSpinner = true;
  //   this.getvendormasterdetails();
  // }

  // Refresh The data

  resetForm() {

    this.vendorSearchInputform = this.fb.group({
      code: new FormControl(''),
      name: new FormControl(''),
      location: new FormControl(''),
      status: new FormControl('')
    });
    //this.getvendormasterdetails();

  }

}