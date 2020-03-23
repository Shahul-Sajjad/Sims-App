import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { CommonService } from 'src/app/services/common.service';
import { LocationDetailDailogComponent } from '../location-detail-dailog/location-detail-dailog.component';

@Component({
  selector: 'app-add-location-detail-dialog',
  templateUrl: './add-location-detail-dialog.component.html',
  styleUrls: ['./add-location-detail-dialog.component.scss']
})
export class AddLocationDetailDialogComponent implements OnInit {
  locationaddform: any;
  currentIndex: null;
  soapupdateRequest: string;
  vendordataRequestUpdate: string;


  constructor(public addlocationDialogRef: MatDialogRef<AddLocationDetailDialogComponent>, public dialog: MatDialog, private fb: FormBuilder, public dialogRef: MatDialogRef<AddLocationDetailDialogComponent>,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // this.currentIndex = this.data.index;
    this.locationaddform = this.fb.group({
      srNo: new FormControl(''),
      location: new FormControl(''),
      gstNo: new FormControl(''),
      businessPlace: new FormControl(''),
      companyCode: new FormControl('')

    })
  }
  updatelocationDetails() {
    this.addnewlocationdetails();
    console.log('worked');
   this.dialogRef.close({ updatedlocationData: this.locationaddform, action: 'saved', index: this.currentIndex });
   
  }
  addnewlocationdetails() {
    // ELEMENT_DATA = []
    // this.vendorDataSource = new MatTableDataSource(ELEMENT_DATA);
    this.vendordataRequestUpdate = "<tuple><new><mtr_location qAccess=\"0\" qConstraint=\"0\" qInit=\"0\" qValues=\"\"><srno></srno><location>" + this.locationaddform.value.location + "</location><gstNo>" + this.locationaddform.value.gstNo + "</gstNo><businessPlace>" + this.locationaddform.value.businessPlace + "</businessPlace><comp_code>" + this.locationaddform.value.companyCode + "</comp_code></mtr_location></new></tuple>"
    this.soapupdateRequest = this.commonService.getSoapupdateBody("UpdateMtr_location", "http://schemas.cordys.com/WINDatabaseMetadata", this.vendordataRequestUpdate);
    this.simsHttpCoreServices.httpPost(this.soapupdateRequest).subscribe(locationupdatedetails => {
      var lists = this.commonService.parseXML(locationupdatedetails);
      console.log(lists);
    }
    )
  }

  onNoClick() {
    this.dialogRef.close();
  }

}


