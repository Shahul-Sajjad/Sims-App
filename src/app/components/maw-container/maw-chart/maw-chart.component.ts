import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { SimsHttpCoreServices } from 'src/app/services/sims-http-core.service';

@Component({
  selector: 'app-maw-chart',
  templateUrl: './maw-chart.component.html',
  styleUrls: ['./maw-chart.component.scss']
})
export class MawChartComponent implements OnInit {
    chartNumber:string[]=[];
    dataSource = [];
    userData = [];
processingVendor = [{
    state: "Annie Ho",
    young: 167
}, {
    state: "Daisy Oh",
    young: 96
}, {
    state: "Brenda Lee",
    young: 135
}, {
    state: "Jennifer Cepluch",
    young: 302
}];


areas = [{
    country: "Joe Wu",
    area: 12
}, {
    country: "Lydia Cha",
    area: 7
}, {
    country: "Joseph R",
    area: 9
}, {
    country: "Daniel",
    area: 15
}];



    // `````````````````````````
  type = 'bar';
  data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
      {
      label: "Invoice pending by month",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
      ],
      }
  ]
  };
  options = {
  responsive: true,
  maintainAspectRatio: false
  };

  typePie = 'horizontalBar';
  pieData = {
      labels: ["Pending", "Duplicate Invoice", "Amount Mismatch", "PO missing", "Quantity Missing", "Completed"],
      datasets: [
          {
          label: "Invoice Status",
          data: [65, 59, 80, 81, 56],
          backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(103, 108, 255, 0.5)'
          ],
          }
      ]
      };

      type2 = 'pie';
      data2 = {
          labels: ["Jan", "Feb", "Mar", "April"],
          datasets: [
              {
              label: "Invoice processing time by month",
              data: [134, 123, 158, 81],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(75, 192, 192, 0.5)'
              ],
              }
          ]
          };

      type4 = 'line';
      data4 = {
          labels: ["Vendor1", "Vendor2", "Vendor3", "Vendor4"],
          datasets: [
              {
              label: "Average processing time by vendor",
              data: [134, 123, 158, 81],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(75, 192, 192, 0.5)'
              ],
              }
          ]
          };
  constructor(
    private commonService: CommonService,
    private simsHttpCoreServices: SimsHttpCoreServices,
  ) { }

  ngOnInit() {
    this.chartNumber = ["one","two"];
    this.chartNumber.map(x=>{
        this.getChartValues(x);
    })
  }
  getChartValues(chartNumber: string) {
    const dataRequest = "<userid></userid><vendorcode></vendorcode><charttype>" + chartNumber + "</charttype>";
    const soapRequest = this.commonService.getSoapBody('GetInvoiceDataforChart', 'http://schemas.cordys.com/WINDatabaseMetadata', dataRequest);
    this.simsHttpCoreServices.httpPost(soapRequest).subscribe(chartDetailResponse => {
        let chartDetail = this.commonService.parseXML(chartDetailResponse);
        let chartDetaillist=chartDetail["__zone_symbol__value"]["SOAP:Envelope"]["SOAP:Body"][0]["GetInvoiceDataforChartResponse"][0].tuple
        if (chartDetaillist) {
            if (chartNumber == "one") {
                chartDetaillist.map((x, index) => {
                    let chartDetailModel = {
                        state: x.old[0].invoice_header[0].Month[0] instanceof Object ? "" : x.old[0].invoice_header[0].Month[0],
                        young: x.old[0].invoice_header[0].PO[0] instanceof Object ? "" : +x.old[0].invoice_header[0].PO[0],
                        middle: x.old[0].invoice_header[0].NonPO[0] instanceof Object ? "" : +x.old[0].invoice_header[0].NonPO[0],
                    }
                    this.dataSource.push(chartDetailModel);
                    if (chartDetaillist.length - 1 == index) {
                        this.dataSource.reverse();
                    }
                })
            }
            if(chartNumber=="two"){
                chartDetaillist.map((x, index) => {
                    let chartDetailModel = {
                        age: x.old[0].invoice_header[0].vendor_name[0] instanceof Object ? "" : x.old[0].invoice_header[0].vendor_name[0],
                        number: x.old[0].invoice_header[0].Time_Difference[0] instanceof Object ? "" : +x.old[0].invoice_header[0].Time_Difference[0],
                        name:x.old[0].invoice_header[0].vendor_name[0] instanceof Object ? "" : x.old[0].invoice_header[0].vendor_name[0],
                    }
                    this.userData.push(chartDetailModel);
                    if (chartDetaillist.length - 1 == index) {
                        this.userData.reverse();
                    }
                })
            }
            if(chartNumber=="three"){
                chartDetaillist.map((x, index) => {
                    let chartDetailModel = {
                        country: x.old[0].invoice_header[0].vendor_name[0] instanceof Object ? "" : x.old[0].invoice_header[0].vendor_name[0],
                        area: x.old[0].invoice_header[0].Time_Difference[0] instanceof Object ? "" : +x.old[0].invoice_header[0].Time_Difference[0],
                    }
                    this.userData.push(chartDetailModel);
                    if (chartDetaillist.length - 1 == index) {
                        this.userData.reverse();
                    }
                })
            }
        }
    });
}

}
