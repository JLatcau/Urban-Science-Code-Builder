import { Component, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css']
})
export class DownloadPageComponent implements OnInit {
  private notifier: NotifierService;

  constructor(private dialog: MatDialog, notifier: NotifierService) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.notifier.notify('success','Your image has been succesfully processed!');
  }

  open_help(templateRef) {
    let dialogRef = this.dialog.open(templateRef);
  }
}

