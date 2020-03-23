import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { CommonService } from 'src/app/services/common.service';
import { UploadDetails } from 'src/app/models/invoice-item.model';


@Component({
  selector: 'app-upload-detail-tab',
  templateUrl: './upload-detail-tab.component.html',
  styleUrls: ['./upload-detail-tab.component.scss']
})
export class UploadDetailTabComponent implements OnInit {
  docId:string;
  vendordataRequest: string;
  soapRequest: string;
  UPLOADE_ELEMENT_DATA: UploadDetails[] = [];
  displayedUploadColumns: string[] = ['file_name', 'uploaded_by', 'uploaded_date','file_path', 'node_id','document_id'];
  uploadDataSource = new MatTableDataSource<UploadDetails>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  columnHeaderName = [
    {
      lineNo: 0,
      headerId: "file_name"
    },

    {
      lineNo: 1,
      headerId: "uploaded_by"
    },

    {
      lineNo: 2,
      headerId: "uploaded_date"
    },
    {
      lineNo: 3,
      headerId: "file_path"
    },
    {
      lineNo: 4,
      headerId: "node_id"
    },
    {
      lineNo: 5,
      headerId: "document_id"
    }
  ]

  constructor(
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.uploadDataSource.paginator = this.paginator;
    this.docId="SI-1819-11-01431";
    this.getUploadDetails(this.docId);
  }
  getUploadDetails(docId:string){
  
    this.vendordataRequest = "<doc_id>" + docId + "</doc_id>";
    this.soapRequest = this.commonService.getSoapBody("GetAttachmentsonDocId", "http://schemas.cordys.com/WINDatabaseMetadata", this.vendordataRequest);
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(uploadDetailResult => {
      let uploadDetaillist = this.commonService.parseXML(uploadDetailResult);
      let vendorBankDetail=uploadDetaillist["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0].GetAttachmentsonDocIdResponse[0].tuple;
      vendorBankDetail.map((x,index)=>{let uploadDetailModel={
            file_name:x.old[0].ap_upload[0].filename[0] instanceof Object?"undefined": x.old[0].ap_upload[0].filename[0],
            uploaded_by: x.old[0].ap_upload[0].upload_by[0] instanceof Object?"undefined": x.old[0].ap_upload[0].upload_by[0],
            uploaded_date:x.old[0].ap_upload[0].upload_date[0] instanceof Object?"undefined": x.old[0].ap_upload[0].upload_date[0],
            file_path:x.old[0].ap_upload[0].filepath[0] instanceof Object?"undefined": x.old[0].ap_upload[0].filepath[0],
            node_id:x.old[0].ap_upload[0].cs_id[0] instanceof Object?"undefined": x.old[0].ap_upload[0].cs_id[0],
            document_id:x.old[0].ap_upload[0].document_id[0] instanceof Object?"undefined": x.old[0].ap_upload[0].document_id[0],
      }
      this.UPLOADE_ELEMENT_DATA.push(uploadDetailModel);
      if(vendorBankDetail.length-1==index)
        this.uploadDataSource = new MatTableDataSource<UploadDetails>(this.UPLOADE_ELEMENT_DATA);
    });
    });
  }

}
