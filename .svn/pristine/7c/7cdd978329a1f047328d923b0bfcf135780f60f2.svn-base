import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen'},
  {position: 2, name: 'Helium'},
  {position: 3, name: 'Lithium'}
];


@Component({
  selector: 'app-saw-datatable',
  templateUrl: './saw-datatable.component.html',
  styleUrls: ['./saw-datatable.component.scss']
})
export class SawDatatableComponent implements OnInit {
  displayedColumns1: string[] = ['position', 'name'];
  displayedColumns = [
    { columnDef: 'position', columnName: 'No.' },
    { columnDef: 'name', columnName: "Name" }
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
    this.displayedColumns1.forEach(element => {
      console.log(element);
    });
  }

}
