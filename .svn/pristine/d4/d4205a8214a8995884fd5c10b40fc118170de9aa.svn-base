import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CommonService } from '../../../../services/common.service';

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { VendorBankDetailsComponent } from '../vendor-bank-details/vendor-bank-details.component';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';

@Component({
  selector: 'app-vendor-detail-dialog',
  templateUrl: './vendor-detail-dialog.component.html',
  styleUrls: ['./vendor-detail-dialog.component.scss']
})
export class VendorDetailDialogComponent implements OnInit {
  currentIndex = null;
  vendorDetailform: FormGroup;
  dialogRef: any;
  vendordataRequest: string;
  soapRequest: string;
  vendordataRequestUpdate: string;
  soapupdateRequest: string;
  updateVendorDataRequest: string;
  constructor(public dialog: MatDialog,
    public vendorDialogRef: MatDialogRef<VendorDetailDialogComponent>, private fb: FormBuilder,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    console.log('row data', this.data);
    this.currentIndex = this.data.index;
    this.vendorDetailform = this.fb.group({
      code: new FormControl(this.data.row.code),
      erpName: new FormControl(this.data.row.erpName),
      erpId: new FormControl(this.data.row.erpId),
      name: new FormControl(this.data.row.name),
      houseNo: new FormControl(this.data.row.houseNo),
      streetName: new FormControl(this.data.row.streetName),
      location: new FormControl(this.data.row.location),
      postalCode: new FormControl(this.data.row.postalCode),
      telephone: new FormControl(this.data.row.telephone),
      tds: new FormControl(this.data.row.tds),
      regionalManager: new FormControl(this.data.row.regionalManager),
      glCode: new FormControl(this.data.row.glCode),
      approver1: new FormControl(this.data.row.approver1),
      approver2: new FormControl(this.data.row.approver2),
      approver3: new FormControl(this.data.row.approver3),
      costCenter: new FormControl(this.data.row.costCenter),
      status: new FormControl(this.data.row.status),
      emailId: new FormControl(this.data.row.emailId)


    });

  }

  

// Method for close the Dialog

  onNoClick(): void {
    this.vendorDialogRef.close()
  }

 
  // Method for update Button
  updateVendorDetails() {
    this.updateVendorDetailsService();
    this.vendorDialogRef.close({ updatedData: this.vendorDetailform, action: 'saved', index: this.currentIndex });
  }
// Method for calling update Vendor Service
  updateVendorDetailsService() {
    let vendorData = this.vendorDetailform.value
    this.updateVendorDataRequest = "<tuple><old><win_vendor_master qConstraint=\"0\"> <vendor_code>" + vendorData.code + "</vendor_code><erp_id>" + vendorData.erpId + "</erp_id><vendor_name>" + vendorData.name.replace('&', '&amp;') + "</vendor_name> </win_vendor_master></old><new><win_vendor_master qAccess=\"0\" qConstraint=\"0\" qInit=\"0\" qValues=\"\"><postal_code>" + vendorData.postalCode + "</postal_code><gl_code>" + vendorData.glCode + "</gl_code><costCenter>" + vendorData.costCenter + "</costCenter><telephone>" + vendorData.telephone + "</telephone><vendor_status>" + vendorData.status + "</vendor_status><email1>" + vendorData.emailId + "</email1><vendor_tds>" + vendorData.tds + "</vendor_tds></win_vendor_master></new></tuple>"
    this.soapupdateRequest = this.commonService.getSoapupdateBody("UpdateWin_vendor_master", "http://schemas.cordys.com/WINDatabaseMetadata", this.updateVendorDataRequest);
    this.simsHttpCoreServices.httpPost(this.soapupdateRequest).subscribe(vendorUpdateDetail => {
      var updateLists = this.commonService.parseXML(vendorUpdateDetail);
      console.log(updateLists)

    })
  }

}
