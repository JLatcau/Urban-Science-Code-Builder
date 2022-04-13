import { Component,OnInit, OnDestroy, EventEmitter,HostListener } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { FileService } from './_service/file.service';
import { DataService } from './_service/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  constructor(private fileService: FileService, private data: DataService) { }

  title = 'WebApp';
  webcamImage: WebcamImage | undefined;
  user_id!: string;
  user_IdSubscription!: Subscription;

  ngOnInit(){ 
    this.user_IdSubscription = this.data.currentUser_Id.subscribe(user_id => this.user_id = user_id);
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    var response=await this.fileService.deleteUserData(this.user_id).subscribe();

    if (this.user_IdSubscription) {
      this.user_IdSubscription.unsubscribe();
  }
  }
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }
}
