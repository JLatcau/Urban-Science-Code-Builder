import { Component , OnInit} from "@angular/core";

@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.css']
})
export class <%= classify(name) %>Component implements OnInit {

  chartLabels = [
    'January',
    'February',
    'March',
    'April'
  ];
  
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Account A'
    },
    {
      data: [120, 455, 100, 340],
      label: 'Account B'
    },
    {
      data: [45, 67, 800, 500],
      label: 'Account C'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
