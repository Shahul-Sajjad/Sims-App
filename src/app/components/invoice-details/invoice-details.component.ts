import { Component, OnInit } from '@angular/core';
import { PDFSource } from 'ng2-pdf-viewer';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDataService } from 'src/app/services/invoice-data.service';
import { MatDialog } from '@angular/material';
import { PdfExpandViewerDialogComponent } from '../pdf-expand-viewer-dialog/pdf-expand-viewer-dialog.component';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  pdfSrc: string | PDFSource | ArrayBuffer;
  taskInfo;
  taskRespectedClass = 'alf-am-task-container';
  detailsRespectedClass = 'alf-am-task-details-container';
  showViewerStatus = false;


  constructor(
    private route: ActivatedRoute,
    private invoiceDataService: InvoiceDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pdfSrc = './assets/invoice.pdf';
    this.setDocumentViewer(true);
    this.route.queryParams.subscribe((param) => {
      this.taskInfo = param;
    });
    this.invoiceDataService.strinkBtnHandler.subscribe(x => {
      if (x) {
      this.fullScreenMode();
      }
      else {
      this.defaultLayoutMode();
      }
    });

  }
public pdfFullScreenViewer(){
  const dialogRef = this.dialog.open(PdfExpandViewerDialogComponent, {
    width: '60%',
  });
}

  public fullScreenMode(): void {
    this.taskRespectedClass = 'task-container ';
    this.detailsRespectedClass = 'view-container';
  }

  public defaultLayoutMode(): void {
    this.taskRespectedClass = 'alf-am-task-form-container';
    this.detailsRespectedClass = 'alf-am-task-details-container';
  }

  public setDocumentViewer(status: boolean): void {
    this.showViewerStatus = status;
    if (!this.showViewerStatus) {
      this.taskRespectedClass = 'alf-am-task-container';
    } else {
      this.taskRespectedClass = 'alf-am-task-form-container';
    }
  }

  get getViewerStatus(): boolean {
    return this.showViewerStatus;
  }

}
