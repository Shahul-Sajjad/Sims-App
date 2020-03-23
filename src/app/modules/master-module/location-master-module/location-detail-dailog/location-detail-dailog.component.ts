import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-location-detail-dailog',
  templateUrl: './location-detail-dailog.component.html',
  styleUrls: ['./location-detail-dailog.component.scss']
})

export class LocationDetailDailogComponent implements OnInit {
  locationSearchupdateform: FormGroup;
  currentIndex: null;
  vendordataRequestUpdate: string;
  soapupdateRequest: string;

  constructor(public dialog: MatDialog, private fb: FormBuilder, public locationDialogRef: MatDialogRef<LocationDetailDailogComponent>,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.currentIndex = this.data.index;
    this.locationSearchupdateform = this.fb.group({
      srNo: new FormControl(this.data.row.srNo),
      location: new FormControl(this.data.row.location),
      gstNo: new FormControl(this.data.row.gstNo),
      businessPlace: new FormControl(this.data.row.businessPlace),
      companyCode: new FormControl(this.data.row.companyCode)

    })

  }

  updatelocationDetails() {
    this.getlocationmasterdialogdetails();
    this.locationDialogRef.close({ updatedlocationData: this.locationSearchupdateform, action: 'saved', index: this.currentIndex });
  }
  getlocationmasterdialogdetails() {
    // ELEMENT_DATA = []
    // this.vendorDataSource = new MatTableDataSource(ELEMENT_DATA);
    this.vendordataRequestUpdate = "<tuple><old><mtr_location qConstraint=\"0\"><srno>" + +this.locationSearchupdateform.value.srNo + "</srno></mtr_location></old><new><mtr_location qAccess=\"0\" qConstraint=\"0\" qInit=\"0\" qValues=\"\"><location>" + this.locationSearchupdateform.value.location + "</location><gstNo>" + this.locationSearchupdateform.value.gstNo + "</gstNo><businessPlace>" + this.locationSearchupdateform.value.businessPlace + "</businessPlace><comp_code>" + this.locationSearchupdateform.value.companyCode + "</comp_code></mtr_location></new></tuple>"
    this.soapupdateRequest = this.commonService.getSoapupdateBody("UpdateMtr_location", "http://schemas.cordys.com/WINDatabaseMetadata", this.vendordataRequestUpdate);
    this.simsHttpCoreServices.httpPost(this.soapupdateRequest).subscribe(locationupdatedetails => {
      var lists = this.commonService.parseXML(locationupdatedetails);
    }
    )
  }

  onNoClick() {
    this.locationDialogRef.close();
  }

}
