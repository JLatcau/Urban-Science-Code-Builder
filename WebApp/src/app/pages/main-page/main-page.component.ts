import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageSharingServiceService } from 'src/app/shared/image-sharing-service/image-sharing-service.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  image;

  constructor(private imageService: ImageSharingServiceService,
    private route: ActivatedRoute,
    private router: Router) { 
  }

  ngOnInit(): void {
  }

  onImageSelected(event) {
    const file:File = event.target.files[0];

    if (file) {
      this.image = file;

      this.newImage();
      //console.log(this.image);
      this.router.navigate(['/confirmation']);
    }
  }

  newImage() {
    this.imageService.newImage(this.image)
  }

}
