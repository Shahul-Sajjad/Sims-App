import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { CommonService } from 'src/app/services/common.service';
import { InvoiceDetails } from 'src/app/models/invoice-item.model';
import { InvoiceDataService } from 'src/app/services/invoice-data.service';
import { MatDialog } from '@angular/material';
import { PoLineDetailsDialogComponent } from '../po-line-details-dialog/po-line-details-dialog.component';


@Component({
  selector: 'app-invoice-detail-tab',
  templateUrl: './invoice-detail-tab.component.html',
  styleUrls: ['./invoice-detail-tab.component.scss']
})
export class InvoiceDetailTabComponent implements OnInit {

  vendordataRequest: string;
  soapRequest: string;
  dataRequest: string;
  tableData: string;
  showTableData: boolean;
  statusIcon:boolean;

  @Input() invNum;
  @Input() internalId;

  INVOICE_ELEMENT_DATA: InvoiceDetails[] = [];
  displayedInvoiceColumns: string[] =
    ['statuIcon','inv_line', 'po_line', 'po', 'grn', 'buyerapprover', 'material', 'material_desc', 'qty', 'rate', 'UOM', 'doc_curr', 'local_curr', 'gl_code', 'cost_center', 'wbs', 'requestor', 'approver', 'gross_value', 'discount', 'delivery_date', 'status', 'po_material', 'po_marterial_desc', 'po_price', 'trading_part_code', 'remarks', 'validator_remarks', 'tax_code', 'vp', 'profit_center', 'hsn_sac', 'lr_no'];
  invoiceDetailsDataSource = new MatTableDataSource<InvoiceDetails>();
  invoiceNum: string = '003';
  internalDocId: string = '580';
  hdStyle;
  poDetailsLists = [];

  columnHeaderName = [
    {
      lineNo: 0,
      headerId: 'inv_line'
    },
    {
      lineNo: 1,
      headerId: 'po_line'
    },
    {
      lineNo: 2,
      headerId: 'po'
    },
    {
      lineNo: 3,
      headerId: 'grn'
    },
    {
      lineNo: 4,
      headerId: 'buyerapprover'
    },
    {
      lineNo: 5,
      headerId: 'material'
    },
    {
      lineNo: 6,
      headerId: 'material_desc'
    },
    {
      lineNo: 7,
      headerId: 'qty'
    },
    {
      lineNo: 8,
      headerId: 'rate'
    },
    {
      lineNo: 9,
      headerId: 'UOM'
    },
    {
      lineNo: 10,
      headerId: 'doc_curr'
    },
    {
      lineNo: 11,
      headerId: 'local_curr'
    },
    {
      lineNo: 12,
      headerId: 'local_curr'
    },
    {
      lineNo: 13,
      headerId: 'gl_code'
    },
    {
      lineNo: 14,
      headerId: 'cost_center'
    },
    {
      lineNo: 15,
      headerId: 'wbs'
    },
    {
      lineNo: 16,
      headerId: 'requestor'
    },
    {
      lineNo: 17,
      headerId: 'approver'
    },
    {
      lineNo: 18,
      headerId: 'gross_value'
    },
    {
      lineNo: 19,
      headerId: 'discount'
    },
    {
      lineNo: 20,
      headerId: 'delivery_date'
    },
    {
      lineNo: 21,
      headerId: 'status'
    },
    {
      lineNo: 22,
      headerId: 'po_material'
    },
    {
      lineNo: 23,
      headerId: 'po_marterial_desc'
    },
    {
      lineNo: 24,
      headerId: 'po_price'
    },
    {
      lineNo: 25,
      headerId: 'trading_part_code'
    },
    {
      lineNo: 26,
      headerId: 'remarks'
    },
    {
      lineNo: 27,
      headerId: 'validator_remarks'
    },
    {
      lineNo: 28,
      headerId: 'tax_code'
    },
    {
      lineNo: 29,
      headerId: 'vp'
    },
    {
      lineNo: 30,
      headerId: 'profit_center'
    },
    {
      lineNo: 31,
      headerId: 'hsn_sac'
    },
    {
      lineNo: 32,
      headerId: 'lr_no'
    }
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  action;
  constructor(
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService,
    private invoiceDataService: InvoiceDataService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.invoiceDetailsDataSource.paginator = this.paginator;
    this.getInvoiceDetails(this.invoiceNum, this.internalDocId);
    this.showTableData = false;
    this.invoiceDataService.invoiceDetailHandler.subscribe(x => {
      this.showTableData = x["editTable"];
    }
    );
    this.invoiceDataService.invoiceDetailHandler.subscribe(x => {
      //x["source"]["ngControl"]["name"] == "classification" &&
      if (x instanceof Object) {
        if (x["value"] === "Non-PO") {
          this.displayedInvoiceColumns =
            ['statuIcon','inv_line', 'po_line', 'po', 'grn', 'buyerapprover', 'material', 'material_desc', 'qty', 'rate', 'UOM', 'doc_curr', 'local_curr', 'gl_code', 'cost_center', 'wbs', 'requestor', 'approver', 'gross_value', 'discount', 'delivery_date', 'status', 'po_material', 'po_marterial_desc', 'po_price', 'trading_part_code', 'remarks', 'validator_remarks', 'tax_code', 'vp', 'profit_center', 'hsn_sac', 'lr_no'];
          let lineNo = [2, 3, 4, 5, 11, 13, 23, 24];
          lineNo.map(x => {
            this.hideTableColumn(x, this.displayedInvoiceColumns);

          });
        }
        this.getInvoiceDetails(this.invoiceNum, this.internalDocId);
        this.invoiceDataService.invoiceDetailHandler.subscribe(x => {
          if (x instanceof Object && x['fieldName'] === 'taxCode') {
            this.INVOICE_ELEMENT_DATA.map(y => {
              y.tax_code = x['value'];
            });
          } else {

            this.displayedInvoiceColumns =
              ['statuIcon','inv_line', 'po_line', 'po', 'grn', 'buyerapprover', 'material', 'material_desc', 'qty', 'rate', 'UOM', 'doc_curr', 'local_curr', 'gl_code', 'cost_center', 'wbs', 'requestor', 'approver', 'gross_value', 'discount', 'delivery_date', 'status', 'po_material', 'po_marterial_desc', 'po_price', 'trading_part_code', 'remarks', 'validator_remarks', 'tax_code', 'vp', 'profit_center', 'hsn_sac', 'lr_no'];
            let lineNo = [14, 15, 23, 18, 24, 26, 5];
            lineNo.map(x => {
              this.hideTableColumn(x, this.displayedInvoiceColumns);
            });
          }
        }
        );
      }
    }

    );
  }

  getInvoiceDetails(InvoiceNumber: string, InternalDocId: string) {
    this.vendordataRequest = '<InvoiceNumber>' + InvoiceNumber + '</InvoiceNumber><InternalDocId>' + InternalDocId + '</InternalDocId>';
    this.soapRequest = this.commonService.getSoapBody('GetInvoiceDetailsByInvNo', 'http://schemas.cordys.com/WINDatabaseMetadata', this.vendordataRequest);
    this.simsHttpCoreServices.httpPost(this.soapRequest).subscribe(invoiceDetailResult => {
      let invoiceDetaillist = this.commonService.parseXML(invoiceDetailResult);
      let invoiceDetail = invoiceDetaillist["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0].GetInvoiceDetailsByInvNoResponse[0].tuple;
      invoiceDetail.map((x, index) => {
        let invoiceDetailModel = {
          statuIcon:x.old[0].invoice_details[0].Img[0] instanceof Object ? "" : x.old[0].invoice_details[0].Img[0].substring(32,33) =="s"?this.statusIcon=true:this.statusIcon=false,
          line_id: x.old[0].invoice_details[0].line_id[0] instanceof Object ? "" : x.old[0].invoice_details[0].line_id[0],
          inv_line: x.old[0].invoice_details[0].line_no[0] instanceof Object ? "" : x.old[0].invoice_details[0].line_no[0],
          po_line: x.old[0].invoice_details[0].po_line_no[0] instanceof Object ? "" : x.old[0].invoice_details[0].po_line_no[0],
          po: x.old[0].invoice_details[0].po_no[0] instanceof Object ? "" : x.old[0].invoice_details[0].po_no,
          grn: x.old[0].invoice_details[0].grn_no[0] instanceof Object ? "" : x.old[0].invoice_details[0].grn_no[0],
          buyerapprover: x.old[0].invoice_details[0].approver[0] instanceof Object ? "" : x.old[0].invoice_details[0].approver[0],
          material: x.old[0].invoice_details[0].material[0] instanceof Object ? "" : x.old[0].invoice_details[0].material[0],
          material_desc: x.old[0].invoice_details[0].material_desc[0] instanceof Object ? "" : x.old[0].invoice_details[0].material_desc[0],
          qty: x.old[0].invoice_details[0].qty[0] instanceof Object ? "" : x.old[0].invoice_details[0].qty[0],
          rate: x.old[0].invoice_details[0].rate[0] instanceof Object ? "" : x.old[0].invoice_details[0].rate[0],
          UOM: x.old[0].invoice_details[0].uom[0] instanceof Object ? "" : x.old[0].invoice_details[0].uom[0],
          doc_curr: x.old[0].invoice_details[0].line_doc_curr[0] instanceof Object ? "" : (+x.old[0].invoice_details[0].line_doc_curr[0]).toFixed(2),
          local_curr: x.old[0].invoice_details[0].curr[0] instanceof Object ? "" : (+x.old[0].invoice_details[0].curr[0]).toFixed(2),
          gl_code: x.old[0].invoice_details[0].glcode[0] instanceof Object ? "" : x.old[0].invoice_details[0].glcode[0],
          cost_center: x.old[0].invoice_details[0].costcenter[0] instanceof Object ? "" : (+x.old[0].invoice_details[0].costcenter[0]).toFixed(2),
          wbs: x.old[0].invoice_details[0].wbs[0] instanceof Object ? "" : x.old[0].invoice_details[0].wbs[0],
          requestor: x.old[0].invoice_details[0].requestor[0] instanceof Object ? "" : x.old[0].invoice_details[0].requestor[0],
          approver: x.old[0].invoice_details[0].approver[0] instanceof Object ? "" : x.old[0].invoice_details[0].approver[0],
          gross_value: x.old[0].invoice_details[0].gross_amount[0] instanceof Object ? "" : (+x.old[0].invoice_details[0].gross_amount[0]).toFixed(2),
          discount: x.old[0].invoice_details[0].discount[0] instanceof Object ? "" : (+x.old[0].invoice_details[0].discount[0]).toFixed(2),
          delivery_date: x.old[0].invoice_details[0].lr_date[0] instanceof Object ? "" : x.old[0].invoice_details[0].lr_date[0],
          status: x.old[0].invoice_details[0].Invoice_Status[0] instanceof Object ? "" : x.old[0].invoice_details[0].Invoice_Status[0],
          po_material: x.old[0].invoice_details[0].po_material_code[0] instanceof Object ? "" : x.old[0].invoice_details[0].po_material_code[0],
          po_marterial_desc: x.old[0].invoice_details[0].po_material_desc[0] instanceof Object ? "" : x.old[0].invoice_details[0].po_material_desc[0],
          po_price: x.old[0].invoice_details[0].po_material_price[0] instanceof Object ? "" : x.old[0].invoice_details[0].po_material_price[0],
          trading_part_code: x.old[0].invoice_details[0].comp_code[0] instanceof Object ? "" : x.old[0].invoice_details[0].comp_code[0],
          order_id: x.old[0].invoice_details[0].order_id[0] instanceof Object ? "" : x.old[0].invoice_details[0].order_id[0],
          remarks: x.old[0].invoice_details[0].remarks[0] instanceof Object ? "" : x.old[0].invoice_details[0].remarks[0],
          validator_remarks: x.old[0].invoice_details[0].validator_remarks[0] instanceof Object ? "" : x.old[0].invoice_details[0].validator_remarks[0],
          tax_code: x.old[0].invoice_details[0].tax_code[0] instanceof Object ? "" : x.old[0].invoice_details[0].tax_code[0],
          vp: x.old[0].invoice_details[0].temp1[0] instanceof Object ? "" : x.old[0].invoice_details[0].temp1[0],
          profit_center: x.old[0].invoice_details[0].profitCenter[0] instanceof Object ? "" : x.old[0].invoice_details[0].profitCenter[0],
          hsn_sac: x.old[0].invoice_details[0].hsn_no[0] instanceof Object ? "" : x.old[0].invoice_details[0].hsn_no[0],
          lr_no: x.old[0].invoice_details[0].lr_no[0] instanceof Object ? "" : x.old[0].invoice_details[0].lr_no[0],
        }
        this.INVOICE_ELEMENT_DATA.push(invoiceDetailModel);
        if (invoiceDetail.length - 1 == index) {
          this.invoiceDetailsDataSource = new MatTableDataSource<InvoiceDetails>(this.INVOICE_ELEMENT_DATA);
        }
      });
       this.invoiceDataService.setInvoiceDetailTableData(invoiceDetail);
    });

  }

  hideTableColumn(lineNo: number, tableColums: string[]) {
    /* if(lineNo==this.columnHeaderName[lineNo].lineNo){
    this.columnHeaderName.splice(lineNo,1);  */
    tableColums.splice(lineNo, 1);
    //   }
  }
  truncated(data){
    let val;
    if(data.length>14){
      val=data.slice(0,14)+"..."
    }
    return val;
  }
  //modify invoice lines
  onKey(event: any, index) {
    let datavalue = {
      index: index,
      data: this.invoiceDetailsDataSource
    };
    this.invoiceDataService.setInvoiceHeaderData(datavalue);
    this.invoiceDataService.invoiceDetailHandler.next("InvoiceDetailTab");

  }
  // getPODetails() {


  // }

  getTempAsnnumberfromPoLine() {

    const dataRequest = `<line_po_no>3000252600</line_po_no><erpid>SAP001</erpid>`;
    const soapRequest = this.commonService.getSoapBody('GetTempAsnnumberfromPoLine', 'http://schemas.cordys.com/WINDatabaseMetadata', dataRequest);
    this.poDetailsLists = [];
    this.simsHttpCoreServices.httpPost(soapRequest).subscribe(response => {
      const poDetails = this.responseDataManipulation(response, 'GetTempAsnnumberfromPoLineResponse');
      poDetails.forEach(element => {
        const poDetailsLists = {
          line_no: element.old[0].win_sap_po_line[0].line_no[0],
          line_material_code: element.old[0].win_sap_po_line[0].line_material_code[0],
          line_material_desc: element.old[0].win_sap_po_line[0].line_material_desc[0],
          line_order_qty: element.old[0].win_sap_po_line[0].line_order_qty[0],
          line_uom: element.old[0].win_sap_po_line[0].line_uom[0],
          line_price: element.old[0].win_sap_po_line[0].line_price[0],
          line_currency: element.old[0].win_sap_po_line[0].line_currency[0],
          line_gross_amt: element.old[0].win_sap_po_line[0].line_gross_amt[0],
        };
        this.poDetailsLists.push(poDetailsLists);
      });
      this.openPODetailsDialog();
    });
  }

  responseDataManipulation(response, responseKey) {
    const parseData = this.commonService.parseXML(response);
    return parseData['__zone_symbol__value']['SOAP:Envelope']['SOAP:Body'][0][responseKey][0].tuple;

  }

  openPODetailsDialog() {
    this.dialog.open(PoLineDetailsDialogComponent, { data: this.poDetailsLists });
  }
}
