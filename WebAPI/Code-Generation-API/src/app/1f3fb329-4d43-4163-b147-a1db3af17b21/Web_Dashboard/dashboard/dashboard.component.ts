import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
   map(({ matches }) => {
     if (matches) {
       return {
         columns: 1,
         chart: { cols: 1, rows: 2 },
         table: { cols: 1, rows: 4 },
       };
     }

    return {
       columns: 4,
       chart: { cols: 2, rows: 2 },
       table: { cols: 4, rows: 4 },
     };
   })
 );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
