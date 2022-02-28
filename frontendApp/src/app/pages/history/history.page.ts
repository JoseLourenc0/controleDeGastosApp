import { StorageService } from './../../services/storage/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Finance } from 'src/app/models/finances.model';

import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private storageService:StorageService) { 
    this.chartOptions = {
      // series: [44, 55, 13, 43, 22],
      series:[0],
      chart: {
        type: "donut"
      },
      // labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      labels: [''],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  allFinances:Finance[] = []

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storageService.get('finances').then(finances => {
      if(finances) {
        let gastos = 0, ganhos = 0
        this.allFinances = finances

        this.allFinances.forEach(r => {

          let val = Number(r.value)

          r.type === 'gasto' ? gastos += val : ganhos += val
        })

        this.chartOptions.labels = ['gastos','ganhos']
        this.chartOptions.series = [gastos*-1,ganhos]

      }
    })
  }

}
