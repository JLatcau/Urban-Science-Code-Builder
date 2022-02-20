import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FileService } from '../_service/file.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  
  constructor(private fileService: FileService) { }

  message!: string;
  progress!: number;

  ngOnInit(): void {
  }

  download(){
    this.fileService.download().subscribe((response) => {
      this.message = response['message'];
    });
  }

}
