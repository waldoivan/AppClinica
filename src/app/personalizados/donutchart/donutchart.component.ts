import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styles: []
})
export class DonutchartComponent implements OnInit {

  @Input() doughnutChartLabels: Label[] = [];
  @Input() doughnutChartData: MultiDataSet = [];
  @Input() doughnutChartType: ChartType = 'doughnut';

// datos de ejemplo grafico de donuts
// Doughnut
// public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
// public doughnutChartData: MultiDataSet = [
//   [350, 450, 100],
//   [50, 150, 120],
//   [250, 130, 70],
// ];
// public doughnutChartType: ChartType = 'doughnut';


  constructor() { }

  ngOnInit() {
  }

// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

}
