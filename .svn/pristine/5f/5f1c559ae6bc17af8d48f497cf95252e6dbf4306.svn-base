import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { PoDetailsItems } from 'src/app/models/invoice-item.model';

@Component({
  selector: 'app-po-line-details-dialog',
  templateUrl: './po-line-details-dialog.component.html',
  styleUrls: ['./po-line-details-dialog.component.scss']
})
export class PoLineDetailsDialogComponent implements OnInit {

  poLineData;
  displayedPoItemsColumns: string[] = ['Line No', 'Material Code', 'Material Description', 'Vendor Material', 'Order Qty', 'UOM', 'Rate', 'Currency', 'Gross Amount'];
  poDetailsDataSource = new MatTableDataSource<PoDetailsItems>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialog: MatDialog
  ) {
    this.poLineData = data;
  }

  ngOnInit() {
    this.poDetailsDataSource = new MatTableDataSource<PoDetailsItems>(this.poLineData);
   }

  onClickOk() {
    this.dialog.closeAll();
  }

}
