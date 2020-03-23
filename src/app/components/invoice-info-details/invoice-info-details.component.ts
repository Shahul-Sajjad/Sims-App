import { Component, OnInit, Input } from '@angular/core';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';
import { CommonService } from 'src/app/services/common.service';
import { InvoiceDataService } from 'src/app/services/invoice-data.service';

@Component({
  selector: 'app-invoice-info-details',
  templateUrl: './invoice-info-details.component.html',
  styleUrls: ['./invoice-info-details.component.scss']
})
export class InvoiceInfoDetailsComponent implements OnInit {
  vendordataRequest: string;
  soapRequest: string;
  isOverLayMode = true;
  invoiceNumber;
  internalId;
  taskId;
  mode;
  action : boolean;
  step;

  @Input() taskDetails: any;


  constructor(
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService,
    private invoiceDataService: InvoiceDataService
  ) { }

  ngOnInit() {
    this.invoiceNumber = this.taskDetails.invoiceNumber;
    this.internalId = this.taskDetails.internalId;
    this.taskId = this.taskDetails.taskId;
    this.mode = this.taskDetails.mode;
    this.invoiceDataService.invoiceDetailHandler.subscribe((action) => {
      this.action=action["step"];
    })
  }
  fullScreenMode(){
    this.isOverLayMode = false;
    this.invoiceDataService.strinkBtnHandler.next(true);

  }
  defaultLayoutMode(){
    this.isOverLayMode = true;
    this.invoiceDataService.strinkBtnHandler.next(false);

  }
}







