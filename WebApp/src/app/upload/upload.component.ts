import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FileService } from '../_service/file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public message!: string;
  public progress!: number;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  public uploadFile = (files) => {
    if(files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.fileService.upload(formData).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event.total!);
      }
      else if(event.type === HttpEventType.Response){
        this.message = 'upload success.';
        this.onUploadFinished.emit(event.body);
      }
    });
  }

}
