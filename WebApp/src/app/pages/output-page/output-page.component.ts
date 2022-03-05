import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-output-page',
  templateUrl: './output-page.component.html',
  styleUrls: ['./output-page.component.css']
})
export class OutputPageComponent implements OnInit {
  showSubmit = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSubmit() {
    this.showSubmit = !this.showSubmit;
  }
}
