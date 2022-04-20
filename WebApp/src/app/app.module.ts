import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DataTablesModule} from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';
import { CameraComponent } from './pages/camera-page/camera.component';
import { WebcamModule } from 'ngx-webcam'
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoadingPageComponent } from './pages/loading-page/loading-page.component';
import { DownloadPageComponent } from './pages/download-page/download-page.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';
import { FileService } from './_service/file.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

// Styling for notification feature
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DownloadComponent,
    CameraComponent,
    MainPageComponent,
    LoadingPageComponent,
    DownloadPageComponent,
    ConfirmationPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    WebcamModule,
    MatDialogModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [FileService],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }


