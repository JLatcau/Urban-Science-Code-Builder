import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import { FileService } from '../_service/file.service';
import * as FileSaver from 'file-saver';
import { DataService } from '../_service/data.service';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';



@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  
  message!: string;
  progress!: number;
  foldersToDownload;
  filesToDownload: string[] = [];
  downloadPath;
  user_id!: string;
  user_IdSubscription!: Subscription;
  private notifier: NotifierService;

  constructor(
    private fileService: FileService, 
    private data: DataService,
    notifier: NotifierService) {
      this.notifier = notifier;
    }

  ngOnInit(): void {
    //Retrieving dashboard folder and file paths.
    
    this.user_IdSubscription = this.data.currentUser_Id.subscribe(user_id => this.user_id = user_id);
  }

  async download(){
    var fileName;
    //Zip file generation pf dashboard code.
    var response=  await this.fileService.createZip(this.user_id).toPromise() 
      if (response)
    {
      this.downloadPath=response['zipPath'];
    };
    fileName=this.downloadPath;
    fileName=fileName.split("\\");
    
    this.fileService.download(this.downloadPath,this.user_id).subscribe((event) => {
      this.message = 'Download success.';
          this.downloadFile(event,fileName[1]);
    });
  }

  private downloadFile(data: Blob,fileName: string) {
    console.log("now in download file");

    this.notifier.notify('success', 'Your output is being downloaded to your system!')

    // Sending file as a blob and actually starting the download
    const downloadedFile = new Blob([data], { type: data.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  } 
}



