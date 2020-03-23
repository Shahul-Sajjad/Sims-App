import { Component, OnInit, INJECTOR, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { SimsCoreService } from 'src/app/services/sims-core.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-master-update-details-dailog',
  templateUrl: './user-master-update-details-dailog.component.html',
  styleUrls: ['./user-master-update-details-dailog.component.scss']
})
export class UserMasterUpdateDetailsDailogComponent implements OnInit {
  currentIndex = null;
  form: FormGroup;
  dialogRef: any;
  constructor(public userDialogRef: MatDialogRef<UserMasterUpdateDetailsDailogComponent>,
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private simsCoreService: SimsCoreService,
    private commonService : CommonService) { }
  // public dialogRef: MatDialogRef<UserMasterDetailsDailogComponent>
  ngOnInit() {
    this.currentIndex = this.data.index; 
    this.form = this.fb.group({
        userId : new FormControl(this.data.row.userId),
        userName : new FormControl(this.data.row.userName),
        firstName : new FormControl(this.data.row.firstName),
        middleName : new FormControl(this.data.row.middleName),
        lastName : new FormControl(this.data.row.lastName),
        role : new FormControl(this.data.row.role),
        emailId : new FormControl(this.data.row.emailId),
        state : new FormControl(this.data.row.state),
        country : new FormControl(this.data.row.country),
        contactNumber : new FormControl(this.data.row.contactNumber),
        address : new FormControl(this.data.row.address),
        status : new FormControl(this.data.row.status),
        pinCode : new FormControl(this.data.row.pinCode),
        costCenter : new FormControl(this.data.row.costCenter),
        supervisorCode : new FormControl(this.data.row.supervisorCode),
        supervisorEmail : new FormControl(this.data.row.supervisorEmail),
        location : new FormControl(this.data.row.location),
        reportingTo : new FormControl(this.data.row.reportingTo)
       
    });
  }

  updateUserDetails(){
    let serviceName = "UpdateWin_user_details";
    let nameSpace = "http://schemas.cordys.com/WINDatabaseMetadata";
    var dataRequest = "<tuple><old><win_user_details qConstraint=\"0\"><ud_userid>"+ this.form.value.userId +"</ud_userid><ud_reportingto>"+ this.form.value.reportingTo +"</ud_reportingto></win_user_details></old><new><win_user_details qAccess=\"0\" qConstraint=\"0\" qInit=\"0\" qValues=\"\"><ud_user_name>"+ this.form.value.userName +"</ud_user_name><ud_first_name>"+ this.form.value.firstName +"</ud_first_name><ud_middle_name>"+ this.form.value.middleName +"</ud_middle_name><ud_last_name>"+ this.form.value.lastName +"</ud_last_name><ud_role>"+ this.form.value.role +"</ud_role><ud_status>"+ this.form.value.status +"</ud_status><ud_email>"+ this.form.value.emailId +"</ud_email><ud_state>"+ this.form.value.state +"</ud_state><ud_country>"+ this.form.value.country +"</ud_country><ud_contactnumber>"+ this.form.value.contactNumber +"</ud_contactnumber><ud_address>"+ this.form.value.address +"</ud_address><ud_pincode>"+ this.form.value.pinCode +"</ud_pincode><cost_center>"+ this.form.value.costCenter +"</cost_center><supervisor_email>"+ this.form.value.supervisorEmail +"</supervisor_email><location>"+ this.form.value.location +"</location></win_user_details></new></tuple>"
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
      var userUpdateList = this.commonService.parseXML(response);
    });
  }

  updateService(){
    this.updateUserDetails();
    this.userDialogRef.close({updatedData: this.form, action: 'saved', index: this.currentIndex});
  }


}
