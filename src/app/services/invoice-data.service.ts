import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {

  invoiceDetailHandler = new Subject();
  tabHandler = new Subject();
  strinkBtnHandler = new Subject();

  private invoiceHeaderInfo;
  private invoiceDetailTableInfo;
  private invoiceCommentInfo;
  private PostErpBtnData;
  private userInfo;

  constructor() { }

  // Setter & getter for InvoiceHeaderData
  setInvoiceHeaderData(val) {
    this.invoiceHeaderInfo = val;
  }
  getInvoiceHeaderData() {
    return this.invoiceHeaderInfo;
  }

  // Setter & getter for InvoiceDetailTableData
  setInvoiceDetailTableData(val: any) {
    this.invoiceDetailTableInfo = val;
  }
  getInvoiceDetailTableData() {
    return this.invoiceDetailTableInfo;
  }

  // Setter & getter for Comments
  setInvoiceCommentData(val: any) {
    this.invoiceCommentInfo = val;
  }
  getInvoiceCommentsData() {
    return this.invoiceCommentInfo;
  }

  setPostErpBtnData(val: any) {
    this.PostErpBtnData = val;
  }
  getPostErpBtnData() {
    return this.PostErpBtnData;
  }
  setUserInfo(val) {
    this.userInfo = val;
    console.log(this.userInfo);
  }

  getUserInfo() {
    return this.userInfo;
  }
}
