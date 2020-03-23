import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { SimsCoreService } from 'src/app/services/sims-core.service';
import { CommonService } from 'src/app/services/common.service';
import { UpdateInvoiceTypeDetailsComponent } from '../update-invoice-type-details/update-invoice-type-details.component';
import { AddInvoiceTypeDetailsComponent } from '../add-invoice-type-details/add-invoice-type-details.component';
import { SelectionModel } from '@angular/cdk/collections';

export interface InvoiceTypeElement{
  slNo: String;
  invoiceType : String;
}

let Invoice_Element_Data : InvoiceTypeElement[] = [];

@Component({
  selector: 'app-invoice-type',
  templateUrl: './invoice-type.component.html',
  styleUrls: ['./invoice-type.component.scss']
})

export class InvoiceTypeComponent implements OnInit {
  row : any;
  invoiceForm : FormGroup;
  displayedColumns : String[] =['select','slNo','invoiceType'];
  invoiceDataSource = new MatTableDataSource(Invoice_Element_Data);
  loadInvoiceMasterSpinner : boolean = true;
  selection = new SelectionModel<InvoiceTypeElement>(true, []);
  data = Object.assign(Invoice_Element_Data);
  constructor(private invoiceFormBuilder: FormBuilder,
    public invoiceDailog : MatDialog,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private simsCoreService: SimsCoreService,
    private commonService : CommonService ,
    private changeDetectionRef: ChangeDetectorRef) { }

 @ViewChild(MatPaginator ,{static: true}) paginator: MatPaginator ;
  ngOnInit() {
    this.invoiceForm = this.invoiceFormBuilder.group({
      slNo : new FormControl(''),
      invoiceType : new FormControl('')
    });
    this.invoiceTypeComments();
  }


  invoiceTypeComments() {
    Invoice_Element_Data = [];
    this.invoiceDataSource = new MatTableDataSource(Invoice_Element_Data);
    this.loadInvoiceMasterSpinner = true;
    let serviceName = "SearchInvoiceTypes";
    let nameSpace = "http://schemas.cordys.com/WINDatabaseMetadata"; 
    var dataRequest = "<invoice_type>"+ this.invoiceForm.value.invoiceType +"</invoice_type>"
    var soapRequest = "<SOAP:Envelope xmlns:SOAP=\"http://schemas.xmlsoap.org/soap/envelope/\">"+
        "<SOAP:Body>" +
          "<" + serviceName + " xmlns=\"" + nameSpace + "\"  preserveSpace=\"no\" qAccess=\"0\" qValues=\"\" >" +
      
             dataRequest + 
          "</" + serviceName + ">"+
        "</SOAP:Body>"+
      "</SOAP:Envelope>";
    var parser = new DOMParser();
    parser.parseFromString(soapRequest,"text/xml");
    this.simsHttpCoreServices.httpPost(soapRequest).subscribe(response => {
       var invoice = this.commonService.parseXML(response);

       const invoiceTypeDetails = invoice["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["SearchInvoiceTypesResponse"][0]["tuple"];
        
        invoiceTypeDetails.forEach(element => 
        {
            let invoiceTypeElement={
              slNo : element["old"][0]["mtr_ap_invoice_type"][0]["slno"][0],
              invoiceType : element["old"][0]["mtr_ap_invoice_type"][0]["invoice_type"][0]
            };
            Invoice_Element_Data.push(invoiceTypeElement);
        });
        this.invoiceDataSource.paginator = this.paginator;
        this.loadInvoiceMasterSpinner= false;
    });
  }
    
  resetForm(){
    this.invoiceForm = this.invoiceFormBuilder.group({
      invoiceType : new FormControl('')
    });
    this.invoiceTypeComments();
  }

    updateInvoiceType(row,index){
      const dialogRef = this.invoiceDailog.open(UpdateInvoiceTypeDetailsComponent,
        { width : '80%',
          data:{row,index}
        });
        dialogRef.afterClosed().subscribe(data=>{
          Invoice_Element_Data[data.index] = data.updatedInvoiceData.value;
          this.invoiceDataSource = new MatTableDataSource(Invoice_Element_Data);
          this.invoiceDataSource.paginator = this.paginator;
          this.changeDetectionRef.detectChanges();
        })
    }

    addInvoiceType(){
      const dialogRef = this.invoiceDailog.open(AddInvoiceTypeDetailsComponent,
        {width : '80%',
        });
        dialogRef.afterClosed().subscribe(result =>{
          Invoice_Element_Data.push(result.invoiceUpdatedData.value);
          this.invoiceDataSource = new MatTableDataSource(Invoice_Element_Data);
          this.invoiceDataSource.paginator = this.paginator;
          // this.dataSource.data.push(result.updatedData.value);
          // this.table.renderRows();
          this.changeDetectionRef.detectChanges();
        });
    }


    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.invoiceDataSource.data.length;
      return numSelected === numRows;
    }
    removeSelectedRows() {
      this.selection.selected.forEach(item => {
        let index: number = this.data.findIndex(d => d === item);
        // delete this.locationDataSource.data[index];
        this.deleteInvoiceDetails(item);
       
      });
      this.invoiceTypeComments();
      this.selection = new SelectionModel<InvoiceTypeElement>(true, []);
    }
    masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.invoiceDataSource.data.forEach(row => this.selection.select(row));
    }



    deleteInvoiceDetails(item: any){
      let serviceName = "UpdateMtr_ap_invoice_type";
      let nameSpace = "http://schemas.cordys.com/WINDatabaseMetadata";
      var dataRequest = "<tuple><old><mtr_ap_invoice_type qConstraint=\"0\"><slno>"+ +item.slNo +"</slno></mtr_ap_invoice_type></old></tuple>"
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
          var deleteInvoiceTypeList = this.commonService.parseXML(response);
        });
      }

}
