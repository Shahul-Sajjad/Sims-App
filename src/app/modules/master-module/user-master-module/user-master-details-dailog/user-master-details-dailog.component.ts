import { Component, OnInit, INJECTOR, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { SimsCoreService } from 'src/app/services/sims-core.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-master-details-dailog',
  templateUrl: './user-master-details-dailog.component.html',
  styleUrls: ['./user-master-details-dailog.component.scss']
})
export class UserMasterDetailsDailogComponent implements OnInit {
  form: FormGroup;
  dialogRef: any;
  constructor(public userDialogRef: MatDialogRef<UserMasterDetailsDailogComponent>,
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private simsHttpCoreServices: SimsHttpCoreServices,
              private simsCoreService: SimsCoreService,
              private commonService : CommonService ,) { }
  
  ngOnInit() {

    this.form = this.fb.group({
        userId : new FormControl(''),
        userName : new FormControl(''),
        firstName : new FormControl(''),
        middleName : new FormControl(''),
        lastName : new FormControl(''),
        role : new FormControl(''),
        emailId : new FormControl(''),
        state : new FormControl(''),
        country : new FormControl(''),
        contactNumber : new FormControl(''),
        address : new FormControl(''),
        status : new FormControl(''),
        pinCode : new FormControl(''),
        costCenter : new FormControl(''),
        supervisorCode : new FormControl(''),
        supervisorEmail : new FormControl(''),
        location : new FormControl(''),
        reportingTo : new FormControl('')
    });
      // this.addUserDetails();
  }


  addUserDetails(){
    let serviceName = "UpdateWin_user_details";
    let nameSpace = "http://schemas.cordys.com/WINDatabaseMetadata";
    var dataRequest = "<tuple><new><win_user_details qAccess=\"0\" qConstraint=\"0\" qInit=\"0\" qValues=\"\"><ud_userid>"+ this.form.value.userId +"</ud_userid><ud_user_name>"+ this.form.value.userName +"</ud_user_name><ud_first_name>"+ this.form.value.firstName +"</ud_first_name><ud_middle_name>"+ this.form.value.middleName +"</ud_middle_name><ud_last_name>"+ this.form.value.lastName +"</ud_last_name><ud_role>"+ this.form.value.role +"</ud_role><ud_status>"+ this.form.value.status +"</ud_status><ud_email>"+ this.form.value.emailId +"</ud_email><ud_state>"+ this.form.value.state +"</ud_state><ud_country>"+ this.form.value.country +"</ud_country><ud_contactnumber>"+ this.form.value.contactNumber +"</ud_contactnumber><ud_address>"+ this.form.value.address +"</ud_address><ud_pincode>"+ this.form.value.pinCode +"</ud_pincode><cost_center>"+ this.form.value.cost_center +"</cost_center><supervisor_email>"+ this.form.value.supervisorEmail +"</supervisor_email><location>"+ this.form.value.location +"</location><ud_reportingto>"+ this.form.value.reportingTo +"</ud_reportingto></win_user_details></new></tuple>"
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
        var userAddList = this.commonService.parseXML(response);
      });
    }

    addDetails(){
      this.addUserDetails();
      this.userDialogRef.close({updatedData: this.form});
    }

}
