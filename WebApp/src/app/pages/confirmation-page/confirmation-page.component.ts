import { Component, OnInit } from '@angular/core';
import { ImageSharingServiceService } from 'src/app/shared/image-sharing-service/image-sharing-service.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {

  image;
  imageURL;
  isImageAvailable:boolean = true;

  constructor(private imageService: ImageSharingServiceService) { }

  ngOnInit(): void {
      this.imageService.image.subscribe(img => {
        this.image = img;
      })

      console.log(this.image);

      this.readURL();
  }

  readURL() {
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      
      reader.onload = () => {
        this.imageURL = reader.result;
      }

      this.isImageAvailable = true;
  }

  


}
