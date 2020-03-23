import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import moment from 'moment';

import { SimsHttpCoreServices } from "../../services/sims-http-core.service";
import { CommonService } from "../../services/common.service";

export interface PeriodicElement {
  task: string;
  sender: string;
  assignedTo: string;
  receivedOn: string;
  dueDate: any;
  color: string;
  taskID: string;
  invNo: string;
  intDoc: string;
}

let inboxTaskData: PeriodicElement[] = [];

@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.component.html",
  styleUrls: ["./inbox.component.scss"]
})
export class InboxComponent implements OnInit {
  routeParameter: string;
  assignedTaskCount: number = 0;
  completedTaskCount: number = 0;
  dueDateTaskCount: number = 0;
  activeStatusCount: number = 0;
  activeTaskStatus = "ASSIGNED";
  loadInboxSpinner: boolean = true;
  showViewerStatus = false;
  taskRespectedClass = 'alf-am-task-container';
  detailsRespectedClass = 'alf-am-task-details-container';
  isOverLayMode: boolean = true;
  colorred = 0;
  coloryellow = 0;
  colorwhite: 0;


  showIcon = true;



  displayedColumns: string[] = [
    "select",
    "task",
    "sender",
    "assignedTo",
    "receivedOn",
    "dueDate"
  ];
  taskStatusCount = [
    { status: "'ASSIGNED'", value: "" },
    { status: "'COMPLETED'", value: "" }
  ];

  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource = new MatTableDataSource(inboxTaskData);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dueStyle;

  isExpanded: boolean = true;
 

  constructor(
    private route: ActivatedRoute,
    private simsHttpCoreServices: SimsHttpCoreServices,
    private commonService: CommonService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRouteParameter();
    this.getTasksInbox(this.activeTaskStatus);
    this.getCountTaskInbox();
    this.getCountDueTask();
  }

  getRouteParameter() {
    this.route.paramMap.subscribe(params => {
      this.routeParameter =
        params["params"].id === undefined ? "" : params["params"].id;
      if (params["params"].id !== null && params["params"].id !== undefined && params["params"].id !== "") {
        this.dataSource.filter = params["params"].id.trim().toLowerCase();
      }
    });
  }
  // This will return All Assigned task
  getTasksInbox(taskStatus, totalTask?) {
    this.colorred = 0;
    this.coloryellow = 0;
    this.colorwhite=0;
    let inboxTaskData: PeriodicElement[] = [];
    this.getCountTaskInbox();
    this.dataSource = new MatTableDataSource(inboxTaskData);
    this.activeTaskStatus = taskStatus;
    this.activeStatusCount = totalTask;
    this.loadInboxSpinner = true;
    let loginRequest = "<dn></dn>";
    let request1 = this.commonService.getSoapBody("GetUserDetails", "http://schemas.cordys.com/1.0/ldap", loginRequest);
    this.simsHttpCoreServices.httpPost(request1).subscribe((response) => {
      let res = this.commonService.parseXML(response);
      let resVal = res["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetUserDetailsResponse"][0]["tuple"][0]["old"][0]["user"][0]["authuserdn"][0].split(",")[0].split("=")[1];

      if (taskStatus === "ASSIGNED") {
        this.activeTaskStatus = "Pending";
      }
      else if (taskStatus === "COMPLETED") {
        this.activeTaskStatus = "Completed";
      }
      taskStatus = "'" + taskStatus + "'";
      var dataRequest =
        "<TaskIdentifiers><TaskIdentifierType name='' id='' /></TaskIdentifiers><cursor id=\"0\" position=\"\" numRows=\"20\" maxRows=\"9999\" /><Criteria><Query>(Task.State = :tstate1)</Query><Parameters><Parameter name='tstate1' type='Task.State' value=" +
        taskStatus +
        " /></Parameters></Criteria><OrderBy>Task.StartDate DESC</OrderBy><AssignedBy></AssignedBy><Target type='user'>cn=" + resVal + ",cn=organizational users,o=Muraai,cn=cordys,cn=defaultInst,o=muraai.com</Target><ShowNonWorkableItems>true</ShowNonWorkableItems><ReturnTaskData>true</ReturnTaskData>";
      var soapRequest = this.commonService.getSoapBody("GetTasks", "http://schemas.cordys.com/notification/workflow/1.0", dataRequest);
      this.simsHttpCoreServices.httpPost(soapRequest).subscribe(assignedTasks => {
        var lists = this.commonService.parseXML(assignedTasks);
        var taskLists =
          lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0][
          "GetTasksResponse"
          ][0]["tuple"];
        if (taskLists !== undefined) {
          taskLists.forEach(element => {
            let task = {
              task: element["old"][0]["Task"][0]["Activity"][0]["_"],
              sender: element["old"][0]["Task"][0]["Sender"][0]["_"]
                .split(",")[0]
                .split("=")[1],
              assignedTo: element["old"][0]["Task"][0]["Assignee"][0]["_"]
                .split(",")[0]
                .split("=")[1],
              // receivedOn: element.old[0]["Task"][0]["StartDate"],
              receivedOn: element["old"][0]["Task"][0]["StartDate"][0] instanceof Object ? "" : moment(element["old"][0]["Task"][0]["StartDate"][0]).add(0, 'days').format('DD-MM-YYYY'),
              // dueDate: element["old"][0]["Task"][0]["DeliveryDate"],
              dueDate: element["old"][0]["Task"][0]["DeliveryDate"][0] instanceof Object ? "" : moment(element["old"][0]["Task"][0]["DeliveryDate"][0]).add(7, 'days').format('DD-MM-YYYY'),
              color: "white",
              taskID: element["old"][0]["Task"][0]["TaskId"][0],
              invNo: element["old"][0]["Task"][0]["TaskData"][0]["ApplicationData"][0]["forminputdata"][0]["InvoiceHeaderModel"][0]["GetInvoiceHeaderDetailsbyInvNo"][0]["InvoiceNumber"][0]["_"],
              intDoc: element["old"][0]["Task"][0]["TaskData"][0]["ApplicationData"][0]["forminputdata"][0]["InvoiceHeaderModel"][0]["GetInvoiceHeaderDetailsbyInvNo"][0]["internalId"][0]["_"],
              dueTask: this.checkDueDate(element["old"][0]["Task"][0]["StartDate"][0])
            };
            inboxTaskData.push(task);
          });
          this.dataSource = new MatTableDataSource(inboxTaskData);
          this.loadInboxSpinner = false;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }

        else {
          this.loadInboxSpinner = false;
        }

      });
    });
  }

  checkDueDate(StartDate) {
    let currentDate = moment(new Date()).add(0).format('YYYY-MM-DD');
    let day4 = moment(StartDate).add(4, 'days').format('YYYY-MM-DD');
    let day5 = moment(StartDate).add(5, 'days').format('YYYY-MM-DD');
    let day6 = moment(StartDate).add(6, 'days').format('YYYY-MM-DD');
    let day7 = moment(StartDate).add(7, 'days').format('YYYY-MM-DD');


    if (day4 === currentDate || day5 === currentDate || day6 === currentDate || day7 === currentDate) {
      this.dueStyle = '#eef567'
      this.colorred++;
    }
    else if (currentDate > day7) {
      this.dueStyle = '#f77672';
      this.coloryellow++;
    }
    else{
      this.dueStyle='white';
      this.colorwhite++;

    }

    return this.dueStyle;
  }

  // This method will return task count for different status
  getCountTaskInbox() {
    let loginRequest = "<dn></dn>";
    let request1 = this.commonService.getSoapBody("GetUserDetails", "http://schemas.cordys.com/1.0/ldap", loginRequest);
    this.simsHttpCoreServices.httpPost(request1).subscribe((response) => {
      let res = this.commonService.parseXML(response);
      let resVal = res["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetUserDetailsResponse"][0]["tuple"][0]["old"][0]["user"][0]["authuserdn"][0].split(",")[0].split("=")[1];

      this.activeStatusCount = 0;
      this.taskStatusCount.forEach(element => {
        var dataRequest =
          "<TaskIdentifiers><TaskIdentifierType name='' id='' /></TaskIdentifiers><cursor id=\"0\" position=\"\" numRows=\"9999\" maxRows=\"9999\" /><Criteria><Query>(Task.State = :tstate1)</Query><Parameters><Parameter name='tstate1' type='Task.State' value=" +
          element.status +
          " /></Parameters></Criteria><OrderBy>Task.StartDate DESC</OrderBy><AssignedBy></AssignedBy><Target type='user'>cn=" + resVal + ",cn=organizational users,o=Muraai,cn=cordys,cn=defaultInst,o=muraai.com</Target><ShowNonWorkableItems>true</ShowNonWorkableItems><ReturnTaskData>true</ReturnTaskData>";

        var soapRequest = this.commonService.getSoapBody("GetTasks", "http://schemas.cordys.com/notification/workflow/1.0", dataRequest);
        this.simsHttpCoreServices
          .httpPost(soapRequest)
          .subscribe(assignedTasks => {
            var lists = this.commonService.parseXML(assignedTasks);
            var taskLists =
              lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0][
              "GetTasksResponse"
              ][0]["tuple"];
            if (taskLists !== undefined) {

              element.value = taskLists.length;
              if (element.status === "'ASSIGNED'") {
                this.assignedTaskCount = taskLists.length;
                this.activeStatusCount = taskLists.length;
              }
              else if (element.status === "'COMPLETED'") {
                this.completedTaskCount = taskLists.length;
              }
            }

            else {
              this.loadInboxSpinner = false;
            }
          });
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Refresh the table content with status Assigned
  refreshTable() {
    // call get tasks() : status Assigned
    this.getCountTaskInbox();
    this.getTasksInbox("ASSIGNED", this.assignedTaskCount);
  }

  // Delegate the selected task to another user
  delegateTask() {
    // Write your code here
  }

  // Forward the selected tash to another user
  forwardTaskToUser() {
    // Write your code here
  }

  // Get all users
  getAllUsers() {
    // Wrirte your code here
  }

  // Get logged in user role
  getUserRoles() {
    // Write your code here
  }


  // Calling Due task separately because the SOAP request is little bit different comparision to Assigned/Completed
  getDuetask(taskStatus?, taskCount?) {
    this.coloryellow = 0;
    this.colorred = 0;
    this.colorwhite=0;
    let inboxTaskData: PeriodicElement[] = [];
    this.dataSource = new MatTableDataSource(inboxTaskData);
    this.loadInboxSpinner = true;

    this.activeStatusCount = taskCount;
    if (taskStatus !== null || taskStatus !== undefined)
      this.activeTaskStatus = taskStatus;
    var dataRequest =
      "<Query xmlns=\"http://schemas.cordys.com/cql/1.0\"> <Select><QueryableObject>TASK_INSTANCE</QueryableObject><Field>TaskId</Field><Field>SourceInstanceId</Field><Field>State</Field><Field>ProcessName</Field><Field>Activity</Field><Field>ActivityId</Field><Field>Priority</Field><Field>Target</Field><Field>Sender</Field><Field>SourceType</Field><Field>Assignee</Field><Field>CompletedByUser</Field><Field>DelegatedToUser</Field><Field>DeliveryDate</Field><Field>StartDate</Field><Field>DueDate</Field><Field>StartedOn</Field><Field>CompletionDate</Field><Field>IsPriorityFixed</Field><Field>UITaskId</Field><Field>TASK_ENTITY_INSTANCE_ID</Field><Field>ENTITY_LAYOUT_ID</Field></Select><Filters><And><EQ field=\"SHOW_BUSINESS_ATTRIBUTES\"><Value>true</Value></EQ><EQ field=\"SHOW_NON_WORKABLE_ITEMS\"><Value>false</Value></EQ><EQ field=\"RETURN_TASK_DATA\"><Value>false</Value></EQ><EQ xmlns=\"http://schemas.cordys.com/cql/1.0\" field=\"State\"><Value>CREATED</Value></EQ></And></Filters><OrderBy><Property direction=\"asc\">Priority</Property><Property direction=\"asc\">DeliveryDate</Property></OrderBy><Cursor position=\"0\" numRows=\"200\" maxRows=\"200\"/></Query>";
    var soapRequest = this.commonService.getSoapBody("GetHumanTasks", "http://schemas.cordys.com/notification/workflow/1.0", dataRequest);
    this.simsHttpCoreServices.httpPost(soapRequest).subscribe(assignedTasks => {
      var lists = this.commonService.parseXML(assignedTasks);
      var taskLists =
        lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0][
        "GetHumanTasksResponse"
        ][0]["tuple"];

      this.dueDateTaskCount = taskLists !== undefined ? taskLists.length : 0;
      if (taskLists !== undefined) {
        // var addDate= (7* 24 * 60 * 60);

        taskLists.forEach(element => {
          let task = {
            task: element["old"][0]["NOTF_TASK_INSTANCE"][0]["Activity"][0],
            sender: element["old"][0]["NOTF_TASK_INSTANCE"][0]["Sender"][0]["_"]
              .split(",")[0]
              .split("=")[1],
            assignedTo: "",
            receivedOn: element["old"][0]["NOTF_TASK_INSTANCE"][0]["StartDate"][0],
            dueDate: element["old"][0]["NOTF_TASK_INSTANCE"][0]["DeliveryDate"][0] instanceof Object ? "" : moment(element["old"][0]["NOTF_TASK_INSTANCE"][0]["DeliveryDate"][0]).add(7, 'days').format('YYYY-MM-DD'),
            // InvoiceDate: element["old"][0]["TABLE"][0]["invoice_date"][0]      instanceof Object ? "" : moment(element["old"][0]["TABLE"][0]["invoice_date"][0]).add(0, 'days').format('YYYY-MM-DD'),
            color: "white",
            taskID: element["old"][0]["NOTF_TASK_INSTANCE"][0]["TaskId"][0],
            invNo: "",
            intDoc: ""
          };
          inboxTaskData.push(task);
        });
        this.dataSource = new MatTableDataSource(inboxTaskData);
        this.loadInboxSpinner = false;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.loadInboxSpinner = false;
      }
    });
  }


  getCountDueTask() {
    var dataRequest =
      "<Query xmlns=\"http://schemas.cordys.com/cql/1.0\"> <Select><QueryableObject>TASK_INSTANCE</QueryableObject><Field>TaskId</Field><Field>SourceInstanceId</Field><Field>State</Field><Field>ProcessName</Field><Field>Activity</Field><Field>ActivityId</Field><Field>Priority</Field><Field>Target</Field><Field>Sender</Field><Field>SourceType</Field><Field>Assignee</Field><Field>CompletedByUser</Field><Field>DelegatedToUser</Field><Field>DeliveryDate</Field><Field>StartDate</Field><Field>DueDate</Field><Field>StartedOn</Field><Field>CompletionDate</Field><Field>IsPriorityFixed</Field><Field>UITaskId</Field><Field>TASK_ENTITY_INSTANCE_ID</Field><Field>ENTITY_LAYOUT_ID</Field></Select><Filters><And><EQ field=\"SHOW_BUSINESS_ATTRIBUTES\"><Value>true</Value></EQ><EQ field=\"SHOW_NON_WORKABLE_ITEMS\"><Value>false</Value></EQ><EQ field=\"RETURN_TASK_DATA\"><Value>false</Value></EQ><EQ xmlns=\"http://schemas.cordys.com/cql/1.0\" field=\"State\"><Value>CREATED</Value></EQ></And></Filters><OrderBy><Property direction=\"asc\">Priority</Property><Property direction=\"asc\">DeliveryDate</Property></OrderBy><Cursor position=\"0\" numRows=\"200\" maxRows=\"200\"/></Query>";
    var soapRequest = this.commonService.getSoapBody("GetHumanTasks", "http://schemas.cordys.com/notification/workflow/1.0", dataRequest);
    this.simsHttpCoreServices.httpPost(soapRequest).subscribe(assignedTasks => {
      var lists = this.commonService.parseXML(assignedTasks);
      var taskLists =
        lists["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0][
        "GetHumanTasksResponse"
        ][0]["tuple"];

      this.dueDateTaskCount = taskLists !== undefined ? taskLists.length : 0;

    });
  }

  // Return task color based on status
  // NOTE: For sample I have added some dummy data, this will be cahnged when we will have real data
  getTaskColor(row) {
    if (row.task.includes("State"))
      return "#ff3e30";
    else if (row.task.includes("ASM"))
      return "#66ff73";
    else if (row.task.includes("Created"))
      return "#f7ff5e";
    else
      return "white";
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
      } row ${row.task + 1}`;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['snackBarColor']
    });
  }
  claimTask() {
    for (var i = 0; i < this.selection.selected.length; i++) {
      var dataRequest =
        "<TaskId>" + this.selection.selected[i].taskID + "</TaskId>";
      var soapRequest = this.commonService.getSoapBody("ClaimTask", "http://schemas.cordys.com/notification/workflow/1.0", dataRequest);
      this.simsHttpCoreServices.httpPost(soapRequest).subscribe(assignedTasks => {
        this.openSnackBar('Item claimed successfully.', '');
        this.getDuetask('Un Assigned', this.dueDateTaskCount)
      });
    }
  }

  invoiceDetails(invNo, intDoc, task) {
    this.router.navigate(['/invoice-details'], { queryParams: { invoiceNumber: invNo, internalId: intDoc, taskId: task, mode: '', isButtonEnable: true } });
  }


  hideToggle() {
    this.showIcon = !this.showIcon;
  }

}

