import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import { FileService } from '../_service/file.service';
import * as FileSaver from 'file-saver';
//import { Console } from 'console';


@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  
  constructor(private fileService: FileService) { }

  message!: string;
  progress!: number;
  foldersToDownload;
   filesToDownload: string[] = [];
  downloadPath;
 
  ngOnInit(): void {
    //Retrieving dashboard folder and file paths.
    this.fileService.getFolders().subscribe((response) => {
      this.message = response['message'];
      this.foldersToDownload=response['folders'];
      for(var i =0;i<this.foldersToDownload.length;i++)
      {
      this.fileService.getFiles(this.foldersToDownload[0]).subscribe((response) => {
        this.message = response['message'];
        this.filesToDownload.push(response['files']);
      });
    }
    });
    //Zip file generation dashboard code.
    this.fileService.createZip().subscribe((response) => {
      this.downloadPath=response['zipPath'];
    });
    
     }

 download(){
  
  var fileName;
  
  fileName=this.downloadPath;
  fileName=fileName.split("\\");
  //console.log("file name went with: "+fileName[1]);
  this.fileService.download(this.downloadPath).subscribe((event) => {
    
    this.message = 'Download success.';
        this.downloadFile(event,fileName[1]);
  
});
 }

 private downloadFile(data: Blob,fileName: string) {
   console.log("now in download file");

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


