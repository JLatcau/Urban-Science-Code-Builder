import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FileService } from '../_service/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageSharingServiceService } from 'src/app/shared/image-sharing-service/image-sharing-service.service';
import { DataService } from 'src/app/_service/data.service';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
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
  user_id!: string ;
  imagePathSubscription!: Subscription;
  user_IdSubscription!: Subscription;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private fileService: FileService,private imageService: ImageSharingServiceService,
    private route: ActivatedRoute,
    private router: Router,private data: DataService) { }

  ngOnInit(): void {
    this.imageService.image.subscribe(img => {
      this.image = img;
      this.imagePathSubscription = this.data.currentImagePath.subscribe(imagePath => this.imagePath = imagePath)

    })
    this.user_IdSubscription = this.data.currentUser_Id.subscribe(user_id => this.user_id = user_id);
    
  }

  public async uploadFile (file) {
    // if(files.length === 0)
    //   return;
    let fileToUpload = <File>file;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
   
    if (localStorage.getItem("user_id")==null){
    this.user_id=uuidv4();
    localStorage.setItem("user_id",this.user_id.toString());
    console.log("User id in web app: "+this.user_id);

    }
    else{
      var user_id=localStorage.getItem("user_id");
      if (user_id)
      this.user_id=user_id;
    }
    this.data.changeUser_Id(this.user_id);
      
    formData.append("user_id",this.user_id);

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
        this.data.changeImagePath(this.response.imagePath);
        // Navigating to download page after image processing is complete and files ready for download
        this.router.navigate(['download']);

      }      

    };
  

  }

}
