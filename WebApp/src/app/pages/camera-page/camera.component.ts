import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { ImageSharingServiceService } from 'src/app/shared/image-sharing-service/image-sharing-service.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = true;
  isCameraExist = true;
  showSubmit = false;
  errors: WebcamInitError[] = [];
  private notifier: NotifierService;


  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public webcamImage;
  public imageName = "webcamCapture.png";
  public imageFormat= "image/png";

  image;

  constructor(
    private dialog: MatDialog,
    private imageService: ImageSharingServiceService,
    private router: Router,
    notifier: NotifierService) { 
      this.onResize();
      this.notifier = notifier;
    }


    public width: number = 1000;
    public height: number = 500;
    private resizeMultiplier = 0.60;

    @HostListener('window:resize', ['$event'])
    onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth * this.resizeMultiplier;
    this.height = win.innerHeight * this.resizeMultiplier;
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      });

      this.notifier.notify('info','Check "help" for optimal results.');
  }

  takeSnapshot(): void {
    this.trigger.next();
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCam(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
   // this.getPicture.emit(webcamImage);
    this.webcamImage = webcamImage;
    this.showWebcam = false;

    const arr = this.webcamImage.imageAsDataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file: File = new File([u8arr], this.imageName, { type: this.imageFormat })
    this.image = file;


    this.newImage();
    this.router.navigate(['/confirmation']);
  }

  toggleSubmit() {
    this.showSubmit = !this.showSubmit;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  newImage() {
    this.imageService.newImage(this.image)
  }

  open_help(templateRef) {
    let dialogRef = this.dialog.open(templateRef);
  }
}