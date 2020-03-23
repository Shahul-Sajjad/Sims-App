import { Component, OnInit } from '@angular/core';
import { PDFSource } from 'ng2-pdf-viewer';


@Component({
  selector: 'app-pdf-expand-viewer-dialog',
  templateUrl: './pdf-expand-viewer-dialog.component.html',
  styleUrls: ['./pdf-expand-viewer-dialog.component.scss']
})
export class PdfExpandViewerDialogComponent implements OnInit {
  pdfSrc: string | PDFSource | ArrayBuffer;


  constructor() { }

  ngOnInit() {
    this.pdfSrc = './assets/invoice.pdf';
  }

}
