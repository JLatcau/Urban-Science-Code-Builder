import { Component, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css'],
})
export class DownloadPageComponent implements OnInit {
  private notifier: NotifierService;


  constructor(private dialog: MatDialog, notifier: NotifierService) {
    this.notifier = notifier;
  }

  // Notifier Service like this one is commonly used throughout the application to send notifications. The first parameter of this
  // notify() function is the notification type. Each type is a different color
  ngOnInit(): void {
    this.notifier.notify('success','Your image has been succesfully processed!');
  }

  // For help feature
  open_help(templateRef) {
    let dialogRef = this.dialog.open(templateRef);
  }
}

