import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './camera/camera.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DatatableComponent } from './datatable/datatable.component';
import { KpiComponent } from './kpi/kpi.component';


const routes: Routes = [
  {path: 'camera', component: CameraComponent},
  {path:'chart', component:BarChartComponent},
  {path:'datatable', component:DatatableComponent},
  {path:'kpi', component:KpiComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
