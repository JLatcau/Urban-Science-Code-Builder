import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  title = 'bar-chart';
  public chart_Options: ChartOptions = {
    responsive: true,
  };
  public chart_Labels: Label[] = ['Department1', 'Department2', 'Department3', 'Department4'];
  public chart_Type: ChartType = 'bar';
  public chart_Legend = true;
  public chart_Plugins = [];

  public chart_Data: ChartDataSets[] = [
    {
      data: [65, 67, 69, 70],
      label: 'Example1',
      backgroundColor: "dark grey",
      hoverBackgroundColor: "dark grey"
    },
    {
      data: [50, 48, 55, 49],
      label: 'Example2',
      backgroundColor: "lime",
      hoverBackgroundColor: "lime"
    },
  ];

  constructor() { }

  ngOnInit() {

  }

}
