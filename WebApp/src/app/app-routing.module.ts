import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './pages/camera-page/camera.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';
import { DownloadPageComponent } from './pages/download-page/download-page.component';
import { LoadingPageComponent } from './pages/loading-page/loading-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { OutputPageComponent } from './pages/output-page/output-page.component';

const routes: Routes = [
  {path:'', component: MainPageComponent},
  {path:'loading', component: LoadingPageComponent},
  {path:'camera', component: CameraComponent},
  {path:'download', component: DownloadPageComponent},
  {path:'confirmation', component: ConfirmationPageComponent},
  {path:'output', component: OutputPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
