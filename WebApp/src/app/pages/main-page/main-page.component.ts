import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageSharingServiceService } from 'src/app/shared/image-sharing-service/image-sharing-service.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/download/download.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  image;
  files;

  private acceptedFileTypes = "image.png|image.heic|image.jpg|image.jpeg"

  constructor(private imageService: ImageSharingServiceService,
    private route: ActivatedRoute,
    private router: Router, 
    private dialog: MatDialog) { 
  }

  ngOnInit(): void {
  }

  allowDrop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event) {
    event.preventDefault();
  
    const files = event.dataTransfer.files;
    const file:File = files[0]; // Should only accept 1 file for the time being

    this.validateImage(file);
  }

  onImageSelected(event) {
    const file:File = event.target.files[0];

    this.validateImage(file);
  }

  validateImage(file) {
    if(file) {
      if(file.type.match(this.acceptedFileTypes)) {
        this.image = file;

        this.newImage();
        //console.log(this.image);
        this.router.navigate(['/confirmation']);
      }
    }
  }

  newImage() {
    this.imageService.newImage(this.image)
  }

  open_help(templateRef) {
    let dialogRef = this.dialog.open(templateRef);
  }
}
