import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageSharingServiceService {

  sharedImage;
  image: BehaviorSubject<File>;

  constructor() { 
    this.image = new BehaviorSubject(this.sharedImage);
  }

  newImage(newImage:File) {
    this.sharedImage = newImage;
    this.image.next(this.sharedImage);
  }

}
