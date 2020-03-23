import { AddLocationDetailDialogComponent } from './../add-location-detail-dialog/add-location-detail-dialog.component';
import { LocationDetailDailogComponent } from './../location-detail-dailog/location-detail-dailog.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { VendorDetailDialogComponent } from '../../vendor-master-module/vendor-detail-dialog/vendor-detail-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';

export interface locationPeriodicElement {
  srNo: string;
  location: string;
  gstNo: string;
  businessPlace: string;
  companyCode: string;
}
let locationdata: locationPeriodicElement[] = [];
@Component({
  selector: 'app-location-master',
  templateUrl: './location-master.component.html',
  styleUrls: ['./location-master.component.scss']
})
export class LocationMasterComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'srNo', 'location', 'gstNo', 'businessPlace', 'companyCode'];
  locationDataSource = new MatTableDataSource(locationdata);
  locationSearchInputform: any;
  loadLocationSpinner: boolean = true;
  locationdataRequest: string;
  soapRequest: string;
  sort: any;
  selection = new SelectionModel<locationPeriodicElement>(true, []);
  data = Object.assign(locationdata);
  vendordataRequestdelete: string;
  soapupdateRequest: string;

  constructor(private fb: FormBuilder, private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService, public dialog: MatDialog, private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.locationSearchInputform = this.fb.group({
      location: new FormControl(''),
      gstNo: new FormControl(''),
      businessPlace: new FormControl(''),
      companyCode: new FormControl('')

    })
    this.loadLocationSpinner = true;
    this.getlocationmasterdetails();

  }

  // Method  for fetching   soap (Request)  Crodys-Service 
  getlocationmasterdetails() {
    this.loadLocationSpinner = true;
    locationdata = []
    this.locationdataRequest = "<srno></srno><location>" + this.locationSearchInputform.value.location + "</location><gstNo>" + this.locationSearchInputform.value.gstNo + "</gstNo><businessPlace>" + this.locationSearchInputform.value.businessPlace + "</businessPlace><comp_code>" + this.locationSearchInputform.value.companyCode + "</comp_code>";
    this.soapRequest = this.commonService.getSoapBody("GetLocation", "http://schemas.cordys.com/WINDatabaseMetadata", this.locationdataRequest);
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(locationdetails => {
      var lists = this.commonService.parseXML(locationdetails);

      //Response
      var locationTaskLists = lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetLocationResponse"][0]["tuple"];
      if (lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetLocationResponse"][0]["tuple"] !== undefined) {
        locationTaskLists.forEach(element => {
          let mtr_location_data = {
            businessPlace: element["old"][0]["mtr_location"][0]["businessPlace"][0] instanceof Object ? "" : element["old"][0]["mtr_location"][0]["businessPlace"][0],
            companyCode: element["old"][0]["mtr_location"][0]["comp_code"][0] instanceof Object ? "" : element["old"][0]["mtr_location"][0]["comp_code"][0],
            gstNo: element["old"][0]["mtr_location"][0]["gstNo"][0] instanceof Object ? "" : element["old"][0]["mtr_location"][0]["gstNo"][0],
            location: element["old"][0]["mtr_location"][0]["location"][0] instanceof Object ? "" : element["old"][0]["mtr_location"][0]["location"][0],
            srNo: element["old"][0]["mtr_location"][0]["srno"][0] instanceof Object ? "" : element["old"][0]["mtr_location"][0]["srno"][0]

          };
          locationdata.push(mtr_location_data);

        });
        this.locationDataSource = new MatTableDataSource(locationdata);
        this.locationDataSource.paginator = this.paginator;
        //this.locationDataSource.sort = this.sort;
        this.loadLocationSpinner = false;
      }
      else {

      }

      // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    })
  }

  resetForm() {

    this.locationSearchInputform = this.fb.group({
      location: new FormControl(''),
      gstNo: new FormControl(''),
      businessPlace: new FormControl(''),
      companyCode: new FormControl('')

    });
    this.loadLocationSpinner = true;
    this.getlocationmasterdetails();

  }


  locationDetailDialog(row, index): void {
    const locationDialogRef = this.dialog.open(LocationDetailDailogComponent, {
      width: '80%',
      data: { row, index }
    });
    locationDialogRef.afterClosed().subscribe(data => {
      locationdata[data.index] = data.updatedlocationData.value;
      this.locationDataSource = new MatTableDataSource(locationdata);
      this.locationDataSource.paginator = this.paginator;
      this.locationDataSource.sort = this.sort;
      this.changeDetectionRef.detectChanges();
      // 
      // this.vendorDataSource.filteredData[updatedData.index] = updatedData.value;

    });
  }

  // addlocationdetail():void{
  //  const addlocationdialogref=this.dialog.open(AddLocationDetailDialogComponent,
  //   {
  //     width:'80%',
  //     data:{}

  //   });
  // }

  addlocationdetail() {
    const dialogRef = this.dialog.open(AddLocationDetailDialogComponent,
      {
        width: '80%',
      });
    dialogRef.afterClosed().subscribe(result => {
      locationdata.push(result.updatedlocationData.value);
      this.locationDataSource = new MatTableDataSource(locationdata);
      this.locationDataSource.paginator = this.paginator;
      // this.dataSource.data.push(result.updatedData.value);
      // this.table.renderRows();
      this.changeDetectionRef.detectChanges();
    });

  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.locationDataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {

    this.selection.selected.forEach(item => {
      // let index: number = this.data.findIndex(d => d === item);
      // delete this.locationDataSource.data[index];
      this.vendordataRequestdelete += "<tuple><old><mtr_location qAccess=\"0\" qConstraint=\"0\" qInit=\"0\" qValues=\"\"><srno>" + + item.srNo + "</srno></mtr_location></old></tuple>"
    });
    this.deletelocationdetails();
    this.getlocationmasterdetails();
    this.selection = new SelectionModel<locationPeriodicElement>(true, []);
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.locationDataSource.data.forEach(row => this.selection.select(row));
  }
  // ${item.srNo}`
  deletelocationdetails() {
    // ELEMENT_DATA = []
    // this.vendorDataSource = new MatTableDataSource(ELEMENT_DATA);
    // this.vendordataRequestdelete = "<tuple><old><mtr_location qAccess=\"0\" qConstraint=\"0\" qInit=\"0\" qValues=\"\"><srno>" + + item.srNo + "</srno></mtr_location></old></tuple>"
    this.soapupdateRequest = this.commonService.getSoapupdateBody("UpdateMtr_location", "http://schemas.cordys.com/WINDatabaseMetadata", this.vendordataRequestdelete);
    this.simsHttpCoreServices.httpPost(this.soapupdateRequest).subscribe(locationupdatedetails => {
      var lists = this.commonService.parseXML(locationupdatedetails);
    }
    )
  }


}
