import { Component, HostListener, OnInit } from '@angular/core';
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
  dragAreaClass: string;
  
  private acceptedFileTypes = "image.png|image.heic|image.jpg|image.jpeg"

  constructor(private imageService: ImageSharingServiceService,
    private route: ActivatedRoute,
    private router: Router, 
    private dialog: MatDialog) { 
      this.dragAreaClass = "dragarea"
  }

  ngOnInit(): void {
    this.dragAreaClass = "dragarea";
  }

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files:FileList =  event.dataTransfer.files;
      const file:File = files[0]
      this.validateImage(file);
    }
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
