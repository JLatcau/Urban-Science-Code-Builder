import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageSharingServiceService } from 'src/app/shared/image-sharing-service/image-sharing-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {

  image;
  imageURL;
  sanitizedImageURL;

  constructor(
    private dialog: MatDialog,
    private imageService: ImageSharingServiceService,
    private domSanitizer: DomSanitizer) { 
      this.onResize() 
    }

  ngOnInit(): void {
      this.imageService.image.subscribe(img => {
        this.image = img;
      })

    //  console.log(this.image);

      this.readUrl();
  }

  // Image pre processing
  readUrl() {
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      
      reader.onload = () => {
        this.imageURL = reader.result;
      }

      //this.sanitizedImageURL = this.domSanitizer.bypassSecurityTrustUrl(this.imageURL);
  }

  // Cleaning url
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  public width: number = 1000;
  public height: number = 500;
  private resizeMultiplier = 0.40;

  // Resizing
  @HostListener('window:resize', ['$event']) onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth * this.resizeMultiplier;
    this.height = win.innerHeight * this.resizeMultiplier;
  }

  // For help feature
  open_help(templateRef) {
    let dialogRef = this.dialog.open(templateRef);
  }
}
