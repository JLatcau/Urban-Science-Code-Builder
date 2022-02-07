import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DatatableComponent } from './datatable/datatable.component';
import { KpiComponent } from './kpi/kpi.component';

const routes: Routes = [
  {path:'chart', component:BarChartComponent},
  {path:'datatable', component:DatatableComponent},
  {path:'kpi', component:KpiComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
