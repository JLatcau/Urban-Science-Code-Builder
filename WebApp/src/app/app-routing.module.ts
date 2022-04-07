import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './pages/camera-page/camera.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';
import { DownloadPageComponent } from './pages/download-page/download-page.component';
import { LoadingPageComponent } from './pages/loading-page/loading-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { OutputPageComponent } from './pages/output-page/output-page.component';

const routes: Routes = [
  {path:'', component: MainPageComponent, data: {depth: 1}},
  {path:'loading', component: LoadingPageComponent, data: {depth: 4}},
  {path:'camera', component: CameraComponent, data: {depth: 2}},
  {path:'download', component: DownloadPageComponent, data: {depth: 5}},
  {path:'confirmation', component: ConfirmationPageComponent, data: {depth: 3}},
  {path:'output', component: OutputPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
