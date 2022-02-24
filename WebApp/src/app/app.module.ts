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
import { CameraComponent } from './pages/camera-page/camera.component';
import { WebcamModule } from 'ngx-webcam'
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoadingPageComponent } from './pages/loading-page/loading-page.component';
import { DownloadPageComponent } from './pages/download-page/download-page.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    MainPageComponent,
    LoadingPageComponent,
    DownloadPageComponent,
    ConfirmationPageComponent
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
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }


