import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FileService } from '../_service/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageSharingServiceService } from 'src/app/shared/image-sharing-service/image-sharing-service.service';
import { DataService } from 'src/app/_service/data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public message!: string;
  public progress!: number;
  image;
  response;
  imagePath!: string;
  subscription!: Subscription;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private fileService: FileService,private imageService: ImageSharingServiceService,
    private route: ActivatedRoute,
    private router: Router,private data: DataService) { }

  ngOnInit(): void {
    this.imageService.image.subscribe(img => {
      this.image = img;
      this.subscription = this.data.currentImagePath.subscribe(imagePath => this.imagePath = imagePath)

    })
  }

  public async uploadFile (file) {
    // if(files.length === 0)
    //   return;

    let fileToUpload = <File>file;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
   
      this.router.navigate(['/loading']);

    var event= await this.fileService.upload(formData).toPromise()
    if (event) {
      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event.total!);
      }
      else if(event.type === HttpEventType.Response){
        this.message = 'upload success.';
        this.onUploadFinished.emit(event.body);
        this.response=event.body;
        //img path to store in database entry for retrieval, localhost API link
        this.data.changeImagePath(this.response.imagePath);
        console.log("image path: "+this.imagePath);
        //Navigaring to download page after image processing is complete and files ready for download
        this.router.navigate(['download']);

      }      

    };
   // this.data.addImagePathToDatabase();
    //this.router.navigate(['/loading']);

  }

}
