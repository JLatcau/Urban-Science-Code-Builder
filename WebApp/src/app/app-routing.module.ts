import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingPageComponent } from './pages/loading-page/loading-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';


const routes: Routes = [
  {path:'', component: MainPageComponent},
  {path:'loading', component: LoadingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
