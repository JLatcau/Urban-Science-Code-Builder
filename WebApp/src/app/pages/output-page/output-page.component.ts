import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-output-page',
  templateUrl: './output-page.component.html',
  styleUrls: ['./output-page.component.css']
})
export class OutputPageComponent implements OnInit {
  showSubmit = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  toggleSubmit() {
    this.showSubmit = !this.showSubmit;
  }

  open_help(templateRef) {
    let dialogRef = this.dialog.open(templateRef);
  }
}
